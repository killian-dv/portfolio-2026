import { type MouseEvent, useCallback } from "react";

import { aiBookmarks } from "#/components/board/board-ai-bookmarks/ai-bookmarks.data";
import { BoardAiBookmarkPaper } from "#/components/board/board-ai-bookmarks/board-ai-bookmark-paper";
import {
	BOARD_AI_BOOKMARKS_PAPERS_OFFSET_TOP_PX,
	BOARD_AI_BOOKMARKS_SECTION_HEIGHT_PX,
	BOARD_AI_BOOKMARKS_SECTION_WIDTH_PX,
	BOARD_AI_BOOKMARKS_TITLE,
	BOARD_AI_BOOKMARKS_TITLE_LEFT_PX,
	BOARD_AI_BOOKMARKS_TITLE_ROTATE_DEG,
	BOARD_AI_BOOKMARKS_TITLE_TOP_PX,
} from "#/components/board/board-ai-bookmarks/board-ai-bookmarks-constants";
import { BoardHandwrittenLabel } from "#/components/board/board-handwritten-label";

export const BoardAiBookmarks = () => {
	const stopBoardPan = useCallback((event: MouseEvent) => {
		event.stopPropagation();
	}, []);

	return (
		<section
			aria-label="IA bookmarks"
			className="pointer-events-auto relative shrink-0 overflow-visible"
			style={{
				height: BOARD_AI_BOOKMARKS_SECTION_HEIGHT_PX,
				width: BOARD_AI_BOOKMARKS_SECTION_WIDTH_PX,
			}}
		>
			<BoardHandwrittenLabel
				as="h2"
				className="pointer-events-none absolute z-20 text-[2.15rem]"
				style={{
					left: BOARD_AI_BOOKMARKS_TITLE_LEFT_PX,
					top: BOARD_AI_BOOKMARKS_TITLE_TOP_PX,
					transform: `rotate(${BOARD_AI_BOOKMARKS_TITLE_ROTATE_DEG}deg)`,
				}}
			>
				{BOARD_AI_BOOKMARKS_TITLE}
			</BoardHandwrittenLabel>

			<div
				className="absolute inset-x-0 bottom-0 overflow-visible"
				style={{ top: BOARD_AI_BOOKMARKS_PAPERS_OFFSET_TOP_PX }}
			>
				{aiBookmarks.map((bookmark) => (
					<BoardAiBookmarkPaper
						bookmark={bookmark}
						key={bookmark.id}
						onMouseDown={stopBoardPan}
					/>
				))}
			</div>
		</section>
	);
};
