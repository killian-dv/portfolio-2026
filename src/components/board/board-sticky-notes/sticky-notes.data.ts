export type StickyNoteVariant = "yellow" | "sage";

export type StickyNoteId = "deploy-friday" | "learn-build";

export interface StickyNote {
	id: StickyNoteId;
	lines: readonly [string, string];
	/** Idle rotation between -4° and +4° */
	rotationDeg: number;
	variant: StickyNoteVariant;
}

export const stickyNotesById = {
	"deploy-friday": {
		id: "deploy-friday",
		lines: ["Deploy Friday?", "Bad idea."],
		rotationDeg: -2.8,
		variant: "yellow",
	},
	"learn-build": {
		id: "learn-build",
		lines: ["The best way to learn", "is to build things."],
		rotationDeg: 3.4,
		variant: "sage",
	},
} as const satisfies Record<StickyNoteId, StickyNote>;
