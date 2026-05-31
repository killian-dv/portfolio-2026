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

interface BoardMarkerPenProps {
	className?: string;
	color?: BoardMarkerPenColor;
	rotationDeg?: number;
	style?: CSSProperties;
}

const MARKER_WIDTH = 168;
const MARKER_HEIGHT = 52;

export const BoardMarkerPen = ({
	className,
	color = "blue",
	rotationDeg = -22,
	style,
}: BoardMarkerPenProps) => {
	const uid = useId().replace(/:/g, "");
	const capGrad = `board-marker-cap-${uid}`;
	const barrelGrad = `board-marker-barrel-${uid}`;
	const gripGrad = `board-marker-grip-${uid}`;
	const nibGrad = `board-marker-nib-${uid}`;
	const barrel = BARREL_GRADIENT[color];

	return (
		<div
			aria-hidden
			className={cn(
				"board-desk-object board-desk-object--nudge-hover pointer-events-auto absolute z-10",
				className
			)}
			style={
				{
					...style,
					"--board-desk-rotate": `${rotationDeg}deg`,
					width: MARKER_WIDTH,
					height: MARKER_HEIGHT,
				} as CSSProperties
			}
		>
			{/* biome-ignore lint/a11y/noSvgWithoutTitle: decorative desk object */}
			<svg
				aria-hidden
				className="absolute top-0 right-[2px] block"
				height={22}
				style={{ transform: "rotate(11deg)", transformOrigin: "70% 50%" }}
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
				className="absolute bottom-[2px] left-0 block"
				height={28}
				style={{ transform: "rotate(-1.5deg)", transformOrigin: "12% 50%" }}
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
					<linearGradient id={gripGrad} x1="0" x2="1" y1="0" y2="0">
						<stop offset="0%" stopColor="#1a1e26" />
						<stop offset="100%" stopColor="#2e3540" />
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
					width="88"
					x="14"
					y="5"
				/>
				<rect
					fill="rgb(255 255 255 / 0.14)"
					height="3"
					rx="1"
					width="72"
					x="22"
					y="7"
				/>

				<rect
					fill={`url(#${gripGrad})`}
					height="18"
					rx="2"
					width="48"
					x="102"
					y="5"
				/>
				<line
					stroke="rgb(255 255 255 / 0.07)"
					strokeWidth="0.8"
					x1="108"
					x2="108"
					y1="8"
					y2="20"
				/>
				<line
					stroke="rgb(255 255 255 / 0.07)"
					strokeWidth="0.8"
					x1="115"
					x2="115"
					y1="8"
					y2="20"
				/>
				<line
					stroke="rgb(255 255 255 / 0.07)"
					strokeWidth="0.8"
					x1="122"
					x2="122"
					y1="8"
					y2="20"
				/>
				<line
					stroke="rgb(255 255 255 / 0.07)"
					strokeWidth="0.8"
					x1="129"
					x2="129"
					y1="8"
					y2="20"
				/>
				<line
					stroke="rgb(255 255 255 / 0.07)"
					strokeWidth="0.8"
					x1="136"
					x2="136"
					y1="8"
					y2="20"
				/>
				<line
					stroke="rgb(255 255 255 / 0.07)"
					strokeWidth="0.8"
					x1="143"
					x2="143"
					y1="8"
					y2="20"
				/>

				<rect fill="#8e96a8" height="18" rx="1" width="4" x="150" y="5" />
			</svg>
		</div>
	);
};
