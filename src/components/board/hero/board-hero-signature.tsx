import { Penflow } from "penflow/react";
import { useEffect, useState } from "react";

import { heroSignature } from "#/components/board/hero/board-hero.data";
import { usePrefersReducedMotion } from "#/hooks/use-prefers-reduced-motion";

const SIGNATURE_PLAY_DELAY_MS = 900;

export const BoardHeroSignature = () => {
	const prefersReducedMotion = usePrefersReducedMotion();
	const [playheadKey, setPlayheadKey] = useState(0);
	const [isReady, setIsReady] = useState(prefersReducedMotion);

	useEffect(() => {
		if (prefersReducedMotion) {
			setIsReady(true);
			return;
		}

		const timer = window.setTimeout(() => {
			setIsReady(true);
			setPlayheadKey((key) => key + 1);
		}, SIGNATURE_PLAY_DELAY_MS);

		return () => window.clearTimeout(timer);
	}, [prefersReducedMotion]);

	if (!isReady) {
		return null;
	}

	return (
		<Penflow
			animate={!prefersReducedMotion}
			className="h-auto w-24 max-w-none"
			color="#262626"
			fontUrl={heroSignature.fontUrl}
			playheadKey={playheadKey}
			quality="balanced"
			seed="hero-signature"
			size={36}
			speed={1}
			text={heroSignature.text}
		/>
	);
};
