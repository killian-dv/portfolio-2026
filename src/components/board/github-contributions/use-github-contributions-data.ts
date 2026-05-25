import { use, useMemo } from "react";

import {
	buildContributionWeeks,
	buildTrailingYearData,
} from "#/components/board/github-contributions/build-contribution-weeks";
import {
	fetchGithubContributions,
	GITHUB_CONTRIBUTIONS_USERNAME,
	type GithubContributionsResponse,
} from "#/lib/github-contributions-api";

type GithubContributionsLoadResult =
	| { status: "ready"; response: GithubContributionsResponse }
	| { status: "error" };

let loadResultPromise: Promise<GithubContributionsLoadResult> | null = null;

const getGithubContributionsLoadResult = () => {
	loadResultPromise ??= fetchGithubContributions(GITHUB_CONTRIBUTIONS_USERNAME)
		.then((response) => ({ status: "ready" as const, response }))
		.catch(() => ({ status: "error" as const }));

	return loadResultPromise;
};

export type GithubContributionsLoadState = "ready" | "error";

export const useGithubContributionsData = () => {
	const result = use(getGithubContributionsLoadResult());

	const trailingYear = useMemo(() => {
		if (result.status !== "ready") {
			return { trailingYearTotal: 0, weeks: [] };
		}
		const { displayDays, trailingYearTotal } = buildTrailingYearData(
			result.response.contributions
		);
		return {
			trailingYearTotal,
			weeks: buildContributionWeeks(displayDays),
		};
	}, [result]);

	return {
		loadState: result.status,
		trailingYearTotal: trailingYear.trailingYearTotal,
		weeks: trailingYear.weeks,
	};
};
