import { motion } from "motion/react";
import { Suspense } from "react";
import type { ContributionWeekCell } from "#/components/board/github-contributions/build-contribution-weeks";
import { GithubContributionGrid } from "#/components/board/github-contributions/github-contribution-grid";
import {
	GITHUB_CONTRIBUTIONS_CARD_HEIGHT_PX,
	GITHUB_CONTRIBUTIONS_CARD_WIDTH_PX,
} from "#/components/board/github-contributions/github-contributions-constants";
import { GithubContributionsFooter } from "#/components/board/github-contributions/github-contributions-footer";
import { GithubContributionsHeader } from "#/components/board/github-contributions/github-contributions-header";
import { GithubContributionsRadialHighlight } from "#/components/board/github-contributions/github-contributions-radial-highlight";
import { GithubContributionsTooltip } from "#/components/board/github-contributions/github-contributions-tooltip";
import { useGithubContributionsData } from "#/components/board/github-contributions/use-github-contributions-data";
import { useGithubContributionsInteraction } from "#/components/board/github-contributions/use-github-contributions-interaction";
import { cn } from "#/lib/utils";

type GithubContributionsInteraction = ReturnType<
	typeof useGithubContributionsInteraction
>;

interface GithubContributionsCardBodyProps {
	interaction: GithubContributionsInteraction;
	isLoading: boolean;
	loadState: "ready" | "error";
	trailingYearTotal: number;
	weeks: ContributionWeekCell[][];
}

const GithubContributionsCardBody = ({
	interaction,
	isLoading,
	loadState,
	trailingYearTotal,
	weeks,
}: GithubContributionsCardBodyProps) => (
	<article
		className={cn(
			"relative flex h-full w-full flex-col overflow-hidden rounded-[20px]",
			"border border-board-widget-border bg-[#fafbfa]",
			"px-5 py-4",
			"shadow-board-github-idle"
		)}
		style={{
			boxShadow: interaction.isHovered
				? "var(--board-github-shadow-hover)"
				: undefined,
		}}
	>
		<GithubContributionsRadialHighlight
			glowOpacity={interaction.glowOpacity}
			pointerX={interaction.springX}
			pointerY={interaction.springY}
		/>

		<div
			aria-hidden
			className="pointer-events-none absolute inset-0 rounded-[20px] bg-[radial-gradient(ellipse_85%_55%_at_50%_-15%,color-mix(in_srgb,var(--board-github-accent)_6%,transparent),transparent_58%)]"
		/>

		<GithubContributionsHeader isHovered={interaction.isHovered} />

		<div className="relative z-10 mt-3 min-h-0 flex-1">
			<GithubContributionGrid
				cardRef={interaction.cardRef}
				hoveredCell={interaction.hover?.cell ?? null}
				isLoading={isLoading}
				onCellHover={interaction.handleCellHover}
				prefersReducedMotion={interaction.prefersReducedMotion}
				weeks={weeks}
			/>
		</div>

		<div className="relative z-10 mt-2">
			<GithubContributionsFooter
				isLoading={isLoading}
				trailingYearTotal={trailingYearTotal}
			/>
		</div>

		{loadState === "error" ? (
			<p className="absolute inset-x-5 bottom-4 z-20 m-0 text-[#8a9490] text-[12px]">
				Unable to load contributions
			</p>
		) : null}
	</article>
);

const BoardGithubContributionsCardContent = ({
	interaction,
}: {
	interaction: GithubContributionsInteraction;
}) => {
	const data = useGithubContributionsData();

	return (
		<GithubContributionsCardBody
			interaction={interaction}
			isLoading={false}
			loadState={data.loadState}
			trailingYearTotal={data.trailingYearTotal}
			weeks={data.weeks}
		/>
	);
};

const BoardGithubContributionsCardFallback = ({
	interaction,
}: {
	interaction: GithubContributionsInteraction;
}) => (
	<GithubContributionsCardBody
		interaction={interaction}
		isLoading
		loadState="ready"
		trailingYearTotal={0}
		weeks={[]}
	/>
);

export const BoardGithubContributionsCard = () => {
	const interaction = useGithubContributionsInteraction();

	return (
		<motion.div
			className="relative shrink-0 cursor-default overflow-visible"
			onMouseDown={interaction.stopBoardPan}
			onMouseEnter={interaction.handlePointerEnter}
			onMouseLeave={interaction.handlePointerLeave}
			onMouseMove={interaction.updatePointer}
			ref={interaction.cardRef}
			style={{
				height: GITHUB_CONTRIBUTIONS_CARD_HEIGHT_PX,
				width: GITHUB_CONTRIBUTIONS_CARD_WIDTH_PX,
			}}
		>
			<Suspense
				fallback={
					<BoardGithubContributionsCardFallback interaction={interaction} />
				}
			>
				<BoardGithubContributionsCardContent interaction={interaction} />
			</Suspense>

			<GithubContributionsTooltip hover={interaction.hover} />
		</motion.div>
	);
};
