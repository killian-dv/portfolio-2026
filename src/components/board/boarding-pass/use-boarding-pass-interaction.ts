import { useMotionValue, useSpring, useTransform } from "motion/react";
import { type MouseEvent, useCallback, useRef, useState } from "react";

import {
	BOARDING_PASS_GLOW_SPRING,
	BOARDING_PASS_IDLE_ROTATE_DEG,
	BOARDING_PASS_TILT_SPRING,
} from "#/components/board/boarding-pass/boarding-pass-constants";
import { usePrefersReducedMotion } from "#/hooks/use-prefers-reduced-motion";

const TILT_RANGE_DEG = 2.8;

export const useBoardingPassInteraction = () => {
	const cardRef = useRef<HTMLDivElement>(null);
	const [isHovered, setIsHovered] = useState(false);
	const prefersReducedMotion = usePrefersReducedMotion();

	const pointerX = useMotionValue(0.5);
	const pointerY = useMotionValue(0.5);
	const glowActive = useMotionValue(0);

	const springX = useSpring(
		pointerX,
		prefersReducedMotion ? { duration: 0 } : BOARDING_PASS_GLOW_SPRING
	);
	const springY = useSpring(
		pointerY,
		prefersReducedMotion ? { duration: 0 } : BOARDING_PASS_GLOW_SPRING
	);
	const springGlow = useSpring(
		glowActive,
		prefersReducedMotion ? { duration: 0 } : BOARDING_PASS_GLOW_SPRING
	);

	const rawTiltX = useTransform(
		pointerY,
		[0, 1],
		[TILT_RANGE_DEG, -TILT_RANGE_DEG]
	);
	const rawTiltY = useTransform(
		pointerX,
		[0, 1],
		[-TILT_RANGE_DEG, TILT_RANGE_DEG]
	);
	const tiltX = useSpring(
		rawTiltX,
		prefersReducedMotion ? { duration: 0 } : BOARDING_PASS_TILT_SPRING
	);
	const tiltY = useSpring(
		rawTiltY,
		prefersReducedMotion ? { duration: 0 } : BOARDING_PASS_TILT_SPRING
	);

	const glowOpacity = useTransform(springGlow, [0, 1], [0, 0.5]);

	const updatePointer = useCallback(
		(event: MouseEvent<HTMLDivElement>) => {
			const rect = cardRef.current?.getBoundingClientRect();
			if (!rect) {
				return;
			}
			pointerX.set((event.clientX - rect.left) / rect.width);
			pointerY.set((event.clientY - rect.top) / rect.height);
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
		pointerX.set(0.5);
		pointerY.set(0.5);
	}, [glowActive, pointerX, pointerY]);

	const stopBoardPan = useCallback((event: MouseEvent) => {
		event.stopPropagation();
	}, []);

	const motionState = prefersReducedMotion || !isHovered ? "idle" : "hover";
	const baseRotate = prefersReducedMotion ? 0 : BOARDING_PASS_IDLE_ROTATE_DEG;

	return {
		baseRotate,
		cardRef,
		glowOpacity,
		handlePointerEnter,
		handlePointerLeave,
		isHovered,
		motionState,
		prefersReducedMotion,
		springX,
		springY,
		stopBoardPan,
		tiltX,
		tiltY,
		updatePointer,
	};
};
