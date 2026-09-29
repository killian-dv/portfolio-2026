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
				background:
					"radial-gradient(circle at center, color-mix(in srgb, var(--board-github-accent) 22%, transparent) 0%, color-mix(in srgb, var(--board-github-accent) 8%, white) 42%, transparent 72%)",
				filter: "blur(14px)",
				left,
				opacity: glowOpacity,
				top,
				translateX: "-50%",
				translateY: "-50%",
			}}
		/>
	);
};
