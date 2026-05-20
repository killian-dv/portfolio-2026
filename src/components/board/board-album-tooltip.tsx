import { AnimatePresence, motion } from "motion/react";

import { usePrefersReducedMotion } from "#/hooks/use-prefers-reduced-motion";
import { tooltipMotion } from "#/lib/motion-config";

interface BoardAlbumTooltipProps {
	artist: string;
	title: string;
	visible: boolean;
}

export const BoardAlbumTooltip = ({
	artist,
	title,
	visible,
}: BoardAlbumTooltipProps) => {
	const prefersReducedMotion = usePrefersReducedMotion();

	const hidden = { opacity: 0, scale: 0.97, x: "-50%", y: 6 };
	const shown = { opacity: 1, scale: 1, x: "-50%", y: 0 };
	const exit = { opacity: 0, scale: 0.97, x: "-50%", y: 4 };

	return (
		<AnimatePresence>
			{visible ? (
				<motion.div
					animate={prefersReducedMotion ? { opacity: 1, x: "-50%" } : shown}
					className="pointer-events-none absolute bottom-full left-1/2 z-40 mb-2 w-max max-w-[200px] rounded-md bg-black px-3 py-1.5 text-center text-white shadow-md"
					exit={
						prefersReducedMotion
							? { opacity: 0, transition: tooltipMotion.exit }
							: { ...exit, transition: tooltipMotion.exit }
					}
					initial={prefersReducedMotion ? { opacity: 0, x: "-50%" } : hidden}
					key="album-tooltip"
					role="tooltip"
					style={{ transformOrigin: "bottom center" }}
					transition={tooltipMotion.enter}
				>
					<p className="m-0 font-medium text-[13px] leading-tight">{title}</p>
					<p className="m-0 text-[11px] text-white/75 leading-tight">{artist}</p>
				</motion.div>
			) : null}
		</AnimatePresence>
	);
};
