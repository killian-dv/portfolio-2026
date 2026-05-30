import type { CSSProperties } from "react";
import { BoardHandwrittenLabel } from "#/components/board/board-handwritten-label";
import {
	BOARD_STICKY_NOTE_MIN_HEIGHT_PX,
	BOARD_STICKY_NOTE_WIDTH_PX,
} from "#/components/board/board-sticky-notes/board-sticky-notes-constants";
import type { StickyNote } from "#/components/board/board-sticky-notes/sticky-notes.data";
import { cn } from "#/lib/utils";

interface BoardStickyNoteProps {
	className?: string;
	note: StickyNote;
	style?: CSSProperties;
}

export const BoardStickyNote = ({
	note,
	className,
	style,
}: BoardStickyNoteProps) => (
	<div
		aria-hidden
		className={cn("pointer-events-none absolute shrink-0", className)}
		style={{
			...style,
			transform: `rotate(${note.rotationDeg}deg)`,
		}}
	>
		<div
			className={cn(
				"board-sticky-note relative flex flex-col justify-center gap-1 px-4 py-5",
				note.variant === "yellow" && "board-sticky-note--yellow",
				note.variant === "sage" && "board-sticky-note--sage"
			)}
			data-variant={note.variant}
			style={{
				width: BOARD_STICKY_NOTE_WIDTH_PX,
				minHeight: BOARD_STICKY_NOTE_MIN_HEIGHT_PX,
			}}
		>
			<div
				aria-hidden
				className="board-sticky-note-tape pointer-events-none absolute top-0 left-1/2 z-10 -translate-x-1/2 -translate-y-[42%]"
			/>

			<BoardHandwrittenLabel
				as="p"
				className="relative z-[1] m-0 text-center text-[#3a3834] text-[1.22rem] leading-[1.15]"
				variant="neutral"
			>
				{note.lines[0]}
			</BoardHandwrittenLabel>
			<BoardHandwrittenLabel
				as="p"
				className={cn(
					"relative z-[1] m-0 text-center text-[#3a3834] leading-[1.12]",
					note.id === "deploy-friday"
						? "text-[1.05rem] opacity-90"
						: "text-[1.18rem]"
				)}
				variant="neutral"
			>
				{note.lines[1]}
			</BoardHandwrittenLabel>
		</div>
	</div>
);
