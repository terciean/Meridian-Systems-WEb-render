# Cloudflare Pages setup

Hosts the site (static, prerendered) and the enquiry endpoint (`functions/api/send-enquiry.ts`) on one free platform. Domain and mailboxes stay registered at HostAfrica.

## 1. Push the code
The repo is `terciean/Meridian-Systems-WEb-render` on GitHub. Push `main` before connecting.

## 2. Create the Pages project
Cloudflare dashboard -> Workers & Pages -> Create -> Pages -> Connect to Git -> pick the repo.

| Setting | Value |
|---|---|
| Framework preset | None |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Root directory | leave empty |
| Environment variable (Production) | `NODE_VERSION` = `22` (the repo also pins this in `.node-version`) |

Then Settings -> Variables and Secrets -> add a **secret** named `RESEND_API_KEY` with your Resend key. Redeploy after adding it.

Do not set any `VITE_SUPABASE_*` variables. Supabase is no longer used.

## 3. Connect the domain without breaking email
Your mailboxes (`admin@ethoscreativesystems.com`) run on HostAfrica, and email depends on DNS records (MX, SPF, DKIM). Pages needs the domain's DNS to be on Cloudflare for the bare domain to work, so move DNS carefully:

1. Cloudflare -> Add a site -> `ethoscreativesystems.com` -> Free plan. Cloudflare scans and imports your existing records.
2. **Compare the imported list against HostAfrica's DNS zone before continuing.** Every `MX`, `TXT` (SPF, DKIM, DMARC) and any `mail`/`webmail`/`cpanel` records must be present. Add any that are missing.
3. Set every mail-related record (`mail`, `webmail`, `smtp`, `imap`, `cpanel` A/CNAME records) to **DNS only** (grey cloud). MX and TXT are always DNS only. Orange-clouded mail hosts break email.
4. Cloudflare gives you two nameservers. At HostAfrica (domain's nameserver settings) replace the current nameservers with them. Propagation takes from minutes to a few hours.
5. Pages project -> Custom domains -> add `ethoscreativesystems.com` and `www.ethoscreativesystems.com`. Cloudflare creates the records and the SSL certificate automatically.
6. Send a test email to and from `admin@ethoscreativesystems.com` once propagation completes.

If you would rather not touch nameservers: keep DNS at HostAfrica, add only a `www` CNAME pointing to `<project>.pages.dev`, and redirect the bare domain to `www`. That keeps email untouched but the site lives at `www.`.

## 4. After the domain is live
Tell Claude to switch `SITE_ORIGIN` in `src/lib/site.ts`, plus `public/sitemap.xml`, `public/robots.txt` and the JSON-LD in `index.html`, from the old onrender.com address to `https://ethoscreativesystems.com`. Then re-verify the site in Google Search Console and Bing Webmaster Tools.

## 5. Optional: send enquiries from your own domain
Enquiry emails currently go out from `onboarding@resend.dev` to your personal Gmail. To send from `admin@ethoscreativesystems.com`, add the domain in Resend, add the SPF/DKIM records it lists to the Cloudflare DNS, then change `SENDER` (and `RECIPIENT` if wanted) in `functions/api/send-enquiry.ts`.

## 6. Verify the deploy
- Open `https://<domain>/meta-ads` directly and view source: you should see the real page text, not an empty `<div id="root">`.
- Submit one test enquiry: it should arrive by email, and the Calendly panel should appear.
- Request an unknown path like `/nope`: it should show the 404 page.
