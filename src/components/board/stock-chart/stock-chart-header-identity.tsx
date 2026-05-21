import { NvidiaLogo } from "#/components/board/stock-chart/nvidia-logo";
import {
	STOCK_EXCHANGE,
	STOCK_NAME,
	STOCK_SYMBOL,
} from "#/components/board/stock-chart/stock-chart-constants";

export const StockChartHeaderIdentity = () => (
	<div className="flex min-w-0 items-center gap-3">
		<NvidiaLogo className="size-11 shrink-0 rounded-xl shadow-[0_4px_16px_-4px_rgba(0,0,0,0.6)]" />
		<div className="min-w-0">
			<p className="truncate font-medium text-[15px] text-white/95 tracking-tight">
				{STOCK_NAME}
			</p>
			<div className="mt-0.5 flex items-center gap-1.5">
				<p className="font-medium text-[11px] text-white/45 tracking-wide">
					{STOCK_SYMBOL}
				</p>
				<span className="text-[11px] text-white/25">•</span>
				<p className="font-medium text-[11px] text-white/35 tracking-wide">
					{STOCK_EXCHANGE}
				</p>
			</div>
		</div>
	</div>
);
