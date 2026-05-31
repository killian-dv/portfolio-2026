import type { CSSProperties } from "react";

import {
	BoardPushPin,
	type BoardPushPinColor,
} from "#/components/board/decorations/board-push-pin";
import { cn } from "#/lib/utils";

interface ClusterPin {
	color: BoardPushPinColor;
	left: number;
	rotateDeg: number;
	size: number;
	top: number;
	zIndex: number;
}

const CLUSTER_PINS: ClusterPin[] = [
	{ color: "red", left: 4, top: 18, rotateDeg: -14, size: 17, zIndex: 4 },
	{ color: "blue", left: 28, top: 8, rotateDeg: 6, size: 19, zIndex: 6 },
	{ color: "yellow", left: 52, top: 22, rotateDeg: -5, size: 16, zIndex: 3 },
	{ color: "green", left: 18, top: 38, rotateDeg: 12, size: 18, zIndex: 5 },
	{ color: "orange", left: 44, top: 42, rotateDeg: -9, size: 17, zIndex: 2 },
	{ color: "purple", left: 66, top: 14, rotateDeg: 4, size: 16, zIndex: 7 },
	{ color: "white", left: 36, top: 28, rotateDeg: -3, size: 15, zIndex: 1 },
];

interface BoardPushPinClusterProps {
	className?: string;
	style?: CSSProperties;
}

export const BoardPushPinCluster = ({
	className,
	style,
}: BoardPushPinClusterProps) => (
	<div
		aria-hidden
		className={cn(
			"board-desk-object board-desk-object--nudge-hover pointer-events-auto absolute z-10",
			className
		)}
		style={{ width: 88, height: 64, ...style }}
	>
		{CLUSTER_PINS.map((pin) => (
			<BoardPushPin
				className="absolute"
				color={pin.color}
				key={`${pin.color}-${pin.left}-${pin.top}`}
				size={pin.size}
				style={{
					left: pin.left,
					top: pin.top,
					zIndex: pin.zIndex,
					transform: `rotate(${pin.rotateDeg}deg)`,
				}}
			/>
		))}
	</div>
);
