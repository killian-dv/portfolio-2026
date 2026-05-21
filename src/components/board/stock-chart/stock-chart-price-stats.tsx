import { ArrowUp } from "lucide-react";
import { motion, useMotionValueEvent, type useSpring } from "motion/react";
import { useState } from "react";

import {
	LAST_PRICE,
	STOCK_NEGATIVE,
	STOCK_POSITIVE,
} from "#/components/board/stock-chart/stock-chart-constants";
import { calcChangeFromReference } from "#/components/board/stock-chart/stock-chart-path";
import { usePrefersReducedMotion } from "#/hooks/use-prefers-reduced-motion";
import { cn } from "#/lib/utils";

const formatPrice = (value: number) =>
	value.toLocaleString("en-US", {
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	});

const formatPercent = (value: number) => {
	const sign = value >= 0 ? "+" : "";
	return `${sign}${value.toFixed(2)}%`;
};

const formatGain = (value: number) => {
	const sign = value >= 0 ? "+" : "-";
	return `${sign}$${Math.abs(value).toFixed(2)}`;
};

interface StockChartPriceStatsProps {
	displayPrice: number;
	hasMounted: boolean;
	springGain: ReturnType<typeof useSpring>;
	springPercent: ReturnType<typeof useSpring>;
	stats: ReturnType<typeof calcChangeFromReference>;
}

export const StockChartPriceStats = ({
	displayPrice,
	hasMounted,
	springGain,
	springPercent,
	stats,
}: StockChartPriceStatsProps) => {
	const prefersReducedMotion = usePrefersReducedMotion();
	const defaultStats = calcChangeFromReference(LAST_PRICE);

	const [displayPercent, setDisplayPercent] = useState(defaultStats.percent);
	const [displayGain, setDisplayGain] = useState(defaultStats.gain);

	useMotionValueEvent(
		springPercent,
		"change",
		(latest) => !prefersReducedMotion && setDisplayPercent(latest)
	);
	useMotionValueEvent(
		springGain,
		"change",
		(latest) => !prefersReducedMotion && setDisplayGain(latest)
	);

	const percent = prefersReducedMotion ? stats.percent : displayPercent;
	const gain = prefersReducedMotion ? stats.gain : displayGain;
	const isPositive = stats.isPositive;
	const accentColor = isPositive ? STOCK_POSITIVE : STOCK_NEGATIVE;
	return (
		<div className="mt-3 flex flex-col gap-1">
			<motion.p
				className="font-semibold text-[26px] text-white tabular-nums tracking-tight"
				key={hasMounted ? "live" : "init"}
				layout
			>
				${formatPrice(displayPrice)}
			</motion.p>
			<div className="flex flex-wrap items-center gap-x-2 gap-y-1">
				<span
					className={cn(
						"inline-flex items-center gap-1 font-medium text-[12px] tabular-nums transition-colors duration-300"
					)}
					style={{ color: accentColor }}
				>
					<ArrowUp
						aria-hidden
						className={cn(
							"size-3.5 shrink-0 transition-transform duration-300",
							isPositive ? "rotate-45" : "rotate-[135deg]",
						)}
						strokeWidth={2.5}
					/>
					{formatPercent(percent)}
				</span>
				<span
					className="font-medium text-[12px] tabular-nums transition-colors duration-300"
					style={{ color: accentColor }}
				>
					{formatGain(gain)}
				</span>
				<span className="text-[10px] text-white/30 uppercase tracking-widest">
					Today
				</span>
			</div>
		</div>
	);
};
