import type { BoardGridArea } from "#/lib/board-grid-config";
import { cn } from "#/lib/utils";

interface BoardGridCellProps {
	area: BoardGridArea;
}

export const BoardGridCell = ({ area }: BoardGridCellProps) => (
	<div
		className={cn(
			"relative h-full w-full overflow-visible rounded-xl",
			area === "blank" && "bg-transparent"
		)}
		data-area={area}
		style={{ gridArea: area }}
	/>
);
