import type { MotionValue } from "motion/react";
import { createContext, useContext } from "react";

import type { FavoriteToolMagneticListener } from "#/components/board/board-favorite-tools/use-board-favorite-tools-zone";

export interface BoardFavoriteToolsZoneContextValue {
	isZoneActive: boolean;
	registerMagneticListener: (
		listener: FavoriteToolMagneticListener
	) => () => void;
	zonePointerX: MotionValue<number>;
	zonePointerY: MotionValue<number>;
}

export const BoardFavoriteToolsZoneContext =
	createContext<BoardFavoriteToolsZoneContextValue | null>(null);

export const useBoardFavoriteToolsZone = () => {
	const context = useContext(BoardFavoriteToolsZoneContext);
	if (!context) {
		throw new Error(
			"useBoardFavoriteToolsZone must be used within BoardFavoriteTools"
		);
	}
	return context;
};
