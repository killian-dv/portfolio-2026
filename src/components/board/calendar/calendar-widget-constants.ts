/** Fixed widget footprint — intentional, not responsive. */
export const CALENDAR_WIDGET_SIZE_PX = 190;

export const CALENDAR_ACCENT_RED = "#FF3B30";

export const CALENDAR_MEETING = {
	timeEnd: "11:00 AM",
	timeStart: "10:30 AM",
	title: "Monday Meeting",
} as const;

export const CALENDAR_GLOW_SPRING = {
	damping: 26,
	mass: 0.8,
	stiffness: 180,
};

export const CALENDAR_CARD_SPRING = {
	damping: 32,
	mass: 0.85,
	stiffness: 320,
	type: "spring" as const,
};

export const CALENDAR_PAPER_SPRING = {
	damping: 30,
	mass: 0.9,
	stiffness: 280,
	type: "spring" as const,
};
