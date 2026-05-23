/** Response shape from https://github.com/grubersjoe/github-contributions-api */
export interface GithubContributionDay {
	count: number;
	date: string;
	level: number;
}

export interface GithubContributionsResponse {
	contributions: GithubContributionDay[];
	total: Record<string, number>;
}

const API_BASE = "https://github-contributions-api.jogruber.de";

export const GITHUB_CONTRIBUTIONS_USERNAME = "killian-dv";

export async function fetchGithubContributions(
	username: string
): Promise<GithubContributionsResponse> {
	const response = await fetch(
		`${API_BASE}/v4/${encodeURIComponent(username)}`
	);

	if (!response.ok) {
		throw new Error(`GitHub contributions request failed (${response.status})`);
	}

	return response.json() as Promise<GithubContributionsResponse>;
}
