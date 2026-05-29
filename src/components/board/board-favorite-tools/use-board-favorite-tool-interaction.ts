import { useMotionValue, useSpring, useTransform } from "motion/react";
import {
	type MouseEvent,
	useCallback,
	useEffect,
	useRef,
	useState,
} from "react";

import {
	BOARD_FAVORITE_TOOL_MAGNETIC_DEAD_ZONE_PX,
	BOARD_FAVORITE_TOOL_MAGNETIC_MAX_PX,
	BOARD_FAVORITE_TOOL_MAGNETIC_RADIUS_PX,
	BOARD_FAVORITE_TOOL_MAGNETIC_SPRING,
	BOARD_FAVORITE_TOOL_ZONE_SPRING,
} from "#/components/board/board-favorite-tools/board-favorite-tools-constants";
import { useBoardFavoriteToolsZone } from "#/components/board/board-favorite-tools/board-favorite-tools-zone-context";
import { usePrefersReducedMotion } from "#/hooks/use-prefers-reduced-motion";

const noMotionSpring = { duration: 0 } as const;

const computeMagneticOffset = (
	clientX: number,
	clientY: number,
	centerX: number,
	centerY: number
) => {
	const dx = clientX - centerX;
	const dy = clientY - centerY;
	const distance = Math.hypot(dx, dy);

	if (distance > BOARD_FAVORITE_TOOL_MAGNETIC_RADIUS_PX) {
		return null;
	}

	if (distance < 0.5) {
		return { glow: 1, x: 0, y: 0 };
	}

	const proximity = 1 - distance / BOARD_FAVORITE_TOOL_MAGNETIC_RADIUS_PX;
	const eased = proximity ** 1.35;
	let pull = eased * BOARD_FAVORITE_TOOL_MAGNETIC_MAX_PX;

	if (distance < BOARD_FAVORITE_TOOL_MAGNETIC_DEAD_ZONE_PX) {
		const deadFade = distance / BOARD_FAVORITE_TOOL_MAGNETIC_DEAD_ZONE_PX;
		pull *= deadFade * deadFade;
	}

	const directionDistance = Math.max(
		distance,
		BOARD_FAVORITE_TOOL_MAGNETIC_DEAD_ZONE_PX * 0.65
	);

	return {
		glow: eased,
		x: (dx / directionDistance) * pull,
		y: (dy / directionDistance) * pull,
	};
};

export const useBoardFavoriteToolInteraction = (idleRotateDeg: number) => {
	const stickerRef = useRef<HTMLButtonElement>(null);
	const isHoveredRef = useRef(false);
	const [isHovered, setIsHovered] = useState(false);
	const prefersReducedMotion = usePrefersReducedMotion();
	const { isZoneActive, registerMagneticListener, zonePointerX } =
		useBoardFavoriteToolsZone();

	const magneticSpring = prefersReducedMotion
		? noMotionSpring
		: BOARD_FAVORITE_TOOL_MAGNETIC_SPRING;
	const zoneSpring = prefersReducedMotion
		? noMotionSpring
		: BOARD_FAVORITE_TOOL_ZONE_SPRING;

	const pullX = useMotionValue(0);
	const pullY = useMotionValue(0);
	const glowStrength = useMotionValue(0);
	const hoverTilt = useMotionValue(0);

	const springPullX = useSpring(pullX, magneticSpring);
	const springPullY = useSpring(pullY, magneticSpring);
	const springGlow = useSpring(glowStrength, magneticSpring);
	const springHoverTilt = useSpring(hoverTilt, magneticSpring);

	const zoneTilt = useTransform(zonePointerX, [0, 1], [-1.4, 1.4]);
	const springZoneTilt = useSpring(zoneTilt, zoneSpring);
	const zoneActive = useMotionValue(0);

	const glowOpacity = useTransform(springGlow, [0, 1], [0, 0.45]);
	const rotate = useTransform(
		[springZoneTilt, springHoverTilt, zoneActive],
		([zone, hover, active]: number[]) => idleRotateDeg + zone * active + hover
	);

	useEffect(() => {
		isHoveredRef.current = isHovered;
	}, [isHovered]);

	useEffect(() => {
		zoneActive.set(isZoneActive ? 1 : 0);
	}, [isZoneActive, zoneActive]);

	const resetMagnetic = useCallback(
		(keepGlowOnHover: boolean) => {
			pullX.set(0);
			pullY.set(0);
			if (!keepGlowOnHover) {
				glowStrength.set(0);
			}
		},
		[glowStrength, pullX, pullY]
	);

	const updateMagneticPull = useCallback(
		(clientX: number, clientY: number) => {
			const hovered = isHoveredRef.current;

			if (Number.isNaN(clientX) || Number.isNaN(clientY)) {
				resetMagnetic(hovered);
				return;
			}

			if (prefersReducedMotion || !isZoneActive) {
				resetMagnetic(hovered);
				return;
			}

			const rect = stickerRef.current?.getBoundingClientRect();
			if (!rect) {
				return;
			}

			const offset = computeMagneticOffset(
				clientX,
				clientY,
				rect.left + rect.width / 2,
				rect.top + rect.height / 2
			);

			if (!offset) {
				resetMagnetic(false);
				glowStrength.set(hovered ? 1 : 0);
				return;
			}

			pullX.set(offset.x);
			pullY.set(offset.y);
			glowStrength.set(Math.min(1, offset.glow * 1.2 + (hovered ? 0.4 : 0)));
		},
		[
			glowStrength,
			isZoneActive,
			prefersReducedMotion,
			pullX,
			pullY,
			resetMagnetic,
		]
	);

	useEffect(
		() => registerMagneticListener(updateMagneticPull),
		[registerMagneticListener, updateMagneticPull]
	);

	useEffect(() => {
		if (isZoneActive) {
			return;
		}
		pullX.set(0);
		pullY.set(0);
		if (!isHoveredRef.current) {
			glowStrength.set(0);
		}
	}, [glowStrength, isZoneActive, pullX, pullY]);

	const handlePointerEnter = useCallback(() => {
		setIsHovered(true);
		glowStrength.set(1);
		hoverTilt.set(idleRotateDeg > 0 ? 2.5 : -2.5);
	}, [glowStrength, hoverTilt, idleRotateDeg]);

	const handlePointerLeave = useCallback(() => {
		setIsHovered(false);
		hoverTilt.set(0);
		glowStrength.set(0);
	}, [glowStrength, hoverTilt]);

	const stopBoardPan = useCallback((event: MouseEvent) => {
		event.stopPropagation();
	}, []);

	return {
		glowOpacity,
		handlePointerEnter,
		handlePointerLeave,
		isHovered,
		isInteractive: !prefersReducedMotion,
		rotate,
		springPullX,
		springPullY,
		stickerRef,
		stopBoardPan,
	};
};
