import { cn } from "#/lib/utils";

interface LayoutRulerTickProps {
	orientation?: "horizontal" | "vertical";
	value: number;
}

export const LayoutRulerTick = ({
	value,
	orientation = "horizontal",
}: LayoutRulerTickProps) => (
	<div
		className={cn(
			"flex w-fit flex-col items-center justify-center text-neutral-400/60",
			orientation === "vertical" ? "-rotate-90" : ""
		)}
	>
		<span className="font-semibold text-[11px]">{value}</span>
		<div className="h-[4px] w-px bg-neutral-400/60" />
	</div>
);
