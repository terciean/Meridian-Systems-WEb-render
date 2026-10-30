# Project memory

## Product intent & audience

- South African business automation / lead management product ("Lead Systems")
- Audience: businesses needing lead management, WhatsApp integration, meeting alarms, POPIA compliance
- SEO/GEO optimization targeting South African search and AI discovery

## Brand personality & voice

- Professional but not generic; aims for "beautiful, not cookie cutter"
- FAQ content uses direct, practical Q&A tone covering real user concerns

## Visual design & UX direction

- Neon accents retained on key elements only
- Decorative glows, background blurs, and blob shapes used sparingly — project guidance leans toward restraint
- React + Tailwind CSS, lucide-react for icons, JSX syntax
- `@/` path alias maps to `src/`; avoid deep relative imports

## Decisions, constraints & rationale

- Framework: Vite + React
- Do not install additional UI/icon packages beyond what template provides (Tailwind, lucide-react)
- Added FAQ section with matching structured data (JSON-LD) to Lead Systems page
- Organization structured data added to site head with South Africa locale
- robots.txt explicitly allows Google, Bing, and major AI crawlers
- Removed selected decorative glows from automation panel per design guidance
- Build and checks pass with no errors

## Open questions & assumptions

- Real domain not yet set — sitemap.xml and robots.txt still reference placeholder domain
- Structured data phone number assumes +27 country code; needs confirmation
- Placeholder domain must be replaced before sitemap/robots/structured data are production-ready