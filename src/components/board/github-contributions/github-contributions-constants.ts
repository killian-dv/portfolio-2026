export const GITHUB_PROFILE_URL = "https://github.com/killian-dv";

/** Fixed horizontal card — does not stretch with the grid cell. */
export const GITHUB_CONTRIBUTIONS_CARD_WIDTH_PX = 732;
export const GITHUB_CONTRIBUTIONS_CARD_HEIGHT_PX = 188;

export const GITHUB_CONTRIBUTIONS_CELL_SIZE_PX = 10;
export const GITHUB_CONTRIBUTIONS_CELL_GAP_PX = 3;

export const GITHUB_CONTRIBUTIONS_GLOW_SPRING = {
	stiffness: 180,
	damping: 26,
	mass: 0.8,
};

export const GITHUB_CONTRIBUTIONS_CELL_SPRING = {
	type: "spring" as const,
	stiffness: 420,
	damping: 28,
	mass: 0.55,
};

/** Premium emerald / mint — levels 1–4, not GitHub greens. */
export const GITHUB_CONTRIBUTION_LEVEL_COLORS = [
	"#c8ebe0",
	"#8fd9c4",
	"#4fbf9a",
	"#1f9d72",
] as const;

export const GITHUB_CONTRIBUTION_EMPTY_COLOR = "#f3f5f4";
