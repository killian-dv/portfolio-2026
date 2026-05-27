import type { MotionValue } from "motion/react";
import { motion, useMotionTemplate, useTransform } from "motion/react";

interface CertificationCardLaminateHighlightProps {
	laminateOpacity: MotionValue<number>;
	pointerX: MotionValue<number>;
	pointerY: MotionValue<number>;
}

export const CertificationCardLaminateHighlight = ({
	laminateOpacity,
	pointerX,
	pointerY,
}: CertificationCardLaminateHighlightProps) => {
	const left = useTransform(pointerX, (x) => `${x * 100}%`);
	const top = useTransform(pointerY, (y) => `${y * 100}%`);
	const leftTemplate = useMotionTemplate`${left}`;
	const topTemplate = useMotionTemplate`${top}`;

	return (
		<motion.div
			aria-hidden
			className="pointer-events-none absolute z-20 size-28 rounded-full"
			style={{
				left: leftTemplate,
				top: topTemplate,
				translateX: "-50%",
				translateY: "-50%",
				opacity: laminateOpacity,
				background:
					"radial-gradient(circle at center, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.08) 45%, transparent 72%)",
				filter: "blur(10px)",
			}}
		/>
	);
};
