import { AnimatePresence, motion } from "motion/react";
import { useMemo, useRef } from "react";

import "./board-agent-terminal.css";

import {
	AGENT_TERMINAL_CARD_SPRING,
	BOARD_AGENT_TERMINAL_VIEWPORT_HEIGHT_PX,
	BOARD_AGENT_TERMINAL_WIDTH_PX,
} from "#/components/board/board-agent-terminal/board-agent-terminal-constants";
import { BoardAgentTerminalLine } from "#/components/board/board-agent-terminal/board-agent-terminal-line";
import {
	agentTerminalCardVariants,
	agentTerminalSessionTransition,
} from "#/components/board/board-agent-terminal/board-agent-terminal-motion";
import { useAgentTerminalScroll } from "#/components/board/board-agent-terminal/use-agent-terminal-scroll";
import { useAgentTerminalSequence } from "#/components/board/board-agent-terminal/use-agent-terminal-sequence";
import { useBoardAgentTerminalInteraction } from "#/components/board/board-agent-terminal/use-board-agent-terminal-interaction";
import { cn } from "#/lib/utils";

interface BoardAgentTerminalProps {
	className?: string;
}

export const BoardAgentTerminal = ({ className }: BoardAgentTerminalProps) => {
	const rootRef = useRef<HTMLDivElement>(null);
	const viewportRef = useRef<HTMLDivElement>(null);
	const interaction = useBoardAgentTerminalInteraction();
	const sequence = useAgentTerminalSequence(rootRef);

	const visibleLines = useMemo(
		() => sequence.lines.slice(0, sequence.visibleCount),
		[sequence.lines, sequence.visibleCount]
	);

	useAgentTerminalScroll(
		viewportRef,
		sequence.visibleCount,
		sequence.sessionIndex
	);

	return (
		<motion.div
			animate={interaction.motionState}
			aria-hidden
			className={cn(
				"group relative shrink-0 cursor-default select-none drop-shadow-board-agent-terminal transition-[filter] duration-[280ms] ease-out",
				interaction.isHovered && "drop-shadow-board-agent-terminal-hover",
				className
			)}
			onMouseDown={interaction.stopBoardPan}
			onMouseEnter={interaction.handlePointerEnter}
			onMouseLeave={interaction.handlePointerLeave}
			ref={rootRef}
			style={{ width: BOARD_AGENT_TERMINAL_WIDTH_PX }}
			transition={AGENT_TERMINAL_CARD_SPRING}
			variants={agentTerminalCardVariants}
		>
			<div
				className={cn(
					"relative overflow-hidden rounded-[10px] border border-board-agent-terminal-border bg-board-agent-terminal-bg p-3 shadow-board-agent-terminal-idle transition-[border-color,box-shadow] duration-320 ease-out",
					interaction.isHovered &&
						"border-board-agent-terminal-border-hover shadow-board-agent-terminal-hover"
				)}
			>
				{interaction.isHovered ? (
					<div
						aria-hidden
						className="pointer-events-none absolute inset-x-0 top-0 z-20 h-[28%] animate-[board-agent-terminal-scanline-sweep_0.72s_ease-out_forwards] bg-[linear-gradient(180deg,transparent_0%,var(--color-board-agent-terminal-scanline)_48%,transparent_100%)] motion-reduce:hidden"
						key={interaction.scanlineKey}
					/>
				) : null}

				<div
					className="scrollbar-none relative z-10 overflow-y-auto overflow-x-hidden overscroll-contain scroll-smooth motion-reduce:scroll-auto"
					ref={viewportRef}
					style={{ height: BOARD_AGENT_TERMINAL_VIEWPORT_HEIGHT_PX }}
				>
					<AnimatePresence mode="wait">
						<motion.div
							animate={{ opacity: 1 }}
							className="flex flex-col gap-[0.2rem] font-mono text-[0.6875rem]"
							exit={{ opacity: 0 }}
							initial={{ opacity: 0 }}
							key={sequence.sessionIndex}
							transition={agentTerminalSessionTransition}
						>
							{visibleLines.map((line, index) => (
								<BoardAgentTerminalLine
									key={`${sequence.sessionIndex}-${line.type}-${line.text}`}
									line={line}
									showCursor={
										!sequence.isTransitioning &&
										sequence.isComplete &&
										index === sequence.lastVisibleIndex
									}
								/>
							))}
						</motion.div>
					</AnimatePresence>
				</div>
			</div>
		</motion.div>
	);
};
