import { curveMonotoneX, line } from "d3-shape";

import {
	OPENING_PRICE,
	STOCK_PRICES,
} from "#/components/board/stock-chart/stock-chart-constants";

export interface ChartPoint {
	price: number;
	x: number;
	y: number;
}

export interface ChartScale {
	drawable: number;
	max: number;
	min: number;
	range: number;
	verticalPad: number;
}

export const getChartScale = (
	prices: readonly number[],
	height: number
): ChartScale => {
	const min = Math.min(...prices);
	const max = Math.max(...prices);
	const range = max - min || 1;
	const verticalPad = height * 0.12;
	const drawable = height - verticalPad * 2;
	return { min, max, range, verticalPad, drawable };
};

export const priceToY = (
	price: number,
	prices: readonly number[],
	height: number
): number => {
	const { min, range, verticalPad, drawable } = getChartScale(prices, height);
	return verticalPad + drawable - ((price - min) / range) * drawable;
};

export const pricesToPoints = (
	prices: readonly number[],
	width: number,
	height: number
): ChartPoint[] => {
	const { min, range, verticalPad, drawable } = getChartScale(prices, height);

	return prices.map((price, index) => ({
		x: (index / (prices.length - 1)) * width,
		y: verticalPad + drawable - ((price - min) / range) * drawable,
		price,
	}));
};

export const buildLinePath = (points: ChartPoint[]): string => {
	const generator = line<ChartPoint>()
		.x((d) => d.x)
		.y((d) => d.y)
		.curve(curveMonotoneX);

	return generator(points) ?? "";
};

export const buildAreaPath = (points: ChartPoint[], height: number): string => {
	const linePath = buildLinePath(points);
	if (!linePath) {
		return "";
	}
	const last = points.at(-1);
	const first = points[0];
	if (!(last && first)) {
		return "";
	}
	return `${linePath} L ${last.x} ${height} L ${first.x} ${height} Z`;
};

export const interpolatePriceAtX = (
	points: ChartPoint[],
	x: number,
	width: number
): number => {
	if (width <= 0) {
		return points[0]?.price ?? 0;
	}
	const ratio = Math.min(1, Math.max(0, x / width));
	const floatingIndex = ratio * (points.length - 1);
	const index = Math.floor(floatingIndex);
	const t = floatingIndex - index;

	if (index >= points.length - 1) {
		return points.at(-1)?.price ?? 0;
	}

	const a = points[index]?.price ?? 0;
	const b = points[index + 1]?.price ?? a;
	return a + (b - a) * t;
};

/** Sample the rendered path at a horizontal scrub position (matches clip edge). */
const samplePathYAtX = (path: SVGPathElement, targetX: number): number => {
	const length = path.getTotalLength();
	if (length <= 0) {
		return 0;
	}

	let lo = 0;
	let hi = length;
	for (let i = 0; i < 24; i++) {
		const mid = (lo + hi) / 2;
		if (path.getPointAtLength(mid).x < targetX) {
			lo = mid;
		} else {
			hi = mid;
		}
	}

	return path.getPointAtLength((lo + hi) / 2).y;
};

/** Active point locked to scrub X so clip, glow, and focus stay aligned. */
export const getActivePointAtX = (
	scrubX: number,
	width: number,
	path: SVGPathElement | null,
	points: ChartPoint[]
): { x: number; y: number } => {
	const x = Math.min(width, Math.max(0, scrubX));

	if (path && width > 0) {
		return { x, y: samplePathYAtX(path, x) };
	}

	const ratio = width > 0 ? x / width : 0;
	const floatingIndex = ratio * (points.length - 1);
	const index = Math.floor(floatingIndex);
	const t = floatingIndex - index;
	const a = points[index];
	const b = points[Math.min(index + 1, points.length - 1)] ?? a;
	if (!(a && b)) {
		return { x, y: 0 };
	}

	return {
		x,
		y: a.y + (b.y - a.y) * t,
	};
};

/** Dashed reference — slightly above lower third (~⅗ above the line). */
export const getReferenceLinePrice = (
	prices: readonly number[] = STOCK_PRICES
): number => {
	const sorted = [...prices].sort((a, b) => a - b);
	const index = Math.min(
		sorted.length - 1,
		Math.max(0, Math.floor(sorted.length * 0.38))
	);
	return sorted[index] ?? prices[0] ?? OPENING_PRICE;
};

export const getReferenceLineY = (height: number) =>
	priceToY(getReferenceLinePrice(), STOCK_PRICES, height);

/** % and $ gain vs the dashed reference line (not session open). */
export const calcChangeFromReference = (
	price: number,
	referencePrice: number = getReferenceLinePrice(),
) => {
	const gain = price - referencePrice;
	const percent = (gain / referencePrice) * 100;
	return { percent, gain, isPositive: gain >= 0 };
};
