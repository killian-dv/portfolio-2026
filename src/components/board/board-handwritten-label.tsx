import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentPropsWithoutRef, ElementType } from "react";

import { cn } from "#/lib/utils";

export const boardHandwrittenLabelVariants = cva(
	"m-0 select-none font-caveat font-medium leading-none tracking-[0.01em]",
	{
		variants: {
			variant: {
				blue: [
					"text-[#2f5fae]",
					"[text-shadow:0_0.5px_0_rgba(47,95,174,0.35),0_1px_2px_rgba(47,95,174,0.1)]",
				],
				red: [
					"text-[#c23e3e]",
					"[text-shadow:0_0.5px_0_rgba(194,62,62,0.35),0_1px_2px_rgba(194,62,62,0.1)]",
				],
				neutral: "text-[#3d3d3d]",
			},
		},
		defaultVariants: {
			variant: "blue",
		},
	}
);

type BoardHandwrittenLabelElement = "h2" | "p" | "span";

export type BoardHandwrittenLabelProps = VariantProps<
	typeof boardHandwrittenLabelVariants
> & {
	as?: BoardHandwrittenLabelElement;
	className?: string;
} & ComponentPropsWithoutRef<"span">;

export const BoardHandwrittenLabel = ({
	as: Component = "span",
	className,
	variant,
	...props
}: BoardHandwrittenLabelProps) => {
	const Tag = Component as ElementType;

	return (
		<Tag
			className={cn(boardHandwrittenLabelVariants({ variant }), className)}
			{...props}
		/>
	);
};
