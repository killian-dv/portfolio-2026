import type { ReactNode } from "react";

import { BoardFrameCorner } from "#/components/board/board-frame-corner";

interface BoardHeroCardProps {
	children?: ReactNode;
}

export const BoardHeroCard = ({ children }: BoardHeroCardProps) => (
	<div className="flex h-fit w-fit items-center justify-center overflow-visible">
		<div className="animate-board-scale-in cursor-grab hover:cursor-default">
			<div className="relative w-full max-w-[95vw] rounded-[4px] border border-blue-400 bg-white p-6 text-neutral-900 sm:w-[485px] md:p-8">
				<BoardFrameCorner position="top-left" />
				<BoardFrameCorner position="top-right" />
				<BoardFrameCorner position="bottom-left" />
				<BoardFrameCorner position="bottom-right" />
				{children}
			</div>
		</div>
	</div>
);
