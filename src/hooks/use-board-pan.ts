import { useEffect, useRef } from "react";

import { BOARD_HEIGHT_PX, BOARD_WIDTH_PX } from "#/lib/board-grid-config";

interface Position {
	x: number;
	y: number;
}

interface DragState {
	isDragging: boolean;
	startX: number;
	startY: number;
}

interface ViewportMetrics {
	deviceScale: number;
	height: number;
	width: number;
}

const clamp = (value: number, min: number, max: number) =>
	Math.min(Math.max(value, min), max);

export const useBoardPan = (enabled = true) => {
	const transformRef = useRef<HTMLDivElement>(null);
	const positionRef = useRef<Position>({ x: 0, y: 0 });
	const velocityRef = useRef<Position>({ x: 0, y: 0 });
	const lastPointerRef = useRef<Position>({ x: 0, y: 0 });
	const lastTimeRef = useRef(0);
	const dragRef = useRef<DragState>({
		isDragging: false,
		startX: 0,
		startY: 0,
	});
	const zoomRef = useRef(1);
	const pinchRef = useRef({ distance: 0, zoom: 1 });
	const dragFrameRef = useRef<number | null>(null);
	const inertiaFrameRef = useRef<number | null>(null);
	const viewportRef = useRef<ViewportMetrics>({
		width: 0,
		height: 0,
		deviceScale: 1,
	});
	const enabledRef = useRef(enabled);

	enabledRef.current = enabled;

	const getScale = () => viewportRef.current.deviceScale * zoomRef.current;

	const clampPosition = (x: number, y: number): Position => {
		const scale = getScale();
		const maxX = (BOARD_WIDTH_PX - viewportRef.current.width) * scale;
		const maxY = (BOARD_HEIGHT_PX - viewportRef.current.height) * scale;

		return {
			x: clamp(x, maxX > 0 ? -maxX / 2 : 0, maxX > 0 ? maxX / 2 : 0),
			y: clamp(y, maxY > 0 ? -maxY / 2 : 0, maxY > 0 ? maxY / 2 : 0),
		};
	};

	const applyTransform = () => {
		const element = transformRef.current;
		if (!element) {
			return;
		}

		const { x, y } = positionRef.current;
		const scale = getScale();
		element.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${scale})`;
	};

	const startDrag = (clientX: number, clientY: number) => {
		if (inertiaFrameRef.current) {
			cancelAnimationFrame(inertiaFrameRef.current);
		}

		dragRef.current = {
			isDragging: true,
			startX: clientX - positionRef.current.x,
			startY: clientY - positionRef.current.y,
		};
		lastPointerRef.current = { x: clientX, y: clientY };
		lastTimeRef.current = Date.now();
		velocityRef.current = { x: 0, y: 0 };
	};

	const moveDrag = (clientX: number, clientY: number) => {
		if (!dragRef.current.isDragging) {
			return;
		}

		if (dragFrameRef.current) {
			cancelAnimationFrame(dragFrameRef.current);
		}

		const now = Date.now();
		const deltaTime = now - lastTimeRef.current;

		if (deltaTime > 0) {
			velocityRef.current = {
				x: (clientX - lastPointerRef.current.x) / deltaTime,
				y: (clientY - lastPointerRef.current.y) / deltaTime,
			};
		}

		lastPointerRef.current = { x: clientX, y: clientY };
		lastTimeRef.current = now;

		dragFrameRef.current = requestAnimationFrame(() => {
			const nextPosition = {
				x: clientX - dragRef.current.startX,
				y: clientY - dragRef.current.startY,
			};
			positionRef.current = clampPosition(nextPosition.x, nextPosition.y);
			applyTransform();
		});
	};

	const endDrag = () => {
		dragRef.current.isDragging = false;

		if (dragFrameRef.current) {
			cancelAnimationFrame(dragFrameRef.current);
		}

		const runInertia = () => {
			velocityRef.current = {
				x: velocityRef.current.x * 0.9,
				y: velocityRef.current.y * 0.9,
			};

			const nextPosition = {
				x: positionRef.current.x + 16 * velocityRef.current.x,
				y: positionRef.current.y + 16 * velocityRef.current.y,
			};

			positionRef.current = clampPosition(nextPosition.x, nextPosition.y);
			applyTransform();

			if (
				Math.abs(velocityRef.current.x) > 0 ||
				Math.abs(velocityRef.current.y) > 0
			) {
				inertiaFrameRef.current = requestAnimationFrame(runInertia);
			}
		};

		if (
			Math.abs(velocityRef.current.x) > 0 ||
			Math.abs(velocityRef.current.y) > 0
		) {
			runInertia();
		}
	};

	// biome-ignore lint/correctness/useExhaustiveDependencies: listeners mount once; state lives in refs
	useEffect(() => {
		const updateViewport = () => {
			viewportRef.current = {
				width: window.innerWidth,
				height: window.innerHeight,
				deviceScale: 1,
			};
			applyTransform();
		};

		updateViewport();
		window.addEventListener("resize", updateViewport);

		return () => {
			window.removeEventListener("resize", updateViewport);
		};
	}, []);

	// biome-ignore lint/correctness/useExhaustiveDependencies: listeners mount once; state lives in refs
	useEffect(() => {
		const element = transformRef.current;
		if (!element) {
			return;
		}

		const handleWheel = (event: WheelEvent) => {
			if (!enabledRef.current) {
				return;
			}

			event.preventDefault();

			positionRef.current = {
				x: positionRef.current.x - 0.15 * event.deltaX,
				y: positionRef.current.y - 0.15 * event.deltaY,
			};
			velocityRef.current = {
				x: -0.015 * event.deltaX,
				y: -0.015 * event.deltaY,
			};

			positionRef.current = clampPosition(
				positionRef.current.x,
				positionRef.current.y
			);
			applyTransform();
			endDrag();
		};

		const handleTouchStart = (event: TouchEvent) => {
			if (!enabledRef.current) {
				return;
			}

			if (event.touches.length === 2) {
				event.preventDefault();
				const [touchA, touchB] = [event.touches[0], event.touches[1]];
				pinchRef.current = {
					distance: Math.hypot(
						touchB.clientX - touchA.clientX,
						touchB.clientY - touchA.clientY
					),
					zoom: zoomRef.current,
				};
				return;
			}

			if (event.touches.length === 1) {
				const touch = event.touches[0];
				startDrag(touch.clientX, touch.clientY);
			}
		};

		const handleTouchMove = (event: TouchEvent) => {
			if (!enabledRef.current) {
				return;
			}

			if (event.touches.length === 2) {
				event.preventDefault();
				const [touchA, touchB] = [event.touches[0], event.touches[1]];
				const distance = Math.hypot(
					touchB.clientX - touchA.clientX,
					touchB.clientY - touchA.clientY
				);
				const nextZoom = clamp(
					(pinchRef.current.zoom * distance) / pinchRef.current.distance,
					0.5,
					2
				);
				zoomRef.current = nextZoom;
				positionRef.current = clampPosition(
					positionRef.current.x,
					positionRef.current.y
				);
				applyTransform();
				return;
			}

			if (event.touches.length === 1 && dragRef.current.isDragging) {
				const touch = event.touches[0];
				moveDrag(touch.clientX, touch.clientY);
			}
		};

		const handleTouchEnd = () => {
			if (!enabledRef.current) {
				return;
			}
			endDrag();
		};

		element.addEventListener("wheel", handleWheel, { passive: false });
		element.addEventListener("touchstart", handleTouchStart, {
			passive: false,
		});
		element.addEventListener("touchmove", handleTouchMove, { passive: false });
		element.addEventListener("touchend", handleTouchEnd);

		return () => {
			element.removeEventListener("wheel", handleWheel);
			element.removeEventListener("touchstart", handleTouchStart);
			element.removeEventListener("touchmove", handleTouchMove);
			element.removeEventListener("touchend", handleTouchEnd);

			if (dragFrameRef.current) {
				cancelAnimationFrame(dragFrameRef.current);
			}
			if (inertiaFrameRef.current) {
				cancelAnimationFrame(inertiaFrameRef.current);
			}
		};
	}, []);

	return {
		transformRef,
		isInteractive: enabled,
		handleMouseDown: (event: React.MouseEvent<HTMLDivElement>) => {
			if (!enabled) {
				return;
			}

			if (
				event.target instanceof Element &&
				event.target.closest('[data-clickable="true"]')
			) {
				return;
			}

			startDrag(event.clientX, event.clientY);
		},
		handleMouseMove: (event: React.MouseEvent<HTMLDivElement>) => {
			if (!enabled) {
				return;
			}
			moveDrag(event.clientX, event.clientY);
		},
		handleMouseUp: () => {
			if (!enabled) {
				return;
			}
			endDrag();
		},
		handleMouseLeave: () => {
			if (!enabled) {
				return;
			}
			endDrag();
		},
	};
};
