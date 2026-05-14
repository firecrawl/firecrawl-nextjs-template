# Firecrawl Next.js template

Starter for [Firecrawl](https://firecrawl.dev) on [Next.js](https://nextjs.org), styled with tokens aligned to [`firecrawl-web/colors.ts`](https://github.com/firecrawl/firecrawl-web) (Heat orange, neutrals, 1px spacing scale like the marketing app).

## Deploy

One-click deploy on Vercel. During project creation, connect the **Firecrawl** Marketplace integration so `FIRECRAWL_API_KEY` is injected (same secret name as in `firecrawl-integrations`: `VERCEL_FIRECRAWL_API_SECRET_NAME`).

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Ffirecrawl%2Ffirecrawl-nextjs-template&stores=%5B%7B%22type%22%3A%22integration%22%2C%22protocol%22%3A%22other%22%2C%22productSlug%22%3A%22firecrawl%22%2C%22integrationSlug%22%3A%22firecrawl%22%7D%5D)

If the Marketplace step does not offer Firecrawl, confirm the `productSlug` and `integrationSlug` values Vercel expects and update them in `lib/vercel-template.ts` (and this README button) so they stay in sync.

Update `TEMPLATE_GITHUB_REPO` in `lib/vercel-template.ts` if the canonical GitHub URL differs from `https://github.com/firecrawl/firecrawl-nextjs-template`.

## What it does

- **UI**: URL input, example shortcuts, rendered markdown from the scrape response.
- **API**: `POST /api/scrape` with JSON `{ "url": "https://…" }` using `@mendable/firecrawl-js` (`Firecrawl` client, `scrape` with `formats: ["markdown"]`).

## Local development

```bash
npm install
cp .env.example .env.local
# set FIRECRAWL_API_KEY
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment

| Variable            | Required | Notes                                                                                                        |
| ------------------- | -------- | ------------------------------------------------------------------------------------------------------------ |
| `FIRECRAWL_API_KEY` | Yes      | From [firecrawl.dev/app/api-keys](https://www.firecrawl.dev/app/api-keys) or Vercel Marketplace provisioning |

## Scripts

```bash
npm run dev
npm run build
npm start
npm run lint
```

## License

MIT
