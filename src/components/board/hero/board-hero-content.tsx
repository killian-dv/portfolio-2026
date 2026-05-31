import { BoardHeroBody } from "#/components/board/hero/board-hero-body";
import { BoardHeroFooter } from "#/components/board/hero/board-hero-footer";
import { BoardHeroHeader } from "#/components/board/hero/board-hero-header";
import { BoardHeroSignature } from "#/components/board/hero/board-hero-signature";

export const BoardHeroContent = () => (
	<div className="relative">
		<div className="w-full">
			<BoardHeroHeader />
			<BoardHeroBody />
		</div>

		<div className="pointer-events-none absolute right-0 -bottom-3 z-10">
			<BoardHeroSignature />
		</div>

		<BoardHeroFooter />
	</div>
);
