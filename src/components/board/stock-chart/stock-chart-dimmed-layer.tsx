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
			transition={{ delay: 0.15, duration: 0.9, ease: [0.23, 1, 0.32, 1] }}
		/>
		<motion.path
			animate={{ opacity: 0.7, pathLength: 1 }}
			d={linePath}
			fill="none"
			initial={
				prefersReducedMotion
					? { opacity: 0.7, pathLength: 1 }
					: { opacity: 0.7, pathLength: 0 }
			}
			stroke={NVIDIA_GREEN}
			strokeLinecap="round"
			strokeWidth={2}
			transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
		/>
	</g>
);
