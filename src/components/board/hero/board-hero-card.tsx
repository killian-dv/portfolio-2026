import { motion } from "motion/react";
import type { ReactNode } from "react";

import { BoardFigmaCursors } from "#/components/board/hero/board-figma-cursors";
import { BoardFrameCorner } from "#/components/board/hero/board-frame-corner";

interface BoardHeroCardProps {
	children?: ReactNode;
}

export const BoardHeroCard = ({ children }: BoardHeroCardProps) => (
	<div className="flex h-fit w-fit items-center justify-center overflow-visible">
		<motion.div
			animate={{ filter: "blur(0px)", opacity: 1, scale: 1 }}
			className="relative cursor-grab overflow-visible hover:cursor-default"
			initial={{ filter: "blur(5px)", opacity: 0, scale: 0.95 }}
			transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
		>
			<div className="relative w-full max-w-[95vw] overflow-visible rounded-[4px] border border-blue-400 bg-white p-6 text-neutral-900 sm:w-[485px] md:p-8">
				<BoardFrameCorner position="top-left" />
				<BoardFrameCorner position="top-right" />
				<BoardFrameCorner position="bottom-left" />
				<BoardFrameCorner position="bottom-right" />
				{children}
			</div>
			<BoardFigmaCursors />
		</motion.div>
	</div>
);
