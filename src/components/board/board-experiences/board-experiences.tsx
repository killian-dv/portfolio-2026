import { type MouseEvent, useCallback } from "react";
import { BoardExperienceCard } from "#/components/board/board-experiences/board-experience-card";
import {
	BOARD_EXPERIENCES_ENTRIES,
	BOARD_EXPERIENCES_SECTION_HEIGHT_PX,
	BOARD_EXPERIENCES_SECTION_WIDTH_PX,
	BOARD_EXPERIENCES_TITLE,
} from "#/components/board/board-experiences/board-experiences-constants";
import { BoardExperiencesPath } from "#/components/board/board-experiences/board-experiences-path";
import { BoardHandwrittenLabel } from "#/components/board/board-handwritten-label";

export const BoardExperiences = () => {
	const stopBoardPan = useCallback((event: MouseEvent) => {
		event.stopPropagation();
	}, []);

	return (
		<section
			aria-label="Board experiences"
			className="relative shrink-0 overflow-visible"
			style={{
				height: BOARD_EXPERIENCES_SECTION_HEIGHT_PX,
				width: BOARD_EXPERIENCES_SECTION_WIDTH_PX,
			}}
		>
			<BoardHandwrittenLabel
				as="h2"
				className="pointer-events-none absolute z-20 text-[2.35rem]"
				style={{
					left: 36,
					top: 18,
					transform: "rotate(-2.8deg)",
				}}
				variant="blue"
			>
				{BOARD_EXPERIENCES_TITLE}
			</BoardHandwrittenLabel>

			<BoardExperiencesPath />

			{BOARD_EXPERIENCES_ENTRIES.map((entry) => (
				<BoardExperienceCard
					entry={entry}
					key={entry.id}
					onMouseDown={stopBoardPan}
				/>
			))}
		</section>
	);
};
