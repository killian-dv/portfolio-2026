import type { CSSProperties, ReactNode } from "react";

import { cn } from "#/lib/utils";

export type BoardCellPlacementAnchor =
	| "top-left"
	| "top-center"
	| "top-right"
	| "center-left"
	| "center"
	| "center-right"
	| "bottom-left"
	| "bottom-center"
	| "bottom-right";

/** Negative numbers spill into neighboring cells (slot has overflow: visible). */
export interface BoardCellPlacementOffset {
	x?: number | string;
	y?: number | string;
}

export interface BoardCellPlacementProps {
	anchor?: BoardCellPlacementAnchor;
	children: ReactNode;
	className?: string;
	offset?: BoardCellPlacementOffset;
	/** Unit for numeric offset values (strings like `"50%"` are used as-is). */
	offsetUnit?: "px" | "%";
}

const toCssLength = (
	value: number | string | undefined,
	unit: "px" | "%"
): string => {
	if (value === undefined) {
		return "0px";
	}
	if (typeof value === "string") {
		return value;
	}
	return unit === "%" ? `${value}%` : `${value}px`;
};

export const getBoardCellPlacementStyle = (
	anchor: BoardCellPlacementAnchor,
	offset: BoardCellPlacementOffset,
	offsetUnit: "px" | "%"
): CSSProperties => {
	const x = toCssLength(offset.x, offsetUnit);
	const y = toCssLength(offset.y, offsetUnit);

	const base: CSSProperties = { position: "absolute" };

	switch (anchor) {
		case "top-left":
			return { ...base, top: y, left: x };
		case "top-center":
			return {
				...base,
				top: y,
				left: `calc(50% + ${x})`,
				transform: "translateX(-50%)",
			};
		case "top-right":
			return { ...base, top: y, right: x };
		case "center-left":
			return {
				...base,
				top: `calc(50% + ${y})`,
				left: x,
				transform: "translateY(-50%)",
			};
		case "center":
			return {
				...base,
				top: `calc(50% + ${y})`,
				left: `calc(50% + ${x})`,
				transform: "translate(-50%, -50%)",
			};
		case "center-right":
			return {
				...base,
				top: `calc(50% + ${y})`,
				right: x,
				transform: "translateY(-50%)",
			};
		case "bottom-left":
			return { ...base, bottom: y, left: x };
		case "bottom-center":
			return {
				...base,
				bottom: y,
				left: `calc(50% + ${x})`,
				transform: "translateX(-50%)",
			};
		case "bottom-right":
			return { ...base, bottom: y, right: x };
		default:
			return base;
	}
};

export const BoardCellPlacement = ({
	anchor = "center",
	children,
	className,
	offset = {},
	offsetUnit = "px",
}: BoardCellPlacementProps) => (
	<div
		className={cn("z-10", className)}
		style={getBoardCellPlacementStyle(anchor, offset, offsetUnit)}
	>
		{children}
	</div>
);
