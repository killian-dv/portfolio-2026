export type FavoriteToolNotePlacement = "top" | "bottom" | "left" | "right";

export type FavoriteToolStickerVariant = "light" | "dark";

export interface FavoriteTool {
	glowColor: string;
	iconScale: number;
	iconSrc: string;
	id: string;
	name: string;
	note: string;
	notePlacement: FavoriteToolNotePlacement;
	rotation: number;
	stickerBackground: string;
	stickerVariant: FavoriteToolStickerVariant;
	x: number;
	y: number;
}
