export const boardSpring = {
	bounce: 0.2,
	duration: 0.5,
	type: "spring" as const,
};

export const boardSpringSnappy = {
	bounce: 0.15,
	duration: 0.35,
	type: "spring" as const,
};

export const boardEaseOut = [0.23, 1, 0.32, 1] as const;

/** Tooltip enter/exit (125–200ms, ease-out, no scale(0)). */
export const tooltipMotion = {
	enter: { duration: 0.15, ease: boardEaseOut },
	exit: { duration: 0.12, ease: boardEaseOut },
} as const;

export const vinylSpinTransition = {
	duration: 2.4,
	ease: "linear" as const,
	repeat: Number.POSITIVE_INFINITY,
};
