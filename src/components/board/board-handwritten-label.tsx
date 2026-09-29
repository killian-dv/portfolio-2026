import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentPropsWithoutRef, ElementType } from "react";

import { cn } from "#/lib/utils";

export const boardHandwrittenLabelVariants = cva(
	"m-0 select-none font-caveat font-medium leading-none tracking-[0.01em]",
	{
		defaultVariants: {
			variant: "blue",
		},
		variants: {
			variant: {
				blue: [
					"text-board-handwritten-blue",
					"[text-shadow:0_0.5px_0_rgba(47,95,174,0.35),0_1px_2px_rgba(47,95,174,0.1)]",
				],
				neutral: "text-board-handwritten-neutral",
				red: [
					"text-board-handwritten-red",
					"[text-shadow:0_0.5px_0_rgba(194,62,62,0.35),0_1px_2px_rgba(194,62,62,0.1)]",
				],
			},
		},
	}
);

type BoardHandwrittenLabelElement = "h2" | "p" | "span";

type BoardHandwrittenLabelProps = VariantProps<
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
