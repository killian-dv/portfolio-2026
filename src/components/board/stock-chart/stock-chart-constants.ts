/** Starts elevated, soft dip mid-day, light wiggle on recovery, then close. */
export const STOCK_PRICES = [
	187.8, 187.2, 186.6, 184.4, 183.4, 184.8, 186.2, 185.4, 187.4, 188.6, 190.1,
] as const;

export const OPENING_PRICE = STOCK_PRICES[0];
export const LAST_PRICE = STOCK_PRICES.at(-1) ?? 190.1;

export const NVIDIA_GREEN = "#76B900";
export const STOCK_POSITIVE = "#76B900";
export const STOCK_NEGATIVE = "#F87171";

export const STOCK_SYMBOL = "NVDA";
export const STOCK_NAME = "NVIDIA";
export const STOCK_EXCHANGE = "NASDAQ";

export const CHART_SPRING = { stiffness: 200, damping: 30, mass: 0.55 };
/** Softer settle when scrub returns to full chart width. */
export const CHART_SPRING_RESET = { stiffness: 90, damping: 34, mass: 0.85 };
export const HOVER_SPRING = { stiffness: 320, damping: 38, mass: 0.45 };
export const PRICE_SPRING = { stiffness: 140, damping: 22, mass: 0.5 };
export const PARALLAX_SPRING = { stiffness: 120, damping: 24, mass: 0.8 };
export const STAT_SPRING = { stiffness: 160, damping: 26, mass: 0.5 };
