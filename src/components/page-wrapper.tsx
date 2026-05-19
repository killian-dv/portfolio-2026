import type { ComponentProps } from "react";
import { LayoutRulerLeft } from "#/components/layout-ruler-left";
import { LayoutRulerTop } from "#/components/layout-ruler-top";

export const PageWrapper = ({ ...props }: ComponentProps<"div">) => (
	<>
		<LayoutRulerTop />
		<LayoutRulerLeft />
		<main className="flex min-h-screen flex-col overflow-hidden" {...props} />
	</>
);
