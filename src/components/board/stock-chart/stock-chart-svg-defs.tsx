import type { MotionValue } from "motion/react";
import { motion } from "motion/react";

import { NVIDIA_GREEN } from "#/components/board/stock-chart/stock-chart-constants";

interface StockChartSvgDefsProps {
	chartHeight: number;
	clipId: string;
	clipWidth: MotionValue<number>;
	glowFilterId: string;
}

export const StockChartSvgDefs = ({
	chartHeight,
	clipId,
	clipWidth,
	glowFilterId,
}: StockChartSvgDefsProps) => (
	<defs>
		<clipPath id={clipId}>
			<motion.rect height={chartHeight + 40} width={clipWidth} x={0} y={-20} />
		</clipPath>
		<linearGradient id={`area-dim-${clipId}`} x1="0" x2="0" y1="0" y2="1">
			<stop offset="0%" stopColor={NVIDIA_GREEN} stopOpacity={0.22} />
			<stop offset="100%" stopColor={NVIDIA_GREEN} stopOpacity={0} />
		</linearGradient>
		<linearGradient id={`area-bright-${clipId}`} x1="0" x2="0" y1="0" y2="1">
			<stop offset="0%" stopColor={NVIDIA_GREEN} stopOpacity={0.45} />
			<stop offset="100%" stopColor={NVIDIA_GREEN} stopOpacity={0.02} />
		</linearGradient>
		<linearGradient id={`line-bright-${clipId}`} x1="0" x2="1" y1="0" y2="0">
			<stop offset="0%" stopColor="#9AE600" />
			<stop offset="100%" stopColor={NVIDIA_GREEN} />
		</linearGradient>
		<filter height="200%" id={glowFilterId} width="200%" x="-50%" y="-50%">
			<feGaussianBlur result="blur" stdDeviation="3" />
			<feMerge>
				<feMergeNode in="blur" />
				<feMergeNode in="SourceGraphic" />
			</feMerge>
		</filter>
		<linearGradient id={`cursor-line-${clipId}`} x1="0" x2="0" y1="0" y2="1">
			<stop offset="0%" stopColor="white" stopOpacity={0} />
			<stop offset="15%" stopColor="white" stopOpacity={0.35} />
			<stop offset="50%" stopColor="white" stopOpacity={0.5} />
			<stop offset="85%" stopColor="white" stopOpacity={0.35} />
			<stop offset="100%" stopColor="white" stopOpacity={0} />
		</linearGradient>
	</defs>
);
