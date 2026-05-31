import { useCallback, useState } from "react";

import { usePrefersReducedMotion } from "#/hooks/use-prefers-reduced-motion";
import { useStopBoardPan } from "#/hooks/use-stop-board-pan";

export const useBoardAgentTerminalInteraction = () => {
	const [isHovered, setIsHovered] = useState(false);
	const [scanlineKey, setScanlineKey] = useState(0);
	const prefersReducedMotion = usePrefersReducedMotion();

	const handlePointerEnter = useCallback(() => {
		setIsHovered(true);
		setScanlineKey((key) => key + 1);
	}, []);

	const handlePointerLeave = useCallback(() => {
		setIsHovered(false);
	}, []);

	const stopBoardPan = useStopBoardPan();

	const motionState = prefersReducedMotion || !isHovered ? "idle" : "hover";

	return {
		handlePointerEnter,
		handlePointerLeave,
		isHovered,
		motionState,
		scanlineKey,
		stopBoardPan,
	};
};
