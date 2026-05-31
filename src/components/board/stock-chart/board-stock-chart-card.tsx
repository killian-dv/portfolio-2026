import { motion } from "motion/react";

import { StockChartArea } from "#/components/board/stock-chart/stock-chart-area";
import { StockChartCardShell } from "#/components/board/stock-chart/stock-chart-card-shell";
import { STOCK_CHART_CARD_SIZE_PX } from "#/components/board/stock-chart/stock-chart-constants";
import { StockChartHeader } from "#/components/board/stock-chart/stock-chart-header";
import { useStockChartInteraction } from "#/components/board/stock-chart/use-stock-chart-interaction";

export const BoardStockChartCard = () => {
	const interaction = useStockChartInteraction();

	return (
		<motion.div
			className="relative shrink-0 cursor-default select-none"
			onMouseDown={interaction.stopBoardPan}
			ref={interaction.cardRef}
			style={{
				height: STOCK_CHART_CARD_SIZE_PX,
				width: STOCK_CHART_CARD_SIZE_PX,
				transform: interaction.parallaxTransform,
			}}
		>
			<StockChartCardShell>
				<StockChartHeader
					displayPrice={interaction.displayPrice}
					hasMounted={interaction.hasMounted}
					springGain={interaction.springGain}
					springPercent={interaction.springPercent}
					stats={interaction.stats}
				/>
				<StockChartArea
					activeX={interaction.activeX}
					activeY={interaction.activeY}
					areaPath={interaction.areaPath}
					chartRef={interaction.chartRef}
					chartSize={interaction.chartSize}
					clipWidth={interaction.clipWidth}
					cursorLineX={interaction.cursorLineX}
					cursorOpacity={interaction.cursorOpacity}
					handlePointerEnterChart={interaction.handlePointerEnterChart}
					handlePointerLeaveChart={interaction.handlePointerLeaveChart}
					handlePointerMoveChart={interaction.handlePointerMoveChart}
					linePath={interaction.linePath}
					linePathRef={interaction.linePathRef}
					prefersReducedMotion={interaction.prefersReducedMotion}
					referenceY={interaction.referenceY}
					stopBoardPan={interaction.stopBoardPan}
				/>
			</StockChartCardShell>
		</motion.div>
	);
};
