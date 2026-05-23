import { BOARDING_PASS_FLIGHT } from "#/components/board/boarding-pass/boarding-pass-constants";

const MetaItem = ({ label, value }: { label: string; value: string }) => (
	<div className="text-center">
		<p className="text-[8px] text-foreground/32 uppercase tracking-[0.2em]">
			{label}
		</p>
		<p className="mt-0.5 font-medium text-[12px] text-foreground/78 tracking-[0.04em]">
			{value}
		</p>
	</div>
);

export const BoardingPassMeta = () => (
	<footer className="grid shrink-0 grid-cols-3 gap-2 border-foreground/6 border-t px-7 py-2.5">
		<MetaItem label="Gate" value={BOARDING_PASS_FLIGHT.gate} />
		<MetaItem label="Seat" value={BOARDING_PASS_FLIGHT.seat} />
		<MetaItem label="Class" value={BOARDING_PASS_FLIGHT.class} />
	</footer>
);
