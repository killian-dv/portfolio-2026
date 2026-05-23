import { useMotionValue, useSpring, useTransform } from "motion/react";
import {
	type MouseEvent,
	useCallback,
	useEffect,
	useRef,
	useState,
} from "react";

import { GITHUB_CONTRIBUTIONS_GLOW_SPRING } from "#/components/board/github-contributions/github-contributions-constants";
import { usePrefersReducedMotion } from "#/hooks/use-prefers-reduced-motion";

export interface HoveredContributionCell {
	col: number;
	count: number;
	date: string;
	row: number;
}

export interface ContributionTooltipAnchor {
	x: number;
	y: number;
}

export interface ContributionHover {
	anchor: ContributionTooltipAnchor;
	cell: HoveredContributionCell;
}

export const useGithubContributionsInteraction = () => {
	const cardRef = useRef<HTMLDivElement>(null);
	const [isHovered, setIsHovered] = useState(false);
	const [hover, setHover] = useState<ContributionHover | null>(null);
	const prefersReducedMotion = usePrefersReducedMotion();

	const pointerX = useMotionValue(0);
	const pointerY = useMotionValue(0);
	const glowActive = useMotionValue(0);

	const springX = useSpring(
		pointerX,
		prefersReducedMotion ? { duration: 0 } : GITHUB_CONTRIBUTIONS_GLOW_SPRING
	);
	const springY = useSpring(
		pointerY,
		prefersReducedMotion ? { duration: 0 } : GITHUB_CONTRIBUTIONS_GLOW_SPRING
	);
	const springGlow = useSpring(
		glowActive,
		prefersReducedMotion ? { duration: 0 } : GITHUB_CONTRIBUTIONS_GLOW_SPRING
	);

	const glowOpacity = useTransform(springGlow, [0, 1], [0, 0.5]);

	const dismissTooltip = useCallback(() => {
		setHover(null);
	}, []);

	const updatePointer = useCallback(
		(event: MouseEvent<HTMLDivElement>) => {
			const rect = cardRef.current?.getBoundingClientRect();
			if (!rect) {
				return;
			}
			pointerX.set(event.clientX - rect.left);
			pointerY.set(event.clientY - rect.top);
		},
		[pointerX, pointerY]
	);

	const handlePointerEnter = useCallback(() => {
		setIsHovered(true);
		glowActive.set(1);
	}, [glowActive]);

	const handlePointerLeave = useCallback(() => {
		setIsHovered(false);
		glowActive.set(0);
		dismissTooltip();
	}, [dismissTooltip, glowActive]);

	const handleCellHover = useCallback((next: ContributionHover | null) => {
		setHover(next);
	}, []);

	const stopBoardPan = useCallback((event: MouseEvent) => {
		event.stopPropagation();
	}, []);

	/** Board pan does not fire cell mouseleave — dismiss when pointer goes elsewhere. */
	useEffect(() => {
		const handlePointerDown = (event: PointerEvent) => {
			const target = event.target;
			if (!(target instanceof Element)) {
				return;
			}
			if (target.closest("[data-contribution-cell]")) {
				return;
			}
			dismissTooltip();
		};

		window.addEventListener("pointerdown", handlePointerDown, true);
		return () => {
			window.removeEventListener("pointerdown", handlePointerDown, true);
		};
	}, [dismissTooltip]);

	return {
		cardRef,
		dismissTooltip,
		glowOpacity,
		handleCellHover,
		handlePointerEnter,
		handlePointerLeave,
		hover,
		isHovered,
		prefersReducedMotion,
		springX,
		springY,
		stopBoardPan,
		updatePointer,
	};
};

export const getAnchorInCard = (
	target: HTMLButtonElement,
	card: HTMLDivElement
): ContributionTooltipAnchor => {
	const cellRect = target.getBoundingClientRect();
	const cardRect = card.getBoundingClientRect();

	return {
		x: cellRect.left - cardRect.left + cellRect.width / 2,
		y: cellRect.top - cardRect.top,
	};
};
