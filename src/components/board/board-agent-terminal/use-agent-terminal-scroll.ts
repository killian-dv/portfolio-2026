import { type RefObject, useLayoutEffect } from "react";

import { usePrefersReducedMotion } from "#/hooks/use-prefers-reduced-motion";

/** Keeps the latest lines visible once the transcript overflows the viewport. */
export const useAgentTerminalScroll = (
	viewportRef: RefObject<HTMLElement | null>,
	visibleCount: number,
	sessionIndex: number
) => {
	const prefersReducedMotion = usePrefersReducedMotion();

	// biome-ignore lint/correctness/useExhaustiveDependencies: scroll when transcript grows or session changes
	useLayoutEffect(() => {
		const viewport = viewportRef.current;
		if (!viewport) {
			return;
		}

		const frameId = requestAnimationFrame(() => {
			if (viewport.scrollHeight <= viewport.clientHeight) {
				return;
			}

			viewport.scrollTo({
				behavior: prefersReducedMotion ? "instant" : "smooth",
				top: viewport.scrollHeight,
			});
		});

		return () => cancelAnimationFrame(frameId);
	}, [prefersReducedMotion, sessionIndex, viewportRef, visibleCount]);
};
