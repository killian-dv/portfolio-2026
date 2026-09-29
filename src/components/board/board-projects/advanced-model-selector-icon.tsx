import claudeIcon from "#/components/board/board-projects/icons/claude.svg";
import geminiIcon from "#/components/board/board-projects/icons/gemini.svg";
import openaiIcon from "#/components/board/board-projects/icons/openai.svg";
import { cn } from "#/lib/utils";

interface AdvancedModelSelectorIconProps {
	className?: string;
	size?: number;
}

const providerBadges = [
	{
		left: "0%",
		rotate: -12,
		src: openaiIcon,
		top: "24%",
		zIndex: 1,
	},
	{
		left: "30%",
		rotate: 6,
		src: geminiIcon,
		top: "0%",
		zIndex: 2,
	},
	{
		left: "56%",
		rotate: 11,
		src: claudeIcon,
		top: "28%",
		zIndex: 3,
	},
] as const;

export const AdvancedModelSelectorIcon = ({
	className,
	size = 92,
}: AdvancedModelSelectorIconProps) => {
	const badgeSize = Math.round(size * 0.42);
	const pad = Math.max(4, Math.round(badgeSize * 0.14));
	const width = Math.round(size * 1.08);
	const height = Math.round(badgeSize * 1.35);

	return (
		<div
			aria-hidden
			className={cn("relative shrink-0", className)}
			style={{ height, width }}
		>
			{providerBadges.map((badge) => (
				<span
					className="absolute flex items-center justify-center rounded-full bg-white shadow-[0_2px_10px_rgba(0,0,0,0.18)]"
					key={badge.src}
					style={{
						height: badgeSize,
						left: badge.left,
						padding: pad,
						top: badge.top,
						transform: `rotate(${badge.rotate}deg)`,
						width: badgeSize,
						zIndex: badge.zIndex,
					}}
				>
					<img
						alt=""
						className="size-full object-contain"
						draggable={false}
						height={badgeSize - pad * 2}
						src={badge.src}
						width={badgeSize - pad * 2}
					/>
				</span>
			))}
		</div>
	);
};
