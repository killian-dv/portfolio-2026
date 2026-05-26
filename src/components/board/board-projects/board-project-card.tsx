import { ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";
import type { CSSProperties, MouseEvent } from "react";

import type { Project } from "#/components/board/board-projects/projects.data";
import { useBoardProjectCardInteraction } from "#/components/board/board-projects/use-board-project-card-interaction";
import { cn } from "#/lib/utils";

interface BoardProjectCardProps {
	onMouseDown: (event: MouseEvent) => void;
	project: Project;
}

const badgeClassName =
	"rounded-full bg-neutral-100/10 text-white backdrop-blur-[1px]";

const cardClassName = cn(
	"group relative flex aspect-4/5 w-[224px] cursor-default flex-col overflow-hidden rounded-2xl p-3",
	"outline-none focus-within:ring-2 focus-within:ring-white/40 focus-within:ring-offset-2 focus-within:ring-offset-transparent",
	"transition-[box-shadow] duration-300"
);

const DESCRIPTION_MAX_HEIGHT_CLASS = "max-h-[2.75rem]";

const projectColorRgba = (hex: string, alpha: number) => {
	const normalized = hex.replace("#", "");
	const value =
		normalized.length === 3
			? normalized
					.split("")
					.map((c) => c + c)
					.join("")
			: normalized;
	const int = Number.parseInt(value, 16);
	const r = Math.floor(int / 65_536) % 256;
	const g = Math.floor(int / 256) % 256;
	const b = int % 256;
	return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

export const BoardProjectCard = ({
	project,
	onMouseDown,
}: BoardProjectCardProps) => {
	const {
		cardRef,
		handlePointerEnter,
		handlePointerLeave,
		isHovered,
		isPointerOver,
		prefersReducedMotion,
		stopBoardPan,
	} = useBoardProjectCardInteraction();

	const colorGlowSoft = projectColorRgba(project.color, 0.28);
	const isInteractive = !project.isPrivate && Boolean(project.href);
	const showDescription = isPointerOver || prefersReducedMotion;

	const motionStyle: CSSProperties = {
		backgroundColor: project.color,
		rotate: `${project.rotate}deg`,
		boxShadow: isHovered
			? `0 20px 44px -18px rgba(0,0,0,0.42), 0 28px 56px -24px ${colorGlowSoft}`
			: `0 12px 32px -16px rgba(0,0,0,0.32), 0 18px 40px -28px ${colorGlowSoft}`,
	};

	return (
		<motion.article
			className={cardClassName}
			onMouseDown={(event) => {
				stopBoardPan(event);
				onMouseDown(event);
			}}
			onMouseEnter={handlePointerEnter}
			onMouseLeave={handlePointerLeave}
			ref={cardRef}
			style={motionStyle}
		>
			<div className="pointer-events-none relative z-10 flex shrink-0 items-center justify-between gap-2">
				<span className={cn(badgeClassName, "px-3 py-1 text-sm")}>
					{project.year}
				</span>
				{project.isPrivate ? (
					<span className={cn(badgeClassName, "px-3 py-1 text-sm")}>
						Private
					</span>
				) : (
					<span aria-hidden className={cn(badgeClassName, "p-2 leading-none")}>
						<ArrowUpRight className="size-4 text-white" strokeWidth={2.5} />
					</span>
				)}
			</div>

			<div className="pointer-events-none relative z-10 flex min-h-0 flex-1 items-center justify-center">
				<img
					alt={project.imageAlt}
					className="max-h-[min(88px,100%)] w-auto object-contain"
					height={88}
					src={project.image}
					style={{ width: project.imageWidth }}
					width={project.imageWidth}
				/>
			</div>

			<div className="pointer-events-none relative z-10 flex shrink-0 flex-col text-white">
				<h3 className="m-0 font-medium text-[15px] tracking-[-0.02em]">
					{project.title}
				</h3>

				{project.tags && project.tags.length > 0 ? (
					<ul className="m-0 mt-1 flex list-none flex-wrap gap-1 p-0">
						{project.tags.map((tag) => (
							<li key={tag}>
								<span className="rounded-full bg-neutral-100/10 px-2 py-0.5 text-white/90 text-xs opacity-70">
									{tag}
								</span>
							</li>
						))}
					</ul>
				) : null}

				<p
					className={cn(
						"m-0 overflow-hidden text-white/80 text-xs leading-snug transition-all duration-300",
						showDescription
							? cn("mt-2 opacity-70", DESCRIPTION_MAX_HEIGHT_CLASS)
							: "max-h-0 opacity-0"
					)}
				>
					{project.description}
				</p>
			</div>

			{isInteractive ? (
				<a
					aria-label={`${project.title} (opens in new tab)`}
					className="absolute inset-0 z-20 cursor-pointer rounded-2xl"
					href={project.href}
					onMouseDown={(event) => {
						stopBoardPan(event);
						onMouseDown(event);
					}}
					onMouseEnter={handlePointerEnter}
					onMouseLeave={handlePointerLeave}
					rel="noopener noreferrer"
					target="_blank"
				>
					<span className="sr-only">{project.title} (opens in new tab)</span>
				</a>
			) : null}
		</motion.article>
	);
};
