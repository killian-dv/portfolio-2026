export interface Certification {
	href: string;
	id: string;
	issuedAt: string;
	issuer: string;
	layout: {
		left: number;
		rotate: number;
		top: number;
	};
	logo: string;
	logoAlt: string;
	skills?: string[];
	title: string;
}

export const CERTIFICATIONS: Certification[] = [
	{
		href: "https://threejs-journey.com/certificate/view/43986",
		id: "threejs-journey",
		issuedAt: "May 2026",
		issuer: "Three.js Journey",
		layout: { left: 8, rotate: -1.6, top: 68 },
		logo: "/three_js_journey_logo.jpeg",
		logoAlt: "Three.js Journey",
		skills: ["Three.js", "React Three Fiber"],
		title: "Three.js Journey Completion",
	},
	{
		href: "https://certificates.opquast.com/certificate/57ZKUP",
		id: "opquast-mqw",
		issuedAt: "May 2024",
		issuer: "Opquast",
		layout: { left: 24, rotate: 1.9, top: 154 },
		logo: "/opquast_logo.jpeg",
		logoAlt: "Opquast",
		skills: ["Assurance qualité web"],
		title:
			"Intégrer les règles et le vocabulaire assurance qualité web dans sa pratique professionnelle",
	},
	{
		href: "https://www.awwwards.com/academy/certification/course/killian-dv/creating-a-simple-portfolio-website-with-webgl-and-barba-js",
		id: "awwwards-webgl-portfolio",
		issuedAt: "Oct 2023",
		issuer: "Awwwards",
		layout: { left: 356, rotate: -0.7, top: 64 },
		logo: "/awwwards_logo.jpeg",
		logoAlt: "Awwwards",
		skills: ["WebGL", "Barba.js"],
		title: "Creating a simple portfolio website with WebGL and Barba.js",
	},
	{
		href: "https://www.udemy.com/certificate/UC-9cd4f5f9-8bfa-4faa-a422-f14c39d6bf5b/",
		id: "udemy-react-redux",
		issuedAt: "Aug 2023",
		issuer: "Udemy",
		layout: { left: 360, rotate: 1.15, top: 150 },
		logo: "/udemy_logo.jpeg",
		logoAlt: "Udemy",
		skills: ["React.js", "Redux"],
		title: "React JS + Redux - Guide du débutant - (Édition 2023)",
	},
	{
		href: "https://www.udemy.com/certificate/UC-319f40f5-59bd-4a8d-b639-096e6cc8d1a0/",
		id: "udemy-tailwind",
		issuedAt: "Jun 2023",
		issuer: "Udemy",
		layout: { left: 10, rotate: -1.05, top: 240 },
		logo: "/udemy_logo.jpeg",
		logoAlt: "Udemy",
		skills: ["Tailwind CSS"],
		title: "Tailwind de A à Z. (V3)",
	},
	{
		href: "https://www.udemy.com/certificate/UC-821dfb1d-d1c9-409f-aaf0-5e0797161b83/",
		id: "udemy-gsap",
		issuedAt: "May 2023",
		issuer: "Udemy",
		layout: { left: 354, rotate: 0.95, top: 236 },
		logo: "/udemy_logo.jpeg",
		logoAlt: "Udemy",
		skills: ["GSAP", "JavaScript"],
		title: "JavaScript : Créez des animations avec GreenSock",
	},
	{
		href: "https://www.udemy.com/certificate/UC-926f2fd2-e1c4-4d00-9dad-7576468f7abf/",
		id: "udemy-svelte",
		issuedAt: "Apr 2023",
		issuer: "Udemy",
		layout: { left: 10, rotate: 1.3, top: 318 },
		logo: "/udemy_logo.jpeg",
		logoAlt: "Udemy",
		skills: ["Svelte"],
		title: "Certification Svelte.js 3 par la pratique",
	},
];
