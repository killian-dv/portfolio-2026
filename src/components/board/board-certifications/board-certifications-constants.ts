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
