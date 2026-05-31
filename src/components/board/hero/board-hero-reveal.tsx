import { motion } from "motion/react";
import type { ReactNode } from "react";

import { boardEaseOut } from "#/lib/motion-config";

const motionByTag = {
	div: motion.div,
	p: motion.p,
	header: motion.header,
	footer: motion.footer,
} as const;

type BoardHeroRevealTag = keyof typeof motionByTag;

interface BoardHeroRevealProps {
	as?: BoardHeroRevealTag;
	children: ReactNode;
	className?: string;
	delay?: number;
}

export const BoardHeroReveal = ({
	as = "div",
	children,
	className,
	delay = 0,
}: BoardHeroRevealProps) => {
	const Component = motionByTag[as];

	return (
		<Component
			animate={{ opacity: 1, y: 0 }}
			className={className}
			initial={{ opacity: 0, y: 15 }}
			transition={{ delay, duration: 0.6, ease: boardEaseOut }}
		>
			{children}
		</Component>
	);
};
