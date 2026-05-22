import type { Variants } from "motion/react";

import {
	CALENDAR_CARD_SPRING,
	CALENDAR_PAPER_SPRING,
} from "#/components/board/calendar/calendar-widget-constants";

export const calendarPaperVariants: Variants = {
	idle: (layer: number) => ({
		rotate: layer === 0 ? -1 : 1.2,
		x: layer === 0 ? -2 : 4,
		y: layer === 0 ? 4 : 7,
		scale: 1,
	}),
	hover: (layer: number) => ({
		rotate: layer === 0 ? -2.5 : 2.4,
		x: layer === 0 ? -6 : 8,
		y: layer === 0 ? 6 : 10,
		scale: 1,
	}),
};

export const calendarCardVariants: Variants = {
	idle: {
		y: 0,
		scale: 1,
	},
	hover: {
		y: -3,
		scale: 1.004,
	},
};

export const calendarPaperTransition = {
	...CALENDAR_PAPER_SPRING,
};

export const calendarCardTransition = {
	...CALENDAR_CARD_SPRING,
};
