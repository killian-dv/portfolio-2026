export const BOARDING_PASS_WIDTH_PX = 420;
export const BOARDING_PASS_HEIGHT_PX = 222;

export const EMIRATES_LOGO_SRC = "/emirates-logo.png";

const FOOTER_BLOCK_PX = 46;
const NOTCH_LIFT_PX = 6;

export const BOARDING_PASS_NOTCH_CENTER_Y_PX =
	BOARDING_PASS_HEIGHT_PX - FOOTER_BLOCK_PX - NOTCH_LIFT_PX;

export const BOARDING_PASS_IDLE_ROTATE_DEG = -3.2;

export const BOARDING_PASS_FLIGHT = {
	class: "Business",
	date: "24 May 2026",
	flightNumber: "EK 368",
	gate: "C42",
	seat: "14A",
} as const;

export const BOARDING_PASS_ROUTE = {
	arrivalDayOffset: "+1",
	arrivalLocal: "06:55",
	departureLocal: "10:15",
	destinationCity: "Bali",
	destinationCode: "DPS",
	duration: "16h 40m",
	originCity: "Paris",
	originCode: "ORY",
} as const;

export const BOARDING_PASS_GLOW_SPRING = {
	damping: 28,
	mass: 0.85,
	stiffness: 160,
};

export const BOARDING_PASS_TILT_SPRING = {
	damping: 32,
	mass: 0.75,
	stiffness: 220,
};

export const BOARDING_PASS_CARD_SPRING = {
	damping: 30,
	mass: 0.9,
	stiffness: 300,
	type: "spring" as const,
};
