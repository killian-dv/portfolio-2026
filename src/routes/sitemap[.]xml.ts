import { createFileRoute } from "@tanstack/react-router";

import { siteOrigin } from "#/lib/site-seo";

const sitemapOrigin = siteOrigin;

const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${sitemapOrigin}/</loc>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>`;

export const Route = createFileRoute("/sitemap.xml")({
	server: {
		handlers: {
			GET: () =>
				new Response(sitemapXml, {
					headers: {
						"Cache-Control": "public, max-age=3600",
						"Content-Type": "application/xml; charset=utf-8",
					},
				}),
		},
	},
});
