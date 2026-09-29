import type { ReactNode } from "react";

import { BoardAlbumCard } from "#/components/board/album/board-album-card";
import { BoardAgentTerminal } from "#/components/board/board-agent-terminal/board-agent-terminal";
import { BoardAiBookmarks } from "#/components/board/board-ai-bookmarks/board-ai-bookmarks";
import type { BoardCellPlacementProps } from "#/components/board/board-cell-placement";
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
import { BoardPaperClip } from "#/components/board/decorations/board-paper-clip";
import { BoardPinnedPhoto } from "#/components/board/decorations/board-pinned-photo";
import { BoardPushPinCluster } from "#/components/board/decorations/board-push-pin-cluster";
import { BoardGithubContributionsCard } from "#/components/board/github-contributions/board-github-contributions-card";
import { BoardHeroCard } from "#/components/board/hero/board-hero-card";
import { BoardHeroContent } from "#/components/board/hero/board-hero-content";
import { BoardCroissantStamp } from "#/components/board/stamp/board-croissant-stamp";
import { BoardStockChartCard } from "#/components/board/stock-chart/board-stock-chart-card";
import { BLANK_GRID_AREA } from "#/lib/board-grid-config";

type BoardLayoutAt =
	| { row: number; col: number }
	| { area: typeof BLANK_GRID_AREA };

