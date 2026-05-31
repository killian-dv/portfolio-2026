import { heroProfile } from "#/components/board/hero/board-hero.data";
import { BoardHeroReveal } from "#/components/board/hero/board-hero-reveal";

export const BoardHeroHeader = () => (
	<BoardHeroReveal
		as="header"
		className="mb-4 flex items-center justify-between gap-4"
	>
		<h1 className="m-0 font-semibold text-2xl leading-none tracking-tight">
			Hey, I&apos;m Killian.
		</h1>
		<img
			alt={heroProfile.alt}
			className="h-16 w-16 shrink-0 object-contain object-center"
			height={64}
			src={heroProfile.src}
			width={64}
		/>
	</BoardHeroReveal>
);
