import type { CSSProperties } from "react";

import { BoardHandwrittenLabel } from "#/components/board/board-handwritten-label";
import { cn } from "#/lib/utils";

export const BOARD_HANDWRITTEN_ANNOTATION_TEXTS = [
	"always learning",
	"frontend craft",
	"one more iteration",
	"worth bookmarking",
] as const;

export type BoardHandwrittenAnnotationText =
	(typeof BOARD_HANDWRITTEN_ANNOTATION_TEXTS)[number];

interface BoardHandwrittenAnnotationProps {
	className?: string;
	rotationDeg?: number;
	style?: CSSProperties;
	text: BoardHandwrittenAnnotationText;
}

export const BoardHandwrittenAnnotation = ({
	text,
	className,
	rotationDeg = -3,
	style,
}: BoardHandwrittenAnnotationProps) => (
	<BoardHandwrittenLabel
		aria-hidden
		className={cn(
			"board-desk-object board-desk-object--static pointer-events-none absolute z-20 whitespace-nowrap text-[#4a4a4a] text-[0.98rem] italic",
			className
		)}
		style={
			{
				...style,
				"--board-desk-rotate": `${rotationDeg}deg`,
			} as CSSProperties
		}
		variant="neutral"
	>
		{text}
	</BoardHandwrittenLabel>
);
