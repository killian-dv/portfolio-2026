import type { CSSProperties } from "react";

import { BOARD_FAVORITE_TOOL_ANNOTATION_Z_INDEX } from "#/components/board/board-favorite-tools/board-favorite-tools-constants";
import type { FavoriteToolNotePlacement } from "#/components/board/board-favorite-tools/favorite-tools.types";
import { BoardHandwrittenLabel } from "#/components/board/board-handwritten-label";
import { cn } from "#/lib/utils";

interface FavoriteToolAnnotationProps {
	note: string;
	placement: FavoriteToolNotePlacement;
	visible: boolean;
}

const ANNOTATION_BASE_CLASS =
	"pointer-events-none absolute font-caveat font-medium text-[1.05rem] italic text-[#3d3d3d] transition-opacity duration-200";

const placementStyle: Record<FavoriteToolNotePlacement, CSSProperties> = {
	top: {
		bottom: "calc(100% + 10px)",
		left: "50%",
		transform: "translateX(-50%) rotate(-3deg)",
	},
	bottom: {
		top: "calc(100% + 10px)",
		left: "50%",
		transform: "translateX(-50%) rotate(-3deg)",
	},
	left: {
		right: "calc(100% + 10px)",
		top: "50%",
		transform: "translateY(-50%) rotate(-4deg)",
		textAlign: "right",
	},
	right: {
		left: "calc(100% + 10px)",
		top: "50%",
		transform: "translateY(-50%) rotate(-4deg)",
		textAlign: "left",
	},
};

const annotationStyle = (placement: FavoriteToolNotePlacement) => ({
	...placementStyle[placement],
	zIndex: BOARD_FAVORITE_TOOL_ANNOTATION_Z_INDEX,
});

const HorizontalAnnotation = ({
	label,
	placement,
	visible,
}: {
	label: string;
	placement: "left" | "right";
	visible: boolean;
}) => (
	<BoardHandwrittenLabel
		aria-hidden={!visible}
		className={cn(
			ANNOTATION_BASE_CLASS,
			"whitespace-nowrap",
			visible ? "opacity-100" : "opacity-0"
		)}
		style={annotationStyle(placement)}
		variant="neutral"
	>
		{label}
	</BoardHandwrittenLabel>
);

const VerticalAnnotation = ({
	arrow,
	note,
	placement,
	visible,
}: {
	arrow: "↑" | "↓";
	note: string;
	placement: "top" | "bottom";
	visible: boolean;
}) => {
	const arrowFirst = placement === "bottom";

	return (
		<span
			aria-hidden={!visible}
			className={cn(
				ANNOTATION_BASE_CLASS,
				"flex flex-col items-center gap-0.5 leading-none",
				visible ? "opacity-100" : "opacity-0"
			)}
			style={annotationStyle(placement)}
		>
			{arrowFirst ? (
				<span className="text-[0.95rem] leading-none">{arrow}</span>
			) : null}
			<span className="whitespace-nowrap leading-none">{note}</span>
			{arrowFirst ? null : (
				<span className="text-[0.95rem] leading-none">{arrow}</span>
			)}
		</span>
	);
};

export const FavoriteToolAnnotation = ({
	note,
	placement,
	visible,
}: FavoriteToolAnnotationProps) => {
	if (placement === "top") {
		return (
			<VerticalAnnotation
				arrow="↓"
				note={note}
				placement="top"
				visible={visible}
			/>
		);
	}

	if (placement === "bottom") {
		return (
			<VerticalAnnotation
				arrow="↑"
				note={note}
				placement="bottom"
				visible={visible}
			/>
		);
	}

	return (
		<HorizontalAnnotation
			label={placement === "right" ? `← ${note}` : `${note} →`}
			placement={placement}
			visible={visible}
		/>
	);
};
