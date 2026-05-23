import { Plane } from "lucide-react";
import { motion } from "motion/react";

import { BOARDING_PASS_ROUTE } from "#/components/board/boarding-pass/boarding-pass-constants";

interface BoardingPassRouteProps {
	prefersReducedMotion: boolean;
}

const CityBlock = ({
	align,
	city,
	code,
	time,
	dayOffset,
}: {
	align: "left" | "right";
	city: string;
	code: string;
	time: string;
	dayOffset?: string;
}) => (
	<div className={align === "left" ? "text-left" : "text-right"}>
		<p className="font-semibold text-[2.05rem] text-foreground leading-none tracking-[-0.05em]">
			{code}
		</p>
		<p className="mt-2 text-[11px] text-foreground/40 tracking-[0.05em]">
			{city}
		</p>
		<p className="mt-1 font-medium text-[11px] text-foreground/55 tabular-nums tracking-[0.02em]">
			{time}
			{dayOffset ? (
				<span className="ml-0.5 text-[9px] text-foreground/35">
					{dayOffset}
				</span>
			) : null}
		</p>
	</div>
);

const planeFloatTransition = (reduced: boolean) =>
	reduced
		? { duration: 0 }
		: {
				duration: 5.5,
				repeat: Number.POSITIVE_INFINITY,
				ease: "easeInOut" as const,
			};

export const BoardingPassRoute = ({
	prefersReducedMotion,
}: BoardingPassRouteProps) => (
	<div className="px-7">
		<div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2">
			<CityBlock
				align="left"
				city={BOARDING_PASS_ROUTE.originCity}
				code={BOARDING_PASS_ROUTE.originCode}
				time={BOARDING_PASS_ROUTE.departureLocal}
			/>

			<div className="relative flex w-[108px] flex-col items-center">
				<div className="relative flex w-full items-center justify-center py-1">
					<div
						aria-hidden
						className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 border-foreground/10 border-t border-dashed"
					/>
					<motion.div
						animate={
							prefersReducedMotion ? { y: 0 } : { y: [0, -2, 0, 1.2, 0] }
						}
						className="relative z-10 flex size-5 items-center justify-center rounded-full bg-emirates-brand shadow-[0_0_0_5px_var(--background)]"
						transition={planeFloatTransition(prefersReducedMotion)}
					>
						<Plane
							aria-hidden
							className="size-3 rotate-45 fill-background text-transparent"
							strokeWidth={1.5}
						/>
					</motion.div>
				</div>
				<p className="text-[9px] text-foreground/32 uppercase tracking-[0.2em]">
					{BOARDING_PASS_ROUTE.duration}
				</p>
			</div>

			<CityBlock
				align="right"
				city={BOARDING_PASS_ROUTE.destinationCity}
				code={BOARDING_PASS_ROUTE.destinationCode}
				dayOffset={BOARDING_PASS_ROUTE.arrivalDayOffset}
				time={BOARDING_PASS_ROUTE.arrivalLocal}
			/>
		</div>
	</div>
);
