import { GITHUB_PROFILE_URL } from "#/components/board/github-contributions/github-contributions-constants";

export const heroProfile = {
	alt: "Portrait of Killian David, front-end developer",
	src: "/my-notion-face-transparent.png",
} as const;

export const heroSocialLinks = [
	{ href: "https://www.linkedin.com/in/killian-david/", label: "LinkedIn" },
	{ href: GITHUB_PROFILE_URL, label: "GitHub" },
] as const;

export const heroParagraphs = [
	{
		delay: 0.15,
		text: "I'm a Front-End Developer based in France 🥖, passionate about crafting polished digital experiences.",
	},
	{
		delay: 0.3,
		text: "I enjoy working at the intersection of design and engineering — building clean interfaces, refining interactions, and focusing on the details that make products feel smooth and intuitive.",
	},
	{
		delay: 0.45,
		text: "I'm constantly exploring new technologies, AI, and emerging tools that push the web forward.",
	},
	{
		delay: 0.55,
		text: "Explore the board. Every item reveals a piece of my work, interests, and the ideas that keep me curious.",
	},
] as const;

export const heroSignature = {
	fontUrl: "/fonts/BrittanySignature.ttf",
	text: "Killian",
} as const;
