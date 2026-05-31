import type { ReactNode } from "react";

import type { BoardGridArea } from "#/lib/board-grid-config";
import { cn } from "#/lib/utils";

export interface BoardCellSlotProps {
	area: BoardGridArea;
	children?: ReactNode;
	className?: string;
}

export const BoardCellSlot = ({
	area,
	children,
	className,
}: BoardCellSlotProps) => (
	<div
		className={cn(
			"relative h-full w-full overflow-visible rounded-xl",
			className
		)}
		data-area={area}
		style={{ gridArea: area }}
	>
		{children}
	</div>
);
