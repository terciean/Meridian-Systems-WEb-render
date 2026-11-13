# SEO — tool stack and technical setup

Reference doc for the tools this project specifically uses, and the technical SEO work already done. Written alongside [OFFER_AND_FUNNEL_PLAN.md](OFFER_AND_FUNNEL_PLAN.md) — read that first for the business/funnel context.

## Tool stack (decided, in use)

| Tool | Purpose | Status |
|---|---|---|
| **Google Search Console** | Indexing status, query data, Core Web Vitals, manual penalty alerts | Partially set up — `index.html` already has a `google-site-verification` meta tag from an earlier session. **Needs re-verification once the real domain (`ethoscreativesystems.com`) is connected**, since GSC properties are per-domain. |
| **Bing Webmaster Tools** | Same, for Bing/Yahoo + submits `sitemap.xml` to Bing's crawler | **Not set up yet** — no verification tag in `index.html`. Needs you to create the property and give me the verification meta tag/code to add. |
| **Google Business Profile** | Local SEO / local-intent search — likely your highest-leverage free channel for a South African service business | Not set up — account action, needs to be done by you. |
| **PageSpeed Insights / Lighthouse** | Core Web Vitals, directly affects ranking | Ad hoc — run via Chrome DevTools or pagespeed.web.dev whenever you want a check. |
| **Screaming Frog** (free tier, up to 500 URLs) | Crawl audit — broken links, duplicate titles/meta | Ad hoc, run manually when needed. |
| **Google's Rich Results Test** | Validates the JSON-LD structured data already on the site (Organization, Service, BreadcrumbList) | Ad hoc. |
| **Google Keyword Planner** (free, no ad spend required) | Real search volume for keyword decisions | Use when writing new page copy. |
| **AnswerThePublic / Ubersuggest** (free tier) | Question-based/long-tail keyword ideas, good source for FAQ content | Use when expanding FAQ sections. |
| **Ahrefs Webmaster Tools** (free with site verification) | Backlink + site-audit data | Not set up — account action, needs to be done by you. |

**Action items that need your own account access** (cannot be done by Claude — these involve logging into your own Google/Bing/Ahrefs accounts):
1. Create a Bing Webmaster Tools property, get its verification meta tag, send it to me to add to `index.html`.
2. Once `ethoscreativesystems.com` DNS is connected, create/verify a new Google Search Console property for it, send me the new verification tag (the old one Will stop being valid for a changed domain/property).
3. Set up Google Business Profile for the business.
4. Verify site ownership in Ahrefs Webmaster Tools.
5. Submit `sitemap.xml` to both Search Console and Bing Webmaster Tools once verified.

## Citations / "preferred sources" (GEO) — action item

There's no actual submission form for getting into ChatGPT/Perplexity/Claude's "preferred sources" — that's not a real, direct program you can apply to. What drives whether an AI assistant cites your own site when someone asks about your business is the same thing that drives traditional local SEO: **consistent citations** of your business name, address and phone number (NAP) across the directories and platforms these systems (and Google) actually crawl and trust. This is standard practice — "most people do the same thing," as you said — so it's worth doing even though it's not glamorous:

- Google Business Profile (already listed above — the single highest-leverage one)
- Bing Places for Business
- LinkedIn Company Page
- Facebook Business Page
- HelloPeter (South Africa's main review platform)
- Yellow Pages SA / Brabys (SA business directories)
- Crunchbase (useful for a tech/services company, often crawled by AI tools)

Action item: create/claim these with identical business name, phone (`076 502 1430`), and email (`admin@ethoscreativesystems.com`) once the real domain is live, so the citations are consistent rather than scattered across variations.

## Technical SEO: prerendering (done)

**The problem:** this site is a client-rendered Vite + React SPA. The built `dist/index.html` was just `<div id="root"></div>` plus a script tag — no real content until JavaScript executes. Googlebot generally renders JS well enough, but Bing and the AI crawlers `robots.txt` explicitly invites (`GPTBot`, `ClaudeBot`, `PerplexityBot`, `ChatGPT-User`) often don't execute JavaScript, so they likely saw a blank page. The same applies to link-preview bots (WhatsApp, Slack, Facebook) — every shared link would have shown the generic homepage title/description instead of the specific page's.

**The fix:** a build-time prerendering step was added, with no new runtime dependencies (uses `react-dom/server` and `react-helmet-async`'s existing SSR support, both already installed):

- `src/entry-server.tsx` — server-render entry point, exports `render(pathname)` using `renderToString` + Helmet's server context.
- `src/lib/router.tsx` — the custom router's `readLocation()`/`navigate()` are now SSR-safe (guarded against `window` not existing in Node), with a `setSSRLocation()` escape hatch the prerender script uses to pick the route.
- `src/lib/site.ts` — new shared `SITE_ORIGIN` constant (previously `window.location.origin` was used at render time in `SolutionPage.tsx`, which would crash under SSR — fixed to use this constant instead, also fixing `PageMeta.tsx`'s separate hardcoded copy of the same value).
- `scripts/prerender.mjs` — after the client + SSR builds, renders every route (home, the 6 offer pages, our-work, contact, enquire, plus a 404) to a real HTML string with the correct `<title>`/meta/canonical tags, and writes each to `dist/<route>/index.html` (so a static host serving "clean URLs" returns real content per path, not just the homepage shell).
- `src/main.tsx` — switched from `createRoot(...).render()` to `hydrateRoot(...)` when prerendered content exists, so the client takes over the existing DOM instead of discarding and re-rendering it (this is what makes the prerendering actually help load speed/SEO rather than just being thrown away on first paint).
- `package.json` — `npm run build` now runs: client build → SSR build → prerender script (cleans up its own intermediate `dist-ssr/` folder). `npm run build:client-only` still exists if you ever need the old client-only build.

**Verified:** confirmed via a standards-compliant static file server (`npx serve dist`) that `/meta-ads` (for example) correctly serves its own prerendered title, canonical URL, and full page text — not the homepage's. `vite preview`'s own dev-only server does *not* resolve this correctly (it serves root `index.html` for every path unconditionally before checking for a matching file) — that's a quirk of that specific local tool, not a problem with the generated output.

**Open question for whoever deploys this (noted, not yet confirmed):** this depends on the production host (Render) checking for an exact static file match (`<path>/index.html`) *before* applying any SPA catch-all rewrite rule. Most static hosts (Netlify, Render, Vercel, GitHub Pages) work this way by default, and the fact that deep links like `/our-work` already work today on the live site confirms *some* rewrite rule exists — but it's worth a quick real-world check after the next deploy: load `/meta-ads` directly (not via in-app navigation) and view-source to confirm you see the real page content, not just `<div id="root"></div>`.

## Sitemap fix (done)

`public/sitemap.xml` still listed the old 4-service URLs (`/stock-systems`, `/content-video`) from before the offer menu expanded to 6 services. Updated to the current 6 offer paths (`/booking-stock-systems`, `/video-production`, `/social-content`, `/meta-ads` added; the old two removed).
