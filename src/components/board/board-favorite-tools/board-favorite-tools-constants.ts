/** Footprint for the g36 grid anchor (spills into g37). */
export const BOARD_FAVORITE_TOOLS_SECTION_WIDTH_PX = 736;
export const BOARD_FAVORITE_TOOLS_SECTION_HEIGHT_PX = 480;

export const BOARD_FAVORITE_TOOLS_TITLE = "Favorite tools" as const;

export const BOARD_FAVORITE_TOOL_ICON_BOX_PX = 26;
export const BOARD_FAVORITE_TOOL_STICKER_SIZE_PX = 48;

export const BOARD_FAVORITE_TOOL_MAGNETIC_MAX_PX = 12;
export const BOARD_FAVORITE_TOOL_MAGNETIC_RADIUS_PX = 168;
/** Fade pull to zero near pointer center — avoids direction flipping. */
export const BOARD_FAVORITE_TOOL_MAGNETIC_DEAD_ZONE_PX = 16;

export const BOARD_FAVORITE_TOOL_ANNOTATION_Z_INDEX = 80;

export const BOARD_FAVORITE_TOOL_SPRING = {
	damping: 26,
	mass: 0.75,
	stiffness: 320,
	type: "spring" as const,
};

export const BOARD_FAVORITE_TOOL_MAGNETIC_SPRING = {
	damping: 18,
	mass: 0.55,
	stiffness: 220,
};

export const BOARD_FAVORITE_TOOL_ZONE_SPRING = {
	damping: 28,
	mass: 0.9,
	stiffness: 180,
};
