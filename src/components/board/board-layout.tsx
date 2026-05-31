import type { ReactNode } from "react";

import { BoardAlbumCard } from "#/components/board/album/board-album-card";
import { BoardAgentTerminal } from "#/components/board/board-agent-terminal/board-agent-terminal";
import { BoardAiBookmarks } from "#/components/board/board-ai-bookmarks/board-ai-bookmarks";
import type { BoardCellPlacementProps } from "#/components/board/board-cell-placement";
import type { BoardCellSlotProps } from "#/components/board/board-cell-slot";
import { BoardCertifications } from "#/components/board/board-certifications/board-certifications";
import { BoardExperiences } from "#/components/board/board-experiences/board-experiences";
import { BoardFavoriteTools } from "#/components/board/board-favorite-tools/board-favorite-tools";
import { BoardProjects } from "#/components/board/board-projects/board-projects";
import { BoardSlackMessage } from "#/components/board/board-slack-message/board-slack-message";
import { BoardStickyNote } from "#/components/board/board-sticky-notes/board-sticky-note";
import { stickyNotesById } from "#/components/board/board-sticky-notes/sticky-notes.data";
import { BoardBoardingPassCard } from "#/components/board/boarding-pass/board-boarding-pass-card";
import { BoardCalendarWidgetCard } from "#/components/board/calendar/board-calendar-widget-card";
import { BoardMarkerPen } from "#/components/board/decorations/board-marker-pen";
import { BoardPinnedPhoto } from "#/components/board/decorations/board-pinned-photo";
import { BoardPushPinCluster } from "#/components/board/decorations/board-push-pin-cluster";
import { BoardGithubContributionsCard } from "#/components/board/github-contributions/board-github-contributions-card";
import { BoardHeroCard } from "#/components/board/hero/board-hero-card";
import { BoardHeroContent } from "#/components/board/hero/board-hero-content";
import { BoardCroissantStamp } from "#/components/board/stamp/board-croissant-stamp";
import { BoardStockChartCard } from "#/components/board/stock-chart/board-stock-chart-card";
import {
	BLANK_GRID_AREA,
	type BoardGridArea,
	boardCell,
} from "#/lib/board-grid-config";

type BoardLayoutAt =
	| { row: number; col: number }
	| { area: typeof BLANK_GRID_AREA };

export interface BoardLayoutItem {
	at: BoardLayoutAt;
	content: ReactNode;
	/** Stable name — search this file by id when editing. */
	id: string;
	placement?: Omit<BoardCellPlacementProps, "children">;
	slot?: Omit<BoardCellSlotProps, "area" | "children">;
}

const resolveArea = (at: BoardLayoutAt): BoardGridArea => {
	if ("area" in at) {
		return at.area;
	}
	return boardCell(at.row, at.col);
};

/**
 * Single source of truth for what appears on the board.
 *
 * - Move a widget: change `at.row` / `at.col`.
 * - Nudge inside a cell: tweak `placement.offset` (px, %, or negative).
 * - Sit between two cells: anchor the nearest square, then e.g.
 *   `offset: { x: boardCellOffset(-0.5).x }` or `offset: { x: -120 }`.
 */
