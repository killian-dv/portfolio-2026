import { ArrowUpRight } from "lucide-react";

interface BoardHeroSocialLinkProps {
	href: string;
	label: string;
}

export const BoardHeroSocialLink = ({
	href,
	label,
}: BoardHeroSocialLinkProps) => (
	<a
		className="group inline-flex items-center gap-1 font-medium text-[13px] text-neutral-700 no-underline transition-colors hover:text-neutral-900"
		href={href}
		rel="noopener noreferrer"
		target="_blank"
	>
		{label}
		<ArrowUpRight
			aria-hidden
			className="size-3.5 opacity-45 transition-transform duration-300 ease-out group-hover:translate-x-px group-hover:-translate-y-px group-hover:opacity-70"
			strokeWidth={2}
		/>
	</a>
);
