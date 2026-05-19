import { BoardGridCell } from "#/components/board/board-grid-cell";
import {
	BOARD_GRID_AREAS,
	BOARD_GRID_TEMPLATE_AREAS,
} from "#/lib/board-grid-config";

export const BoardGrid = () => (
	<div
		className="board-grid-template grid min-h-0 min-w-0 gap-4 p-2"
		style={{ gridTemplateAreas: BOARD_GRID_TEMPLATE_AREAS }}
	>
		{BOARD_GRID_AREAS.map((area) => (
			<BoardGridCell area={area} key={area} />
		))}
	</div>
);
