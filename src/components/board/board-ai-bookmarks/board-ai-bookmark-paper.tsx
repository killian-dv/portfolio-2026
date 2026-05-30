import { motion } from "motion/react";
import type { MouseEvent } from "react";

import type { AiBookmark } from "#/components/board/board-ai-bookmarks/ai-bookmarks.data";
import {
	BOARD_AI_BOOKMARK_PAPER_SPRING,
	BOARD_AI_BOOKMARK_PAPER_WIDTH_PX,
	BOARD_AI_BOOKMARK_PIN_SIZE_PX,
} from "#/components/board/board-ai-bookmarks/board-ai-bookmarks-constants";
import { useBoardAiBookmarkPaperInteraction } from "#/components/board/board-ai-bookmarks/use-board-ai-bookmark-paper-interaction";
import { BoardHandwrittenLabel } from "#/components/board/board-handwritten-label";
import { cn } from "#/lib/utils";

interface BoardAiBookmarkPaperProps {
	bookmark: AiBookmark;
	onMouseDown: (event: MouseEvent) => void;
}

export const BoardAiBookmarkPaper = ({
	bookmark,
	onMouseDown,
}: BoardAiBookmarkPaperProps) => {
	const {
		handleMouseDown,
		handlePointerEnter,
		handlePointerLeave,
		isHovered,
		rotate,
	} = useBoardAiBookmarkPaperInteraction(bookmark.rotation, onMouseDown);

	const { layout } = bookmark;
	const openLabel = `${bookmark.title} — ${bookmark.note} (opens in new tab)`;

	return (
		<div
			className={cn("absolute", isHovered ? "z-30" : "z-10")}
			style={{
				left: layout.left,
				top: layout.top,
				width: BOARD_AI_BOOKMARK_PAPER_WIDTH_PX,
			}}
		>
			{/* Fixed on the board — does not swing with the paper */}
			<div
				aria-hidden
				className="board-ai-bookmark-pin pointer-events-none absolute top-0 left-1/2 z-30 -translate-x-1/2 -translate-y-1/2"
				style={{
					width: BOARD_AI_BOOKMARK_PIN_SIZE_PX,
					height: BOARD_AI_BOOKMARK_PIN_SIZE_PX,
				}}
			/>

			{/* Rotates around the pin point (top center = 50% 0) */}
			<motion.div
				animate={{ rotate }}
				className="origin-[50%_0]"
				style={{ transformOrigin: "50% 0" }}
				transition={BOARD_AI_BOOKMARK_PAPER_SPRING}
			>
				<a
					aria-label={openLabel}
					className={cn(
						"board-ai-bookmark-paper relative block cursor-pointer outline-none",
						"focus-visible:ring-2 focus-visible:ring-foreground/12 focus-visible:ring-offset-2"
					)}
					data-hovered={isHovered ? "true" : "false"}
					href={bookmark.url}
					onBlur={handlePointerLeave}
					onFocus={handlePointerEnter}
					onMouseDown={handleMouseDown}
					onMouseEnter={handlePointerEnter}
					onMouseLeave={handlePointerLeave}
					rel="noopener noreferrer"
					style={{ clipPath: layout.clipPath }}
					target="_blank"
				>
					<span className="relative flex flex-col gap-3 px-3.5 pt-5 pb-4">
						<span className="block font-medium text-[11.5px] text-foreground leading-snug tracking-[-0.02em]">
							{bookmark.title}
						</span>
						<BoardHandwrittenLabel
							as="span"
							className="block text-[0.92rem] leading-tight"
							style={{ transform: "rotate(-1.5deg)" }}
							variant="neutral"
						>
							{bookmark.note}
						</BoardHandwrittenLabel>
					</span>
				</a>
			</motion.div>
		</div>
	);
};
