import { ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";
import type { MouseEvent } from "react";

import {
	BOARD_CERTIFICATION_CARD_SHADOW_HOVER,
	BOARD_CERTIFICATION_CARD_SHADOW_IDLE,
	BOARD_CERTIFICATION_CARD_SPRING,
	BOARD_CERTIFICATION_CARD_WIDTH_PX,
	BOARD_CERTIFICATION_MAX_SKILLS,
} from "#/components/board/board-certifications/board-certifications-constants";
import { CertificationCardLaminateHighlight } from "#/components/board/board-certifications/certification-card-laminate-highlight";
import type { Certification } from "#/components/board/board-certifications/certifications.data";
import { useBoardCertificationCardInteraction } from "#/components/board/board-certifications/use-board-certification-card-interaction";
import { cn } from "#/lib/utils";

interface BoardCertificationCardProps {
	certification: Certification;
	onMouseDown: (event: MouseEvent) => void;
}

const cardClassName = cn(
	"group absolute z-10 cursor-default overflow-hidden rounded-xl border border-black/[0.06] bg-white",
	"outline-none focus-within:ring-2 focus-within:ring-black/10 focus-within:ring-offset-2 focus-within:ring-offset-transparent"
);

export const BoardCertificationCard = ({
	certification,
	onMouseDown,
}: BoardCertificationCardProps) => {
	const {
		cardRef,
		handlePointerEnter,
		handlePointerLeave,
		hoverRotateDeg,
		idleRotateDeg,
		isInteractive,
		laminateOpacity,
		springPointerX,
		springPointerY,
		stopBoardPan,
		updatePointer,
	} = useBoardCertificationCardInteraction(certification.layout.rotate);

	const skills =
		certification.skills?.slice(0, BOARD_CERTIFICATION_MAX_SKILLS) ?? [];
	const verifyLabel = `${certification.title} — view certification (opens in new tab)`;

	return (
		<motion.article
			animate={{
				y: isInteractive ? -4 : 0,
				rotate: isInteractive ? hoverRotateDeg : idleRotateDeg,
				boxShadow: isInteractive
					? BOARD_CERTIFICATION_CARD_SHADOW_HOVER
					: BOARD_CERTIFICATION_CARD_SHADOW_IDLE,
			}}
			className={cardClassName}
			onMouseDown={(event) => {
				stopBoardPan(event);
				onMouseDown(event);
			}}
			onMouseEnter={handlePointerEnter}
			onMouseLeave={handlePointerLeave}
			onMouseMove={updatePointer}
			ref={cardRef}
			style={{
				left: certification.layout.left,
				top: certification.layout.top,
				width: BOARD_CERTIFICATION_CARD_WIDTH_PX,
			}}
			transition={BOARD_CERTIFICATION_CARD_SPRING}
		>
			<div
				aria-hidden
				className="pointer-events-none absolute inset-0 rounded-xl bg-[radial-gradient(ellipse_95%_55%_at_50%_-15%,rgba(0,0,0,0.02),transparent_58%)]"
			/>

			<CertificationCardLaminateHighlight
				laminateOpacity={laminateOpacity}
				pointerX={springPointerX}
				pointerY={springPointerY}
			/>

			<ArrowUpRight
				aria-hidden
				className="pointer-events-none absolute top-2.5 right-2.5 z-10 size-3.5 text-foreground/28 transition-colors duration-200 group-hover:text-foreground/45"
				strokeWidth={2}
			/>

			<time
				className="pointer-events-none absolute right-2.5 bottom-2.5 z-10 text-[9px] text-foreground/35 tabular-nums leading-snug tracking-[0.04em]"
				dateTime={certification.issuedAt}
			>
				{certification.issuedAt}
			</time>

			<div className="relative z-10 flex items-center gap-2.5 p-2.5">
				<div className="size-11 shrink-0 overflow-hidden rounded-[10px] border border-black/[0.07]">
					<img
						alt={certification.logoAlt}
						className="size-full object-contain"
						height={44}
						src={certification.logo}
						width={44}
					/>
				</div>

				<div className="min-w-0 flex-1 pr-11">
					<h3 className="m-0 truncate font-medium text-[12px] text-foreground leading-snug tracking-[-0.02em]">
						{certification.title}
					</h3>
					<p className="m-0 truncate text-[10px] text-foreground/50 leading-snug">
						{certification.issuer}
					</p>
					{skills.length > 0 ? (
						<p className="m-0 truncate text-[8.5px] text-foreground/30 leading-snug tracking-[0.02em]">
							{skills.join(" · ")}
						</p>
					) : null}
				</div>
			</div>

			<a
				aria-label={verifyLabel}
				className="absolute inset-0 z-30 rounded-xl"
				href={certification.href}
				onMouseDown={(event) => {
					stopBoardPan(event);
					onMouseDown(event);
				}}
				onMouseEnter={handlePointerEnter}
				onMouseLeave={handlePointerLeave}
				onMouseMove={updatePointer}
				rel="noopener noreferrer"
				target="_blank"
			>
				<span className="sr-only">{verifyLabel}</span>
			</a>
		</motion.article>
	);
};
