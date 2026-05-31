import { type MouseEvent, useCallback } from "react";

/** Prevents board viewport pan from starting on widget pointer down. */
export const useStopBoardPan = () =>
	useCallback((event: MouseEvent) => {
		event.stopPropagation();
	}, []);
