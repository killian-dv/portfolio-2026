import type { MotionValue } from "motion/react";
import { motion } from "motion/react";

import { NVIDIA_GREEN } from "#/components/board/stock-chart/stock-chart-constants";

interface StockChartActivePointProps {
	activeX: MotionValue<number>;
	activeY: MotionValue<number>;
	cursorOpacity: MotionValue<number>;
}

export const StockChartActivePoint = ({
	activeX,
	activeY,
	cursorOpacity,
}: StockChartActivePointProps) => (
	<motion.g style={{ opacity: cursorOpacity }}>
		<motion.circle
			cx={activeX}
			cy={activeY}
			fill={`${NVIDIA_GREEN}44`}
			r={14}
			style={{ filter: "blur(8px)" }}
		/>
		<motion.circle
			animate={{ scale: [1, 1.08, 1] }}
			cx={activeX}
			cy={activeY}
			fill={NVIDIA_GREEN}
			r={5}
			stroke="rgba(255,255,255,0.25)"
			strokeWidth={1}
			transition={{
				scale: {
					duration: 2,
					repeat: Number.POSITIVE_INFINITY,
					ease: "easeInOut",
				},
			}}
		/>
		<motion.circle cx={activeX} cy={activeY} fill="white" r={1.5} />
	</motion.g>
);
