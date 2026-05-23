import type { GithubContributionDay } from "#/lib/github-contributions-api";

export const TRAILING_YEAR_DAY_COUNT = 365;

const formatContributionDate = (date: Date) => {
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, "0");
	const day = String(date.getDate()).padStart(2, "0");
	return `${year}-${month}-${day}`;
};

const atNoon = (date: Date) => {
	const copy = new Date(date);
	copy.setHours(12, 0, 0, 0);
	return copy;
};

/** Sunday at or before `date`. */
const startOfWeek = (date: Date) => {
	const copy = atNoon(date);
	copy.setDate(copy.getDate() - copy.getDay());
	return copy;
};

/** Saturday at or after `date`. */
const endOfWeek = (date: Date) => {
	const copy = atNoon(date);
	copy.setDate(copy.getDate() + (6 - copy.getDay()));
	return copy;
};

export interface TrailingYearData {
	/** Full Sun–Sat weeks for the graph — every cell has a date. */
	displayDays: GithubContributionDay[];
	/** Sum over the last 365 calendar days ending today. */
	trailingYearTotal: number;
}

/** Last 365 days + week alignment so the grid has no empty leading/trailing cells. */
export const buildTrailingYearData = (
	contributions: GithubContributionDay[],
	endDate: Date = new Date()
): TrailingYearData => {
	const end = atNoon(endDate);
	const coreStart = atNoon(end);
	coreStart.setDate(coreStart.getDate() - (TRAILING_YEAR_DAY_COUNT - 1));

	const displayStart = startOfWeek(coreStart);
	const displayEnd = endOfWeek(end);

	const byDate = new Map(
		contributions
			.filter((day) => day.date)
			.map((day) => [day.date, day] as const)
	);

	const displayDays: GithubContributionDay[] = [];
	const cursor = new Date(displayStart);
	let trailingYearTotal = 0;

	while (cursor <= displayEnd) {
		const key = formatContributionDate(cursor);
		const entry = byDate.get(key) ?? { count: 0, date: key, level: 0 };
		displayDays.push(entry);

		if (cursor >= coreStart && cursor <= end) {
			trailingYearTotal += entry.count;
		}

		cursor.setDate(cursor.getDate() + 1);
	}

	return { displayDays, trailingYearTotal };
};

/** 7 rows per column; `displayDays` length must be a multiple of 7. */
export const buildContributionWeeks = (
	days: GithubContributionDay[]
): GithubContributionDay[][] => {
	if (days.length === 0) {
		return [];
	}

	const weeks: GithubContributionDay[][] = [];
	for (let index = 0; index < days.length; index += 7) {
		weeks.push(days.slice(index, index + 7));
	}
	return weeks;
};
