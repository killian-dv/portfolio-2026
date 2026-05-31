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

export type BoardPushPinClusterVariant = "scatter-a" | "scatter-b";

/** Pins laid out loosely — varied angles and spacing, not a uniform pile. */
const CLUSTER_PINS_BY_VARIANT: Record<
	BoardPushPinClusterVariant,
	ClusterPin[]
> = {
	"scatter-a": [
		{ color: "red", left: -2, top: 48, rotateDeg: -44, size: 16, zIndex: 2 },
		{ color: "blue", left: 34, top: 0, rotateDeg: 31, size: 18, zIndex: 6 },
		{ color: "yellow", left: 70, top: 52, rotateDeg: -38, size: 17, zIndex: 3 },
		{ color: "green", left: 96, top: 14, rotateDeg: 52, size: 15, zIndex: 7 },
		{ color: "orange", left: 14, top: 18, rotateDeg: -19, size: 19, zIndex: 4 },
		{ color: "purple", left: 52, top: 34, rotateDeg: 41, size: 14, zIndex: 5 },
		{ color: "white", left: 40, top: 6, rotateDeg: -27, size: 16, zIndex: 1 },
	],
	"scatter-b": [
		{ color: "purple", left: 8, top: 4, rotateDeg: 36, size: 15, zIndex: 6 },
		{ color: "orange", left: 82, top: 46, rotateDeg: -51, size: 17, zIndex: 3 },
		{ color: "blue", left: 44, top: 50, rotateDeg: 22, size: 18, zIndex: 4 },
		{ color: "white", left: 64, top: 18, rotateDeg: -14, size: 16, zIndex: 2 },
		{ color: "green", left: 0, top: 32, rotateDeg: -33, size: 17, zIndex: 5 },
		{ color: "red", left: 26, top: 44, rotateDeg: 48, size: 16, zIndex: 7 },
		{ color: "yellow", left: 58, top: 2, rotateDeg: -42, size: 14, zIndex: 1 },
	],
};

const clusterBounds = (pins: ClusterPin[]) => {
	let maxRight = 0;
	let maxBottom = 0;
	for (const pin of pins) {
		maxRight = Math.max(maxRight, pin.left + pin.size + 4);
		maxBottom = Math.max(maxBottom, pin.top + pin.size + 6);
	}
	return {
		width: Math.max(maxRight, 100),
		height: Math.max(maxBottom, 68),
	};
};

interface BoardPushPinClusterProps {
	className?: string;
	rotationDeg?: number;
	style?: CSSProperties;
	variant?: BoardPushPinClusterVariant;
}

export const BoardPushPinCluster = ({
	className,
	rotationDeg = 0,
	style,
	variant = "scatter-a",
}: BoardPushPinClusterProps) => {
	const pins = CLUSTER_PINS_BY_VARIANT[variant];
	const { width, height } = clusterBounds(pins);

	return (
		<div
			aria-hidden
			className={cn(
				"board-desk-object board-desk-object--static pointer-events-none absolute z-10",
				className
			)}
			style={
				{
					width,
					height,
					...style,
					"--board-desk-rotate": `${rotationDeg}deg`,
				} as CSSProperties
			}
		>
			{pins.map((pin) => (
				<BoardPushPin
					className="absolute"
					color={pin.color}
					key={`${variant}-${pin.color}-${pin.left}-${pin.top}`}
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
};
