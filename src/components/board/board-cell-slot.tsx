import type { ReactNode } from "react";

import type { BoardGridArea } from "#/lib/board-grid-config";
import { cn } from "#/lib/utils";

export interface BoardCellSlotProps {
	area: BoardGridArea;
	children?: ReactNode;
	className?: string;
	clickable?: boolean;
	pointerEvents?: "none" | "auto";
	zIndex?: number;
}

export const BoardCellSlot = ({
	area,
	children,
	className,
	clickable = false,
	pointerEvents,
	zIndex,
}: BoardCellSlotProps) => (
	<div
		className={cn(
			"relative h-full w-full overflow-visible rounded-xl",
			pointerEvents === "none" && "pointer-events-none",
			className
		)}
		data-area={area}
		data-clickable={clickable ? "true" : "false"}
		style={{
			gridArea: area,
			...(zIndex === undefined ? {} : { zIndex }),
		}}
	>
		{children}
	</div>
);
