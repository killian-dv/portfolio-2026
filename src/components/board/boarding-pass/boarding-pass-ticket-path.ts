import {
	BOARDING_PASS_HEIGHT_PX,
	BOARDING_PASS_NOTCH_CENTER_Y_PX,
	BOARDING_PASS_WIDTH_PX,
} from "#/components/board/boarding-pass/boarding-pass-constants";

const NOTCH_RADIUS = 12;
const CORNER_RADIUS = 10;

const buildTicketPath = (notchCenterY: number) => {
	const yTop = notchCenterY - NOTCH_RADIUS;
	const yBottom = notchCenterY + NOTCH_RADIUS;
	const w = BOARDING_PASS_WIDTH_PX;
	const h = BOARDING_PASS_HEIGHT_PX;

	return [
		`M ${CORNER_RADIUS} 0`,
		`H ${w - CORNER_RADIUS}`,
		`Q ${w} 0 ${w} ${CORNER_RADIUS}`,
		`V ${yTop}`,
		`A ${NOTCH_RADIUS} ${NOTCH_RADIUS} 0 0 0 ${w} ${yBottom}`,
		`V ${h - CORNER_RADIUS}`,
		`Q ${w} ${h} ${w - CORNER_RADIUS} ${h}`,
		`H ${CORNER_RADIUS}`,
		`Q 0 ${h} 0 ${h - CORNER_RADIUS}`,
		`V ${yBottom}`,
		`A ${NOTCH_RADIUS} ${NOTCH_RADIUS} 0 0 0 0 ${yTop}`,
		`V ${CORNER_RADIUS}`,
		`Q 0 0 ${CORNER_RADIUS} 0`,
		"Z",
	].join(" ");
};

export const BOARDING_PASS_TICKET_PATH_D = buildTicketPath(
	BOARDING_PASS_NOTCH_CENTER_Y_PX
);

export const BOARDING_PASS_TICKET_VIEWBOX = `0 0 ${BOARDING_PASS_WIDTH_PX} ${BOARDING_PASS_HEIGHT_PX}`;

export const boardingPassTicketClipPath = `path("${BOARDING_PASS_TICKET_PATH_D}")`;
