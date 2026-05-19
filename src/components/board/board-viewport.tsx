import type { ComponentProps } from "react";

import { BoardCanvas } from "#/components/board/board-canvas";
import { useBoardPan } from "#/hooks/use-board-pan";
import { cn } from "#/lib/utils";

interface BoardViewportProps extends ComponentProps<"div"> {
	enabled?: boolean;
}

export const BoardViewport = ({
	enabled = true,
	className,
	...props
}: BoardViewportProps) => {
	const {
		transformRef,
		isInteractive,
		handleMouseDown,
		handleMouseMove,
		handleMouseUp,
		handleMouseLeave,
	} = useBoardPan(enabled);

	return (
		// biome-ignore lint/a11y/noNoninteractiveElementInteractions: board pan surface
		<div
			aria-label="Portfolio board"
			className={cn(
				"scrollbar-none fixed inset-0 overflow-hidden",
				isInteractive ? "cursor-move" : "cursor-default",
				className
			)}
			onMouseDown={handleMouseDown}
			onMouseLeave={handleMouseLeave}
			onMouseMove={handleMouseMove}
			onMouseUp={handleMouseUp}
			role="application"
			style={{
				overscrollBehavior: "none",
				touchAction: isInteractive ? "none" : "auto",
			}}
			{...props}
		>
			<div
				className="h-full w-full touch-none select-none"
				ref={transformRef}
				style={{ willChange: "transform" }}
			>
				<BoardCanvas />
			</div>
		</div>
	);
};
