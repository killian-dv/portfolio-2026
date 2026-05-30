/** Footprint for the g8 grid anchor (organic spill allowed). */
export const BOARD_AI_BOOKMARKS_SECTION_WIDTH_PX = 520;
export const BOARD_AI_BOOKMARKS_SECTION_HEIGHT_PX = 400;

/** Space below the handwritten section title before papers */
export const BOARD_AI_BOOKMARKS_PAPERS_OFFSET_TOP_PX = 72;

export const BOARD_AI_BOOKMARKS_TITLE = "IA Bookmarks" as const;
export const BOARD_AI_BOOKMARKS_TITLE_LEFT_PX = 18;
export const BOARD_AI_BOOKMARKS_TITLE_TOP_PX = 8;
export const BOARD_AI_BOOKMARKS_TITLE_ROTATE_DEG = -2.6;

export const BOARD_AI_BOOKMARK_PAPER_WIDTH_PX = 140;
export const BOARD_AI_BOOKMARK_PIN_SIZE_PX = 9;

export const BOARD_AI_BOOKMARK_PAPER_SPRING = {
	type: "spring" as const,
	stiffness: 320,
	damping: 22,
	mass: 0.75,
};

/** Extra swing when hovering — pivots from the pin */
export const BOARD_AI_BOOKMARK_HOVER_SWING_DEG = 3.2;
