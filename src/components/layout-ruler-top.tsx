import { LayoutRulerTick } from "#/components/layout-ruler-tick";

const RULER_COUNT = 100;
const RULER_VALUES = Array.from(
	{ length: RULER_COUNT },
	(_, index) => index + 1
);

export const LayoutRulerTop = () => (
	<div className="fixed top-0 left-0 z-1 hidden w-screen gap-4 overflow-hidden border-b bg-white py-1 pr-1 pl-10 md:flex">
		{RULER_VALUES.map((value) => (
			<LayoutRulerTick key={value} orientation="horizontal" value={value} />
		))}
	</div>
);
