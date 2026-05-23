import { EMIRATES_LOGO_SRC } from "#/components/board/boarding-pass/boarding-pass-constants";

/** Display height — tall stacked mark reads best around 24–28px in the header. */
const LOGO_HEIGHT_PX = 24;
const LOGO_WIDTH_PX = 18;

export const EmiratesLogo = () => (
	<img
		alt="Emirates"
		className="h-8 w-auto shrink-0 object-contain object-left"
		height={LOGO_HEIGHT_PX}
		src={EMIRATES_LOGO_SRC}
		width={LOGO_WIDTH_PX}
	/>
);
