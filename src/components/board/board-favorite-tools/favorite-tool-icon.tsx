import { BOARD_FAVORITE_TOOL_ICON_BOX_PX } from "#/components/board/board-favorite-tools/board-favorite-tools-constants";
import { cn } from "#/lib/utils";

interface FavoriteToolIconProps {
	alt: string;
	className?: string;
	scale?: number;
	src: string;
}

export const FavoriteToolIcon = ({
	alt,
	className,
	scale = 1,
	src,
}: FavoriteToolIconProps) => (
	<img
		alt={alt}
		className={cn(
			"pointer-events-none max-h-full max-w-full select-none object-contain",
			className
		)}
		draggable={false}
		height={BOARD_FAVORITE_TOOL_ICON_BOX_PX}
		src={src}
		style={{
			maxHeight: BOARD_FAVORITE_TOOL_ICON_BOX_PX,
			maxWidth: BOARD_FAVORITE_TOOL_ICON_BOX_PX,
			transform: `scale(${scale})`,
		}}
		width={BOARD_FAVORITE_TOOL_ICON_BOX_PX}
	/>
);
