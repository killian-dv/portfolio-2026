import type { CSSProperties } from "react";

import { cn } from "#/lib/utils";

export type BoardPushPinColor =
	| "red"
	| "blue"
	| "yellow"
	| "green"
	| "orange"
	| "purple"
	| "white";

const PIN_HEAD: Record<BoardPushPinColor, string> = {
	red: "var(--board-pin-red)",
	blue: "#3d6eb5",
	yellow: "#d4a82a",
	green: "#4a8f5c",
	orange: "#d97a32",
	purple: "#7a52b8",
	white: "#e8eaee",
};

interface BoardPushPinProps {
	className?: string;
	color?: BoardPushPinColor;
	interactive?: boolean;
	size?: number;
	style?: CSSProperties;
}

export const BoardPushPin = ({
	className,
	color = "red",
	interactive = false,
	size = 14,
	style,
}: BoardPushPinProps) => {
	const head = PIN_HEAD[color];

	return (
		// biome-ignore lint/a11y/noSvgWithoutTitle: decorative desk object
		<svg
			aria-hidden
			className={cn(
				"board-desk-tack block shrink-0",
				interactive &&
					"transition-transform duration-200 ease-out hover:-translate-y-px hover:rotate-[2deg]",
				className
			)}
			height={size}
			style={style}
			viewBox="0 0 14 18"
			width={size}
			xmlns="http://www.w3.org/2000/svg"
		>
			<ellipse cx="7" cy="5.5" fill={head} rx="5.2" ry="4.8" />
			<ellipse
				cx="7"
				cy="4.6"
				fill={
					color === "white"
						? "rgb(255 255 255 / 0.9)"
						: "rgb(255 255 255 / 0.28)"
				}
				rx="2.4"
				ry="1.4"
			/>
			{color === "white" ? (
				<ellipse
					cx="7"
					cy="5.5"
					fill="none"
					rx="5.2"
					ry="4.8"
					stroke="rgb(0 0 0 / 0.08)"
					strokeWidth="0.6"
				/>
			) : null}
			<line
				stroke="rgb(0 0 0 / 0.35)"
				strokeLinecap="round"
				strokeWidth="0.9"
				x1="7"
				x2="7"
				y1="9.5"
				y2="17"
			/>
		</svg>
	);
};
