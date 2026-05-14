/**
 * Vercel "Deploy" / clone URL for this template.
 * Update `TEMPLATE_GITHUB_REPO` when the canonical GitHub URL is finalized.
 *
 * `stores` is a URL-encoded JSON array per Vercel's deploy-from-repo flow.
 * Secret name for the Firecrawl integration matches `VERCEL_FIRECRAWL_API_SECRET_NAME` in
 * `firecrawl-integrations` (`FIRECRAWL_API_KEY`).
 */
export const TEMPLATE_GITHUB_REPO =
  "https://github.com/firecrawl/firecrawl-nextjs-template";

const FIRECRAWL_MARKETPLACE_STORE = {
  type: "integration" as const,
  protocol: "other" as const,
  productSlug: "firecrawl",
  integrationSlug: "firecrawl",
};

export function getVercelCloneUrl(): string {
  const params = new URLSearchParams({
    "repository-url": TEMPLATE_GITHUB_REPO,
    stores: JSON.stringify([FIRECRAWL_MARKETPLACE_STORE]),
  });
  return `https://vercel.com/new/clone?${params.toString()}`;
}
