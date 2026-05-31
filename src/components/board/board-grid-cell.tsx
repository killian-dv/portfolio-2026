import { BOARD_CELL_CONTENT } from "#/components/board/board-cell-registry";
import { BoardCellSlot } from "#/components/board/board-cell-slot";
import type { BoardGridArea } from "#/lib/board-grid-config";

interface BoardGridCellProps {
	area: BoardGridArea;
}

export const BoardGridCell = ({ area }: BoardGridCellProps) => {
	const entry = BOARD_CELL_CONTENT[area];
	if (!entry) {
		return <BoardCellSlot area={area} />;
	}

	return (
		<BoardCellSlot area={area} {...entry.slot}>
			{entry.children}
		</BoardCellSlot>
	);
};
