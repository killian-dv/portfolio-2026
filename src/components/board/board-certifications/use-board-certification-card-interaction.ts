import { useMotionValue, useSpring, useTransform } from "motion/react";
import { type MouseEvent, useCallback, useRef, useState } from "react";

import { BOARD_CERTIFICATION_LAMINATE_SPRING } from "#/components/board/board-certifications/board-certifications-constants";
import { usePrefersReducedMotion } from "#/hooks/use-prefers-reduced-motion";

const noMotionSpring = { duration: 0 } as const;

export const useBoardCertificationCardInteraction = (idleRotateDeg: number) => {
	const cardRef = useRef<HTMLElement>(null);
	const [isHovered, setIsHovered] = useState(false);
	const prefersReducedMotion = usePrefersReducedMotion();
	const laminateSpring = prefersReducedMotion
		? noMotionSpring
		: BOARD_CERTIFICATION_LAMINATE_SPRING;

	const pointerX = useMotionValue(0.5);
	const pointerY = useMotionValue(0.5);
	const laminateActive = useMotionValue(0);

	const springPointerX = useSpring(pointerX, laminateSpring);
	const springPointerY = useSpring(pointerY, laminateSpring);
	const springLaminate = useSpring(laminateActive, laminateSpring);
	const laminateOpacity = useTransform(springLaminate, [0, 1], [0, 0.28]);

	const updatePointer = useCallback(
		(event: MouseEvent<HTMLElement>) => {
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
		laminateActive.set(1);
	}, [laminateActive]);

	const handlePointerLeave = useCallback(() => {
		setIsHovered(false);
		laminateActive.set(0);
		pointerX.set(0.5);
		pointerY.set(0.5);
	}, [laminateActive, pointerX, pointerY]);

	const stopBoardPan = useCallback((event: MouseEvent) => {
		event.stopPropagation();
	}, []);

	const isInteractive = isHovered && !prefersReducedMotion;

	return {
		cardRef,
		handlePointerEnter,
		handlePointerLeave,
		hoverRotateDeg: idleRotateDeg * 0.32,
		idleRotateDeg,
		isInteractive,
		laminateOpacity,
		springPointerX,
		springPointerY,
		stopBoardPan,
		updatePointer,
	};
};
