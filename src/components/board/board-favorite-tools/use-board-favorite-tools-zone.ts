import { useMotionValue } from "motion/react";
import { type MouseEvent, useCallback, useRef, useState } from "react";

export type FavoriteToolMagneticListener = (
	clientX: number,
	clientY: number
) => void;

const POINTER_LEFT = Number.NaN;

export const useBoardFavoriteToolsZone = () => {
	const [isZoneActive, setIsZoneActive] = useState(false);
	const zonePointerX = useMotionValue(0.5);
	const zonePointerY = useMotionValue(0.5);
	const magneticListenersRef = useRef(new Set<FavoriteToolMagneticListener>());

	const registerMagneticListener = useCallback(
		(listener: FavoriteToolMagneticListener) => {
			magneticListenersRef.current.add(listener);
			return () => {
				magneticListenersRef.current.delete(listener);
			};
		},
		[]
	);

	const broadcastPointer = useCallback((clientX: number, clientY: number) => {
		for (const listener of magneticListenersRef.current) {
			listener(clientX, clientY);
		}
	}, []);

	const updateZonePointer = useCallback(
		(event: MouseEvent<HTMLElement>) => {
			const { clientX, clientY, currentTarget } = event;
			const rect = currentTarget.getBoundingClientRect();
			zonePointerX.set((clientX - rect.left) / rect.width);
			zonePointerY.set((clientY - rect.top) / rect.height);
			broadcastPointer(clientX, clientY);
		},
		[broadcastPointer, zonePointerX, zonePointerY]
	);

	const handleZonePointerEnter = useCallback(
		(event: MouseEvent<HTMLElement>) => {
			setIsZoneActive(true);
			updateZonePointer(event);
		},
		[updateZonePointer]
	);

	const handleZonePointerLeave = useCallback(() => {
		setIsZoneActive(false);
		zonePointerX.set(0.5);
		zonePointerY.set(0.5);
		broadcastPointer(POINTER_LEFT, POINTER_LEFT);
	}, [broadcastPointer, zonePointerX, zonePointerY]);

	return {
		handleZonePointerEnter,
		handleZonePointerLeave,
		handleZonePointerMove: updateZonePointer,
		isZoneActive,
		registerMagneticListener,
		zonePointerX,
		zonePointerY,
	};
};
