import { GITHUB_PROFILE_URL } from "#/components/board/github-contributions/github-contributions-constants";
import { heroSocialLinks } from "#/components/board/hero/board-hero.data";

export const SITE_NAME = "Killian David";
export const SITE_TITLE = `${SITE_NAME} — Portfolio`;
export const SITE_DESCRIPTION =
	"Front-end developer based in France. Portfolio of projects, experience, and craft at the intersection of design and engineering.";
export const SITE_LOCALE = "en_FR";
export const SITE_KEYWORDS = [
	"Killian David",
	"front-end developer",
	"portfolio",
	"React",
	"TypeScript",
	"web development",
	"France",
] as const;

const rawSiteUrl = import.meta.env.VITE_SITE_URL as string | undefined;

export const SITE_ORIGIN_DEFAULT = "https://killian-david.fr";

/** Production origin — override with `VITE_SITE_URL` if needed. */
export const siteOrigin = rawSiteUrl?.replace(/\/$/, "") || SITE_ORIGIN_DEFAULT;

export const absoluteUrl = (pathname: string): string => {
	const path = pathname.startsWith("/") ? pathname : `/${pathname}`;
	return `${siteOrigin}${path}`;
};

export const SITE_OG_IMAGE_PATH = "/og-image.png";
export const SITE_OG_IMAGE_WIDTH = 1200;
export const SITE_OG_IMAGE_HEIGHT = 630;
export const SITE_OG_IMAGE = absoluteUrl(SITE_OG_IMAGE_PATH);
export const SITE_LINKEDIN_URL = heroSocialLinks[0].href;

export const buildJsonLd = () => ({
	"@context": "https://schema.org",
	"@type": "Person",
	address: {
		"@type": "PostalAddress",
		addressCountry: "FR",
	},
	description: SITE_DESCRIPTION,
	familyName: "David",
	givenName: "Killian",
	image: SITE_OG_IMAGE,
	jobTitle: "Front-End Developer",
	knowsAbout: [
		"Front-end development",
		"React",
		"TypeScript",
		"User interface design",
	],
	name: SITE_NAME,
	sameAs: [SITE_LINKEDIN_URL, GITHUB_PROFILE_URL],
	url: siteOrigin,
});

export const buildSiteHead = (stylesheetHref: string) => ({
	links: [
		{ href: stylesheetHref, rel: "stylesheet" },
		{ href: "/favicon.ico", rel: "icon" },
		{ href: "/logo192.png", rel: "apple-touch-icon" },
		{ href: "/manifest.json", rel: "manifest" },
		{ href: siteOrigin, rel: "canonical" },
	],
	meta: [
		{ charSet: "utf-8" },
		{ content: "width=device-width, initial-scale=1", name: "viewport" },
		{ title: SITE_TITLE },
		{ content: SITE_DESCRIPTION, name: "description" },
		{ content: SITE_KEYWORDS.join(", "), name: "keywords" },
		{ content: SITE_NAME, name: "author" },
		{ content: "index, follow", name: "robots" },
		{ content: "#ffffff", name: "theme-color" },
		{ content: "website", property: "og:type" },
		{ content: SITE_NAME, property: "og:site_name" },
		{ content: SITE_TITLE, property: "og:title" },
		{ content: SITE_DESCRIPTION, property: "og:description" },
		{ content: SITE_LOCALE, property: "og:locale" },
		{ content: siteOrigin, property: "og:url" },
		{ content: SITE_OG_IMAGE, property: "og:image" },
		{
			content: String(SITE_OG_IMAGE_WIDTH),
			property: "og:image:width",
		},
		{
			content: String(SITE_OG_IMAGE_HEIGHT),
			property: "og:image:height",
		},
		{
			content:
				"Interactive portfolio board by Killian David — projects, experience, and tools",
			property: "og:image:alt",
		},
		{ content: "summary_large_image", name: "twitter:card" },
		{ content: SITE_TITLE, name: "twitter:title" },
		{ content: SITE_DESCRIPTION, name: "twitter:description" },
		{ content: SITE_OG_IMAGE, name: "twitter:image" },
		{
			content:
				"Interactive portfolio board by Killian David — projects, experience, and tools",
			name: "twitter:image:alt",
		},
	],
	scripts: [
		{
			children: JSON.stringify(buildJsonLd()),
			type: "application/ld+json",
		},
	],
});
