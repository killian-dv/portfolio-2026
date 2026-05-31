import type { ReactNode } from "react";

import { BoardMarkerPen } from "#/components/board/decorations/board-marker-pen";
import { BoardPinnedPhoto } from "#/components/board/decorations/board-pinned-photo";
import { BoardPushPinCluster } from "#/components/board/decorations/board-push-pin-cluster";
import type { BoardGridArea } from "#/lib/board-grid-config";

const decorationCellClass =
	"relative h-full w-full overflow-visible rounded-xl";

const DecorationCell = ({
	area,
	children,
}: {
	area: BoardGridArea;
	children: ReactNode;
}) => (
	<div
		className={decorationCellClass}
		data-area={area}
		data-clickable="false"
		style={{ gridArea: area }}
	>
		{children}
	</div>
);

const BOARD_CELL_DECORATIONS: Partial<Record<BoardGridArea, ReactNode>> = {
	g2: (
		<BoardPinnedPhoto
			alt="Adamantine — decorative polaroid"
			className="bottom-[16px] left-[18px]"
			hold="pin"
			rotationDeg={2.5}
			src="/mountain.jpg"
		/>
	),
	g7: <BoardPushPinCluster className="top-[52px] left-1/2 -translate-x-1/2" />,
	g10: (
		<BoardMarkerPen
			className="bottom-[64px] left-[32px]"
			color="orange"
			rotationDeg={-16}
		/>
	),
	g14: (
		<BoardMarkerPen
			className="top-[72px] left-[28px]"
			color="green"
			rotationDeg={-31}
		/>
	),
	g25: (
		<BoardMarkerPen
			className="top-[108px] right-[40px]"
			color="blue"
			rotationDeg={-24}
		/>
	),
	g33: (
		<BoardMarkerPen
			className="top-[96px] right-[36px]"
			color="purple"
			rotationDeg={-19}
		/>
	),
	g37: (
		<BoardMarkerPen
			className="bottom-[48px] left-[24px]"
			color="red"
			rotationDeg={-26}
		/>
	),
};

export const renderBoardCellDecoration = (
	area: BoardGridArea
): ReactNode | null => {
	const decoration = BOARD_CELL_DECORATIONS[area];
	if (!decoration) {
		return null;
	}

	return <DecorationCell area={area}>{decoration}</DecorationCell>;
};
