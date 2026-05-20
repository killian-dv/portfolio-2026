export const boardSpring = {
	type: "spring" as const,
	duration: 0.5,
	bounce: 0.2,
};

export const boardSpringSnappy = {
	type: "spring" as const,
	duration: 0.35,
	bounce: 0.15,
};

export const boardEaseOut = [0.23, 1, 0.32, 1] as const;

/** Tooltip enter/exit (125–200ms, ease-out, no scale(0)). */
export const tooltipMotion = {
	enter: { duration: 0.15, ease: boardEaseOut },
	exit: { duration: 0.12, ease: boardEaseOut },
} as const;

export const vinylSpinTransition = {
	repeat: Number.POSITIVE_INFINITY,
	duration: 2.4,
	ease: "linear" as const,
};
