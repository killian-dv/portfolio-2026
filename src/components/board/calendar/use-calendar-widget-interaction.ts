import { useMotionValue, useSpring, useTransform } from "motion/react";
import { type MouseEvent, useCallback, useMemo, useRef, useState } from "react";

import { CALENDAR_GLOW_SPRING } from "#/components/board/calendar/calendar-widget-constants";
import { usePrefersReducedMotion } from "#/hooks/use-prefers-reduced-motion";

export const useCalendarWidgetInteraction = () => {
	const cardRef = useRef<HTMLDivElement>(null);
	const [isHovered, setIsHovered] = useState(false);
	const prefersReducedMotion = usePrefersReducedMotion();

	const pointerX = useMotionValue(0);
	const pointerY = useMotionValue(0);
	const glowActive = useMotionValue(0);

	const springX = useSpring(
		pointerX,
		prefersReducedMotion ? { duration: 0 } : CALENDAR_GLOW_SPRING
	);
	const springY = useSpring(
		pointerY,
		prefersReducedMotion ? { duration: 0 } : CALENDAR_GLOW_SPRING
	);
	const springGlow = useSpring(
		glowActive,
		prefersReducedMotion ? { duration: 0 } : CALENDAR_GLOW_SPRING
	);

	const glowOpacity = useTransform(springGlow, [0, 1], [0, 0.55]);

	const now = useMemo(() => new Date(), []);

	const dateParts = useMemo(() => {
		const weekday = new Intl.DateTimeFormat("en-US", {
			weekday: "long",
		}).format(now);
		const month = new Intl.DateTimeFormat("en-US", {
			month: "long",
		}).format(now);
		return {
			weekday,
			month,
			day: now.getDate(),
		};
	}, [now]);

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
	}, [glowActive]);

	const stopBoardPan = useCallback((event: MouseEvent) => {
		event.stopPropagation();
	}, []);

	const motionState = prefersReducedMotion || !isHovered ? "idle" : "hover";

	return {
		cardRef,
		dateParts,
		glowOpacity,
		handlePointerEnter,
		handlePointerLeave,
		isHovered,
		motionState,
		prefersReducedMotion,
		springX,
		springY,
		stopBoardPan,
		updatePointer,
	};
};
