import type { LucideIcon } from "lucide-react";
import { Leaf } from "lucide-react";
import type { ComponentType } from "react";

import { LucideAnimatedIcon } from "#/components/board/board-projects/lucide-animated-icon";

export interface Project {
	color: string;
	description: string;
	href: string;
	id: string;
	image?: string;
	imageAlt: string;
	imageComponent?: ComponentType<{ size?: number }>;
	imageWidth: number;
	isPrivate: boolean;
	lucideIcon?: LucideIcon;
	rotate: number;
	tags?: string[];
	title: string;
	year: string;
}

export const PROJECTS: Project[] = [
	{
		id: "renewable-energy-card",
		title: "Renewable Energy Generation Card",
		description:
			"Animated energy card — React, Motion, and Tailwind. Inspired by Tanjim’s motion design.",
		year: "2026",
		tags: ["React", "Motion", "Tailwind"],
		lucideIcon: Leaf,
		imageAlt: "Renewable energy icon",
		imageWidth: 48,
		color: "#2d6a4f",
		href: "https://github.com/killian-dv/renewable-energy-generation-card",
		isPrivate: false,
		rotate: -2.4,
	},
	{
		id: "lucide-animated",
		title: "lucide-animated",
		description:
			"Beautifully crafted animated icons — open-source collection by pqoqubbw.",
		year: "2025",
		tags: ["Motion", "Open Source"],
		imageComponent: LucideAnimatedIcon,
		imageAlt: "lucide-animated ghost icon",
		imageWidth: 56,
		color: "#181818",
		href: "https://github.com/pqoqubbw/icons",
		isPrivate: false,
		rotate: 2.1,
	},
	{
		id: "rolix",
		title: "Rolix",
		description:
			"Copy-paste Shadcn/ui components, customized for our dashboards — plus a full Figma kit.",
		year: "2024",
		tags: ["Shadcn/ui", "Figma"],
		image: "/rolix.svg",
		imageAlt: "Rolix logo",
		imageWidth: 40,
		color: "#7c2d9e",
		href: "",
		isPrivate: true,
		rotate: -1.1,
	},
	{
		id: "artystory",
		title: "ArtyStory",
		description:
			"Conversational chatbot to talk with iconic historical figures, powered by ChatGPT.",
		year: "2023",
		tags: ["Vue", "ChatGPT"],
		image: "/napoleon.webp",
		imageAlt: "Napoleon — ArtyStory character",
		imageWidth: 72,
		color: "#345ba4",
		href: "https://github.com/killian-dv/ArtyStory",
		isPrivate: false,
		rotate: 1.7,
	},
];
