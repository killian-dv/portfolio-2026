import type { MotionValue } from "motion/react";
import { motion, useMotionTemplate } from "motion/react";

interface CalendarWidgetRadialHighlightProps {
	glowOpacity: MotionValue<number>;
	pointerX: MotionValue<number>;
	pointerY: MotionValue<number>;
}

/** Soft glass-like reflection that follows the cursor on hover. */
export const CalendarWidgetRadialHighlight = ({
	glowOpacity,
	pointerX,
	pointerY,
}: CalendarWidgetRadialHighlightProps) => {
	const left = useMotionTemplate`${pointerX}px`;
	const top = useMotionTemplate`${pointerY}px`;

	return (
		<motion.div
			aria-hidden
			className="pointer-events-none absolute z-20 size-32 rounded-full"
			style={{
				left,
				top,
				translateX: "-50%",
				translateY: "-50%",
				opacity: glowOpacity,
				background:
					"radial-gradient(circle at center, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0.18) 38%, transparent 72%)",
				filter: "blur(10px)",
			}}
		/>
	);
};
