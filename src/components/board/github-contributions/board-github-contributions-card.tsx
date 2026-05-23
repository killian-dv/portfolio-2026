import { motion } from "motion/react";

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

export const BoardGithubContributionsCard = () => {
	const data = useGithubContributionsData();
	const interaction = useGithubContributionsInteraction();
	const isLoading = data.loadState === "loading" || data.loadState === "idle";

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
			<article
				className={cn(
					"relative flex h-full w-full flex-col overflow-hidden rounded-[20px]",
					"border border-black/[0.06] bg-[#fafbfa]",
					"px-5 py-4",
					"shadow-[0_1px_0_0_rgba(255,255,255,0.9)_inset,0_14px_36px_-22px_rgba(0,0,0,0.18)]"
				)}
				style={{
					boxShadow: interaction.isHovered
						? "0 1px 0 0 rgba(255,255,255,0.95) inset, 0 22px 48px -24px rgba(0,0,0,0.16)"
						: "0 1px 0 0 rgba(255,255,255,0.9) inset, 0 14px 36px -22px rgba(0,0,0,0.18)",
				}}
			>
				<GithubContributionsRadialHighlight
					glowOpacity={interaction.glowOpacity}
					pointerX={interaction.springX}
					pointerY={interaction.springY}
				/>

				<div
					aria-hidden
					className="pointer-events-none absolute inset-0 rounded-[20px] bg-[radial-gradient(ellipse_85%_55%_at_50%_-15%,rgba(79,191,154,0.06),transparent_58%)]"
				/>

				<GithubContributionsHeader isHovered={interaction.isHovered} />

				<div className="relative z-10 mt-3 min-h-0 flex-1">
					<GithubContributionGrid
						cardRef={interaction.cardRef}
						hoveredCell={interaction.hover?.cell ?? null}
						isLoading={isLoading}
						onCellHover={interaction.handleCellHover}
						prefersReducedMotion={interaction.prefersReducedMotion}
						weeks={data.weeks}
					/>
				</div>

				<div className="relative z-10 mt-2">
					<GithubContributionsFooter
						isLoading={isLoading}
						trailingYearTotal={data.trailingYearTotal}
					/>
				</div>

				{data.loadState === "error" ? (
					<p className="absolute inset-x-5 bottom-4 z-20 m-0 text-[#8a9490] text-[12px]">
						Unable to load contributions
					</p>
				) : null}
			</article>

			<GithubContributionsTooltip hover={interaction.hover} />
		</motion.div>
	);
};
