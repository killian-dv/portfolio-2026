import { motion } from "motion/react";

import {
	calendarPaperTransition,
	calendarPaperVariants,
} from "#/components/board/calendar/calendar-widget-motion";
import { cn } from "#/lib/utils";

interface CalendarWidgetPaperSheetsProps {
	isHovered: boolean;
	prefersReducedMotion: boolean;
}

const PAPER_LAYERS = [0, 1] as const;

const paperBaseClass = cn(
	"absolute inset-0 rounded-[22px] border border-black/[0.04]",
	"bg-[#fafafa] shadow-[0_8px_24px_-16px_rgba(0,0,0,0.18)]"
);

/** Two offset sheets behind the card — fan apart on hover. */
export const CalendarWidgetPaperSheets = ({
	isHovered,
	prefersReducedMotion,
}: CalendarWidgetPaperSheetsProps) => {
	const state = prefersReducedMotion || !isHovered ? "idle" : "hover";

	return (
		<div aria-hidden className="pointer-events-none absolute inset-0">
			{PAPER_LAYERS.map((layer) => (
				<motion.div
					animate={state}
					className={cn(paperBaseClass, layer === 1 && "opacity-90")}
					custom={layer}
					initial="idle"
					key={layer}
					style={{ zIndex: layer }}
					transition={calendarPaperTransition}
					variants={calendarPaperVariants}
				/>
			))}
		</div>
	);
};
