import type { MotionValue } from "motion/react";
import { motion, useMotionTemplate } from "motion/react";

interface GithubContributionsRadialHighlightProps {
	glowOpacity: MotionValue<number>;
	pointerX: MotionValue<number>;
	pointerY: MotionValue<number>;
}

export const GithubContributionsRadialHighlight = ({
	glowOpacity,
	pointerX,
	pointerY,
}: GithubContributionsRadialHighlightProps) => {
	const left = useMotionTemplate`${pointerX}px`;
	const top = useMotionTemplate`${pointerY}px`;

	return (
		<motion.div
			aria-hidden
			className="pointer-events-none absolute z-20 size-36 rounded-full"
			style={{
				left,
				top,
				translateX: "-50%",
				translateY: "-50%",
				opacity: glowOpacity,
				background:
					"radial-gradient(circle at center, rgba(79,191,154,0.22) 0%, rgba(143,217,196,0.08) 42%, transparent 72%)",
				filter: "blur(14px)",
			}}
		/>
	);
};
