/** Starts elevated, soft dip mid-day, light wiggle on recovery, then close. */
export const STOCK_PRICES = [
	187.8, 187.2, 186.6, 184.4, 183.4, 184.8, 186.2, 185.4, 187.4, 188.6, 190.1,
] as const;

export const [OPENING_PRICE] = STOCK_PRICES;
export const LAST_PRICE: number = STOCK_PRICES.at(-1) ?? 190.1;

export const NVIDIA_GREEN = "#76B900";
export const STOCK_NEGATIVE = "#F87171";

export const STOCK_SYMBOL = "NVDA";
export const STOCK_NAME = "NVIDIA";
export const STOCK_EXCHANGE = "NASDAQ";

export const CHART_SPRING = { damping: 30, mass: 0.55, stiffness: 200 };
/** Softer settle when scrub returns to full chart width. */
export const CHART_SPRING_RESET = { damping: 34, mass: 0.85, stiffness: 90 };
export const HOVER_SPRING = { damping: 38, mass: 0.45, stiffness: 320 };
export const PRICE_SPRING = { damping: 22, mass: 0.5, stiffness: 140 };
export const PARALLAX_SPRING = { damping: 24, mass: 0.8, stiffness: 120 };
export const STAT_SPRING = { damping: 26, mass: 0.5, stiffness: 160 };
