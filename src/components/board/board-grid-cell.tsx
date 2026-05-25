import { BoardAlbumCard } from "#/components/board/album/board-album-card";
import { BoardExperiences } from "#/components/board/board-experiences/board-experiences";
import { BoardBoardingPassCard } from "#/components/board/boarding-pass/board-boarding-pass-card";
import { BoardCalendarWidgetCard } from "#/components/board/calendar/board-calendar-widget-card";
import { BoardGithubContributionsCard } from "#/components/board/github-contributions/board-github-contributions-card";
import { BoardHeroCard } from "#/components/board/hero/board-hero-card";
import { BoardHeroContent } from "#/components/board/hero/board-hero-content";
import { BoardCroissantStamp } from "#/components/board/stamp/board-croissant-stamp";
import { BoardStockChartCard } from "#/components/board/stock-chart/board-stock-chart-card";
import type { BoardGridArea } from "#/lib/board-grid-config";

interface BoardGridCellProps {
	area: BoardGridArea;
}

export const BoardGridCell = ({ area }: BoardGridCellProps) => {
	if (area === "g23") {
		return (
			<div
				className="relative flex h-full w-full items-start justify-end overflow-visible rounded-xl"
				data-area="g23"
				data-clickable="false"
				style={{ gridArea: "g23" }}
			>
				<BoardGithubContributionsCard />
			</div>
		);
	}

	if (area === "g3") {
		return (
			<div
				className="relative h-full w-full overflow-visible rounded-xl"
				data-area="g3"
				data-clickable="false"
				style={{ gridArea: "g3" }}
			>
				<div className="relative flex h-full w-full items-center justify-center overflow-visible bg-transparent">
					<BoardCroissantStamp />
				</div>
			</div>
		);
	}

	if (area === "g20") {
		return (
			<div
				className="relative h-full w-full overflow-visible rounded-xl"
				data-area="g20"
				data-clickable="false"
				style={{ gridArea: "g20" }}
			>
				<div className="relative flex h-full w-full items-center justify-center overflow-visible bg-transparent">
					<BoardAlbumCard />
				</div>
			</div>
		);
	}

	if (area === "g28") {
		return (
			<div
				className="relative h-full w-full overflow-visible rounded-xl"
				data-area="g28"
				data-clickable="false"
				style={{ gridArea: "g28" }}
			>
				<div className="relative flex h-full w-full items-center justify-center overflow-visible bg-transparent">
					<BoardBoardingPassCard />
				</div>
			</div>
		);
	}

	if (area === "g31") {
		return (
			<div
				className="relative overflow-visible rounded-xl"
				data-area="g31"
				data-clickable="false"
				style={{ gridArea: "g31" }}
			>
				<BoardCalendarWidgetCard />
			</div>
		);
	}

	if (area === "g42") {
		return (
			<div
				className="relative h-full w-full overflow-visible rounded-xl"
				data-area="g42"
				data-clickable="false"
				style={{ gridArea: "g42" }}
			>
				<BoardStockChartCard />
			</div>
		);
	}

	if (area === "g17") {
		return (
			<div
				className="relative h-full w-full overflow-visible rounded-xl"
				data-area="g17"
				data-clickable="false"
				style={{ gridArea: "g17" }}
			>
				<div className="relative flex h-full w-full items-start justify-start overflow-visible bg-transparent">
					<BoardExperiences />
				</div>
			</div>
		);
	}

	if (area === "blank") {
		return (
			<div
				className="relative h-full w-full overflow-visible rounded-xl"
				data-area="blank"
				data-clickable="false"
				style={{ gridArea: "blank" }}
			>
				<div className="relative flex h-full w-full items-center justify-center overflow-visible bg-transparent">
					<BoardHeroCard>
						<BoardHeroContent />
					</BoardHeroCard>
				</div>
			</div>
		);
	}

	return (
		<div
			className="relative h-full w-full overflow-visible rounded-xl"
			data-area={area}
			style={{ gridArea: area }}
		/>
	);
};
