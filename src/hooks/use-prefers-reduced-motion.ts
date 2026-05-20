import { useReducedMotion } from "motion/react";

/** True when user prefers reduced motion (synced with Motion). */
export const usePrefersReducedMotion = () => Boolean(useReducedMotion());
