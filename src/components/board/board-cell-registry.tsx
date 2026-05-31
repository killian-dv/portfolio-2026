import type { ReactNode } from "react";

import { BoardCellPlacement } from "#/components/board/board-cell-placement";
import type { BoardCellSlotProps } from "#/components/board/board-cell-slot";
import {
	BOARD_LAYOUT,
	type BoardLayoutItem,
} from "#/components/board/board-layout";
import { type BoardGridArea, boardCell } from "#/lib/board-grid-config";

export interface BoardCellRegistryEntry {
	children: ReactNode;
	slot?: Omit<BoardCellSlotProps, "area" | "children">;
}

const mergeSlotOptions = (
	a?: BoardCellRegistryEntry["slot"],
	b?: BoardCellRegistryEntry["slot"]
): BoardCellRegistryEntry["slot"] => {
	if (!a) {
		return b;
	}
	if (!b) {
		return a;
	}
	return {
		...a,
		...b,
		zIndex: Math.max(a.zIndex ?? 0, b.zIndex ?? 0) || undefined,
	};
};

const wrapItem = (item: BoardLayoutItem): ReactNode => {
	if (!item.placement) {
		return item.content;
	}
	return (
		<BoardCellPlacement {...item.placement}>{item.content}</BoardCellPlacement>
	);
};

const buildBoardCellContent = (): Partial<
	Record<BoardGridArea, BoardCellRegistryEntry>
> => {
	const map: Partial<Record<BoardGridArea, BoardCellRegistryEntry>> = {};

	for (const item of BOARD_LAYOUT) {
		const area =
			"area" in item.at ? item.at.area : boardCell(item.at.row, item.at.col);
		const child = wrapItem(item);

		const existing = map[area];
		if (existing) {
			map[area] = {
				slot: mergeSlotOptions(existing.slot, item.slot),
				children: (
					<>
						{existing.children}
						{child}
					</>
				),
			};
			continue;
		}

		map[area] = {
			children: child,
			slot: item.slot,
		};
	}

	return map;
};

/** Built from `BOARD_LAYOUT` — edit positions in board-layout.tsx. */
export const BOARD_CELL_CONTENT = buildBoardCellContent();
