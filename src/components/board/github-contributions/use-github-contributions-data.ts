import { useEffect, useMemo, useState } from "react";

import {
	buildContributionWeeks,
	buildTrailingYearData,
} from "#/components/board/github-contributions/build-contribution-weeks";
import {
	fetchGithubContributions,
	GITHUB_CONTRIBUTIONS_USERNAME,
	type GithubContributionsResponse,
} from "#/lib/github-contributions-api";

type LoadState = "idle" | "loading" | "ready" | "error";

export const useGithubContributionsData = () => {
	const [loadState, setLoadState] = useState<LoadState>("idle");
	const [response, setResponse] = useState<GithubContributionsResponse | null>(
		null
	);

	useEffect(() => {
		let cancelled = false;

		const load = async () => {
			setLoadState("loading");
			try {
				const data = await fetchGithubContributions(
					GITHUB_CONTRIBUTIONS_USERNAME
				);
				if (!cancelled) {
					setResponse(data);
					setLoadState("ready");
				}
			} catch {
				if (!cancelled) {
					setLoadState("error");
				}
			}
		};

		load();

		return () => {
			cancelled = true;
		};
	}, []);

	const trailingYear = useMemo(() => {
		if (!response) {
			return { trailingYearTotal: 0, weeks: [] };
		}
		const { displayDays, trailingYearTotal } = buildTrailingYearData(
			response.contributions
		);
		return {
			trailingYearTotal,
			weeks: buildContributionWeeks(displayDays),
		};
	}, [response]);

	return {
		loadState,
		trailingYearTotal: trailingYear.trailingYearTotal,
		weeks: trailingYear.weeks,
	};
};
