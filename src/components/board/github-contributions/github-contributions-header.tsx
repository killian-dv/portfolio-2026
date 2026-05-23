import { ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";

import { GITHUB_PROFILE_URL } from "#/components/board/github-contributions/github-contributions-constants";
import { GITHUB_CONTRIBUTIONS_USERNAME } from "#/lib/github-contributions-api";
import { cn } from "#/lib/utils";

interface GithubContributionsHeaderProps {
	isHovered: boolean;
}

export const GithubContributionsHeader = ({
	isHovered,
}: GithubContributionsHeaderProps) => (
	<header className="relative z-10 flex items-center">
		<motion.a
			animate={{ opacity: isHovered ? 1 : 0.88 }}
			className={cn(
				"group inline-flex items-center gap-1.5",
				"font-medium text-[#1a1f1c] text-[13px] tracking-[-0.01em]"
			)}
			href={GITHUB_PROFILE_URL}
			rel="noopener noreferrer"
			target="_blank"
			transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
		>
			<span className="relative">
				{GITHUB_CONTRIBUTIONS_USERNAME}
				<span
					aria-hidden
					className={cn(
						"absolute -bottom-px left-0 h-px w-full origin-left bg-[#1a1f1c]/35",
						"scale-x-0 transition-transform duration-300 ease-out",
						"group-hover:scale-x-100"
					)}
				/>
			</span>
			<ArrowUpRight
				aria-hidden
				className="size-3.5 text-[#1a1f1c]/45 transition-transform duration-300 ease-out group-hover:translate-x-px group-hover:-translate-y-px group-hover:text-[#1a1f1c]/70"
				strokeWidth={2}
			/>
		</motion.a>
	</header>
);
