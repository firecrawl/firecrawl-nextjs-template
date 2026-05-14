import Firecrawl from "@mendable/firecrawl-js";
import { NextResponse } from "next/server";

export const maxDuration = 120;

function isValidHttpUrl(value: string): boolean {
  try {
    const u = new URL(value);
    return u.protocol === "http:" || u.protocol === "https:";
  } catch {
    return false;
  }
}

export async function POST(request: Request) {
  const apiKey = process.env.FIRECRAWL_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Server misconfiguration: FIRECRAWL_API_KEY is not set." },
      { status: 500 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Expected JSON body." }, { status: 400 });
  }

  const url =
    typeof body === "object" && body !== null && "url" in body
      ? String((body as { url: unknown }).url)
      : "";
  if (!url.trim() || !isValidHttpUrl(url.trim())) {
    return NextResponse.json(
      { error: "Provide a valid http(s) URL in `url`." },
      { status: 400 },
    );
  }

  try {
    const client = new Firecrawl({ apiKey });
    const doc = await client.scrape(url.trim(), {
      formats: ["markdown"],
      onlyMainContent: true,
    });

    return NextResponse.json({
      markdown: doc.markdown ?? "",
      metadata: doc.metadata ?? null,
    });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Scrape failed.";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
