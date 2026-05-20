import { BoardGridCell } from "#/components/board/board-grid-cell";
import {
	BOARD_GRID_AREAS,
	BOARD_GRID_TEMPLATE_AREAS,
	BOARD_HEIGHT_PX,
	BOARD_WIDTH_PX,
} from "#/lib/board-grid-config";

export const BoardGrid = () => (
	<div
		className="board-grid-template grid shrink-0 gap-4 p-2"
		style={{
			gridTemplateAreas: BOARD_GRID_TEMPLATE_AREAS,
			height: BOARD_HEIGHT_PX,
			width: BOARD_WIDTH_PX,
		}}
	>
		{BOARD_GRID_AREAS.map((area) => (
			<BoardGridCell area={area} key={area} />
		))}
	</div>
);
