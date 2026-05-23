import { BOARDING_PASS_FLIGHT } from "#/components/board/boarding-pass/boarding-pass-constants";
import { EmiratesLogo } from "#/components/board/boarding-pass/emirates-logo";

export const BoardingPassHeader = () => (
	<header className="flex shrink-0 items-start justify-between gap-6 px-7 pt-5 pb-2">
		<EmiratesLogo />

		<div className="pt-0.5 text-right">
			<p className="font-medium text-[11px] text-foreground/88 tracking-[0.14em]">
				{BOARDING_PASS_FLIGHT.flightNumber}
			</p>
			<p className="mt-1 text-[9px] text-foreground/38 uppercase tracking-[0.18em]">
				{BOARDING_PASS_FLIGHT.date}
				<span className="mx-1.5 text-foreground/18">·</span>
				{BOARDING_PASS_FLIGHT.class}
			</p>
		</div>
	</header>
);
