import { type MouseEvent, useCallback, useMemo } from "react";

import { BoardFavoriteToolSticker } from "#/components/board/board-favorite-tools/board-favorite-tool-sticker";
import {
	BOARD_FAVORITE_TOOLS_SECTION_HEIGHT_PX,
	BOARD_FAVORITE_TOOLS_SECTION_WIDTH_PX,
	BOARD_FAVORITE_TOOLS_TITLE,
} from "#/components/board/board-favorite-tools/board-favorite-tools-constants";
import { BoardFavoriteToolsZoneContext } from "#/components/board/board-favorite-tools/board-favorite-tools-zone-context";
import { favoriteTools } from "#/components/board/board-favorite-tools/favorite-tools.data";
import { getFavoriteToolsClusterCenterX } from "#/components/board/board-favorite-tools/favorite-tools-layout";
import { useBoardFavoriteToolsZone } from "#/components/board/board-favorite-tools/use-board-favorite-tools-zone";
import { BoardHandwrittenLabel } from "#/components/board/board-handwritten-label";

export const BoardFavoriteTools = () => {
	const stopBoardPan = useCallback((event: MouseEvent) => {
		event.stopPropagation();
	}, []);

	const zone = useBoardFavoriteToolsZone();
	const iconClusterCenterX = useMemo(
		() => getFavoriteToolsClusterCenterX(favoriteTools),
		[]
	);

	const zoneContextValue = useMemo(
		() => ({
			isZoneActive: zone.isZoneActive,
			registerMagneticListener: zone.registerMagneticListener,
			zonePointerX: zone.zonePointerX,
			zonePointerY: zone.zonePointerY,
		}),
		[
			zone.isZoneActive,
			zone.registerMagneticListener,
			zone.zonePointerX,
			zone.zonePointerY,
		]
	);

	return (
		<BoardFavoriteToolsZoneContext.Provider value={zoneContextValue}>
			<section
				aria-label="Favorite tools"
				className="pointer-events-auto relative shrink-0 overflow-visible"
				style={{
					height: BOARD_FAVORITE_TOOLS_SECTION_HEIGHT_PX,
					width: BOARD_FAVORITE_TOOLS_SECTION_WIDTH_PX,
				}}
			>
				<BoardHandwrittenLabel
					as="h2"
					className="pointer-events-none absolute z-20 text-[2.15rem]"
					style={{
						left: iconClusterCenterX,
						top: 10,
						transform: "translateX(-50%) rotate(-2.2deg)",
					}}
				>
					{BOARD_FAVORITE_TOOLS_TITLE}
				</BoardHandwrittenLabel>

				{/* biome-ignore lint/a11y/noNoninteractiveElementInteractions: zone magnetic field */}
				{/* biome-ignore lint/a11y/noStaticElementInteractions: zone magnetic field */}
				<div
					className="relative h-full w-full"
					onMouseEnter={zone.handleZonePointerEnter}
					onMouseLeave={zone.handleZonePointerLeave}
					onMouseMove={zone.handleZonePointerMove}
				>
					{favoriteTools.map((tool) => (
						<BoardFavoriteToolSticker
							key={tool.id}
							onMouseDown={stopBoardPan}
							tool={tool}
						/>
					))}
				</div>
			</section>
		</BoardFavoriteToolsZoneContext.Provider>
	);
};
