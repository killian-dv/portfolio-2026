# Portfolio — Killian David

Interactive portfolio board built with [TanStack Start](https://tanstack.com/start), React 19, and Tailwind CSS.

Production: [https://killian-david.fr](https://killian-david.fr)

## Local development

```bash
npm install
npm run dev
```

The dev server runs at [http://localhost:3000](http://localhost:3000).

## Deployment (Cloudflare Workers)

This site is deployed on **Cloudflare Workers**, not a traditional Node server or static host.

- **[`@cloudflare/vite-plugin`](https://developers.cloudflare.com/workers/vite-plugin/)** — wires the Vite build to the Workers runtime (SSR via the `ssr` Vite environment).
- **[Wrangler](https://developers.cloudflare.com/workers/wrangler/)** — CLI used to build and publish the worker.
- **[`wrangler.jsonc`](./wrangler.jsonc)** — worker config (`portfolio-2026`, `nodejs_compat`, server entry `@tanstack/react-start/server-entry`).

### Prerequisites

1. A [Cloudflare](https://dash.cloudflare.com/) account with Workers enabled.
2. Authenticate Wrangler once on your machine:

   ```bash
   npx wrangler login
   ```

### Automatic deploy (Git → Cloudflare)

Production updates are driven by **Cloudflare’s Git integration**, not GitHub Actions (there is no `.github/workflows` in this repo).

When the repo is connected in the Cloudflare dashboard (**Workers & Pages** → `portfolio-2026` → **Settings** → **Builds**):

1. A **push to the production branch** (typically `main`) triggers a new build and deploy.
2. Cloudflare runs the build in its environment and publishes a **new worker version** (not a server restart — Workers are serverless).
3. If the build fails, the **previous deployment stays live**.

Source repo: [github.com/killian-dv/portfolio-2026](https://github.com/killian-dv/portfolio-2026)

After pushing, check **Workers & Pages** → **Deployments** in the dashboard: a deployment tied to your commit should appear. If nothing shows up, verify the Git connection, production branch, and build settings.

Suggested build settings in Cloudflare:

| Setting | Value |
| --- | --- |
| Build command | `npm run build` |
| Node version | Match your local setup (see `package.json` engines if added) |

Optional: set `VITE_SITE_URL` in the Cloudflare project’s **Environment variables** for production builds.

### Manual deploy

For one-off deploys from your machine (without going through Git):

```bash
npm run deploy
```

This runs `vite build` then `wrangler deploy`, publishing the worker to your Cloudflare account. DNS and custom domains (e.g. `killian-david.fr`) are configured in the Cloudflare dashboard for that worker.

### Other useful commands

| Command | Description |
| --- | --- |
| `npm run build` | Production build only (no deploy) |
| `npm run preview` | Preview the production build locally |
| `npm run cf-typegen` | Generate Wrangler/Workers TypeScript types |

## Environment

Optional: set `VITE_SITE_URL` at build time for canonical URLs and Open Graph metadata (defaults to `https://killian-david.fr`). See [`src/lib/site-seo.ts`](./src/lib/site-seo.ts).

## Quality checks

```bash
npm run test      # Vitest
npm run typecheck # TypeScript
npm run lint      # Biome
npm run check     # Ultracite (format + lint)
```

## Stack

- [TanStack Router](https://tanstack.com/router) — file-based routing in `src/routes`
- [Tailwind CSS](https://tailwindcss.com/) v4
- [Biome](https://biomejs.dev/) + [Ultracite](https://www.ultracite.ai/) — lint and format

## Learn more

- [TanStack Start docs](https://tanstack.com/start)
- [Cloudflare Workers docs](https://developers.cloudflare.com/workers/)
