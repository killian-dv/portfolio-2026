import { useId } from "react";

import { cn } from "#/lib/utils";

export type BoardFigmaCursorDrift =
	| "drift-1"
	| "drift-2"
	| "drift-3"
	| "drift-4"
	| "drift-5";

interface BoardFigmaCursorProps {
	className?: string;
	color: string;
	drift: BoardFigmaCursorDrift;
	name: string;
}

export const BoardFigmaCursor = ({
	name,
	color,
	drift,
	className,
}: BoardFigmaCursorProps) => {
	const filterId = useId().replace(/:/g, "");

	return (
		<div
			className={cn(
				"pointer-events-none z-50 select-none",
				`board-hero-cursor-${drift}`,
				className
			)}
		>
			<div className="relative inline-block">
				<span
					className="inline-flex h-fit w-fit rounded-full px-2 py-1.5 text-sm text-white shadow-[0px_1.185px_4.74px_rgba(0,0,0,0.16)]"
					style={{ backgroundColor: color }}
				>
					{name}
				</span>
				<div className="pointer-events-none absolute -top-[22px] -left-[17px]">
					<svg
						aria-hidden="true"
						fill="none"
						height="23"
						role="presentation"
						viewBox="0 0 21 23"
						width="21"
						xmlns="http://www.w3.org/2000/svg"
					>
						<g filter={`url(#${filterId})`}>
							<path
								d="M6.96281 16.0742L4.73259 4.47701C4.60471 3.81204 5.32142 3.30734 5.9044 3.65183L15.7726 9.48304C16.3708 9.8365 16.2498 10.7353 15.5795 10.9181L11.193 12.1145C10.9975 12.1678 10.8301 12.2946 10.7258 12.4684L8.40877 16.3301C8.03764 16.9487 7.09904 16.7825 6.96281 16.0742Z"
								fill={color}
							/>
							<path
								d="M4.15332 4.58807C3.92983 3.42453 5.18398 2.54191 6.20411 3.14471L16.0723 8.97577C17.1191 9.59433 16.9074 11.1666 15.7344 11.4865L11.3486 12.6828C11.2998 12.6961 11.2575 12.7283 11.2314 12.7717L8.91407 16.633C8.26463 17.7154 6.62232 17.4252 6.38379 16.1857L4.15332 4.58807Z"
								stroke="#fff"
								strokeLinecap="square"
								strokeWidth="1.17909"
							/>
						</g>
						<defs>
							<filter
								colorInterpolationFilters="sRGB"
								filterUnits="userSpaceOnUse"
								height="22.6083"
								id={filterId}
								width="20.8757"
								x="0"
								y="0"
							>
								<feFlood floodOpacity="0" result="BackgroundImageFix" />
								<feColorMatrix
									in="SourceAlpha"
									result="hardAlpha"
									values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
								/>
								<feOffset dy="1.17909" />
								<feGaussianBlur stdDeviation="1.76864" />
								<feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.35 0" />
								<feBlend
									in2="BackgroundImageFix"
									mode="normal"
									result="effect1_dropShadow"
								/>
								<feBlend
									in="SourceGraphic"
									in2="effect1_dropShadow"
									mode="normal"
									result="shape"
								/>
							</filter>
						</defs>
					</svg>
				</div>
			</div>
		</div>
	);
};
