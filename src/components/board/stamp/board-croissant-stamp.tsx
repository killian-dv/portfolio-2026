const CROISSANT_STAMP_SRC = "/croissant-stamp.png";
const CROISSANT_STAMP_WIDTH_PX = 140;

export const BoardCroissantStamp = () => (
	<img
		alt="Croissant au beurre — timbre"
		className="h-auto max-w-none shrink-0 object-contain drop-shadow-md"
		height={120}
		src={CROISSANT_STAMP_SRC}
		style={{
			width: CROISSANT_STAMP_WIDTH_PX,
			transform: "rotate(-8deg)",
		}}
		width={CROISSANT_STAMP_WIDTH_PX}
	/>
);
