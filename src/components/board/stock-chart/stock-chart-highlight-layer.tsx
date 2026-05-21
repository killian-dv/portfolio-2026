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
			transition={{ duration: 0.85, ease: [0.23, 1, 0.32, 1], delay: 0.2 }}
		/>
		<motion.path
			animate={{ pathLength: 1, opacity: 1 }}
			d={linePath}
			fill="none"
			filter={`url(#${glowFilterId})`}
			initial={
				prefersReducedMotion
					? { pathLength: 1, opacity: 1 }
					: { pathLength: 0, opacity: 0 }
			}
			ref={linePathRef}
			stroke={`url(#line-bright-${clipId})`}
			strokeLinecap="round"
			strokeWidth={2.5}
			transition={{ duration: 1.25, ease: [0.23, 1, 0.32, 1], delay: 0.05 }}
		/>
	</g>
);