export interface BoardLayoutItem {
	at: BoardLayoutAt;
	content: ReactNode;
	/** Stable name — search this file by id when editing. */
	id: string;
	placement?: Omit<BoardCellPlacementProps, "children">;
}

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
		at: { col: 5, row: 5 },
		content: <BoardStickyNote note={stickyNotesById["deploy-friday"]} />,
		id: "sticky-deploy-friday",
		placement: { anchor: "top-left", offset: { x: 28, y: 0 } },
	},
	{
		at: { col: 1, row: 1 },
		content: (
			<BoardPinnedPhoto
				alt="Mountain — decorative polaroid"
				hold="pin"
				rotationDeg={2.5}
				src="/mountain.jpg"
			/>
		),
		id: "photo-mountain",
		placement: { anchor: "top-left", offset: { x: -200, y: 150 } },
	},
	{
		at: { col: 4, row: 4 },
		content: <BoardCroissantStamp />,
		id: "croissant-stamp",
		placement: { anchor: "top-left", offset: { x: -10, y: 0 } },
	},
	{
		at: { col: 0, row: 0 },
		content: <BoardPushPinCluster />,
		id: "push-pin-cluster-projects",
		placement: { anchor: "center", offset: { x: 100, y: 150 } },
	},
	{
		at: { col: 7, row: 3 },
		content: <BoardPushPinCluster rotationDeg={24} />,
		id: "push-pin-cluster-bookmarks",
		placement: { anchor: "top-left", offset: { x: 80, y: 120 } },
	},
	{
		at: { col: 6, row: 5 },
		content: <BoardSlackMessage />,
		id: "slack-message",
		placement: { anchor: "top-left", offset: { x: 90, y: 70 } },
	},
	{
		at: { col: 4, row: 1 },
		content: <BoardStockChartCard />,
		id: "stock-chart",
		placement: { anchor: "top-left", offset: { x: -50, y: -50 } },
	},
	{
		at: { col: 3, row: 1 },
		content: <BoardCalendarWidgetCard />,
		id: "calendar",
		placement: { anchor: "top-left", offset: { x: -100, y: 200 } },
	},
	{
		at: { col: 2, row: 1 },
		content: <BoardCertifications />,
		id: "certifications",
		placement: { anchor: "top-left", offset: { x: -200, y: -250 } },
	},
	{
		at: { col: 6, row: 4 },
		content: <BoardAiBookmarks />,
		id: "ai-bookmarks",
		placement: { anchor: "top-left", offset: { x: 0, y: -150 } },
	},
	{
		at: { col: 1, row: 2 },
		content: <BoardFavoriteTools />,
		id: "favorite-tools",
		placement: { anchor: "top-left", offset: { x: -130, y: 100 } },
	},
	{
		at: { col: 0, row: 3 },
		content: <BoardPaperClip rotationDeg={58} size={38} />,
		id: "paper-clip-pile-a-1",
		placement: { anchor: "center", offset: { x: 118, y: 38 } },
	},
	{
		at: { col: 0, row: 3 },
		content: <BoardPaperClip rotationDeg={12} size={34} />,
		id: "paper-clip-pile-a-2",
		placement: { anchor: "center", offset: { x: 142, y: 54 } },
	},
	{
		at: { col: 0, row: 3 },
		content: <BoardPaperClip rotationDeg={-28} size={36} />,
		id: "paper-clip-pile-a-3",
		placement: { anchor: "center", offset: { x: 104, y: 68 } },
	},
	{
		at: { col: 4, row: 0 },
		content: <BoardPaperClip rotationDeg={-41} size={42} />,
		id: "paper-clip-pile-b-1",
		placement: { anchor: "top-left", offset: { x: 28, y: 202 } },
	},
	{
		at: { col: 4, row: 0 },
		content: <BoardPaperClip rotationDeg={22} size={35} />,
		id: "paper-clip-pile-b-2",
		placement: { anchor: "top-left", offset: { x: 52, y: 188 } },
	},
	{
		at: { col: 4, row: 0 },
		content: <BoardPaperClip rotationDeg={-63} size={32} />,
		id: "paper-clip-pile-b-3",
		placement: { anchor: "top-left", offset: { x: 18, y: 178 } },
	},
	{
		at: { col: 3, row: 5 },
		content: <BoardPaperClip rotationDeg={74} size={40} />,
		id: "paper-clip-loose-3",
		placement: { anchor: "top-left", offset: { x: -140, y: 200 } },
	},
	{
		at: { col: 7, row: 5 },
		content: <BoardPaperClip rotationDeg={-19} size={37} />,
		id: "paper-clip-loose-4",
		placement: { anchor: "center", offset: { x: -60, y: 20 } },
	},
	{
		at: { col: 1, row: 1 },
		content: <BoardMarkerPen color="red" pose="flipped" rotationDeg={-38} />,
		id: "marker-red",
		placement: { anchor: "bottom-right", offset: { x: 100, y: 48 } },
	},
	{
		at: { col: 1, row: 4 },
		content: <BoardBoardingPassCard />,
		id: "boarding-pass",
		placement: { anchor: "top-left", offset: { x: -100, y: -50 } },
	},
	{
		at: { col: 5, row: 0 },
		content: <BoardProjects />,
		id: "projects",
		placement: { anchor: "top-left", offset: { x: 100, y: 150 } },
	},
	{
		at: { col: 3, row: 4 },
		content: <BoardExperiences />,
		id: "experiences",
		placement: { anchor: "top-left", offset: { x: -200, y: 150 } },
	},
	{
		at: { col: 5, row: 4 },
		content: (
			<BoardMarkerPen color="green" pose="dropped-cap" rotationDeg={14} />
		),
		id: "marker-green",
		placement: { anchor: "top-left", offset: { x: 70, y: -200 } },
	},
	{
		at: { col: 7, row: 2 },
		content: <BoardStickyNote note={stickyNotesById["learn-build"]} />,
		id: "sticky-learn-build",
		placement: { anchor: "top-left", offset: { x: 32, y: -100 } },
	},
	{
		at: { col: 3, row: 4 },
		content: (
			<BoardMarkerPen color="orange" pose="scattered" rotationDeg={-52} />
		),
		id: "marker-orange",
		placement: { anchor: "top-left", offset: { x: -150, y: 0 } },
	},
	{
		at: { area: BLANK_GRID_AREA },
		content: (
			<BoardHeroCard>
				<BoardHeroContent />
			</BoardHeroCard>
		),
		id: "hero",
		placement: { anchor: "center" },
	},
	{
		at: { col: 2, row: 5 },
		content: <BoardAlbumCard />,
		id: "album",
		placement: { anchor: "top-left", offset: { x: -100, y: 0 } },
	},
	{
		at: { col: 5, row: 3 },
		content: <BoardGithubContributionsCard />,
		id: "github-contributions",
		placement: { anchor: "top-left", offset: { x: 100, y: -140 } },
	},
	{
		at: { col: 0, row: 5 },
		content: <BoardMarkerPen color="purple" pose="upright" rotationDeg={45} />,
		id: "marker-purple",
		placement: { anchor: "top-left", offset: { x: 250, y: 20 } },
	},
	{
		at: { col: 7, row: 1 },
		content: <BoardMarkerPen color="blue" pose="default" rotationDeg={-67} />,
		id: "marker-blue",
		placement: { anchor: "top-left", offset: { x: 20, y: -30 } },
	},
	{
		at: { col: 5, row: 4 },
		content: <BoardAgentTerminal />,
		id: "agent-terminal",
		placement: { anchor: "top-left", offset: { x: -100, y: 50 } },
	},
];
