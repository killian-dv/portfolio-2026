import { type MouseEvent, useCallback } from "react";

import { BoardCertificationCard } from "#/components/board/board-certifications/board-certification-card";
import {
	BOARD_CERTIFICATIONS_SECTION_HEIGHT_PX,
	BOARD_CERTIFICATIONS_SECTION_WIDTH_PX,
	BOARD_CERTIFICATIONS_TITLE,
} from "#/components/board/board-certifications/board-certifications-constants";
import { CERTIFICATIONS } from "#/components/board/board-certifications/certifications.data";
import { BoardHandwrittenLabel } from "#/components/board/board-handwritten-label";

export const BoardCertifications = () => {
	const stopBoardPan = useCallback((event: MouseEvent) => {
		event.stopPropagation();
	}, []);

	return (
		<section
			aria-label="Board certifications"
			className="pointer-events-auto relative shrink-0 overflow-visible"
			style={{
				height: BOARD_CERTIFICATIONS_SECTION_HEIGHT_PX,
				width: BOARD_CERTIFICATIONS_SECTION_WIDTH_PX,
			}}
		>
			<BoardHandwrittenLabel
				as="h2"
				className="pointer-events-none absolute z-20 text-[2.15rem]"
				style={{
					left: 14,
					top: 6,
					transform: "rotate(-2.4deg)",
				}}
			>
				{BOARD_CERTIFICATIONS_TITLE}
			</BoardHandwrittenLabel>

			{CERTIFICATIONS.map((certification) => (
				<BoardCertificationCard
					certification={certification}
					key={certification.id}
					onMouseDown={stopBoardPan}
				/>
			))}
		</section>
	);
};
