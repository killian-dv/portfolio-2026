import { describe, expect, it } from "vitest";

import {
	buildContributionWeeks,
	buildTrailingYearData,
	isFutureContributionSlot,
} from "#/components/board/github-contributions/build-contribution-weeks";
import type { GithubContributionDay } from "#/lib/github-contributions-api";

const day = (date: string, count = 0): GithubContributionDay => ({
	count,
	date,
	level: count > 0 ? 1 : 0,
});

describe("buildTrailingYearData", () => {
	it("does not include days after endDate", () => {
		const endDate = new Date(2026, 4, 25); // Sunday 25 May 2026
		const contributions = [day("2026-05-20", 2), day("2026-05-25", 1)];

		const { displayDays } = buildTrailingYearData(contributions, endDate);
		const last = displayDays.at(-1);

		expect(last?.date).toBe("2026-05-25");
		expect(displayDays.some((entry) => entry.date > "2026-05-25")).toBe(false);
	});
});

describe("buildContributionWeeks", () => {
	it("pads the current week with future slots for upcoming weekdays", () => {
		const weeks = buildContributionWeeks([
			day("2026-05-24"),
			day("2026-05-25"),
		]);

		expect(weeks).toHaveLength(1);
		expect(weeks[0]).toHaveLength(7);
		expect(
			weeks[0]?.slice(0, 2).every((cell) => !isFutureContributionSlot(cell))
		).toBe(true);
		expect(
			weeks[0]?.slice(2).every((cell) => isFutureContributionSlot(cell))
		).toBe(true);
		expect(weeks[0]?.[2]).toEqual({
			kind: "future",
			slotId: "2026-05-24-tue",
		});
	});
});
