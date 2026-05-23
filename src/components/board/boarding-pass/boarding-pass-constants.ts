export const BOARDING_PASS_WIDTH_PX = 420;
export const BOARDING_PASS_HEIGHT_PX = 222;

export const EMIRATES_LOGO_SRC = "/emirates-logo.png";

const FOOTER_BLOCK_PX = 46;
const NOTCH_LIFT_PX = 6;

export const BOARDING_PASS_NOTCH_CENTER_Y_PX =
	BOARDING_PASS_HEIGHT_PX - FOOTER_BLOCK_PX - NOTCH_LIFT_PX;

export const BOARDING_PASS_IDLE_ROTATE_DEG = -3.2;

export const BOARDING_PASS_FLIGHT = {
	flightNumber: "EK 368",
	date: "24 May 2026",
	gate: "C42",
	seat: "14A",
	class: "Business",
} as const;

export const BOARDING_PASS_ROUTE = {
	originCode: "ORY",
	originCity: "Paris",
	destinationCode: "DPS",
	destinationCity: "Bali",
	departureLocal: "10:15",
	arrivalLocal: "06:55",
	arrivalDayOffset: "+1",
	duration: "16h 40m",
} as const;

export const BOARDING_PASS_GLOW_SPRING = {
	stiffness: 160,
	damping: 28,
	mass: 0.85,
};

export const BOARDING_PASS_TILT_SPRING = {
	stiffness: 220,
	damping: 32,
	mass: 0.75,
};

export const BOARDING_PASS_CARD_SPRING = {
	type: "spring" as const,
	stiffness: 300,
	damping: 30,
	mass: 0.9,
};
