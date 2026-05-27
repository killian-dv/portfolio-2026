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
		id: "threejs-journey",
		title: "Three.js Journey Completion",
		issuer: "Three.js Journey",
		issuedAt: "May 2026",
		logo: "/three_js_journey_logo.jpeg",
		logoAlt: "Three.js Journey",
		skills: ["Three.js", "React Three Fiber"],
		href: "https://threejs-journey.com/certificate/view/43986",
		layout: { left: 8, top: 68, rotate: -1.6 },
	},
	{
		id: "opquast-mqw",
		title:
			"Intégrer les règles et le vocabulaire assurance qualité web dans sa pratique professionnelle",
		issuer: "Opquast",
		issuedAt: "May 2024",
		logo: "/opquast_logo.jpeg",
		logoAlt: "Opquast",
		skills: ["Assurance qualité web"],
		href: "https://certificates.opquast.com/certificate/57ZKUP",
		layout: { left: 24, top: 154, rotate: 1.9 },
	},
	{
		id: "awwwards-webgl-portfolio",
		title: "Creating a simple portfolio website with WebGL and Barba.js",
		issuer: "Awwwards",
		issuedAt: "Oct 2023",
		logo: "/awwwards_logo.jpeg",
		logoAlt: "Awwwards",
		skills: ["WebGL", "Barba.js"],
		href: "https://www.awwwards.com/academy/certification/course/killian-dv/creating-a-simple-portfolio-website-with-webgl-and-barba-js",
		layout: { left: 356, top: 64, rotate: -0.7 },
	},
	{
		id: "udemy-react-redux",
		title: "React JS + Redux - Guide du débutant - (Édition 2023)",
		issuer: "Udemy",
		issuedAt: "Aug 2023",
		logo: "/udemy_logo.jpeg",
		logoAlt: "Udemy",
		skills: ["React.js", "Redux"],
		href: "https://www.udemy.com/certificate/UC-9cd4f5f9-8bfa-4faa-a422-f14c39d6bf5b/",
		layout: { left: 360, top: 150, rotate: 1.15 },
	},
	{
		id: "udemy-tailwind",
		title: "Tailwind de A à Z. (V3)",
		issuer: "Udemy",
		issuedAt: "Jun 2023",
		logo: "/udemy_logo.jpeg",
		logoAlt: "Udemy",
		skills: ["Tailwind CSS"],
		href: "https://www.udemy.com/certificate/UC-319f40f5-59bd-4a8d-b639-096e6cc8d1a0/",
		layout: { left: 10, top: 240, rotate: -1.05 },
	},
	{
		id: "udemy-gsap",
		title: "JavaScript : Créez des animations avec GreenSock",
		issuer: "Udemy",
		issuedAt: "May 2023",
		logo: "/udemy_logo.jpeg",
		logoAlt: "Udemy",
		skills: ["GSAP", "JavaScript"],
		href: "https://www.udemy.com/certificate/UC-821dfb1d-d1c9-409f-aaf0-5e0797161b83/",
		layout: { left: 354, top: 236, rotate: 0.95 },
	},
	{
		id: "udemy-svelte",
		title: "Certification Svelte.js 3 par la pratique",
		issuer: "Udemy",
		issuedAt: "Apr 2023",
		logo: "/udemy_logo.jpeg",
		logoAlt: "Udemy",
		skills: ["Svelte"],
		href: "https://www.udemy.com/certificate/UC-926f2fd2-e1c4-4d00-9dad-7576468f7abf/",
		layout: { left: 10, top: 318, rotate: 1.3 },
	},
];
