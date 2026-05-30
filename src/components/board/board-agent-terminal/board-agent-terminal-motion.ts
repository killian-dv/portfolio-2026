import type { Transition, Variants } from "motion/react";

export const agentTerminalCardVariants: Variants = {
	idle: {
		y: 0,
		scale: 1,
	},
	hover: {
		y: -4,
		scale: 1.006,
	},
};

export const agentTerminalLineVariants: Variants = {
	hidden: {
		opacity: 0,
		y: 6,
	},
	visible: {
		opacity: 1,
		y: 0,
	},
};

export const agentTerminalLineTransition: Transition = {
	duration: 0.38,
	ease: [0.22, 1, 0.36, 1],
};

export const agentTerminalSessionTransition: Transition = {
	duration: 0.32,
	ease: [0.22, 1, 0.36, 1],
};
