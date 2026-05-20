import { AnimatePresence, motion } from "motion/react";
import { useEffect, useId, useState } from "react";

import { boardEaseOut } from "#/lib/motion-config";
import { usePrefersReducedMotion } from "#/hooks/use-prefers-reduced-motion";

const NOTE_SYMBOLS = ["♪", "♫", "♬", "♩"] as const;

const NOTE_COLORS = [
	"#18A0FB",
	"#1BC47D",
	"#F49505",
	"#FF24BD",
	"#6D00F5",
	"#0C8CE8",
	"#E85D04",
] as const;

/** Pixels from album center — beyond the 75px half-edge of the 150px cover */
const NOTE_TRAVEL_MIN_PX = 88;
const NOTE_TRAVEL_RANGE_PX = 52;

interface FloatingNote {
	angle: number;
	color: string;
	endX: number;
	endY: number;
	id: number;
	spin: number;
	symbol: (typeof NOTE_SYMBOLS)[number];
}

interface BoardAlbumMusicNotesProps {
	active: boolean;
}

const randomFrom = <T,>(items: readonly T[]): T =>
	items[Math.floor(Math.random() * items.length)] as T;

const polarOffset = (angleDeg: number, distance: number) => {
	const rad = (angleDeg * Math.PI) / 180;
	return {
		x: Math.cos(rad) * distance,
		y: Math.sin(rad) * distance,
	};
};

const createNote = (id: number): FloatingNote => {
	const angle = Math.random() * 360;
	const distance =
		NOTE_TRAVEL_MIN_PX + Math.random() * NOTE_TRAVEL_RANGE_PX;
	const { x: endX, y: endY } = polarOffset(angle, distance);

	return {
		id,
		angle,
		color: randomFrom(NOTE_COLORS),
		endX,
		endY,
		spin: (Math.random() - 0.5) * 36,
		symbol: randomFrom(NOTE_SYMBOLS),
	};
};

export const BoardAlbumMusicNotes = ({ active }: BoardAlbumMusicNotesProps) => {
	const [notes, setNotes] = useState<FloatingNote[]>([]);
	const instanceId = useId().replace(/:/g, "");
	const prefersReducedMotion = usePrefersReducedMotion();

	useEffect(() => {
		if (!active) {
			setNotes([]);
			return;
		}

		let noteId = 0;
		const spawn = () => {
			setNotes((current) => [...current.slice(-18), createNote(noteId++)]);
		};

		spawn();
		const interval = window.setInterval(spawn, 320);

		return () => window.clearInterval(interval);
	}, [active]);

	return (
		<div
			aria-hidden
			className="pointer-events-none absolute inset-0 z-30 overflow-visible"
		>
			<AnimatePresence>
				{notes.map((note) => (
					<motion.span
						className="absolute top-1/2 left-1/2 font-semibold text-xl leading-none"
						exit={{ opacity: 0, scale: 0.5 }}
						initial={{
							opacity: 0,
							rotate: 0,
							scale: 0.35,
							x: "-50%",
							y: "-50%",
						}}
						animate={{
							opacity: prefersReducedMotion ? [0, 1, 0] : [0, 1, 1, 0],
							rotate: note.spin,
							scale: prefersReducedMotion
								? [0.35, 1, 0.8]
								: [0.35, 1.2, 1.05, 0.85],
							x: `calc(-50% + ${note.endX}px)`,
							y: `calc(-50% + ${note.endY}px)`,
						}}
						key={`${instanceId}-${note.id}`}
						style={{
							color: note.color,
							textShadow: `0 2px 10px color-mix(in srgb, ${note.color} 50%, transparent)`,
						}}
						transition={{
							duration: prefersReducedMotion ? 0.9 : 1.75,
							ease: boardEaseOut,
						}}
					>
						{note.symbol}
					</motion.span>
				))}
			</AnimatePresence>
		</div>
	);
};
