import { motion } from "motion/react";
import type { ReactNode } from "react";

import { NVIDIA_GREEN } from "#/components/board/stock-chart/stock-chart-constants";
import { cn } from "#/lib/utils";

interface StockChartCardShellProps {
	children: ReactNode;
}

export const StockChartCardShell = ({ children }: StockChartCardShellProps) => (
	<div
		className={cn(
			"relative flex h-full w-full flex-col overflow-hidden rounded-[26px]",
			"border border-white/8 bg-[#0a0b0d]",
			"shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06),inset_0_-24px_48px_-24px_rgba(0,0,0,0.65),0_20px_48px_-28px_rgba(0,0,0,0.55)]"
		)}
	>
		<div
			aria-hidden
			className="pointer-events-none absolute inset-0 rounded-[26px] bg-[radial-gradient(ellipse_80%_55%_at_50%_-8%,rgba(118,185,0,0.12),transparent_52%),radial-gradient(ellipse_45%_35%_at_100%_100%,rgba(255,255,255,0.04),transparent_50%)]"
		/>
		<div
			aria-hidden
			className="pointer-events-none absolute inset-0 rounded-[26px] opacity-[0.32] mix-blend-overlay"
			style={{
				backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E")`,
			}}
		/>
		<div
			aria-hidden
			className="pointer-events-none absolute inset-x-0 top-0 h-20 rounded-t-[26px] bg-linear-to-b from-white/[0.07] to-transparent"
		/>
		<motion.div
			animate={{ opacity: [0.3, 0.5, 0.3] }}
			aria-hidden
			className="pointer-events-none absolute -top-12 left-1/2 h-32 w-48 -translate-x-1/2 rounded-full blur-3xl"
			style={{ backgroundColor: `${NVIDIA_GREEN}2e` }}
			transition={{
				duration: 5,
				repeat: Number.POSITIVE_INFINITY,
				ease: "easeInOut",
			}}
		/>
		<div className="relative z-10 flex min-h-0 flex-1 flex-col">{children}</div>
	</div>
);
