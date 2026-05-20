import { BoardHeroCard } from "#/components/board/board-hero-card";
import { BoardHeroContent } from "#/components/board/board-hero-content";
import type { BoardGridArea } from "#/lib/board-grid-config";

interface BoardGridCellProps {
	area: BoardGridArea;
}

export const BoardGridCell = ({ area }: BoardGridCellProps) => {
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
