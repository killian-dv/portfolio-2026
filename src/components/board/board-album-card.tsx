import { AnimatePresence, motion } from "motion/react";
import { Pause, Play } from "lucide-react";
import { type MouseEvent, useState } from "react";

import { BoardAlbumMusicNotes } from "#/components/board/board-album-music-notes";
import { BoardVinylDisc } from "#/components/board/board-vinyl-disc";
import { useAlbumAudio } from "#/hooks/use-album-audio";
import { usePrefersReducedMotion } from "#/hooks/use-prefers-reduced-motion";
import {
	boardSpring,
	boardSpringSnappy,
	vinylSpinTransition,
} from "#/lib/motion-config";
import { cn } from "#/lib/utils";

const ALBUM_COVER_SRC = "/bad-bunny-dakiti.jpeg";
const ALBUM_AUDIO_SRC = "/bad-bunny-dakiti.mp3";

export const BoardAlbumCard = () => {
	const [isHovered, setIsHovered] = useState(false);
	const { isPlaying, toggle } = useAlbumAudio(ALBUM_AUDIO_SRC);
	const prefersReducedMotion = usePrefersReducedMotion();

	const showVinyl = isHovered;
	const showPlayControl = isHovered;
	const vinylSpinning = isHovered && isPlaying;
	const vinylRestRotate = showVinyl ? 360 : 0;
	const vinylRotateTransition = vinylSpinning
		? { rotate: vinylSpinTransition }
		: boardSpring;
	const getCoverPose = () => {
		if (prefersReducedMotion) {
			return { rotate: 0, scale: 1 };
		}
		if (isHovered) {
			return { rotate: 2, scale: 1.05 };
		}
		return { rotate: 0, scale: 1 };
	};
	const coverPose = getCoverPose();

	const playControlTransition = {
		duration: 0.15,
		ease: [0.23, 1, 0.32, 1] as const,
	};
	const playControlExitTransition = {
		duration: 0.08,
		ease: [0.23, 1, 0.32, 1] as const,
	};

	const stopBoardPan = (event: MouseEvent) => {
		event.stopPropagation();
	};

	return (
		// biome-ignore lint/a11y/noNoninteractiveElementInteractions: album hover zone
		// biome-ignore lint/a11y/noStaticElementInteractions: album hover zone
		<div
			className="relative size-[150px] overflow-visible"
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			<BoardAlbumMusicNotes active={isPlaying} />

			<div className="relative size-full overflow-visible rounded-lg shadow-lg">
				<motion.div
					animate={{
						opacity: showVinyl ? 1 : 0,
						x: showVinyl ? 100 : 0,
					}}
					className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center"
					initial={false}
					transition={boardSpring}
				>
					<motion.div
						animate={{
							rotate: vinylSpinning ? 360 : vinylRestRotate,
						}}
						transition={vinylRotateTransition}
					>
						<BoardVinylDisc />
					</motion.div>
				</motion.div>

				<motion.div
					animate={coverPose}
					className="relative z-10 size-full overflow-hidden rounded-[4px]"
					initial={false}
					transition={boardSpringSnappy}
				>
					<img
						alt="Bad Bunny — Dakiti"
						className="size-full object-cover"
						height={500}
						src={ALBUM_COVER_SRC}
						width={500}
					/>
				</motion.div>

				<button
					aria-label={isPlaying ? "Pause Dakiti" : "Play Dakiti"}
					className={cn(
						"absolute inset-0 z-20 m-0 flex cursor-pointer items-center justify-center",
						"border-0 bg-transparent p-0",
						"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80",
						!showPlayControl && "pointer-events-none"
					)}
					onClick={(event) => {
						stopBoardPan(event);
						toggle();
					}}
					onMouseDown={stopBoardPan}
					type="button"
				>
					<AnimatePresence>
						{showPlayControl ? (
							<motion.span
								animate={{ scale: 1 }}
								className={cn(
									"flex size-11 items-center justify-center rounded-full text-white",
									"border border-white/45 bg-white/30 shadow-lg",
									"backdrop-blur-md backdrop-saturate-150",
									"ring-1 ring-white/25"
								)}
								exit={{
									scale: 0.9,
									transition: playControlExitTransition,
								}}
								initial={{ scale: 0.9 }}
								key="play-control"
								transition={playControlTransition}
								whileTap={{ scale: 0.94 }}
							>
								{isPlaying ? (
									<Pause aria-hidden className="size-5 fill-current" />
								) : (
									<Play aria-hidden className="ml-0.5 size-5 fill-current" />
								)}
							</motion.span>
						) : null}
					</AnimatePresence>
				</button>
			</div>
		</div>
	);
};
