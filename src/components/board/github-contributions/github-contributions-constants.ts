export const GITHUB_PROFILE_URL = "https://github.com/killian-dv";

/** Fixed horizontal card — does not stretch with the grid cell. */
export const GITHUB_CONTRIBUTIONS_CARD_WIDTH_PX = 732;
export const GITHUB_CONTRIBUTIONS_CARD_HEIGHT_PX = 188;

export const GITHUB_CONTRIBUTIONS_CELL_SIZE_PX = 10;
export const GITHUB_CONTRIBUTIONS_CELL_GAP_PX = 3;

export const GITHUB_CONTRIBUTIONS_GLOW_SPRING = {
	damping: 26,
	mass: 0.8,
	stiffness: 180,
};

export const GITHUB_CONTRIBUTIONS_CELL_SPRING = {
	damping: 28,
	mass: 0.55,
	stiffness: 420,
	type: "spring" as const,
};

/**
 * Premium emerald / mint — levels 1–4, not GitHub greens.
 * Level 3–4 align with `--board-github-accent` / `--board-github-accent-deep` in styles.css.
 */
export const GITHUB_CONTRIBUTION_LEVEL_COLORS = [
	"#c8ebe0",
	"#8fd9c4",
	"#4fbf9a",
	"#1f9d72",
] as const;

export const GITHUB_CONTRIBUTION_EMPTY_COLOR = "#f3f5f4";
