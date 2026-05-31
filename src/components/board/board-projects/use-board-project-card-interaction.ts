import { useCallback, useRef, useState } from "react";

import { usePrefersReducedMotion } from "#/hooks/use-prefers-reduced-motion";
import { useStopBoardPan } from "#/hooks/use-stop-board-pan";

export const useBoardProjectCardInteraction = () => {
	const cardRef = useRef<HTMLElement>(null);
	const [isPointerOver, setIsPointerOver] = useState(false);
	const prefersReducedMotion = usePrefersReducedMotion();

	const handlePointerEnter = useCallback(() => {
		setIsPointerOver(true);
	}, []);

	const handlePointerLeave = useCallback(() => {
		setIsPointerOver(false);
	}, []);

	const stopBoardPan = useStopBoardPan();

	return {
		cardRef,
		handlePointerEnter,
		handlePointerLeave,
		isHovered: isPointerOver && !prefersReducedMotion,
		isPointerOver,
		prefersReducedMotion,
		stopBoardPan,
	};
};
