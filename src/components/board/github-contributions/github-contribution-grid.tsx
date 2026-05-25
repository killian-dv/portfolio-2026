import type { RefObject } from "react";
import {
	type ContributionWeekCell,
	getWeekColumnKey,
	isFutureContributionSlot,
} from "#/components/board/github-contributions/build-contribution-weeks";
import { GithubContributionCell } from "#/components/board/github-contributions/github-contribution-cell";
import {
	GITHUB_CONTRIBUTIONS_CELL_GAP_PX,
	GITHUB_CONTRIBUTIONS_CELL_SIZE_PX,
} from "#/components/board/github-contributions/github-contributions-constants";
import type {
	ContributionHover,
	HoveredContributionCell,
} from "#/components/board/github-contributions/use-github-contributions-interaction";
import { cn } from "#/lib/utils";

interface GithubContributionGridProps {
	cardRef: RefObject<HTMLDivElement | null>;
	hoveredCell: HoveredContributionCell | null;
	isLoading: boolean;
	onCellHover: (hover: ContributionHover | null) => void;
	prefersReducedMotion: boolean;
	weeks: ContributionWeekCell[][];
}

const SKELETON_WEEKS = 53;
const SKELETON_ROWS = 7;

const SKELETON_WEEK_IDS = Array.from(
	{ length: SKELETON_WEEKS },
	(_, index) => `contrib-sk-week-${String(index).padStart(2, "0")}`
);

const SKELETON_ROW_IDS = Array.from(
	{ length: SKELETON_ROWS },
	(_, index) => `contrib-sk-row-${index}`
);

export const GithubContributionGrid = ({
	cardRef,
	hoveredCell,
	isLoading,
	onCellHover,
	prefersReducedMotion,
	weeks,
}: GithubContributionGridProps) => {
	if (isLoading) {
		return (
			<div
				aria-busy
				aria-label="Loading contribution graph"
				className="flex gap-[3px]"
				role="img"
			>
				{SKELETON_WEEK_IDS.map((weekId, weekIndex) => (
					<div className="flex flex-col gap-[3px]" key={weekId}>
						{SKELETON_ROW_IDS.map((rowId, rowIndex) => (
							<div
								className="animate-pulse rounded-[3px] bg-[#e8ecea]"
								key={`${weekId}-${rowId}`}
								style={{
									width: GITHUB_CONTRIBUTIONS_CELL_SIZE_PX,
									height: GITHUB_CONTRIBUTIONS_CELL_SIZE_PX,
									animationDelay: `${(weekIndex % 8) * 40 + rowIndex * 12}ms`,
								}}
							/>
						))}
					</div>
				))}
			</div>
		);
	}

	return (
		<div
			className={cn("flex pr-1", isLoading && "opacity-0")}
			style={{ gap: GITHUB_CONTRIBUTIONS_CELL_GAP_PX }}
		>
			{weeks.map((week, col) => (
				<div
					className="flex flex-col"
					key={getWeekColumnKey(week)}
					style={{ gap: GITHUB_CONTRIBUTIONS_CELL_GAP_PX }}
				>
					{week.map((cell) =>
						isFutureContributionSlot(cell) ? (
							<div
								aria-hidden
								className="shrink-0"
								key={cell.slotId}
								style={{
									width: GITHUB_CONTRIBUTIONS_CELL_SIZE_PX,
									height: GITHUB_CONTRIBUTIONS_CELL_SIZE_PX,
								}}
							/>
						) : (
							<GithubContributionCell
								cardRef={cardRef}
								col={col}
								day={cell}
								hoveredCell={hoveredCell}
								key={cell.date}
								onHover={onCellHover}
								prefersReducedMotion={prefersReducedMotion}
								row={new Date(`${cell.date}T12:00:00`).getDay()}
							/>
						)
					)}
				</div>
			))}
		</div>
	);
};
