/** Fixed widget footprint — intentional, not responsive. */
export const CALENDAR_WIDGET_SIZE_PX = 190;

export const CALENDAR_ACCENT_RED = "#FF3B30";

export const CALENDAR_MEETING = {
	title: "Monday Meeting",
	timeStart: "10:30 AM",
	timeEnd: "11:00 AM",
} as const;

export const CALENDAR_GLOW_SPRING = {
	stiffness: 180,
	damping: 26,
	mass: 0.8,
};

export const CALENDAR_CARD_SPRING = {
	type: "spring" as const,
	stiffness: 320,
	damping: 32,
	mass: 0.85,
};

export const CALENDAR_PAPER_SPRING = {
	type: "spring" as const,
	stiffness: 280,
	damping: 30,
	mass: 0.9,
};
