import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { motion } from "motion/react";
import type { CSSProperties } from "react";

import { BoardHandwrittenLabel } from "#/components/board/board-handwritten-label";
import "#/components/board/board-canvas.css";
import "#/components/board/board-sticky-notes/board-sticky-notes.css";
import { BoardMarkerPen } from "#/components/board/decorations/board-marker-pen";
import { BoardPaperClip } from "#/components/board/decorations/board-paper-clip";
import "#/components/board/decorations/board-decorations.css";
import { BoardHeroCard } from "#/components/board/hero/board-hero-card";
import { BoardHeroReveal } from "#/components/board/hero/board-hero-reveal";
import { PageWrapper } from "#/components/page-wrapper";
import { boardEaseOut } from "#/lib/motion-config";
import { cn } from "#/lib/utils";

type BoardNotFoundStickyVariant = "sage" | "yellow";

interface BoardNotFoundStickyProps {
	className?: string;
	lines: readonly [string, string];
	rotationDeg: number;
	style?: CSSProperties;
	variant: BoardNotFoundStickyVariant;
}

const BoardNotFoundSticky = ({
	lines,
	variant,
	rotationDeg,
	className,
	style,
}: BoardNotFoundStickyProps) => (
	<div
		aria-hidden
		className={cn(
			"board-sticky-note pointer-events-none absolute z-20 flex min-h-[108px] w-[118px] flex-col justify-center gap-0.5 px-3 py-4",
			variant === "yellow" && "board-sticky-note--yellow",
			variant === "sage" && "board-sticky-note--sage",
			className
		)}
		style={{ ...style, transform: `rotate(${rotationDeg}deg)` }}
	>
		<div className="board-sticky-note-tape pointer-events-none absolute top-0 left-1/2 z-10 -translate-x-1/2 -translate-y-[42%]" />
		<BoardHandwrittenLabel
			as="p"
			className="relative z-[1] m-0 text-center text-[#3a3834] text-[1.05rem] leading-[1.1]"
			variant="neutral"
		>
			{lines[0]}
		</BoardHandwrittenLabel>
		<BoardHandwrittenLabel
			as="p"
			className="relative z-[1] m-0 text-center text-[#3a3834] text-[0.95rem] leading-[1.1] opacity-90"
			variant="neutral"
		>
			{lines[1]}
		</BoardHandwrittenLabel>
	</div>
);

export const BoardNotFoundPage = () => (
	<PageWrapper className="relative flex min-h-screen items-center justify-center overflow-hidden p-6 md:p-10">
		<div
			aria-hidden
			className="pointer-events-none absolute inset-0 bg-grid-pattern opacity-70"
		/>
		<div
			aria-hidden
			className="pointer-events-none absolute inset-0 bg-linear-to-b from-white/30 via-transparent to-white/50"
		/>

		<motion.div
			animate={{ opacity: 1, y: 0 }}
			className="relative z-10 w-full max-w-[min(100%,40rem)]"
			initial={{ opacity: 0, y: 18 }}
			transition={{ duration: 0.55, ease: boardEaseOut }}
		>
			<div className="relative mx-auto w-fit px-6 py-8 sm:px-20 sm:py-14">
				<BoardNotFoundSticky
					className="-top-4 -left-6 sm:-top-10 sm:-left-28"
					lines={["wrong turn", "¯\\_(ツ)_/¯"]}
					rotationDeg={-11}
					variant="sage"
				/>
				<BoardNotFoundSticky
					className="-right-6 -bottom-8 sm:-right-28 sm:-bottom-4"
					lines={["dead link", "check the url"]}
					rotationDeg={9}
					variant="yellow"
				/>

				<BoardPaperClip
					className="pointer-events-none absolute top-[16%] -right-3 z-20 sm:-right-14"
					rotationDeg={-18}
					size={40}
				/>

				<BoardMarkerPen
					className="-bottom-10 -left-10 z-20 origin-bottom-left scale-[0.68] sm:-bottom-16 sm:-left-28 sm:scale-[0.92]"
					color="blue"
					pose="default"
					rotationDeg={-32}
				/>
				<BoardMarkerPen
					className="top-0 left-1/2 z-20 -translate-x-[12%] -translate-y-[88%] scale-[0.68] sm:-translate-y-[95%] sm:scale-[0.88]"
					color="red"
					pose="flipped"
					rotationDeg={-38}
				/>

				<div className="relative z-10 mx-auto w-fit">
					<BoardHeroCard showFigmaCursors={false}>
						<div className="flex flex-col items-center gap-3 text-center">
							<BoardHeroReveal
								as="header"
								className="flex flex-col items-center gap-1"
							>
								<h1 className="m-0">
									<BoardHandwrittenLabel
										className="text-[3.25rem] leading-none sm:text-[3.75rem]"
										variant="red"
									>
										404
									</BoardHandwrittenLabel>
								</h1>
								<BoardHandwrittenLabel
									className="text-[1.65rem] sm:text-[1.85rem]"
									variant="blue"
								>
									Lost on the board
								</BoardHandwrittenLabel>
							</BoardHeroReveal>

							<BoardHeroReveal
								as="p"
								className="m-0 max-w-[28ch] text-neutral-600 text-sm leading-relaxed"
								delay={0.12}
							>
								This URL is not pinned anywhere. Head back to the main canvas.
							</BoardHeroReveal>

							<BoardHeroReveal
								className="flex w-full justify-center"
								delay={0.22}
							>
								<Link
									className={cn(
										"group inline-flex items-center gap-1.5 rounded-sm",
										"font-medium text-[13px] text-neutral-700 no-underline",
										"transition-colors hover:text-neutral-900",
										"focus-visible:outline-2 focus-visible:outline-blue-400 focus-visible:outline-offset-2"
									)}
									to="/"
								>
									<ArrowLeft
										aria-hidden
										className="size-3.5 opacity-50 transition-transform duration-300 ease-out group-hover:-translate-x-px group-hover:opacity-80"
										strokeWidth={2}
									/>
									Back to portfolio
								</Link>
							</BoardHeroReveal>
						</div>
					</BoardHeroCard>
				</div>
			</div>
		</motion.div>
	</PageWrapper>
);
