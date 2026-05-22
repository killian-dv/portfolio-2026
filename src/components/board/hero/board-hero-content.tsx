import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";

import { boardEaseOut } from "#/lib/motion-config";

const fadeUp = {
	initial: { opacity: 0, y: 15 },
	animate: { opacity: 1, y: 0 },
};

const fadeTransition = (delay: number) => ({
	delay,
	duration: 0.6,
	ease: boardEaseOut,
});

export const BoardHeroContent = () => (
	<>
		<div className="w-full space-y-9">
			<motion.p
				className="m-0 flex items-center justify-between"
				{...fadeUp}
				transition={fadeTransition(0)}
			>
				<span className="font-semibold text-2xl tracking-tight">Killian</span>
				<span
					aria-hidden
					className="flex size-8 items-center justify-center rounded-md bg-primary/5 font-medium text-primary/70 text-sm"
				>
					K
				</span>
			</motion.p>
			<motion.p
				className="m-0 leading-relaxed"
				{...fadeUp}
				transition={fadeTransition(0.2)}
			>
				Développeur full-stack. Je conçois et construis des produits web clairs,
				performants et agréables à utiliser — du prototype au déploiement.
			</motion.p>
			<motion.p
				className="m-0 leading-relaxed"
				{...fadeUp}
				transition={fadeTransition(0.4)}
			>
				Je m&apos;intéresse autant à l&apos;expérience utilisateur qu&apos;à la
				qualité du code : architecture simple, interfaces soignées, et attention
				aux détails qui font la différence.
			</motion.p>
			<motion.p
				className="m-0 leading-relaxed"
				{...fadeUp}
				transition={fadeTransition(0.45)}
			>
				Ce portfolio est un espace de travail interactif — explore le board,
				découvre mes projets et contacte-moi si tu veux collaborer.
			</motion.p>
		</div>
		<motion.div className="mt-9" {...fadeUp} transition={fadeTransition(0.6)}>
			<div className="flex flex-wrap items-center gap-1">
				<Link
					className="inline-flex h-9 w-fit items-center justify-center whitespace-nowrap rounded-full bg-primary px-4 py-1 font-medium text-[13px] text-white no-underline transition-colors hover:bg-primary/90"
					to="/about"
				>
					En savoir plus
				</Link>
				<a
					className="group inline-flex h-9 w-fit items-center justify-center whitespace-nowrap rounded-full px-4 py-1 font-medium text-[13px] text-foreground/80 no-underline transition-colors hover:text-foreground/60"
					href="mailto:hello@example.com"
				>
					Me contacter
					<svg
						aria-hidden="true"
						className="ml-1 opacity-50 transition-transform duration-200 group-hover:translate-x-1"
						fill="none"
						height="15"
						role="presentation"
						viewBox="0 0 15 15"
						width="15"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							clipRule="evenodd"
							d="M6.1584 3.13508C6.35985 2.94621 6.67627 2.95642 6.86514 3.15788L10.6151 7.15788C10.7954 7.3502 10.7954 7.64949 10.6151 7.84182L6.86514 11.8418C6.67627 12.0433 6.35985 12.0535 6.1584 11.8646C5.95694 11.6757 5.94673 11.3593 6.1356 11.1579L9.565 7.49985L6.1356 3.84182C5.94673 3.64036 5.95694 3.32394 6.1584 3.13508Z"
							fill="currentColor"
							fillRule="evenodd"
						/>
					</svg>
				</a>
			</div>
		</motion.div>
	</>
);
