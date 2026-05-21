import { BoardAlbumCard } from "#/components/board/album/board-album-card";
import { BoardHeroCard } from "#/components/board/hero/board-hero-card";
import { BoardHeroContent } from "#/components/board/hero/board-hero-content";
import { BoardStockChartCard } from "#/components/board/stock-chart/board-stock-chart-card";
import type { BoardGridArea } from "#/lib/board-grid-config";

interface BoardGridCellProps {
	area: BoardGridArea;
}

export const BoardGridCell = ({ area }: BoardGridCellProps) => {
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

	if (area === "g42") {
		return (
			<div
				className="relative h-full w-full overflow-visible rounded-xl"
				data-area="g42"
				data-clickable="false"
				style={{ gridArea: "g42" }}
			>
				<div className="relative flex h-full w-full items-center justify-center overflow-visible bg-transparent">
					<BoardStockChartCard />
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
