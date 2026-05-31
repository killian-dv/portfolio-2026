import type { CSSProperties } from "react";

import { BoardPushPin } from "#/components/board/decorations/board-push-pin";
import { cn } from "#/lib/utils";

import "#/components/board/decorations/board-decorations.css";

/** Max width of the photo area inside the white frame (image keeps aspect ratio). */
export const BOARD_PINNED_PHOTO_MAX_WIDTH_PX = 188;
export const BOARD_PINNED_PHOTO_FRAME_PADDING_PX = 7;

export type BoardPinnedPhotoHold = "pin" | "tape" | "none";

interface BoardPinnedPhotoProps {
	alt: string;
	className?: string;
	hold?: BoardPinnedPhotoHold;
	maxWidthPx?: number;
	rotationDeg?: number;
	src: string;
	style?: CSSProperties;
}

const clampRotation = (deg: number) => Math.max(-3, Math.min(3, deg));

export const BoardPinnedPhoto = ({
	src,
	alt,
	className,
	rotationDeg = 2,
	hold = "pin",
	maxWidthPx = BOARD_PINNED_PHOTO_MAX_WIDTH_PX,
	style,
}: BoardPinnedPhotoProps) => {
	const rotation = clampRotation(rotationDeg);
	const pad = BOARD_PINNED_PHOTO_FRAME_PADDING_PX;

	return (
		<figure
			aria-hidden
			className={cn(
				"board-desk-object board-desk-object--straighten-hover pointer-events-auto absolute z-10 m-0 w-fit",
				className
			)}
			style={
				{
					...style,
					"--board-desk-rotate": `${rotation}deg`,
				} as CSSProperties
			}
		>
			{hold === "pin" ? (
				<BoardPushPin
					className="absolute top-0 left-1/2 z-20 -translate-x-1/2 -translate-y-[38%]"
					color="red"
					size={17}
				/>
			) : null}

			{hold === "tape" ? (
				<div
					aria-hidden
					className="pointer-events-none absolute top-0 left-1/2 z-20 h-[13px] w-[42px] -translate-x-1/2 -translate-y-[45%] rotate-[-3deg] border border-white/55 bg-linear-to-b from-white/65 to-white/35 shadow-[0_1px_2px_rgb(0_0_0/0.07)]"
				/>
			) : null}

			<div
				className="relative w-fit bg-white shadow-[inset_0_0_0_1px_rgb(0_0_0/0.04)]"
				style={{ padding: pad }}
			>
				<img
					alt={alt}
					className="block h-auto max-w-full object-contain"
					draggable={false}
					height={800}
					src={src}
					style={{ maxWidth: maxWidthPx }}
					width={600}
				/>
			</div>
		</figure>
	);
};
