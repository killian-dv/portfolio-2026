import {
	animate,
	type AnimationPlaybackControls,
	useMotionValue,
	useMotionValueEvent,
	useSpring,
	useTransform,
} from "motion/react";
import {
	type MouseEvent,
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from "react";

import {
	CHART_SPRING,
	CHART_SPRING_RESET,
	HOVER_SPRING,
	LAST_PRICE,
	PARALLAX_SPRING,
	PRICE_SPRING,
	STAT_SPRING,
	STOCK_PRICES,
} from "#/components/board/stock-chart/stock-chart-constants";
import {
	buildAreaPath,
	buildLinePath,
	calcChangeFromReference,
	getActivePointAtX,
	getReferenceLineY,
	interpolatePriceAtX,
	pricesToPoints,
} from "#/components/board/stock-chart/stock-chart-path";
import { usePrefersReducedMotion } from "#/hooks/use-prefers-reduced-motion";

export const useStockChartInteraction = () => {
	const cardRef = useRef<HTMLDivElement>(null);
	const chartRef = useRef<HTMLDivElement>(null);
	const linePathRef = useRef<SVGPathElement>(null);
	const exitAnimationsRef = useRef<{
		hover?: AnimationPlaybackControls;
		pointer?: AnimationPlaybackControls;
	}>({});

	const [chartSize, setChartSize] = useState({ width: 320, height: 200 });
	const [displayPrice, setDisplayPrice] = useState(LAST_PRICE);
	const [stats, setStats] = useState(() => calcChangeFromReference(LAST_PRICE));
	const [isHovering, setIsHovering] = useState(false);
	const [hasMounted, setHasMounted] = useState(false);

	const prefersReducedMotion = usePrefersReducedMotion();

	const chartWidth = useMotionValue(chartSize.width);
	const pointerX = useMotionValue(chartSize.width);
	const hoverActive = useMotionValue(0);
	const targetPrice = useMotionValue(LAST_PRICE);
	const targetPercent = useMotionValue(stats.percent);
	const targetGain = useMotionValue(stats.gain);
	const parallaxX = useMotionValue(0);
	const parallaxY = useMotionValue(0);

	const springX = useSpring(
		pointerX,
		prefersReducedMotion ? { duration: 0 } : CHART_SPRING
	);
	const springHover = useSpring(
		hoverActive,
		prefersReducedMotion ? { duration: 0 } : HOVER_SPRING
	);
	const springPrice = useSpring(
		targetPrice,
		prefersReducedMotion ? { duration: 0 } : PRICE_SPRING
	);
	const springPercent = useSpring(
		targetPercent,
		prefersReducedMotion ? { duration: 0 } : STAT_SPRING
	);
	const springGain = useSpring(
		targetGain,
		prefersReducedMotion ? { duration: 0 } : STAT_SPRING
	);
	const springParallaxX = useSpring(
		parallaxX,
		prefersReducedMotion ? { duration: 0 } : PARALLAX_SPRING
	);
	const springParallaxY = useSpring(
		parallaxY,
		prefersReducedMotion ? { duration: 0 } : PARALLAX_SPRING
	);

	const points = useMemo(
		() => pricesToPoints(STOCK_PRICES, chartSize.width, chartSize.height),
		[chartSize.width, chartSize.height]
	);

	const linePath = useMemo(() => buildLinePath(points), [points]);
	const areaPath = useMemo(
		() => buildAreaPath(points, chartSize.height),
		[points, chartSize.height]
	);
	const referenceY = useMemo(
		() => getReferenceLineY(chartSize.height),
		[chartSize.height]
	);

	const clipWidth = useTransform(springX, (x) => Math.max(0, x));
	const cursorLineX = useTransform(springX, (x) => x);
	const cursorOpacity = useTransform(
		[springHover, springX, chartWidth],
		([hover, x, w]) => {
			const h = hover as number;
			if (h > 0.15) {
				return h;
			}
			const width = w as number;
			if (width <= 0) {
				return 0;
			}
			const progress = (x as number) / width;
			if (progress >= 0.995) {
				return 0;
			}
			return Math.min(h, (0.995 - progress) / 0.12);
		}
	);
	const activeX = useTransform(springX, (x) => x);
	const activeY = useTransform(
		springX,
		(x) => getActivePointAtX(x, chartSize.width, linePathRef.current, points).y
	);
	const parallaxTransform = useTransform(
		[springParallaxX, springParallaxY],
		([x, y]) => `translate3d(${x}px, ${y}px, 0)`
	);

	const updateStatsForPrice = useCallback(
		(price: number) => {
			const change = calcChangeFromReference(price);
			targetPrice.set(price);
			targetPercent.set(change.percent);
			targetGain.set(change.gain);
			setStats(change);
		},
		[targetGain, targetPercent, targetPrice],
	);

	useMotionValueEvent(springPrice, "change", (latest) => {
		setDisplayPrice(latest);
	});

	useMotionValueEvent(springX, "change", (x) => {
		const price = interpolatePriceAtX(points, x, chartSize.width);
		updateStatsForPrice(price);
	});

	const syncChartMetrics = useCallback(
		(width: number, height: number) => {
			if (width > 0 && height > 0) {
				setChartSize({ width, height });
				chartWidth.set(width);
			}
		},
		[chartWidth]
	);

	useEffect(() => {
		const node = chartRef.current;
		if (!node) {
			return;
		}

		const observer = new ResizeObserver(([entry]) => {
			const { width, height } = entry.contentRect;
			syncChartMetrics(width, height);
		});

		observer.observe(node);
		return () => observer.disconnect();
	}, [syncChartMetrics]);

	useEffect(() => {
		chartWidth.set(chartSize.width);
		if (!isHovering) {
			pointerX.set(chartSize.width);
		}
	}, [chartSize.width, chartWidth, isHovering, pointerX]);

	useEffect(() => {
		if (prefersReducedMotion) {
			setHasMounted(true);
			return;
		}
		const controls = animate(0, 1, {
			duration: 0.01,
			onComplete: () => setHasMounted(true),
		});
		return () => controls.stop();
	}, [prefersReducedMotion]);

	const stopBoardPan = (event: MouseEvent) => {
		event.stopPropagation();
	};

	const cancelExitAnimations = useCallback(() => {
		exitAnimationsRef.current.pointer?.stop();
		exitAnimationsRef.current.hover?.stop();
		exitAnimationsRef.current = {};
	}, []);

	const handlePointerMoveChart = useCallback(
		(event: MouseEvent<HTMLDivElement>) => {
			cancelExitAnimations();

			const node = chartRef.current;
			if (!node) {
				return;
			}
			const rect = node.getBoundingClientRect();
			const x = event.clientX - rect.left;
			const clampedX = Math.min(rect.width, Math.max(0, x));

			syncChartMetrics(rect.width, rect.height);
			pointerX.set(clampedX);
			hoverActive.set(1);
			setIsHovering(true);

			if (cardRef.current) {
				const cardRect = cardRef.current.getBoundingClientRect();
				const nx = (event.clientX - cardRect.left) / cardRect.width - 0.5;
				const ny = (event.clientY - cardRect.top) / cardRect.height - 0.5;
				parallaxX.set(nx * 4);
				parallaxY.set(ny * 3);
			}
		},
		[
			cancelExitAnimations,
			hoverActive,
			parallaxX,
			parallaxY,
			pointerX,
			syncChartMetrics,
		],
	);

	const handlePointerLeaveChart = useCallback(() => {
		cancelExitAnimations();
		setIsHovering(false);
		const reset = calcChangeFromReference(LAST_PRICE);
		targetPrice.set(LAST_PRICE);
		targetPercent.set(reset.percent);
		targetGain.set(reset.gain);
		setStats(reset);
		parallaxX.set(0);
		parallaxY.set(0);

		const fullWidth =
			chartRef.current?.getBoundingClientRect().width ?? chartSize.width;
		if (prefersReducedMotion) {
			hoverActive.set(0);
			pointerX.set(fullWidth);
			return;
		}

		exitAnimationsRef.current = {
			pointer: animate(pointerX, fullWidth, {
				type: "spring",
				...CHART_SPRING_RESET,
			}),
			hover: animate(hoverActive, 0, {
				type: "spring",
				...CHART_SPRING_RESET,
			}),
		};
	}, [
		cancelExitAnimations,
		chartSize.width,
		hoverActive,
		parallaxX,
		parallaxY,
		pointerX,
		prefersReducedMotion,
		targetGain,
		targetPercent,
		targetPrice,
	]);

	const handlePointerEnterChart = useCallback(
		(event: MouseEvent<HTMLDivElement>) => {
			cancelExitAnimations();
			hoverActive.set(1);
			setIsHovering(true);
			handlePointerMoveChart(event);
		},
		[cancelExitAnimations, handlePointerMoveChart, hoverActive],
	);

	return {
		areaPath,
		activeX,
		activeY,
		cardRef,
		chartRef,
		chartSize,
		clipWidth,
		cursorLineX,
		cursorOpacity,
		displayPrice,
		hasMounted,
		isHovering,
		linePath,
		linePathRef,
		parallaxTransform,
		prefersReducedMotion,
		referenceY,
		springGain,
		springPercent,
		stats,
		stopBoardPan,
		handlePointerEnterChart,
		handlePointerLeaveChart,
		handlePointerMoveChart,
	};
};
