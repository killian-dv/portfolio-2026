/** Visual scale of `BoardCanvas` below Tailwind `md` (768px). */
export const BOARD_CANVAS_MOBILE_LAYOUT_SCALE = 0.82;

/** Tailwind `md` min-width — keep in sync with `md:scale-100` on BoardCanvas. */
export const BOARD_MD_MIN_WIDTH_PX = 768;

export const getBoardCanvasLayoutScale = (
	viewportWidth: number = typeof window === "undefined"
		? BOARD_MD_MIN_WIDTH_PX
		: window.innerWidth
) =>
	viewportWidth >= BOARD_MD_MIN_WIDTH_PX ? 1 : BOARD_CANVAS_MOBILE_LAYOUT_SCALE;

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

/** One column or row step on the board (cell size + gap). */
export const BOARD_CELL_STEP_PX = BOARD_CELL_SIZE_PX + BOARD_GRID_GAP_PX;

/**
 * Pixel offset by whole grid steps. Use negative values to spill into a neighbor cell
 * (e.g. a paper clip between two widgets: anchor the right cell, offset x: boardCellOffset(-0.5).x).
 */
export const boardCellOffset = (cols = 0, rows = 0) => ({
	x: cols * BOARD_CELL_STEP_PX,
	y: rows * BOARD_CELL_STEP_PX,
});

/** Hero zone — 2×2 cells in the center (rows 2–3, cols 3–4). Do not split. */
export const BOARD_BLANK_REGION = {
	rowStart: 2,
	rowEnd: 4,
	colStart: 3,
	colEnd: 5,
} as const;

export const BLANK_GRID_AREA = "blank" as const;

const isBlankCell = (row: number, col: number) =>
	row >= BOARD_BLANK_REGION.rowStart &&
	row < BOARD_BLANK_REGION.rowEnd &&
	col >= BOARD_BLANK_REGION.colStart &&
	col < BOARD_BLANK_REGION.colEnd;

/** One grid square → area name (`r{row}c{col}`). Blank region → `"blank"`. */
export const boardCell = (row: number, col: number) => {
	if (isBlankCell(row, col)) {
		return BLANK_GRID_AREA;
	}
	return `r${row}c${col}` as const;
};

const buildGridTemplateRows = () =>
	Array.from({ length: BOARD_GRID_ROWS }, (_, row) =>
		Array.from({ length: BOARD_GRID_COLS }, (_, col) =>
			boardCell(row, col)
		).join(" ")
	);

/** Each string is one grid row (8 named areas, one per square except merged `blank`). */
export const BOARD_GRID_TEMPLATE_ROWS = buildGridTemplateRows() as [
	string,
	string,
	string,
	string,
	string,
	string,
];

/** Quoted rows required by CSS grid-template-areas */
export const BOARD_GRID_TEMPLATE_AREAS = BOARD_GRID_TEMPLATE_ROWS.map(
	(row) => `"${row}"`
).join(" ");

export const BOARD_GRID_AREAS = [
	...new Set(BOARD_GRID_TEMPLATE_ROWS.join(" ").split(/\s+/)),
] as const;

export type BoardGridArea = (typeof BOARD_GRID_AREAS)[number];
