import type { AgentTerminalDisplayLine } from "#/components/board/board-agent-terminal/agent-terminal.data";

/** Fixed widget footprint — intentional, not responsive. */
export const BOARD_AGENT_TERMINAL_WIDTH_PX = 312;

/** Scrollable transcript area inside the chrome. */
export const BOARD_AGENT_TERMINAL_VIEWPORT_HEIGHT_PX = 176;

export const AGENT_TERMINAL_LINE_STAGGER_MS = 580;
export const AGENT_TERMINAL_THINKING_LINE_MS = 1100;
export const AGENT_TERMINAL_INITIAL_DELAY_MS = 360;
/** Pause on the completed transcript before switching topic. */
export const AGENT_TERMINAL_SESSION_HOLD_MS = 2200;
/** Gap between session index change and first line of the next topic. */
export const AGENT_TERMINAL_SESSION_TRANSITION_MS = 320;

export const AGENT_TERMINAL_CARD_SPRING = {
	damping: 32,
	mass: 0.82,
	stiffness: 340,
	type: "spring" as const,
};

export const getLineRevealDelayMs = (
	line: AgentTerminalDisplayLine | undefined,
	visibleCount: number
) => {
	if (visibleCount === 0 || !line) {
		return AGENT_TERMINAL_INITIAL_DELAY_MS;
	}

	return line.type === "ai" && line.thinking
		? AGENT_TERMINAL_THINKING_LINE_MS
		: AGENT_TERMINAL_LINE_STAGGER_MS;
};
