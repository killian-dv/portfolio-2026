import type { MotionValue } from "motion/react";
import { motion } from "motion/react";

interface StockChartCursorProps {
	chartHeight: number;
	clipId: string;
	cursorLineX: MotionValue<number>;
	cursorOpacity: MotionValue<number>;
}

export const StockChartCursor = ({
	chartHeight,
	clipId,
	cursorLineX,
	cursorOpacity,
}: StockChartCursorProps) => (
	<motion.line
		stroke={`url(#cursor-line-${clipId})`}
		strokeWidth={1}
		style={{
			filter: "blur(0.4px)",
			opacity: cursorOpacity,
		}}
		x1={cursorLineX}
		x2={cursorLineX}
		y1={0}
		y2={chartHeight}
	/>
);
