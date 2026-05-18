import { LayoutRulerTick } from "#/components/layout-ruler-tick";

const RULER_COUNT = 100;
const RULER_VALUES = Array.from(
	{ length: RULER_COUNT },
	(_, index) => index + 1
);

export const LayoutRulerLeft = () => (
	<div className="fixed top-0 left-0 z-1 hidden h-screen w-fit flex-col items-center justify-start gap-2 overflow-hidden border-r bg-white pt-8 pr-1 pb-1 pl-1 md:flex">
		{RULER_VALUES.map((value) => (
			<LayoutRulerTick key={value} orientation="vertical" value={value} />
		))}
	</div>
);
