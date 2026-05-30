import { type MouseEvent, useCallback, useState } from "react";

import { BOARD_AI_BOOKMARK_HOVER_SWING_DEG } from "#/components/board/board-ai-bookmarks/board-ai-bookmarks-constants";
import { usePrefersReducedMotion } from "#/hooks/use-prefers-reduced-motion";

export const useBoardAiBookmarkPaperInteraction = (
	idleRotateDeg: number,
	onMouseDown: (event: MouseEvent) => void
) => {
	const [isHovered, setIsHovered] = useState(false);
	const prefersReducedMotion = usePrefersReducedMotion();
	const isInteractive = isHovered && !prefersReducedMotion;

	const swingDirection = idleRotateDeg >= 0 ? 1 : -1;
	const rotate =
		idleRotateDeg +
		(isInteractive ? BOARD_AI_BOOKMARK_HOVER_SWING_DEG * swingDirection : 0);

	const stopBoardPan = useCallback((event: MouseEvent) => {
		event.stopPropagation();
	}, []);

	const handleMouseDown = useCallback(
		(event: MouseEvent) => {
			stopBoardPan(event);
			onMouseDown(event);
		},
		[onMouseDown, stopBoardPan]
	);

	const handlePointerEnter = useCallback(() => setIsHovered(true), []);
	const handlePointerLeave = useCallback(() => setIsHovered(false), []);

	return {
		handleMouseDown,
		handlePointerEnter,
		handlePointerLeave,
		isHovered,
		isInteractive,
		rotate,
	};
};
