import { motion } from "motion/react";

import type { AgentTerminalDisplayLine } from "#/components/board/board-agent-terminal/agent-terminal.data";
import {
	agentTerminalLineTransition,
	agentTerminalLineVariants,
} from "#/components/board/board-agent-terminal/board-agent-terminal-motion";
import { cn } from "#/lib/utils";

const THINKING_ELLIPSIS_SUFFIX = /\.\.\.$/;

const TERMINAL_CURSOR_CLASS =
	"ml-px inline-block translate-y-[-0.5px] font-normal text-board-agent-terminal-cursor motion-safe:animate-[board-agent-terminal-cursor-blink_1s_step-end_infinite] motion-reduce:animate-none";

interface BoardAgentTerminalLineProps {
	line: AgentTerminalDisplayLine;
	showCursor: boolean;
}

const TerminalCursor = () => (
	<span aria-hidden className={TERMINAL_CURSOR_CLASS}>
		▍
	</span>
);

const AgentTerminalThinkingDots = () => (
	<span
		aria-hidden
		className="[&>span:nth-child(2)]:motion-safe:[animation-delay:150ms] [&>span:nth-child(3)]:motion-safe:[animation-delay:300ms] [&>span]:motion-safe:animate-[board-agent-terminal-dot-pulse_1.1s_ease-in-out_infinite]"
	>
		<span>.</span>
		<span>.</span>
		<span>.</span>
	</span>
);

export const BoardAgentTerminalLine = ({
	line,
	showCursor,
}: BoardAgentTerminalLineProps) => {
	const isUser = line.type === "user";
	const isBullet = line.type === "bullet";
	const isThinking = line.type === "ai" && line.thinking;
	const baseText =
		line.type === "ai" && line.thinking
			? line.text.replace(THINKING_ELLIPSIS_SUFFIX, "")
			: line.text;

	return (
		<motion.div
			animate="visible"
			className={cn(
				"leading-[1.55]",
				isBullet && "pl-[1.15rem]",
				isThinking &&
					"motion-safe:animate-[board-agent-terminal-thinking-pulse_2.4s_ease-in-out_infinite]"
			)}
			initial="hidden"
			transition={agentTerminalLineTransition}
			variants={agentTerminalLineVariants}
		>
			{isBullet ? (
				<span className="text-[0.6875rem] text-board-agent-terminal-bullet">
					<span aria-hidden className="text-board-agent-terminal-bullet-accent">
						-
					</span>{" "}
					{line.text}
					{showCursor ? <TerminalCursor /> : null}
				</span>
			) : (
				<>
					<span
						className={cn(
							"font-medium",
							isUser
								? "text-board-agent-terminal-user"
								: "text-board-agent-terminal-ai-prompt"
						)}
					>
						{"> "}
						{isUser ? "you: " : "ai: "}
					</span>
					<span
						className={
							isUser
								? "text-board-agent-terminal-user-text"
								: "text-board-agent-terminal-ai"
						}
					>
						{baseText}
						{isThinking ? <AgentTerminalThinkingDots /> : null}
						{showCursor ? <TerminalCursor /> : null}
					</span>
				</>
			)}
		</motion.div>
	);
};
