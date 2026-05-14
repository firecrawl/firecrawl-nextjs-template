"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { getVercelCloneUrl } from "@/lib/vercel-template";

const EXAMPLES = [
  "https://firecrawl.dev",
  "https://docs.firecrawl.dev",
  "https://github.com/firecrawl/firecrawl",
];

export default function Home() {
  const [url, setUrl] = useState(EXAMPLES[0]!);
  const [markdown, setMarkdown] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const vercelCloneUrl = getVercelCloneUrl();

  async function runScrape(target?: string) {
    const u = (target ?? url).trim();
    setError(null);
    setMarkdown(null);
    if (!u) {
      setError("Enter a URL.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/scrape", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: u }),
      });
      const data: unknown = await res.json();
      if (!res.ok) {
        const msg =
          typeof data === "object" && data !== null && "error" in data
            ? String((data as { error: unknown }).error)
            : `Request failed (${res.status})`;
        setError(msg);
        return;
      }
      if (typeof data === "object" && data !== null && "markdown" in data) {
        setMarkdown(String((data as { markdown: unknown }).markdown));
      } else {
        setError("Unexpected response shape.");
      }
    } catch {
      setError("Network error.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fire-page-bg flex min-h-screen flex-col">
      <header className="sticky top-0 z-20 border-b border-border-faint bg-surface/90 px-20 py-14 backdrop-blur-md sm:px-32">
        <div className="mx-auto flex max-w-[1112px] items-center justify-between gap-16">
          <a href="https://firecrawl.dev" className="flex items-center gap-10">
            <img
              src="/firecrawl-logo.svg"
              alt="Firecrawl"
              className="h-28 w-auto sm:h-32"
              width={172}
              height={40}
            />
          </a>
          <nav className="flex items-center gap-8 sm:gap-12">
            <a
              href="https://docs.firecrawl.dev"
              className="hidden text-[14px] font-medium leading-[20px] text-black-alpha-48 hover:text-accent-black sm:inline"
            >
              Docs
            </a>
            <a
              href={vercelCloneUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="fire-btn-ghost rounded-8 px-14 py-8 text-[14px] leading-[20px]"
            >
              Deploy
            </a>
          </nav>
        </div>
      </header>

      <main className="relative mx-auto flex w-full max-w-[1112px] flex-1 flex-col px-20 pb-48 pt-40 sm:px-32 sm:pb-64 sm:pt-56">
        <div className="fire-reveal mx-auto max-w-[720px] text-center">
          <p className="text-[12px] font-medium uppercase leading-[16px] tracking-[0.12em] text-black-alpha-48">
            Next.js template
          </p>
          <h1 className="fire-title-hero mt-12">
            Scrape the web into <span className="text-heat-100">markdown</span>
          </h1>
          <p className="mx-auto mt-16 max-w-[540px] text-[16px] leading-[24px] tracking-[-0.09px] text-black-alpha-64">
            Call Firecrawl from a Route Handler. On Vercel, add the Firecrawl
            integration so{" "}
            <code className="rounded-4 bg-heat-8 px-6 py-2 font-mono text-[13px] leading-[20px] text-accent-black">
              FIRECRAWL_API_KEY
            </code>{" "}
            is wired for you.
          </p>
        </div>

        <div className="fire-reveal-delay mx-auto mt-40 w-full max-w-[720px] space-y-20 sm:mt-48">
          <div className="fire-composer rounded-12 p-6 sm:p-8">
            <div className="flex flex-col gap-12 sm:flex-row sm:items-stretch">
              <label className="sr-only" htmlFor="url-input">
                URL to scrape
              </label>
              <input
                id="url-input"
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com"
                className="min-h-52 flex-1 rounded-8 border border-transparent bg-background-lighter px-16 py-14 font-mono text-[14px] leading-[22px] text-accent-black outline-none ring-0 transition placeholder:text-black-alpha-48 focus:border-heat-100 focus:bg-surface"
                disabled={loading}
              />
              <button
                type="button"
                onClick={() => runScrape()}
                disabled={loading}
                className="fire-btn-primary min-h-52 shrink-0 rounded-8 px-28 text-[15px] leading-[24px] sm:min-w-[140px]"
              >
                {loading ? "Scraping…" : "Scrape"}
              </button>
            </div>
          </div>

          <div className="flex flex-col items-center gap-16">
            <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-10">
              <span className="text-[12px] font-medium uppercase tracking-[0.1em] text-black-alpha-48">
                Try
              </span>
              <span
                className="hidden h-12 w-px bg-border-faint sm:block"
                aria-hidden
              />
              {EXAMPLES.map((ex) => (
                <button
                  key={ex}
                  type="button"
                  onClick={() => {
                    setUrl(ex);
                    void runScrape(ex);
                  }}
                  disabled={loading}
                  className="text-[14px] font-medium leading-[20px] text-black-alpha-64 underline decoration-border-muted decoration-1 underline-offset-[5px] transition hover:text-heat-100 hover:decoration-heat-40 disabled:opacity-50"
                >
                  {ex.replace(/^https:\/\//, "")}
                </button>
              ))}
            </div>

            <a
              href={vercelCloneUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="fire-btn-ghost-sm"
            >
              Deploy to Vercel
            </a>
          </div>
        </div>

        {error ? (
          <div
            role="alert"
            className="mx-auto mt-32 w-full max-w-[720px] rounded-8 border border-heat-16 bg-heat-4 px-16 py-14 text-[14px] leading-[20px] text-accent-black"
          >
            {error}
          </div>
        ) : null}

        {markdown !== null && markdown !== "" ? (
          <section className="mx-auto mt-40 w-full max-w-[720px]">
            <div className="mb-12 flex items-center justify-between gap-12 border-b border-border-faint pb-12">
              <span className="font-mono text-[12px] font-medium uppercase tracking-[0.14em] text-black-alpha-48">
                Markdown
              </span>
              <span className="text-[12px] text-black-alpha-48">Firecrawl</span>
            </div>
            <div className="fire-markdown-panel fire-markdown-body rounded-12 px-24 py-28 sm:px-32 sm:py-36">
              <ReactMarkdown>{markdown}</ReactMarkdown>
            </div>
          </section>
        ) : null}

        {markdown === "" && !error && !loading ? (
          <p className="mx-auto mt-32 max-w-[720px] text-center text-[14px] leading-[20px] text-black-alpha-48">
            Empty markdown for this URL. The scrape still succeeded.
          </p>
        ) : null}
      </main>

      <footer className="mt-auto bg-accent-black px-20 py-28 sm:px-32">
        <div className="mx-auto flex max-w-[1112px] flex-col gap-20 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[14px] leading-[22px] text-white/70">
            Built with Firecrawl and Next.js. MIT licensed template.
          </p>
          <div className="flex flex-wrap gap-x-24 gap-y-10">
            <a
              className="text-[14px] font-medium text-white/90 hover:text-heat-100"
              href="https://firecrawl.dev"
            >
              firecrawl.dev
            </a>
            <a
              className="text-[14px] font-medium text-white/90 hover:text-heat-100"
              href="https://docs.firecrawl.dev"
            >
              Documentation
            </a>
            <a
              className="text-[14px] font-medium text-white/90 hover:text-heat-100"
              href={vercelCloneUrl}
            >
              Deploy to Vercel
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
