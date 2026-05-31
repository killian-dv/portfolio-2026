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
	name: SITE_NAME,
	givenName: "Killian",
	familyName: "David",
	jobTitle: "Front-End Developer",
	description: SITE_DESCRIPTION,
	url: siteOrigin,
	image: SITE_OG_IMAGE,
	address: {
		"@type": "PostalAddress",
		addressCountry: "FR",
	},
	sameAs: [SITE_LINKEDIN_URL, GITHUB_PROFILE_URL],
	knowsAbout: [
		"Front-end development",
		"React",
		"TypeScript",
		"User interface design",
	],
});

export const buildSiteHead = (stylesheetHref: string) => ({
	meta: [
		{ charSet: "utf-8" },
		{ name: "viewport", content: "width=device-width, initial-scale=1" },
		{ title: SITE_TITLE },
		{ name: "description", content: SITE_DESCRIPTION },
		{ name: "keywords", content: SITE_KEYWORDS.join(", ") },
		{ name: "author", content: SITE_NAME },
		{ name: "robots", content: "index, follow" },
		{ name: "theme-color", content: "#ffffff" },
		{ property: "og:type", content: "website" },
		{ property: "og:site_name", content: SITE_NAME },
		{ property: "og:title", content: SITE_TITLE },
		{ property: "og:description", content: SITE_DESCRIPTION },
		{ property: "og:locale", content: SITE_LOCALE },
		{ property: "og:url", content: siteOrigin },
		{ property: "og:image", content: SITE_OG_IMAGE },
		{
			property: "og:image:width",
			content: String(SITE_OG_IMAGE_WIDTH),
		},
		{
			property: "og:image:height",
			content: String(SITE_OG_IMAGE_HEIGHT),
		},
		{
			property: "og:image:alt",
			content:
				"Interactive portfolio board by Killian David — projects, experience, and tools",
		},
		{ name: "twitter:card", content: "summary_large_image" },
		{ name: "twitter:title", content: SITE_TITLE },
		{ name: "twitter:description", content: SITE_DESCRIPTION },
		{ name: "twitter:image", content: SITE_OG_IMAGE },
		{
			name: "twitter:image:alt",
			content:
				"Interactive portfolio board by Killian David — projects, experience, and tools",
		},
	],
	links: [
		{ rel: "stylesheet", href: stylesheetHref },
		{ rel: "icon", href: "/favicon.ico" },
		{ rel: "apple-touch-icon", href: "/logo192.png" },
		{ rel: "manifest", href: "/manifest.json" },
		{ rel: "canonical", href: siteOrigin },
	],
	scripts: [
		{
			type: "application/ld+json",
			children: JSON.stringify(buildJsonLd()),
		},
	],
});
