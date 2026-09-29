import { motion } from "motion/react";
import type { RefObject } from "react";

interface StockChartHighlightLayerProps {
	areaPath: string;
	clipId: string;
	glowFilterId: string;
	linePath: string;
	linePathRef: RefObject<SVGPathElement | null>;
	prefersReducedMotion: boolean;
}

export const StockChartHighlightLayer = ({
	areaPath,
	clipId,
	glowFilterId,
	linePath,
	linePathRef,
	prefersReducedMotion,
}: StockChartHighlightLayerProps) => (
	<g clipPath={`url(#${clipId})`}>
		<motion.path
			animate={{ opacity: 1 }}
			d={areaPath}
			fill={`url(#area-bright-${clipId})`}
			filter={`url(#${glowFilterId})`}
			initial={{ opacity: 0 }}
			transition={{ delay: 0.2, duration: 0.85, ease: [0.23, 1, 0.32, 1] }}
		/>
		<motion.path
			animate={{ opacity: 1, pathLength: 1 }}
			d={linePath}
			fill="none"
			filter={`url(#${glowFilterId})`}
			initial={
				prefersReducedMotion
					? { opacity: 1, pathLength: 1 }
					: { opacity: 0, pathLength: 0 }
			}
			ref={linePathRef}
			stroke={`url(#line-bright-${clipId})`}
			strokeLinecap="round"
			strokeWidth={2.5}
			transition={{ delay: 0.05, duration: 1.25, ease: [0.23, 1, 0.32, 1] }}
		/>
	</g>
);
