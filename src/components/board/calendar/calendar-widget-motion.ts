import type { Variants } from "motion/react";

export const calendarPaperVariants: Variants = {
	hover: (layer: number) => ({
		rotate: layer === 0 ? -2.5 : 2.4,
		scale: 1,
		x: layer === 0 ? -6 : 8,
		y: layer === 0 ? 6 : 10,
	}),
	idle: (layer: number) => ({
		rotate: layer === 0 ? -1 : 1.2,
		scale: 1,
		x: layer === 0 ? -2 : 4,
		y: layer === 0 ? 4 : 7,
	}),
};

export const calendarCardVariants: Variants = {
	hover: {
		scale: 1.004,
		y: -3,
	},
	idle: {
		scale: 1,
		y: 0,
	},
};
