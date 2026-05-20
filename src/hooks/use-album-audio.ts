import { useCallback, useEffect, useRef, useState } from "react";

const FADE_MS = 450;
const TARGET_VOLUME = 1;

const easeOut = (t: number) => 1 - (1 - t) ** 2;

export const useAlbumAudio = (src: string) => {
	const audioRef = useRef<HTMLAudioElement | null>(null);
	const fadeFrameRef = useRef(0);
	const [isPlaying, setIsPlaying] = useState(false);

	useEffect(() => {
		const audio = new Audio(src);
		audio.preload = "auto";
		audioRef.current = audio;

		const handleEnded = () => setIsPlaying(false);
		audio.addEventListener("ended", handleEnded);

		return () => {
			cancelAnimationFrame(fadeFrameRef.current);
			audio.removeEventListener("ended", handleEnded);
			audio.pause();
			audio.src = "";
		};
	}, [src]);

	const fadeVolume = useCallback(
		(targetVolume: number, onComplete?: () => void) => {
			const audio = audioRef.current;
			if (!audio) {
				return;
			}

			cancelAnimationFrame(fadeFrameRef.current);
			const startVolume = audio.volume;
			const startTime = performance.now();

			const step = (now: number) => {
				const progress = Math.min((now - startTime) / FADE_MS, 1);
				audio.volume =
					startVolume + (targetVolume - startVolume) * easeOut(progress);

				if (progress < 1) {
					fadeFrameRef.current = requestAnimationFrame(step);
				} else {
					onComplete?.();
				}
			};

			fadeFrameRef.current = requestAnimationFrame(step);
		},
		[]
	);

	const play = useCallback(async () => {
		const audio = audioRef.current;
		if (!audio) {
			return;
		}

		cancelAnimationFrame(fadeFrameRef.current);
		audio.volume = 0;

		try {
			await audio.play();
			setIsPlaying(true);
			fadeVolume(TARGET_VOLUME);
		} catch {
			setIsPlaying(false);
		}
	}, [fadeVolume]);

	const pause = useCallback(() => {
		const audio = audioRef.current;
		if (!audio) {
			return;
		}

		fadeVolume(0, () => {
			audio.pause();
			setIsPlaying(false);
		});
	}, [fadeVolume]);

	const toggle = useCallback(() => {
		if (isPlaying) {
			pause();
		} else {
			play();
		}
	}, [isPlaying, pause, play]);

	return { isPlaying, toggle, pause, play };
};
