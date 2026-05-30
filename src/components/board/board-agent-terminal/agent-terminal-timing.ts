import type { AgentTerminalDisplayLine } from "#/components/board/board-agent-terminal/agent-terminal.data";
import {
	AGENT_TERMINAL_INITIAL_DELAY_MS,
	AGENT_TERMINAL_LINE_STAGGER_MS,
	AGENT_TERMINAL_THINKING_LINE_MS,
} from "#/components/board/board-agent-terminal/board-agent-terminal-constants";

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
