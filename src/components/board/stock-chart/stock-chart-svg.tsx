import { useId } from "react";

import { StockChartActivePoint } from "#/components/board/stock-chart/stock-chart-active-point";
import { StockChartCursor } from "#/components/board/stock-chart/stock-chart-cursor";
import { StockChartDimmedLayer } from "#/components/board/stock-chart/stock-chart-dimmed-layer";
import { StockChartHighlightLayer } from "#/components/board/stock-chart/stock-chart-highlight-layer";
import { StockChartRadialGlow } from "#/components/board/stock-chart/stock-chart-radial-glow";
import { StockChartReferenceLine } from "#/components/board/stock-chart/stock-chart-reference-line";
import { StockChartSvgDefs } from "#/components/board/stock-chart/stock-chart-svg-defs";
import type { useStockChartInteraction } from "#/components/board/stock-chart/use-stock-chart-interaction";

type StockChartSvgProps = Pick<
	ReturnType<typeof useStockChartInteraction>,
	| "activeX"
	| "activeY"
	| "areaPath"
	| "chartSize"
	| "clipWidth"
	| "cursorLineX"
	| "cursorOpacity"
	| "linePath"
	| "linePathRef"
	| "prefersReducedMotion"
	| "referenceY"
>;

export const StockChartSvg = ({
	activeX,
	activeY,
	areaPath,
	chartSize,
	clipWidth,
	cursorLineX,
	cursorOpacity,
	linePath,
	linePathRef,
	prefersReducedMotion,
	referenceY,
}: StockChartSvgProps) => {
	const clipId = useId().replace(/:/g, "");
	const glowFilterId = `stock-glow-${clipId}`;

	return (
		<>
			{/* biome-ignore lint/a11y/noSvgWithoutTitle: decorative chart */}
			<svg
				aria-hidden
				className="absolute inset-0 h-full w-full overflow-visible"
				preserveAspectRatio="none"
				viewBox={`0 0 ${chartSize.width} ${chartSize.height}`}
			>
				<StockChartSvgDefs
					chartHeight={chartSize.height}
					clipId={clipId}
					clipWidth={clipWidth}
					glowFilterId={glowFilterId}
				/>
				<StockChartDimmedLayer
					areaPath={areaPath}
					clipId={clipId}
					linePath={linePath}
					prefersReducedMotion={prefersReducedMotion}
				/>
				<StockChartReferenceLine
					chartWidth={chartSize.width}
					referenceY={referenceY}
				/>
				<StockChartHighlightLayer
					areaPath={areaPath}
					clipId={clipId}
					glowFilterId={glowFilterId}
					linePath={linePath}
					linePathRef={linePathRef}
					prefersReducedMotion={prefersReducedMotion}
				/>
				<StockChartCursor
					chartHeight={chartSize.height}
					clipId={clipId}
					cursorLineX={cursorLineX}
					cursorOpacity={cursorOpacity}
				/>
				<StockChartActivePoint
					activeX={activeX}
					activeY={activeY}
					cursorOpacity={cursorOpacity}
				/>
			</svg>
			<StockChartRadialGlow
				activeX={activeX}
				activeY={activeY}
				cursorOpacity={cursorOpacity}
			/>
		</>
	);
};
