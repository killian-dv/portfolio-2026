import {
	BOARD_EXPERIENCES_PATH_D,
	BOARD_EXPERIENCES_SECTION_HEIGHT_PX,
	BOARD_EXPERIENCES_SECTION_WIDTH_PX,
} from "#/components/board/board-experiences/board-experiences-constants";

export const BoardExperiencesPath = () => (
	// biome-ignore lint/a11y/noSvgWithoutTitle: decorative connectors
	<svg
		aria-hidden
		className="pointer-events-none absolute inset-0 z-0 overflow-visible stroke-foreground/14"
		height={BOARD_EXPERIENCES_SECTION_HEIGHT_PX}
		viewBox={`0 0 ${BOARD_EXPERIENCES_SECTION_WIDTH_PX} ${BOARD_EXPERIENCES_SECTION_HEIGHT_PX}`}
		width={BOARD_EXPERIENCES_SECTION_WIDTH_PX}
	>
		{BOARD_EXPERIENCES_PATH_D.map((d) => (
			<path
				className="fill-none"
				d={d}
				key={d}
				strokeDasharray="2.5 5.5"
				strokeLinecap="round"
				strokeWidth={1.15}
			/>
		))}
	</svg>
);
