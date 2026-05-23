import { motion, useMotionTemplate, type Variants } from "motion/react";

import {
	BOARDING_PASS_CARD_SPRING,
	BOARDING_PASS_HEIGHT_PX,
	BOARDING_PASS_WIDTH_PX,
} from "#/components/board/boarding-pass/boarding-pass-constants";
import { BoardingPassHeader } from "#/components/board/boarding-pass/boarding-pass-header";
import { BoardingPassMeta } from "#/components/board/boarding-pass/boarding-pass-meta";
import { BoardingPassRadialHighlight } from "#/components/board/boarding-pass/boarding-pass-radial-highlight";
import { BoardingPassRoute } from "#/components/board/boarding-pass/boarding-pass-route";
import { BoardingPassSurface } from "#/components/board/boarding-pass/boarding-pass-surface";
import {
	BoardingPassTicketOutline,
	BoardingPassTicketShadow,
} from "#/components/board/boarding-pass/boarding-pass-ticket-frame";
import { boardingPassTicketClipPath } from "#/components/board/boarding-pass/boarding-pass-ticket-path";
import { useBoardingPassInteraction } from "#/components/board/boarding-pass/use-boarding-pass-interaction";

const cardVariants: Variants = {
	idle: { y: 0, scale: 1 },
	hover: { y: -5, scale: 1.006 },
};

export const BoardBoardingPassCard = () => {
	const interaction = useBoardingPassInteraction();

	const cardTransform = useMotionTemplate`perspective(900px) rotate(${interaction.baseRotate}deg) rotateX(${interaction.tiltX}deg) rotateY(${interaction.tiltY}deg)`;

	return (
		<motion.div
			animate={interaction.motionState}
			className="relative shrink-0 overflow-visible"
			onMouseDown={interaction.stopBoardPan}
			onMouseEnter={interaction.handlePointerEnter}
			onMouseLeave={interaction.handlePointerLeave}
			onMouseMove={interaction.updatePointer}
			ref={interaction.cardRef}
			style={{
				width: BOARDING_PASS_WIDTH_PX,
				height: BOARDING_PASS_HEIGHT_PX,
				perspective: 900,
			}}
			transition={BOARDING_PASS_CARD_SPRING}
			variants={cardVariants}
		>
			<motion.div
				className="relative overflow-visible"
				style={{
					width: BOARDING_PASS_WIDTH_PX,
					height: BOARDING_PASS_HEIGHT_PX,
					transform: cardTransform,
					transformStyle: "preserve-3d",
				}}
			>
				<div
					aria-hidden
					className="pointer-events-none absolute -inset-6 rounded-[32px] opacity-90 blur-2xl"
					style={{
						background: [
							"radial-gradient(ellipse 90% 75% at 50% 58%, color-mix(in srgb, var(--foreground) 7%, transparent), transparent 68%)",
							"radial-gradient(ellipse 70% 55% at 50% 50%, color-mix(in srgb, var(--emirates-brand) 10%, transparent), transparent 72%)",
						].join(", "),
					}}
				/>

				<BoardingPassTicketShadow />

				<article
					aria-label="Boarding pass — Paris ORY to Bali DPS, Emirates"
					className="relative flex flex-col overflow-visible"
					style={{
						width: BOARDING_PASS_WIDTH_PX,
						height: BOARDING_PASS_HEIGHT_PX,
						clipPath: boardingPassTicketClipPath,
					}}
				>
					<BoardingPassSurface />

					<BoardingPassRadialHighlight
						glowOpacity={interaction.glowOpacity}
						heightPx={BOARDING_PASS_HEIGHT_PX}
						pointerX={interaction.springX}
						pointerY={interaction.springY}
						widthPx={BOARDING_PASS_WIDTH_PX}
					/>

					<div className="relative z-10 flex h-full min-h-0 flex-col">
						<BoardingPassHeader />

						<div className="flex min-h-0 flex-1 flex-col justify-center py-3">
							<BoardingPassRoute
								prefersReducedMotion={interaction.prefersReducedMotion}
							/>
						</div>

						<BoardingPassMeta />
					</div>
				</article>

				<BoardingPassTicketOutline />
			</motion.div>
		</motion.div>
	);
};
