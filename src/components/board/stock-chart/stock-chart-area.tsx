import { StockChartSvg } from "#/components/board/stock-chart/stock-chart-svg";
import type { useStockChartInteraction } from "#/components/board/stock-chart/use-stock-chart-interaction";

type StockChartAreaProps = Pick<
	ReturnType<typeof useStockChartInteraction>,
	| "activeX"
	| "activeY"
	| "areaPath"
	| "chartRef"
	| "chartSize"
	| "clipWidth"
	| "cursorLineX"
	| "cursorOpacity"
	| "handlePointerEnterChart"
	| "handlePointerLeaveChart"
	| "handlePointerMoveChart"
	| "linePath"
	| "linePathRef"
	| "prefersReducedMotion"
	| "referenceY"
	| "stopBoardPan"
>;

export const StockChartArea = ({
	chartRef,
	handlePointerEnterChart,
	handlePointerLeaveChart,
	handlePointerMoveChart,
	stopBoardPan,
	...svgProps
}: StockChartAreaProps) => (
	<div className="relative min-h-0 flex-1 pb-4" style={{ minHeight: 200 }}>
		{/* biome-ignore lint/a11y/noNoninteractiveElementInteractions: chart scrub zone */}
		{/* biome-ignore lint/a11y/noStaticElementInteractions: chart scrub zone */}
		<div
			className="relative h-full w-full cursor-default touch-none"
			onMouseDown={stopBoardPan}
			onPointerEnter={handlePointerEnterChart}
			onPointerLeave={handlePointerLeaveChart}
			onPointerMove={handlePointerMoveChart}
			ref={chartRef}
		>
			<StockChartSvg {...svgProps} />
		</div>
	</div>
);
