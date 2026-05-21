import type { useSpring } from "motion/react";

import { StockChartHeaderIdentity } from "#/components/board/stock-chart/stock-chart-header-identity";
import type { calcChangeFromReference } from "#/components/board/stock-chart/stock-chart-path";
import { StockChartPriceStats } from "#/components/board/stock-chart/stock-chart-price-stats";

interface StockChartHeaderProps {
	displayPrice: number;
	hasMounted: boolean;
	springGain: ReturnType<typeof useSpring>;
	springPercent: ReturnType<typeof useSpring>;
	stats: ReturnType<typeof calcChangeFromReference>;
}

export const StockChartHeader = ({
	displayPrice,
	hasMounted,
	springGain,
	springPercent,
	stats,
}: StockChartHeaderProps) => (
	<header className="shrink-0 px-5 pt-5">
		<StockChartHeaderIdentity />
		<StockChartPriceStats
			displayPrice={displayPrice}
			hasMounted={hasMounted}
			springGain={springGain}
			springPercent={springPercent}
			stats={stats}
		/>
	</header>
);
