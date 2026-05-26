export interface Project {
	color: string;
	description: string;
	href: string;
	id: string;
	image: string;
	imageAlt: string;
	imageWidth: number;
	isPrivate: boolean;
	rotate: number;
	tags?: string[];
	title: string;
	year: string;
}

export const PROJECTS: Project[] = [
	{
		id: "altermaker",
		title: "Altermaker Studio",
		description: "Design system and product UI for a sustainability studio.",
		year: "2024",
		tags: ["React", "Design system"],
		image: "/altermaker.svg",
		imageAlt: "Altermaker logo",
		imageWidth: 52,
		color: "#3f6278",
		href: "https://altermaker.com",
		isPrivate: false,
		rotate: -2.4,
	},
	{
		id: "artybot",
		title: "Artybot",
		description: "Creative tooling for UpCulture — dashboards and editor UI.",
		year: "2023",
		tags: ["TypeScript", "Node"],
		image: "/artybot.svg",
		imageAlt: "Artybot logo",
		imageWidth: 48,
		color: "#8f5a4c",
		href: "https://artybot.ai",
		isPrivate: false,
		rotate: 1.7,
	},
	{
		id: "atelier",
		title: "Atelier",
		description: "Internal canvas for layout, type, and motion exploration.",
		year: "2025",
		tags: ["Prototype"],
		image: "/project-atelier.svg",
		imageAlt: "Atelier mark",
		imageWidth: 56,
		color: "#5a4f72",
		href: "",
		isPrivate: true,
		rotate: -1.1,
	},
	{
		id: "meridian",
		title: "Meridian",
		description: "Editorial site with scroll-linked type and soft parallax.",
		year: "2022",
		tags: ["GSAP", "WebGL"],
		image: "/project-meridian.svg",
		imageAlt: "Meridian mark",
		imageWidth: 64,
		color: "#3d5f52",
		href: "https://example.com/meridian",
		isPrivate: false,
		rotate: 2.1,
	},
];
