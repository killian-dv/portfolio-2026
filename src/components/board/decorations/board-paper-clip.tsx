import { type CSSProperties, useId } from "react";

import { cn } from "#/lib/utils";

import "#/components/board/decorations/board-decorations.css";

interface BoardPaperClipProps {
	className?: string;
	rotationDeg?: number;
	/** Rendered height in px */
	size?: number;
	style?: CSSProperties;
}

/** Centered wire path — outer loop + inner loop, one continuous stroke */
const PAPER_CLIP_WIRE_PATH =
	"M 27 9" +
	" C 32.5 9 35 14 35 21" +
	" L 35 55" +
	" C 35 69 26.5 77 20 77" +
	" C 13.5 77 5 69 5 59" +
	" L 5 21" +
	" C 5 11.5 11.5 6 19 6" +
	" C 22.5 6 25 8.5 25 13" +
	" L 25 51" +
	" C 25 57.5 21 61.5 17 61.5" +
	" C 13 61.5 11 57.5 11 53.5" +
	" L 11 17" +
	" C 11 12.5 13.5 10 16.5 10" +
	" C 18.5 10 19.5 11.5 19.5 14.5" +
	" L 19.5 34";

const CLIP_VIEWBOX_WIDTH = 40;
const CLIP_VIEWBOX_HEIGHT = 88;

export const BoardPaperClip = ({
	className,
	rotationDeg = -12,
	size = 44,
	style,
}: BoardPaperClipProps) => {
	const uid = useId().replace(/:/g, "");
	const metalId = `board-paper-clip-metal-${uid}`;
	const shineId = `board-paper-clip-shine-${uid}`;
	const width = (size * CLIP_VIEWBOX_WIDTH) / CLIP_VIEWBOX_HEIGHT;

	return (
		// biome-ignore lint/a11y/noSvgWithoutTitle: decorative desk object
		<svg
			aria-hidden
			className={cn(
				"board-desk-object board-desk-object--static block shrink-0",
				className
			)}
			height={size}
			style={
				{
					...style,
					"--board-desk-rotate": `${rotationDeg}deg`,
				} as CSSProperties
			}
			viewBox={`0 0 ${CLIP_VIEWBOX_WIDTH} ${CLIP_VIEWBOX_HEIGHT}`}
			width={width}
			xmlns="http://www.w3.org/2000/svg"
		>
			<defs>
				<linearGradient
					gradientUnits="userSpaceOnUse"
					id={metalId}
					x1="10"
					x2="30"
					y1="4"
					y2="84"
				>
					<stop offset="0%" stopColor="#c8cdd4" />
					<stop offset="35%" stopColor="#9aa3ae" />
					<stop offset="70%" stopColor="#7d8794" />
					<stop offset="100%" stopColor="#a8b0b9" />
				</linearGradient>
				<linearGradient
					gradientUnits="userSpaceOnUse"
					id={shineId}
					x1="24"
					x2="16"
					y1="0"
					y2="88"
				>
					<stop offset="0%" stopColor="rgb(255 255 255 / 0.55)" />
					<stop offset="45%" stopColor="rgb(255 255 255 / 0)" />
				</linearGradient>
			</defs>

			<path
				d={PAPER_CLIP_WIRE_PATH}
				fill="none"
				stroke={`url(#${metalId})`}
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="2.6"
			/>

			<path
				d={PAPER_CLIP_WIRE_PATH}
				fill="none"
				opacity="0.45"
				stroke={`url(#${shineId})`}
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="1"
			/>

			<ellipse cx="20" cy="82" fill="rgb(0 0 0 / 0.08)" rx="10" ry="2" />
		</svg>
	);
};
