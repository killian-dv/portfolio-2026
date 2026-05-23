import {
	BOARDING_PASS_HEIGHT_PX,
	BOARDING_PASS_WIDTH_PX,
} from "#/components/board/boarding-pass/boarding-pass-constants";
import {
	BOARDING_PASS_TICKET_PATH_D,
	BOARDING_PASS_TICKET_VIEWBOX,
} from "#/components/board/boarding-pass/boarding-pass-ticket-path";

export const BoardingPassTicketShadow = () => (
	// biome-ignore lint/a11y/noSvgWithoutTitle: decorative shadow
	<svg
		aria-hidden
		className="pointer-events-none absolute inset-0"
		height={BOARDING_PASS_HEIGHT_PX}
		style={{
			filter: [
				"drop-shadow(0 26px 52px rgba(0,0,0,0.17))",
				"drop-shadow(0 12px 24px rgba(0,0,0,0.11))",
				"drop-shadow(0 4px 8px rgba(0,0,0,0.08))",
				"drop-shadow(0 2px 28px color-mix(in srgb, var(--emirates-brand) 13%, transparent))",
			].join(" "),
		}}
		viewBox={BOARDING_PASS_TICKET_VIEWBOX}
		width={BOARDING_PASS_WIDTH_PX}
	>
		<path className="fill-foreground/9" d={BOARDING_PASS_TICKET_PATH_D} />
	</svg>
);

export const BoardingPassTicketOutline = () => (
	// biome-ignore lint/a11y/noSvgWithoutTitle: decorative outline
	<svg
		aria-hidden
		className="pointer-events-none absolute inset-0 z-20"
		height={BOARDING_PASS_HEIGHT_PX}
		viewBox={BOARDING_PASS_TICKET_VIEWBOX}
		width={BOARDING_PASS_WIDTH_PX}
	>
		<path
			className="fill-none stroke-foreground/10"
			d={BOARDING_PASS_TICKET_PATH_D}
			strokeWidth="1"
			vectorEffect="non-scaling-stroke"
		/>
		<path
			className="fill-none stroke-background/55"
			d={BOARDING_PASS_TICKET_PATH_D}
			strokeWidth="0.5"
			vectorEffect="non-scaling-stroke"
		/>
	</svg>
);
