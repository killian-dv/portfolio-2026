import { heroParagraphs } from "#/components/board/hero/board-hero.data";
import { BoardHeroReveal } from "#/components/board/hero/board-hero-reveal";

export const BoardHeroBody = () => (
	<div className="flex flex-col gap-2">
		{heroParagraphs.map((paragraph) => (
			<BoardHeroReveal
				as="p"
				className="m-0 text-base leading-normal"
				delay={paragraph.delay}
				key={paragraph.delay}
			>
				{paragraph.text}
			</BoardHeroReveal>
		))}
	</div>
);
