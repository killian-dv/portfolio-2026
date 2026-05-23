import type { MotionValue } from "motion/react";
import { motion, useMotionTemplate, useTransform } from "motion/react";

interface BoardingPassRadialHighlightProps {
	glowOpacity: MotionValue<number>;
	heightPx: number;
	pointerX: MotionValue<number>;
	pointerY: MotionValue<number>;
	widthPx: number;
}

export const BoardingPassRadialHighlight = ({
	glowOpacity,
	pointerX,
	pointerY,
	widthPx,
	heightPx,
}: BoardingPassRadialHighlightProps) => {
	const left = useTransform(pointerX, (x) => x * widthPx);
	const top = useTransform(pointerY, (y) => y * heightPx);
	const leftTemplate = useMotionTemplate`${left}px`;
	const topTemplate = useMotionTemplate`${top}px`;

	return (
		<motion.div
			aria-hidden
			className="pointer-events-none absolute z-30 size-36 rounded-full"
			style={{
				left: leftTemplate,
				top: topTemplate,
				translateX: "-50%",
				translateY: "-50%",
				opacity: glowOpacity,
				background:
					"radial-gradient(circle at center, rgba(255,255,255,0.75) 0%, rgba(255,255,255,0.12) 42%, transparent 70%)",
				filter: "blur(12px)",
			}}
		/>
	);
};
