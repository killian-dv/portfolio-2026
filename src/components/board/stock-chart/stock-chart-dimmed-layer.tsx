import { motion } from "motion/react";

import { NVIDIA_GREEN } from "#/components/board/stock-chart/stock-chart-constants";

interface StockChartDimmedLayerProps {
	areaPath: string;
	clipId: string;
	linePath: string;
	prefersReducedMotion: boolean;
}

export const StockChartDimmedLayer = ({
	areaPath,
	clipId,
	linePath,
	prefersReducedMotion,
}: StockChartDimmedLayerProps) => (
	<g opacity={0.42}>
		<motion.path
			animate={{ opacity: 1 }}
			d={areaPath}
			fill={`url(#area-dim-${clipId})`}
			initial={{ opacity: 0 }}
			transition={{ duration: 0.9, ease: [0.23, 1, 0.32, 1], delay: 0.15 }}
		/>
		<motion.path
			animate={{ pathLength: 1, opacity: 0.7 }}
			d={linePath}
			fill="none"
			initial={
				prefersReducedMotion
					? { pathLength: 1, opacity: 0.7 }
					: { pathLength: 0, opacity: 0.7 }
			}
			stroke={NVIDIA_GREEN}
			strokeLinecap="round"
			strokeWidth={2}
			transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
		/>
	</g>
);
