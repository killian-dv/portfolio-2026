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
		id: "sticky-deploy-friday",
		at: { row: 5, col: 5 },
		placement: { anchor: "top-left", offset: { x: 28, y: 0 } },
		content: <BoardStickyNote note={stickyNotesById["deploy-friday"]} />,
	},
	{
		id: "photo-mountain",
		at: { row: 1, col: 1 },
		placement: { anchor: "top-left", offset: { x: -200, y: 150 } },
		content: (
			<BoardPinnedPhoto
				alt="Mountain — decorative polaroid"
				hold="pin"
				rotationDeg={2.5}
				src="/mountain.jpg"
			/>
		),
	},
	{
		id: "croissant-stamp",
		at: { row: 4, col: 4 },
		placement: { anchor: "top-left", offset: { x: -10, y: 0 } },
		content: <BoardCroissantStamp />,
	},
	{
		id: "push-pin-cluster-projects",
		at: { row: 0, col: 0 },
		placement: { anchor: "center", offset: { x: 100, y: 150 } },
		content: <BoardPushPinCluster />,
	},
	{
		id: "push-pin-cluster-bookmarks",
		at: { row: 3, col: 7 },
		placement: { anchor: "top-left", offset: { x: 80, y: 120 } },
		content: <BoardPushPinCluster rotationDeg={24} />,
	},
	{
		id: "slack-message",
		at: { row: 5, col: 6 },
		placement: { anchor: "top-left", offset: { x: 90, y: 70 } },
		content: <BoardSlackMessage />,
	},
	{
		id: "stock-chart",
		at: { row: 1, col: 4 },
		placement: { anchor: "top-left", offset: { x: -50, y: -50 } },
		content: <BoardStockChartCard />,
	},
	{
		id: "calendar",
		at: { row: 1, col: 3 },
		placement: { anchor: "top-left", offset: { x: -100, y: 200 } },
		content: <BoardCalendarWidgetCard />,
	},
	{
		id: "certifications",
		at: { row: 1, col: 2 },
		placement: { anchor: "top-left", offset: { x: -200, y: -250 } },
		content: <BoardCertifications />,
	},
	{
		id: "ai-bookmarks",
		at: { row: 4, col: 6 },
		placement: { anchor: "top-left", offset: { x: 0, y: -150 } },
		content: <BoardAiBookmarks />,
	},
	{
		id: "favorite-tools",
		at: { row: 2, col: 1 },
		placement: { anchor: "top-left", offset: { x: -130, y: 100 } },
		content: <BoardFavoriteTools />,
	},
	{
		id: "paper-clip-pile-a-1",
		at: { row: 3, col: 0 },
		placement: { anchor: "center", offset: { x: 118, y: 38 } },
		content: <BoardPaperClip rotationDeg={58} size={38} />,
	},
	{
		id: "paper-clip-pile-a-2",
		at: { row: 3, col: 0 },
		placement: { anchor: "center", offset: { x: 142, y: 54 } },
		content: <BoardPaperClip rotationDeg={12} size={34} />,
	},
	{
		id: "paper-clip-pile-a-3",
		at: { row: 3, col: 0 },
		placement: { anchor: "center", offset: { x: 104, y: 68 } },
		content: <BoardPaperClip rotationDeg={-28} size={36} />,
	},
	{
		id: "paper-clip-pile-b-1",
		at: { row: 0, col: 4 },
		placement: { anchor: "top-left", offset: { x: 28, y: 202 } },
		content: <BoardPaperClip rotationDeg={-41} size={42} />,
	},
	{
		id: "paper-clip-pile-b-2",
		at: { row: 0, col: 4 },
		placement: { anchor: "top-left", offset: { x: 52, y: 188 } },
		content: <BoardPaperClip rotationDeg={22} size={35} />,
	},
	{
		id: "paper-clip-pile-b-3",
		at: { row: 0, col: 4 },
		placement: { anchor: "top-left", offset: { x: 18, y: 178 } },
		content: <BoardPaperClip rotationDeg={-63} size={32} />,
	},
	{
		id: "paper-clip-loose-3",
		at: { row: 5, col: 3 },
		placement: { anchor: "top-left", offset: { x: -140, y: 200 } },
		content: <BoardPaperClip rotationDeg={74} size={40} />,
	},
	{
		id: "paper-clip-loose-4",
		at: { row: 5, col: 7 },
		placement: { anchor: "center", offset: { x: -60, y: 20 } },
		content: <BoardPaperClip rotationDeg={-19} size={37} />,
	},
	{
		id: "marker-red",
		at: { row: 1, col: 1 },
		placement: { anchor: "bottom-right", offset: { x: 100, y: 48 } },
		content: <BoardMarkerPen color="red" pose="flipped" rotationDeg={-38} />,
	},
	{
		id: "boarding-pass",
		at: { row: 4, col: 1 },
		placement: { anchor: "top-left", offset: { x: -100, y: -50 } },
		content: <BoardBoardingPassCard />,
	},
	{
		id: "projects",
		at: { row: 0, col: 5 },
		placement: { anchor: "top-left", offset: { x: 100, y: 150 } },
		content: <BoardProjects />,
	},
	{
		id: "experiences",
		at: { row: 4, col: 3 },
		placement: { anchor: "top-left", offset: { x: -200, y: 150 } },
		content: <BoardExperiences />,
	},
	{
		id: "marker-green",
		at: { row: 4, col: 5 },
		placement: { anchor: "top-left", offset: { x: 70, y: -200 } },
		content: (
			<BoardMarkerPen color="green" pose="dropped-cap" rotationDeg={14} />
		),
	},
	{
		id: "sticky-learn-build",
		at: { row: 2, col: 7 },
		placement: { anchor: "top-left", offset: { x: 32, y: -100 } },
		content: <BoardStickyNote note={stickyNotesById["learn-build"]} />,
	},
	{
		id: "marker-orange",
		at: { row: 4, col: 3 },
		placement: { anchor: "top-left", offset: { x: -150, y: 0 } },
		content: (
			<BoardMarkerPen color="orange" pose="scattered" rotationDeg={-52} />
		),
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
		at: { row: 5, col: 2 },
		placement: { anchor: "top-left", offset: { x: -100, y: 0 } },
		content: <BoardAlbumCard />,
	},
	{
		id: "github-contributions",
		at: { row: 3, col: 5 },
		placement: { anchor: "top-left", offset: { x: 100, y: -140 } },
		content: <BoardGithubContributionsCard />,
	},
	{
		id: "marker-purple",
		at: { row: 5, col: 0 },
		placement: { anchor: "top-left", offset: { x: 250, y: 20 } },
		content: <BoardMarkerPen color="purple" pose="upright" rotationDeg={45} />,
	},
	{
		id: "marker-blue",
		at: { row: 1, col: 7 },
		placement: { anchor: "top-left", offset: { x: 20, y: -30 } },
		content: <BoardMarkerPen color="blue" pose="default" rotationDeg={-67} />,
	},
	{
		id: "agent-terminal",
		at: { row: 4, col: 5 },
		placement: { anchor: "top-left", offset: { x: -100, y: 50 } },
		content: <BoardAgentTerminal />,
	},
];
