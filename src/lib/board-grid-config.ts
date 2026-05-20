export const BOARD_CELL_SIZE_PX = 360;
export const BOARD_GRID_COLS = 8;
export const BOARD_GRID_ROWS = 6;
export const BOARD_GRID_GAP_PX = 16;
export const BOARD_GRID_PADDING_PX = 8;

export const BOARD_WIDTH_PX =
	BOARD_GRID_COLS * BOARD_CELL_SIZE_PX +
	(BOARD_GRID_COLS - 1) * BOARD_GRID_GAP_PX +
	BOARD_GRID_PADDING_PX * 2;

export const BOARD_HEIGHT_PX =
	BOARD_GRID_ROWS * BOARD_CELL_SIZE_PX +
	(BOARD_GRID_ROWS - 1) * BOARD_GRID_GAP_PX +
	BOARD_GRID_PADDING_PX * 2;

/** Each string is one grid row (8 named areas). */
export const BOARD_GRID_TEMPLATE_ROWS = [
	"g1 g2 g3 g30 g30 g6 g7 g7",
	"g4 g29 g31 g28 g28 g8 g36 g37",
	"g9 g11 g42 blank blank g17 g17 g14",
	"g15 g10 g16 blank blank g17 g17 g18",
	"g44 g20 g40 g21 g21 g23 g26 g24",
	"g33 g25 g39 g22 g22 g34 g35 g35",
] as const;

/** Quoted rows required by CSS grid-template-areas */
export const BOARD_GRID_TEMPLATE_AREAS = BOARD_GRID_TEMPLATE_ROWS.map(
	(row) => `"${row}"`
).join(" ");

export const BOARD_GRID_AREAS = [
	...new Set(BOARD_GRID_TEMPLATE_ROWS.join(" ").split(/\s+/)),
] as const;

export type BoardGridArea = (typeof BOARD_GRID_AREAS)[number];
