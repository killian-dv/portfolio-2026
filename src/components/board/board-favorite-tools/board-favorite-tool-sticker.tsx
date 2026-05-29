import { motion } from "motion/react";
import type { MouseEvent } from "react";

import {
	BOARD_FAVORITE_TOOL_SPRING,
	BOARD_FAVORITE_TOOL_STICKER_SIZE_PX,
} from "#/components/board/board-favorite-tools/board-favorite-tools-constants";
import { FavoriteToolAnnotation } from "#/components/board/board-favorite-tools/favorite-tool-annotation";
import { FavoriteToolIcon } from "#/components/board/board-favorite-tools/favorite-tool-icon";
import type { FavoriteTool } from "#/components/board/board-favorite-tools/favorite-tools.types";
import { useBoardFavoriteToolInteraction } from "#/components/board/board-favorite-tools/use-board-favorite-tool-interaction";
import { cn } from "#/lib/utils";

interface BoardFavoriteToolStickerProps {
	onMouseDown: (event: MouseEvent) => void;
	tool: FavoriteTool;
}

export const BoardFavoriteToolSticker = ({
	onMouseDown,
	tool,
}: BoardFavoriteToolStickerProps) => {
	const {
		glowOpacity,
		handlePointerEnter,
		handlePointerLeave,
		isHovered,
		isInteractive,
		rotate,
		springPullX,
		springPullY,
		stickerRef,
		stopBoardPan,
	} = useBoardFavoriteToolInteraction(tool.rotation);

	const isDarkSticker = tool.stickerVariant === "dark";

	return (
		<motion.button
			animate={{ scale: isHovered && isInteractive ? 1.08 : 1 }}
			aria-label={tool.name}
			className={cn(
				"group absolute m-0 cursor-default border-0 bg-transparent p-0 outline-none",
				"focus-visible:ring-2 focus-visible:ring-black/15 focus-visible:ring-offset-2",
				isHovered ? "z-30" : "z-10"
			)}
			onMouseDown={(event) => {
				stopBoardPan(event);
				onMouseDown(event);
			}}
			onMouseEnter={handlePointerEnter}
			onMouseLeave={handlePointerLeave}
			ref={stickerRef}
			style={{
				left: tool.x,
				top: tool.y,
				width: BOARD_FAVORITE_TOOL_STICKER_SIZE_PX,
				height: BOARD_FAVORITE_TOOL_STICKER_SIZE_PX,
				rotate: isInteractive ? rotate : tool.rotation,
			}}
			transition={BOARD_FAVORITE_TOOL_SPRING}
			type="button"
		>
			<motion.span
				className="relative block h-full w-full"
				style={{ x: springPullX, y: springPullY }}
			>
				<motion.span
					aria-hidden
					className="pointer-events-none absolute inset-0 -z-10 rounded-full blur-xl"
					style={{
						background: `radial-gradient(circle at 50% 50%, rgba(${tool.glowColor}, 0.55), transparent 68%)`,
						opacity: glowOpacity,
						scale: 1.35,
					}}
				/>

				<span
					className={cn(
						"relative flex h-full w-full items-center justify-center overflow-hidden rounded-[10px] p-1.5",
						"shadow-[0_1px_0_rgba(255,255,255,0.95)_inset,0_2px_8px_-2px_rgba(0,0,0,0.12)]",
						isDarkSticker
							? "ring-2 ring-white/25 ring-inset"
							: "ring-2 ring-white ring-inset"
					)}
					style={{ backgroundColor: tool.stickerBackground }}
				>
					<FavoriteToolIcon
						alt={`${tool.name} logo`}
						scale={tool.iconScale}
						src={tool.iconSrc}
					/>
				</span>

				<FavoriteToolAnnotation
					note={tool.note}
					placement={tool.notePlacement}
					visible={isHovered}
				/>
			</motion.span>
		</motion.button>
	);
};
