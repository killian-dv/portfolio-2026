import { memo } from "react";

import type { ContributionHover } from "#/components/board/github-contributions/use-github-contributions-interaction";
import { cn } from "#/lib/utils";

interface GithubContributionsTooltipProps {
	hover: ContributionHover | null;
}

const TOOLTIP_GAP_PX = 8;
const FLIP_BELOW_CARD_Y = 40;

const formatTooltipDate = (date: string) =>
	new Intl.DateTimeFormat("en-US", {
		day: "numeric",
		month: "short",
		weekday: "long",
		year: "numeric",
	}).format(new Date(`${date}T12:00:00`));

const contributionLabel = (count: number) =>
	count === 1 ? "1 contribution" : `${count} contributions`;

export const GithubContributionsTooltip = memo(
	({ hover }: GithubContributionsTooltipProps) => {
		if (!hover) {
			return null;
		}

		const { anchor, cell } = hover;
		const showBelow = anchor.y < FLIP_BELOW_CARD_Y;

		return (
			<div
				className={cn(
					"pointer-events-none absolute z-50 w-max min-w-[168px] rounded-lg border border-white/60",
					"bg-white/90 px-3 py-2",
					"shadow-board-floating-panel",
					"backdrop-blur-xl transition-opacity duration-150"
				)}
				role="tooltip"
				style={{
					left: anchor.x,
					top: anchor.y,
					transform: showBelow
						? `translate(-50%, ${TOOLTIP_GAP_PX}px)`
						: `translate(-50%, calc(-100% - ${TOOLTIP_GAP_PX}px))`,
				}}
			>
				<p className="m-0 whitespace-nowrap font-medium text-[12px] text-board-github-foreground leading-tight tracking-[-0.01em]">
					{contributionLabel(cell.count)}
				</p>
				<p className="m-0 mt-0.5 whitespace-nowrap text-[11px] text-board-github-muted leading-tight">
					{formatTooltipDate(cell.date)}
				</p>
			</div>
		);
	}
);

GithubContributionsTooltip.displayName = "GithubContributionsTooltip";
