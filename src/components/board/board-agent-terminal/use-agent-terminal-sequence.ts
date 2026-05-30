import {
	type RefObject,
	useCallback,
	useEffect,
	useRef,
	useState,
} from "react";

import {
	type AgentTerminalDisplayLine,
	agentTerminalSessionsDisplay,
} from "#/components/board/board-agent-terminal/agent-terminal.data";
import { getLineRevealDelayMs } from "#/components/board/board-agent-terminal/agent-terminal-timing";
import {
	AGENT_TERMINAL_SESSION_HOLD_MS,
	AGENT_TERMINAL_SESSION_TRANSITION_MS,
} from "#/components/board/board-agent-terminal/board-agent-terminal-constants";
import { usePrefersReducedMotion } from "#/hooks/use-prefers-reduced-motion";

const SESSION_COUNT = agentTerminalSessionsDisplay.length;

const INTERSECTION_OPTIONS: IntersectionObserverInit = {
	root: null,
	rootMargin: "120px",
	threshold: 0.12,
};

const nextSessionIndex = (index: number) => (index + 1) % SESSION_COUNT;

export const useAgentTerminalSequence = (
	rootRef: RefObject<HTMLElement | null>
) => {
	const prefersReducedMotion = usePrefersReducedMotion();
	const [sessionIndex, setSessionIndex] = useState(0);
	const [visibleCount, setVisibleCount] = useState(0);
	const [isInView, setIsInView] = useState(false);
	const [isTransitioning, setIsTransitioning] = useState(false);

	const timeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);

	const lines: AgentTerminalDisplayLine[] =
		agentTerminalSessionsDisplay[sessionIndex]?.lines ?? [];

	const clearSchedule = useCallback(() => {
		if (timeoutRef.current) {
			clearTimeout(timeoutRef.current);
			timeoutRef.current = undefined;
		}
	}, []);

	const schedule = useCallback(
		(callback: () => void, delayMs: number) => {
			clearSchedule();
			timeoutRef.current = setTimeout(callback, delayMs);
		},
		[clearSchedule]
	);

	useEffect(() => {
		const root = rootRef.current;
		if (!root) {
			return;
		}

		const observer = new IntersectionObserver(([entry]) => {
			setIsInView(Boolean(entry?.isIntersecting));
		}, INTERSECTION_OPTIONS);

		observer.observe(root);
		return () => observer.disconnect();
	}, [rootRef]);

	useEffect(() => {
		if (!(prefersReducedMotion && isInView)) {
			return;
		}

		setVisibleCount(lines.length);

		const intervalId = setInterval(() => {
			setSessionIndex((previous) => nextSessionIndex(previous));
		}, AGENT_TERMINAL_SESSION_HOLD_MS * 2);

		return () => clearInterval(intervalId);
	}, [isInView, lines, prefersReducedMotion]);

	useEffect(() => {
		if (prefersReducedMotion) {
			return;
		}

		if (!isInView) {
			clearSchedule();
			return;
		}

		if (visibleCount < lines.length) {
			const delayMs = getLineRevealDelayMs(
				lines[visibleCount - 1],
				visibleCount
			);

			schedule(() => {
				setVisibleCount((count) => count + 1);
			}, delayMs);

			return clearSchedule;
		}

		schedule(() => {
			setIsTransitioning(true);
			schedule(() => {
				setSessionIndex((previous) => nextSessionIndex(previous));
				setVisibleCount(0);
				setIsTransitioning(false);
			}, AGENT_TERMINAL_SESSION_TRANSITION_MS);
		}, AGENT_TERMINAL_SESSION_HOLD_MS);

		return clearSchedule;
	}, [
		clearSchedule,
		isInView,
		lines,
		prefersReducedMotion,
		schedule,
		visibleCount,
	]);

	const isComplete = visibleCount >= lines.length;
	const lastVisibleIndex = Math.max(0, visibleCount - 1);

	return {
		isComplete,
		isTransitioning,
		lastVisibleIndex,
		lines,
		sessionIndex,
		visibleCount,
	};
};
