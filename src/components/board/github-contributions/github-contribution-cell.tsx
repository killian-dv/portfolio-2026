import { motion } from "motion/react";
import { type MouseEvent, type RefObject, useCallback } from "react";

import {
	GITHUB_CONTRIBUTION_EMPTY_COLOR,
	GITHUB_CONTRIBUTION_LEVEL_COLORS,
	GITHUB_CONTRIBUTIONS_CELL_SIZE_PX,
	GITHUB_CONTRIBUTIONS_CELL_SPRING,
} from "#/components/board/github-contributions/github-contributions-constants";
import {
	type ContributionHover,
	getAnchorInCard,
	type HoveredContributionCell,
} from "#/components/board/github-contributions/use-github-contributions-interaction";
import type { GithubContributionDay } from "#/lib/github-contributions-api";
import { cn } from "#/lib/utils";

interface GithubContributionCellProps {
	cardRef: RefObject<HTMLDivElement | null>;
	col: number;
	day: GithubContributionDay;
	hoveredCell: HoveredContributionCell | null;
	onHover: (hover: ContributionHover | null) => void;
	prefersReducedMotion: boolean;
	row: number;
}

const getCellColor = (day: GithubContributionDay) => {
	if (day.count === 0) {
		return GITHUB_CONTRIBUTION_EMPTY_COLOR;
	}
	const level = Math.min(Math.max(day.level, 1), 4);
	return GITHUB_CONTRIBUTION_LEVEL_COLORS[level - 1];
};

const getPropagationScale = (
	col: number,
	row: number,
	hovered: HoveredContributionCell | null
) => {
	if (!hovered?.date) {
		return 1;
	}
	const distance = Math.abs(col - hovered.col) + Math.abs(row - hovered.row);
	if (distance === 0) {
		return 1.14;
	}
	if (distance === 1) {
		return 1.04;
	}
	if (distance === 2) {
		return 1.015;
	}
	return 1;
};

export const GithubContributionCell = ({
	cardRef,
	col,
	day,
	hoveredCell,
	onHover,
	prefersReducedMotion,
	row,
}: GithubContributionCellProps) => {
	const isDirectHover =
		hoveredCell?.col === col &&
		hoveredCell.row === row &&
		hoveredCell.date === day.date;
	const scale = prefersReducedMotion
		? 1
		: getPropagationScale(col, row, hoveredCell);
	const color = getCellColor(day);

	const handleEnter = useCallback(
		(event: MouseEvent<HTMLButtonElement>) => {
			const card = cardRef.current;
			if (!card) {
				return;
			}
			const cell: HoveredContributionCell = {
				col,
				row,
				date: day.date,
				count: day.count,
			};
			onHover({
				anchor: getAnchorInCard(event.currentTarget, card),
				cell,
			});
		},
		[cardRef, col, day.count, day.date, onHover, row]
	);

	const handleLeave = useCallback(() => {
		onHover(null);
	}, [onHover]);

	return (
		<motion.button
			animate={{ scale }}
			aria-label={`${day.count} contributions on ${day.date}`}
			className={cn(
				"relative shrink-0 cursor-default rounded-[3px] border-0 p-0",
				"focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#4fbf9a]/50 focus-visible:outline-offset-1"
			)}
			data-contribution-cell
			onBlur={handleLeave}
			onMouseEnter={handleEnter}
			onMouseLeave={handleLeave}
			style={{
				width: GITHUB_CONTRIBUTIONS_CELL_SIZE_PX,
				height: GITHUB_CONTRIBUTIONS_CELL_SIZE_PX,
				backgroundColor: color,
				boxShadow: isDirectHover
					? "0 0 0 1px rgba(31,157,114,0.25), 0 0 14px rgba(79,191,154,0.35)"
					: undefined,
			}}
			transition={
				prefersReducedMotion
					? { duration: 0 }
					: GITHUB_CONTRIBUTIONS_CELL_SPRING
			}
			type="button"
		/>
	);
};
