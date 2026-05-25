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

export interface TrailingYearData {
	/** Sun–Sat grid days through today; leading week padding may be empty (level 0). */
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

	const byDate = new Map(
		contributions
			.filter((day) => day.date)
			.map((day) => [day.date, day] as const)
	);

	const displayDays: GithubContributionDay[] = [];
	const cursor = new Date(displayStart);
	let trailingYearTotal = 0;

	while (cursor <= end) {
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

const WEEKDAY_KEYS = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"] as const;

export interface FutureContributionSlot {
	kind: "future";
	slotId: string;
}

/** A week column slot: contribution day or empty (future days in the current week). */
export type ContributionWeekCell =
	| GithubContributionDay
	| FutureContributionSlot;

export const isFutureContributionSlot = (
	cell: ContributionWeekCell
): cell is FutureContributionSlot => "kind" in cell && cell.kind === "future";

export const getWeekColumnKey = (week: ContributionWeekCell[]): string => {
	const sunday = week[0];
	if (sunday && !isFutureContributionSlot(sunday)) {
		return `week-${sunday.date}`;
	}
	return "week-unknown";
};

/** Seven rows per column (Sun–Sat); the current week may end with future slots. */
export const buildContributionWeeks = (
	days: GithubContributionDay[]
): ContributionWeekCell[][] => {
	if (days.length === 0) {
		return [];
	}

	const weeks: ContributionWeekCell[][] = [];
	for (let index = 0; index < days.length; index += 7) {
		const week: ContributionWeekCell[] = days.slice(index, index + 7);
		const firstDay = week[0];
		const weekSunday =
			firstDay && !isFutureContributionSlot(firstDay)
				? firstDay.date
				: undefined;
		while (week.length < 7 && weekSunday) {
			const weekday = WEEKDAY_KEYS[week.length];
			week.push({
				kind: "future",
				slotId: `${weekSunday}-${weekday}`,
			});
		}
		weeks.push(week);
	}
	return weeks;
};
