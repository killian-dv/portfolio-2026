/** Footprint for the g9 grid anchor (spills into g11). */
export const BOARD_CERTIFICATIONS_SECTION_WIDTH_PX = 736;
export const BOARD_CERTIFICATIONS_SECTION_HEIGHT_PX = 408;

export const BOARD_CERTIFICATION_CARD_WIDTH_PX = 324;
export const BOARD_CERTIFICATION_MAX_SKILLS = 3;

export const BOARD_CERTIFICATIONS_TITLE = "Certifications" as const;

export const BOARD_CERTIFICATION_CARD_SPRING = {
	type: "spring" as const,
	stiffness: 380,
	damping: 30,
	mass: 0.88,
};

export const BOARD_CERTIFICATION_LAMINATE_SPRING = {
	stiffness: 180,
	damping: 30,
	mass: 0.85,
};

export const BOARD_CERTIFICATION_CARD_SHADOW_IDLE =
	"0 1px 0 0 rgba(255,255,255,0.85) inset, 0 12px 28px -18px rgba(0,0,0,0.2)";

export const BOARD_CERTIFICATION_CARD_SHADOW_HOVER =
	"0 1px 0 0 rgba(255,255,255,0.92) inset, 0 16px 32px -14px rgba(0,0,0,0.22)";
