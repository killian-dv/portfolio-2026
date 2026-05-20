import type { ComponentProps } from "react";

import { cn } from "#/lib/utils";

interface BoardFrameCornerProps extends ComponentProps<"svg"> {
	position: "top-left" | "top-right" | "bottom-left" | "bottom-right";
}

const positionClassName: Record<BoardFrameCornerProps["position"], string> = {
	"top-left": "absolute -top-[7px] -left-[7px]",
	"top-right": "absolute -top-[7px] -right-[7px]",
	"bottom-left": "absolute -bottom-[7px] -left-[7px]",
	"bottom-right": "absolute -bottom-[7px] -right-[7px]",
};

export const BoardFrameCorner = ({
	position,
	className,
	...props
}: BoardFrameCornerProps) => (
	<svg
		aria-hidden="true"
		className={cn(positionClassName[position], className)}
		fill="none"
		height="12"
		role="presentation"
		viewBox="0 0 12 12"
		width="12"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	>
		<rect
			fill="white"
			height="10.8"
			stroke="#0C8CE8"
			strokeWidth="1"
			width="10.8"
			x="0.6"
			y="0.6"
		/>
	</svg>
);
