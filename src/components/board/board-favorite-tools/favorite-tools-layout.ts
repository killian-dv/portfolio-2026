import {
	BOARD_FAVORITE_TOOL_STICKER_SIZE_PX,
	BOARD_FAVORITE_TOOLS_SECTION_WIDTH_PX,
} from "#/components/board/board-favorite-tools/board-favorite-tools-constants";
import type { FavoriteTool } from "#/components/board/board-favorite-tools/favorite-tools.types";

export const getFavoriteToolsClusterCenterX = (
	tools: readonly Pick<FavoriteTool, "x">[]
): number => {
	if (tools.length === 0) {
		return BOARD_FAVORITE_TOOLS_SECTION_WIDTH_PX / 2;
	}

	let minX = Number.POSITIVE_INFINITY;
	let maxX = Number.NEGATIVE_INFINITY;

	for (const { x } of tools) {
		minX = Math.min(minX, x);
		maxX = Math.max(maxX, x + BOARD_FAVORITE_TOOL_STICKER_SIZE_PX);
	}

	return (minX + maxX) / 2;
};
