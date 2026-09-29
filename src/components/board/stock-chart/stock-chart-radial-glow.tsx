import type { MotionValue } from "motion/react";
import { motion, useMotionTemplate } from "motion/react";

import { NVIDIA_GREEN } from "#/components/board/stock-chart/stock-chart-constants";

interface StockChartRadialGlowProps {
	activeX: MotionValue<number>;
	activeY: MotionValue<number>;
	cursorOpacity: MotionValue<number>;
}

export const StockChartRadialGlow = ({
	activeX,
	activeY,
	cursorOpacity,
}: StockChartRadialGlowProps) => {
	const glowX = useMotionTemplate`${activeX}px`;
	const glowY = useMotionTemplate`${activeY}px`;

	return (
		<motion.div
			aria-hidden
			className="pointer-events-none absolute size-24 rounded-full"
			style={{
				background: `radial-gradient(circle, ${NVIDIA_GREEN}55 0%, transparent 70%)`,
				filter: "blur(12px)",
				left: glowX,
				opacity: cursorOpacity,
				top: glowY,
				translateX: "-50%",
				translateY: "-50%",
			}}
		/>
	);
};
