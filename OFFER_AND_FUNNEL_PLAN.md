# Ethos Creative Systems — Offer & Funnel Plan

Planning doc for the design/UX overhaul. Written for handoff to Fable 5.2 for implementation. Builds on [BRANDING.md](BRANDING.md) (visual identity — do not re-decide that here).

## 1. Where this sits

Rebrand from "Meridian Systems" to **Ethos Creative Systems** is the final direction (palette, fonts, logo already applied — see Section 7 for what's left). Before any layout/visual work, the core offer needed defining properly: the old copy described *features* ("captures enquiries in one place") instead of *value* — consistent with it reading as generic/AI-templated. This doc fixes that using Hormozi's Value Equation, then maps the result onto a new funnel architecture adapted from a pattern already proven on another client project.

**Value = (Dream Outcome × Perceived Likelihood of Achievement) / (Time Delay × Effort & Sacrifice)**

## 2. The core offer: The Lead Control System

This is the flagship — everything else on the site is a supporting/ascending offer around it.

**Dream outcome:** Every enquiry gets captured and followed up — nothing is ever lost in an inbox, a missed WhatsApp, or a forgotten spreadsheet row — and every booked meeting actually happens because the system makes it nearly impossible to miss.

**Mechanism name:** *The Lead Control System* (already the name used internally in pricing — keep it, it's a good Hormozi-style container name: specific, ownable, not genericCRM-speak).

**Value stack** (reframe existing built features as priced components, not bullet-point features):

| Component | What it actually does | Standalone value |
|---|---|---|
| CRM setup | Every client, note, and stage on one screen | R15,000 |
| Lead capture tool | Website, social, and referral enquiries into one pipeline | R10,000 |
| WhatsApp follow-up automation (bonus) | Permission-based automated follow-up for warm leads | R3,500 |
| Phone alarms, powered by MacroDroid (bonus) | 24hr + 15min alarm before every booked meeting, synced to the CRM record | R2,000 |
| POPIA-aware setup review (bonus) | Personal data handling reviewed with the client before go-live | R2,500 |
| **The Lead Control System (bundle)** | All of the above, combined | **R25,000** (stacked value ≈ R33,000) |

Locked in: price the three bonuses on paper as above so the stack visibly totals ~R33,000 against the R25,000 price, rather than discounting the bundle. The client still pays R25,000 — this only changes how the value is presented.

**Guarantee — locked in:**

> *"If your booked-meeting rate doesn't visibly improve within 90 days of go-live, we keep working on your system for free until it does."*

**Implementation requirement, not optional:** for this to be honest and enforceable (not just decorative), every client needs their **current booked-meeting rate captured and written down before go-live** — a one-line baseline in the onboarding questionnaire or contract ("X meetings booked/month today"). Without a recorded baseline, "visibly improve" can't be verified for either side. Add this as a required step in the Stage 1 funnel/onboarding flow (Section 6), not an afterthought.

**Scarcity — skipped, by design:** There's no real capacity bottleneck to point to honestly — running costs scale with the overage-billing model (Section 3), and you don't have a firm build-time limit to commit to. A fabricated "only N spots/month" would undercut the offer rather than strengthen it, so this plan uses **time-based urgency instead of quantity-based**: "Every system is set up personally by Tristan — onboarding starts within 1 week of your enquiry" ties urgency to the real, true thing (personal, hands-on setup) without inventing a cap. Revisit true quantity scarcity later only if real demand ever outpaces your actual build time.

## 3. Full offer menu (ascending stack around the core)

| Service | Price | Role in the funnel |
|---|---|---|
| **Lead Systems & CRM** *(core)* | R15k CRM / R10k lead tool / **R25k Lead Control System bundle** (stacked value ≈ R33k) / R5k+/mo co-management, covers up to 200 cold-outreach leads/month, R500 per extra 100 beyond that | Flagship — anchors the whole site |
| Website Design & SEO | R5k website / R7k with SEO setup / R2k SEO-only on existing site / R500+ page edits | Entry point for people not ready for full CRM |
| Booking & Stock Systems | Quoted per workflow | Add-on, cross-sell after core system is live |
| Video Production & Editing | Quoted per project | Add-on / content engine |
| Social Content | R1,000/mo (2 static posts/week); R5,000 launch bundle (1 AI promo + first month) | Retainer add-on, recurring revenue |
| Meta Ad Setup & Management | Quoted separately from ad spend | Add-on once lead system is proven |
| Branding & Consultations | Branding quoted per project; R800/consultation (Website/SEO, lead-system, content) | Low-commitment entry offer / lead magnet for the funnel itself |

The R800 consultation is your natural **lead magnet / tripwire** at the top of the funnel for people not ready to commit to R15k+.

## 4. Audience

Staying broad — South African SMEs generally, not niching down. Messaging should stay industry-agnostic (the existing questionnaire's industry picker already does this well — professional services, retail, property, health, hospitality, other).

## 5. Proof

Two testimonials only (Impact Innovations Media, Supremo) for now. Keep claims general until more case studies exist — don't invent numbers. Both testimonials praise responsiveness/polish + the lead pipeline working, not specific metrics, so lead with "it actually works, built by one person who's responsive" as the trust angle rather than stats you don't have yet.

## 6. Funnel architecture (adapted from the gkherbalsbooking pattern)

Replacing the current flat structure (4 solution pages + separate `/contact` and `/enquire`) with a 3-stage funnel:

**Stage 1 — Contact/Enquiry (route selection → conditional questions)**
Reuse the existing `questionnaire.ts` step engine — it already does exactly this (service choice → branching questions → contact details). Extend `SERVICE_OPTIONS` from 4 to the 6 services above, including the R800 consultation as its own low-commitment route. Keep the "closed-choice params only" rule from the other project: route state is pre-written category answers, never free text, in the URL — no personal data in query strings (matches the safety rules both this and the other project already follow).

**Required addition for the guarantee (Section 2) to be enforceable:** for anyone routing into Lead Systems & CRM, the questionnaire must capture a baseline booked-meeting rate (reuse/extend the existing `monthlyEnquiries` step, or add a sibling question — "roughly how many meetings do you book per month today?") and store it against the lead record before go-live. No baseline captured = guarantee can't be honored or enforced either way.

**Stage 2 — Offer pages per service** (built at the existing flat paths — `/lead-systems-crm`, `/website-design-seo`, etc. — rather than introducing an `/offer/` prefix, to avoid unnecessary churn since these routes aren't indexed yet)
Horizontal slide-deck layout, personalized by the route taken in Stage 1. Each deck: **VSL/opener (the pain, keyed to the "biggest challenge" answer from the questionnaire) → dream outcome → mechanism (named system) → value stack → investment (real price from Section 3) → guarantee → closer/CTA to book.** Two-layer personalization carried over from the other project: a top headline driven by the service chosen, a detail subline driven by the specific challenge/answer within that service.

**Stage 3 — Booking + tracking**
Enquiries go through a Cloudflare Worker (`worker/index.ts` + `worker/enquiry.ts`) that emails via Resend — Supabase was removed (it only ran this one function, and its free tier pauses when idle). Leads are not stored in a database yet; the CRM on Railway is the future home for that. Add event tracking at each funnel stage (route chosen, offer page viewed, booking completed) so conversion can actually be measured. **Analytics: Plausible** — lightweight, privacy-friendly, no cookie-consent banner needed, which fits the POPIA-conscious brand story better than Google Analytics' heavier tracking.

**Booking mechanism — locked in: Calendly.** Embedded as an inline widget (`src/components/shared/CalendlyInlineWidget.tsx`) on the questionnaire's confirmation screen (`src/features/enquiry/EnquiryConfirmation.tsx`) — after someone submits the enquiry, they can immediately grab a time instead of waiting for a reply. URL: `https://calendly.com/ethoscreativesystems/30min`. No Calendly prefill of name/email is wired up yet (the other project's pattern used Calendly's `?name=&email=` query params) — worth adding later if you want to skip re-entering contact details.

## 7. Design brief notes for Fable 5.2

- **Visual system:** already set in [BRANDING.md](BRANDING.md) — steel blue `#507289`, graphite `#171B20`, slate `#242B33`, silver `#C8CED5`, cool white `#F7FAFD`; Barlow Condensed (display) + Source Sans 3 (body). Do not redecide this, just execute it across new pages.
- **New components needed:** offer slide-deck (horizontal scroll/swipe, 6–7 panels), extended route-aware questionnaire (6 services + consultation route), value-stack/pricing block with guarantee callout, booking step (Cloudflare Worker + Calendly).
- **Reused as-is:** `BrandMark`, `SiteHeader`/`SiteFooter`, `PageMeta`, `ProofCard`/testimonials, `FaqSection`, `MobileCtaBar`.
- **Existing diff is small and surgical** (84/−86 lines across 15 files) — it's a palette/font/name swap, not a layout rebuild. The funnel work in Section 6 is the actual layout rebuild; brief Fable accordingly so it doesn't scope this as "just restyle what's there."

## 8. Open items — need your call before/during build

- [x] Bonus pricing for the R25k bundle — WhatsApp automation R3,500 / phone alarms R2,000 / POPIA review R2,500, stacked value ≈ R33,000 (Section 2)
- [x] Guarantee wording — locked in as the harder, performance-based version (Section 2); requires baseline capture in the questionnaire (Section 6)
- [x] Scarcity — skipped as fabricated/not honest; using time-based onboarding urgency instead (Section 2)
- [x] Co-management overage threshold — 200 cold-outreach leads/month included, R500 per extra 100 (Section 3)
- [x] Onboarding turnaround — locked in as 1 week (Section 2)
- [x] Analytics/event tracking tool — Plausible (Section 6)
- [x] Video Production & Editing pricing — staying "quoted per project," no change, despite low marginal AI-generation cost (Section 3)
- [x] Domain — `ethoscreativesystems.com` confirmed. Still needs to be bought/connected (HostAfrica → Render custom domain, see earlier conversation) and then applied to `index.html`, `PageMeta.tsx` (`SITE_ORIGIN`), `robots.txt`, and `sitemap.xml` (all currently point to `meridian-systems.onrender.com`) — leave this edit for the Fable 5.2 build pass once DNS is actually connected, so canonical URLs don't go live pointing at an unresolving domain.
- [x] Business email confirmed — `admin@ethoscreativesystems.com` (HMailPlus Core, active). Still needs to be added to `contact.ts` and the structured data in `index.html` — leave for the Fable 5.2 build pass alongside the domain swap.
- [ ] `public/logo.jpg` is the *client's* logo (Impact Innovations Media) used in testimonials, not Ethos's own — confirmed fine, no action needed, noting it so it isn't mistaken for a stray old-brand asset
- [ ] Uncommitted rebrand changes (branding swap + `BRANDING.md` + new logo assets) should be committed once you've reviewed them — not done automatically

## 9. Sequencing

1. ~~You sign off on the Section 8 open items~~ — done
2. Commit the existing rebrand diff — still pending, not done automatically
3. ~~Expand `solutions.ts` to the 6-service menu with the value-stack/guarantee copy~~ — done (`src/data/solutions.ts`)
4. ~~Extend the questionnaire + build the offer slide-deck page template~~ — done (`src/data/questionnaire.ts`, `src/components/solutions/OfferDeck.tsx`, `src/components/solutions/SolutionPage.tsx`)
5. ~~Wire the booking/tracking stage~~ — done: Plausible script + SPA pageview tracking (`index.html`, `src/App.tsx`), `route_chosen`/`enquiry_submitted` events (`src/features/enquiry/QuestionnaireForm.tsx`), business email added (`src/data/contact.ts`, footer, structured data); enquiry email via Resend, now served by a Cloudflare Worker
6. Fable 5.2 takes this doc + `BRANDING.md` and does the persuasive copywriting pass over the structure already built — the architecture, pricing, guarantee and mechanics are real; the opener/outcome/closer language is a first draft, not final persuasive copy

## 10. What was actually built (for Fable 5.2's context)

- `src/data/solutions.ts` — rewritten: 6 offer slugs (`lead-systems-crm`, `website-design-seo`, `booking-stock-systems`, `video-production`, `social-content`, `meta-ads`), each with a structured `offer` object (painPoint, dreamOutcome, mechanismName/body, valueStack, investmentLines, optional stackedValueNote/guarantee/urgencyNote, closerCta). Old `features`/`automations`/`headline`/`intro` fields removed — fully superseded by `offer`.
- `src/components/solutions/OfferDeck.tsx` — new horizontal scroll-snap slide deck (problem → outcome → mechanism/value-stack → investment → guarantee (optional) → closer), with arrow + dot navigation, keyboard-accessible via native scroll-snap, Plausible panel-view tracking.
- `src/components/solutions/SolutionPage.tsx` — now renders `OfferDeck` instead of the old hero/features/automations sections; FAQ, meeting-booking, lead-segments, closing CTA, and related-solutions sections kept as-is below the deck.
- `src/data/questionnaire.ts` — `SERVICE_OPTIONS` extended to the 6 services + a `consultation` (R800 lead-magnet) option + `not-sure`; added a `condition?: (answers) => boolean` field to `QuestionStep` and a new `getActiveSteps(answers)` helper for route-aware branching; added the baseline booked-meeting-rate question, shown only when `service === 'lead-systems-crm'`, required for the guarantee to be enforceable.
- `src/features/enquiry/QuestionnaireForm.tsx` / `submitEnquiry.ts` — switched from the static step list to `getActiveSteps(answers)`; added `route_chosen` and `enquiry_submitted` analytics events.
- `src/lib/analytics.ts` — new, thin `window.plausible` wrapper (`trackEvent`, `trackPageview`), safe no-op if the script hasn't loaded.
- `index.html` — added the Plausible `script.manual.js` tag (`data-domain="ethoscreativesystems.com"`), added `email` to the `ContactPoint` structured data.
- `src/App.tsx` — fires a manual Plausible pageview on every client-side route change (required since `script.manual.js` doesn't auto-track SPA navigation).
- `src/data/contact.ts`, `src/components/layout/SiteFooter.tsx` — added `admin@ethoscreativesystems.com`, surfaced in the footer.
- `worker/index.ts` + `worker/enquiry.ts` — enquiry endpoint, ported from the removed Supabase edge function (see CLOUDFLARE_SETUP.md).
- `src/components/home/PathwaysSection.tsx` — "Four pathways" → "Six pathways" copy fix.
- `.claude/launch.json` — added so the dev server can be previewed in-session (`npm run dev --prefix Meridian-Systems-WEb-render`).
- Verified: `tsc --noEmit` clean, `vite build` clean, manual browser walkthrough of the deck (desktop + mobile), the conditional questionnaire step (8 steps on the core route vs. 7 on others), and the homepage pathway grid. No console errors.
- **Not done**: persuasive copy polish (that's the Fable pass), the domain/DNS connection itself, and committing any of this to git.
