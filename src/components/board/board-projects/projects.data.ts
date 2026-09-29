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
		color: "#2d6a4f",
		description:
			"Animated energy card — React, Motion, and Tailwind. Inspired by Tanjim’s motion design.",
		href: "https://github.com/killian-dv/renewable-energy-generation-card",
		id: "renewable-energy-card",
		imageAlt: "Renewable energy icon",
		imageWidth: 48,
		isPrivate: false,
		lucideIcon: Leaf,
		rotate: -2.4,
		tags: ["React", "Motion", "Tailwind"],
		title: "Renewable Energy Generation Card",
		year: "2026",
	},
	{
		color: "#181818",
		description:
			"Beautifully crafted animated icons — open-source collection by pqoqubbw.",
		href: "https://github.com/pqoqubbw/icons",
		id: "lucide-animated",
		imageAlt: "lucide-animated ghost icon",
		imageComponent: LucideAnimatedIcon,
		imageWidth: 56,
		isPrivate: false,
		rotate: 2.1,
		tags: ["Motion", "Open Source"],
		title: "lucide-animated",
		year: "2025",
	},
	{
		color: "#7c2d9e",
		description:
			"Copy-paste Shadcn/ui components, customized for our dashboards — plus a full Figma kit.",
		href: "",
		id: "rolix",
		image: "/rolix.svg",
		imageAlt: "Rolix logo",
		imageWidth: 40,
		isPrivate: true,
		rotate: -1.1,
		tags: ["Shadcn/ui", "Figma"],
		title: "Rolix",
		year: "2024",
	},
	{
		color: "#345ba4",
		description:
			"Conversational chatbot to talk with iconic historical figures, powered by ChatGPT.",
		href: "https://github.com/killian-dv/ArtyStory",
		id: "artystory",
		image: "/napoleon.webp",
		imageAlt: "Napoleon — ArtyStory character",
		imageWidth: 72,
		isPrivate: false,
		rotate: 1.7,
		tags: ["Vue", "ChatGPT"],
		title: "ArtyStory",
		year: "2023",
	},
];
