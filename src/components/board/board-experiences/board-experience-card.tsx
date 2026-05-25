import { type MouseEvent, useState } from "react";

import {
	BOARD_EXPERIENCE_CARD_WIDTH_PX,
	type BoardExperienceEntry,
} from "#/components/board/board-experiences/board-experiences-constants";
import { usePrefersReducedMotion } from "#/hooks/use-prefers-reduced-motion";
import { cn } from "#/lib/utils";

interface BoardExperienceCardProps {
	entry: BoardExperienceEntry;
	onMouseDown: (event: MouseEvent) => void;
}

export const BoardExperienceCard = ({
	entry,
	onMouseDown,
}: BoardExperienceCardProps) => {
	const [isHovered, setIsHovered] = useState(false);
	const prefersReducedMotion = usePrefersReducedMotion();
	const showHover = isHovered && !prefersReducedMotion;

	return (
		// biome-ignore lint/a11y/noNoninteractiveElementInteractions: board pan surface
		<article
			className={cn(
				"absolute z-10 cursor-default overflow-hidden rounded-[16px] border border-black/[0.06] px-4 py-3.5",
				"shadow-[0_1px_0_0_rgba(255,255,255,0.85)_inset,0_12px_28px_-18px_rgba(0,0,0,0.2)]",
				"transition-colors duration-200 ease-out",
				showHover ? "bg-[#fafafa]" : "bg-white"
			)}
			onMouseDown={onMouseDown}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
			style={{
				left: entry.layout.left,
				top: entry.layout.top,
				width: BOARD_EXPERIENCE_CARD_WIDTH_PX,
				transform: `rotate(${entry.layout.rotate}deg)`,
			}}
		>
			<div
				aria-hidden
				className="pointer-events-none absolute inset-0 rounded-[16px] bg-[radial-gradient(ellipse_90%_50%_at_50%_-10%,rgba(0,0,0,0.03),transparent_55%)]"
			/>

			<div className="relative flex items-center gap-3">
				<div className="flex size-10 shrink-0 items-center justify-center rounded-[10px] border border-black/[0.08] bg-neutral-50/90">
					<img
						alt={entry.logoAlt}
						className="max-h-[22px] w-auto max-w-[26px] object-contain"
						height={22}
						src={entry.logoSrc}
						width={26}
					/>
				</div>

				<div className="flex h-10 min-w-0 flex-1 flex-col justify-center gap-0.5">
					<div className="flex min-w-0 items-center gap-1.5">
						<p className="m-0 truncate font-medium text-[13px] text-foreground tracking-[-0.02em]">
							{entry.company}
						</p>
						{entry.isCurrent ? (
							<span className="shrink-0 rounded-md bg-rose-100 px-1.5 py-px font-semibold text-[9px] text-rose-600 uppercase tracking-[0.08em]">
								now
							</span>
						) : null}
					</div>
					<p className="m-0 truncate text-[11px] text-foreground/55 leading-none">
						{entry.role}
					</p>
				</div>

				<p className="m-0 shrink-0 whitespace-nowrap pl-4 font-bold text-[10px] text-foreground/42 tabular-nums tracking-[0.04em]">
					{entry.dates}
				</p>
			</div>
		</article>
	);
};
