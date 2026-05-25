/** Fixed footprint for the g17 grid span (2×2 cells). */
export const BOARD_EXPERIENCES_SECTION_WIDTH_PX = 736;
export const BOARD_EXPERIENCES_SECTION_HEIGHT_PX = 736;

export const BOARD_EXPERIENCE_CARD_WIDTH_PX = 448;

export const BOARD_EXPERIENCES_TITLE = "Experiences" as const;

export interface BoardExperienceEntry {
	company: string;
	dates: string;
	id: string;
	isCurrent?: boolean;
	layout: {
		left: number;
		top: number;
		rotate: number;
	};
	logoAlt: string;
	logoSrc: string;
	/** Anchor for connector path (section coordinates, px). */
	pathAnchor: {
		x: number;
		y: number;
	};
	role: string;
}

/** Vertical layout: one card per row, alternating left / right. */
export const BOARD_EXPERIENCES_ENTRIES: BoardExperienceEntry[] = [
	{
		id: "altermaker",
		company: "Altermaker",
		role: "Front-end Developer",
		dates: "2023 — Present",
		isCurrent: true,
		logoSrc: "/altermaker.svg",
		logoAlt: "AlterMaker logo",
		layout: { left: 36, top: 78, rotate: -0.9 },
		pathAnchor: { x: 260, y: 152 },
	},
	{
		id: "upculture",
		company: "Upculture / Artybot",
		role: "Full-stack Developer",
		dates: "2022 — 2023",
		logoSrc: "/artybot.svg",
		logoAlt: "Artybot logo",
		layout: { left: 252, top: 248, rotate: 1 },
		pathAnchor: { x: 476, y: 242 },
	},
];

/** Organic cubic segments between consecutive anchors (section px). */
export const BOARD_EXPERIENCES_PATH_D = BOARD_EXPERIENCES_ENTRIES.slice(
	0,
	-1
).map((entry, index) => {
	const next = BOARD_EXPERIENCES_ENTRIES[index + 1];
	const from = entry.pathAnchor;
	const to = next.pathAnchor;
	const midY = from.y + (to.y - from.y) * 0.55;
	const c1x = from.x + (to.x - from.x) * 0.08;
	const c2x = to.x - (to.x - from.x) * 0.08;
	return `M ${from.x} ${from.y} C ${c1x} ${midY}, ${c2x} ${midY}, ${to.x} ${to.y}`;
});