export const BOARD_LAYOUT: BoardLayoutItem[] = [
	{
		id: "sticky-deploy-friday",
		at: { row: 0, col: 0 },
		placement: { anchor: "bottom-right", offset: { x: 28, y: 36 } },
		content: <BoardStickyNote note={stickyNotesById["deploy-friday"]} />,
	},
	{
		id: "photo-mountain",
		at: { row: 0, col: 1 },
		placement: { anchor: "bottom-left", offset: { x: 18, y: 16 } },
		content: (
			<BoardPinnedPhoto
				alt="Adamantine — decorative polaroid"
				hold="pin"
				rotationDeg={2.5}
				src="/mountain.jpg"
			/>
		),
	},
	{
		id: "croissant-stamp",
		at: { row: 0, col: 2 },
		placement: { anchor: "center" },
		content: <BoardCroissantStamp />,
	},
	{
		id: "push-pin-cluster",
		at: { row: 0, col: 6 },
		placement: { anchor: "top-center", offset: { y: 52 } },
		content: <BoardPushPinCluster />,
	},
	{
		id: "slack-message",
		at: { row: 1, col: 0 },
		placement: { anchor: "top-left", offset: { x: 20, y: 56 } },
		content: <BoardSlackMessage />,
	},
	{
		id: "stock-chart",
		at: { row: 1, col: 1 },
		content: <BoardStockChartCard />,
	},
	{
		id: "calendar",
		at: { row: 1, col: 2 },
		content: <BoardCalendarWidgetCard />,
	},
	{
		id: "certifications",
		at: { row: 1, col: 3 },
		slot: { pointerEvents: "none", zIndex: 20 },
		placement: { anchor: "top-left" },
		content: <BoardCertifications />,
	},
	{
		id: "ai-bookmarks",
		at: { row: 1, col: 5 },
		placement: { anchor: "top-left" },
		content: <BoardAiBookmarks />,
	},
	{
		id: "favorite-tools",
		at: { row: 1, col: 6 },
		placement: { anchor: "top-left" },
		content: <BoardFavoriteTools />,
	},
	{
		id: "marker-red",
		at: { row: 1, col: 7 },
		placement: { anchor: "bottom-left", offset: { x: 24, y: 48 } },
		content: <BoardMarkerPen color="red" rotationDeg={-26} />,
	},
	{
		id: "boarding-pass",
		at: { row: 2, col: 0 },
		placement: { anchor: "center" },
		content: <BoardBoardingPassCard />,
	},
	{
		id: "projects",
		at: { row: 2, col: 2 },
		slot: { pointerEvents: "none", zIndex: 30 },
		placement: { anchor: "top-right" },
		content: <BoardProjects />,
	},
	{
		id: "experiences",
		at: { row: 2, col: 5 },
		placement: { anchor: "top-left" },
		content: <BoardExperiences />,
	},
	{
		id: "marker-green",
		at: { row: 2, col: 7 },
		placement: { anchor: "top-left", offset: { x: 28, y: 72 } },
		content: <BoardMarkerPen color="green" rotationDeg={-31} />,
	},
	{
		id: "sticky-learn-build",
		at: { row: 3, col: 0 },
		placement: { anchor: "top-right", offset: { x: 32, y: 40 } },
		content: <BoardStickyNote note={stickyNotesById["learn-build"]} />,
	},
	{
		id: "marker-orange",
		at: { row: 3, col: 1 },
		placement: { anchor: "bottom-left", offset: { x: 32, y: 64 } },
		content: <BoardMarkerPen color="orange" rotationDeg={-16} />,
	},
	{
		id: "hero",
		at: { area: BLANK_GRID_AREA },
		placement: { anchor: "center" },
		content: (
			<BoardHeroCard>
				<BoardHeroContent />
			</BoardHeroCard>
		),
	},
	{
		id: "album",
		at: { row: 4, col: 1 },
		placement: { anchor: "center" },
		content: <BoardAlbumCard />,
	},
	{
		id: "github-contributions",
		at: { row: 4, col: 5 },
		placement: { anchor: "top-right" },
		content: <BoardGithubContributionsCard />,
	},
	{
		id: "marker-purple",
		at: { row: 5, col: 0 },
		placement: { anchor: "top-right", offset: { x: 36, y: 96 } },
		content: <BoardMarkerPen color="purple" rotationDeg={-19} />,
	},
	{
		id: "marker-blue",
		at: { row: 5, col: 1 },
		placement: { anchor: "top-right", offset: { x: 40, y: 108 } },
		content: <BoardMarkerPen color="blue" rotationDeg={-24} />,
	},
	{
		id: "agent-terminal",
		at: { row: 5, col: 5 },
		placement: { anchor: "bottom-left", offset: { x: 22, y: 28 } },
		content: <BoardAgentTerminal />,
	},
];

export const boardLayoutAreaById = (id: string) =>
	resolveArea(
		BOARD_LAYOUT.find((item) => item.id === id)?.at ?? { row: 0, col: 0 }
	);
