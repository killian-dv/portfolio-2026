import { heroSocialLinks } from "#/components/board/hero/board-hero.data";
import { BoardHeroReveal } from "#/components/board/hero/board-hero-reveal";
import { BoardHeroSocialLink } from "#/components/board/hero/board-hero-social-link";

export const BoardHeroFooter = () => (
	<BoardHeroReveal as="footer" className="mt-9" delay={0.65}>
		<nav
			aria-label="Social profiles"
			className="flex flex-wrap items-center gap-x-5 gap-y-2"
		>
			{heroSocialLinks.map((link) => (
				<BoardHeroSocialLink
					href={link.href}
					key={link.label}
					label={link.label}
				/>
			))}
		</nav>
	</BoardHeroReveal>
);
