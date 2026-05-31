import { type CSSProperties, useId } from "react";

import { cn } from "#/lib/utils";

import "#/components/board/decorations/board-decorations.css";

export type BoardMarkerPenColor =
	| "blue"
	| "red"
	| "green"
	| "orange"
	| "purple"
	| "black";

/** Relative cap / barrel layout — each pose reads differently on the desk. */
export type BoardMarkerPenPose =
	| "default"
	| "flipped"
	| "dropped-cap"
	| "scattered"
	| "upright";

const BARREL_GRADIENT: Record<
	BoardMarkerPenColor,
	{ top: string; mid: string; bottom: string }
> = {
	blue: { top: "#6a7ee8", mid: "#4f63d4", bottom: "#3d4fb8" },
	red: { top: "#e86a6a", mid: "#d44f4f", bottom: "#b83d3d" },
	green: { top: "#5fc98a", mid: "#3dad6e", bottom: "#2e8f58" },
	orange: { top: "#f0a04a", mid: "#e0862e", bottom: "#c46e1a" },
	purple: { top: "#a87ee8", mid: "#8a63d4", bottom: "#6e4fb8" },
	black: { top: "#4a4f58", mid: "#32363e", bottom: "#22252a" },
};

const MARKER_WIDTH = 168;
const MARKER_HEIGHT = 52;

interface PartLayout {
	className: string;
	style?: CSSProperties;
}

interface PoseLayout {
	barrel: PartLayout;
	cap: PartLayout;
	height: number;
	width: number;
}

const MARKER_POSES: Record<BoardMarkerPenPose, PoseLayout> = {
	default: {
		width: MARKER_WIDTH,
		height: MARKER_HEIGHT,
		cap: {
			className: "absolute top-0 right-[2px] block",
			style: { transform: "rotate(11deg)", transformOrigin: "70% 50%" },
		},
		barrel: {
			className: "absolute bottom-[2px] left-0 block",
			style: { transform: "rotate(-1.5deg)", transformOrigin: "12% 50%" },
		},
	},
	flipped: {
		width: MARKER_WIDTH,
		height: MARKER_HEIGHT,
		cap: {
			className: "absolute top-[2px] left-[6px] block",
			style: { transform: "rotate(-32deg)", transformOrigin: "25% 45%" },
		},
		barrel: {
			className: "absolute right-[2px] bottom-[4px] block",
			style: {
				transform: "rotate(6deg) scaleX(-1)",
				transformOrigin: "88% 50%",
			},
		},
	},
	"dropped-cap": {
		width: MARKER_WIDTH,
		height: MARKER_HEIGHT + 18,
		cap: {
			className: "absolute top-[22px] left-[18px] block",
			style: { transform: "rotate(48deg)", transformOrigin: "50% 50%" },
		},
		barrel: {
			className: "absolute right-[8px] bottom-[2px] block",
			style: { transform: "rotate(-22deg)", transformOrigin: "18% 55%" },
		},
	},
	scattered: {
		width: MARKER_WIDTH + 12,
		height: MARKER_HEIGHT + 24,
		cap: {
			className: "absolute top-[30px] right-[8px] block",
			style: { transform: "rotate(-24deg)", transformOrigin: "55% 40%" },
		},
		barrel: {
			className: "absolute bottom-[10px] left-[20px] block",
			style: { transform: "rotate(16deg)", transformOrigin: "6% 62%" },
		},
	},
	upright: {
		width: 58,
		height: 172,
		cap: {
			className: "absolute top-[6px] left-1/2 block -translate-x-[42%]",
			style: { transform: "rotate(94deg)", transformOrigin: "50% 50%" },
		},
		barrel: {
			className: "absolute bottom-[4px] left-1/2 block -translate-x-1/2",
			style: { transform: "rotate(91deg)", transformOrigin: "50% 85%" },
		},
	},
};

interface BoardMarkerPenProps {
	className?: string;
	color?: BoardMarkerPenColor;
	pose?: BoardMarkerPenPose;
	rotationDeg?: number;
	style?: CSSProperties;
}

export const BoardMarkerPen = ({
	className,
	color = "blue",
	pose = "default",
	rotationDeg = -22,
	style,
}: BoardMarkerPenProps) => {
	const uid = useId().replace(/:/g, "");
	const capGrad = `board-marker-cap-${uid}`;
	const barrelGrad = `board-marker-barrel-${uid}`;
	const nibGrad = `board-marker-nib-${uid}`;
	const barrel = BARREL_GRADIENT[color];
	const layout = MARKER_POSES[pose];

	return (
		<div
			aria-hidden
			className={cn(
				"board-desk-object board-desk-object--static pointer-events-none absolute z-10",
				className
			)}
			style={
				{
					...style,
					"--board-desk-rotate": `${rotationDeg}deg`,
					width: layout.width,
					height: layout.height,
				} as CSSProperties
			}
		>
			{/* biome-ignore lint/a11y/noSvgWithoutTitle: decorative desk object */}
			<svg
				aria-hidden
				className={layout.cap.className}
				height={22}
				style={layout.cap.style}
				viewBox="0 0 44 22"
				width={44}
				xmlns="http://www.w3.org/2000/svg"
			>
				<defs>
					<linearGradient id={capGrad} x1="0" x2="0" y1="0" y2="1">
						<stop offset="0%" stopColor="#4a5360" />
						<stop offset="100%" stopColor="#252a32" />
					</linearGradient>
				</defs>
				<rect
					fill={`url(#${capGrad})`}
					height="16"
					rx="3"
					width="38"
					x="3"
					y="3"
				/>
				<rect fill="#1a1e24" height="16" rx="2.5" width="10" x="31" y="3" />
				<rect
					fill="rgb(255 255 255 / 0.12)"
					height="2"
					rx="1"
					width="24"
					x="6"
					y="5"
				/>
				<path
					d="M8 3 V10 C8 13 11 14 14 14"
					fill="none"
					stroke="#6b7585"
					strokeLinecap="round"
					strokeWidth="1.2"
				/>
			</svg>

			{/* biome-ignore lint/a11y/noSvgWithoutTitle: decorative desk object */}
			<svg
				aria-hidden
				className={layout.barrel.className}
				height={28}
				style={layout.barrel.style}
				viewBox="0 0 156 28"
				width={156}
				xmlns="http://www.w3.org/2000/svg"
			>
				<defs>
					<linearGradient id={barrelGrad} x1="0" x2="0" y1="0" y2="1">
						<stop offset="0%" stopColor={barrel.top} />
						<stop offset="45%" stopColor={barrel.mid} />
						<stop offset="100%" stopColor={barrel.bottom} />
					</linearGradient>
					<linearGradient id={nibGrad} x1="0" x2="1" y1="0" y2="1">
						<stop offset="0%" stopColor="#2a3038" />
						<stop offset="100%" stopColor="#15181e" />
					</linearGradient>
				</defs>

				<path d="M2 14 L14 6 L14 22 Z" fill={`url(#${nibGrad})`} />
				<path d="M4 14 L12 9 L12 19 Z" fill="#4f5a68" opacity="0.5" />

				<rect
					fill={`url(#${barrelGrad})`}
					height="18"
					rx="2"
					width="136"
					x="14"
					y="5"
				/>
				<rect
					fill="rgb(255 255 255 / 0.14)"
					height="3"
					rx="1"
					width="120"
					x="22"
					y="7"
				/>
			</svg>
		</div>
	);
};
