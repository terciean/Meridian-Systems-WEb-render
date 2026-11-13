# Cloudflare setup

The site (static, prerendered into `dist/`) and the enquiry endpoint run together as one Cloudflare **Worker with static assets**. Config lives in `wrangler.jsonc`; the endpoint is `worker/index.ts` + `worker/enquiry.ts` (`POST /api/send-enquiry`, sends the email via Resend). All other requests are served straight from `dist/` and never run the Worker.

## 1. Deploy from GitHub
Workers & Pages -> Create -> Import a repository -> `terciean/Meridian-Systems-WEb-render`. On the "Set up your application" screen use:

| Field | Value |
|---|---|
| Project name | `meridian-systems-web-render` (must match `name` in `wrangler.jsonc`) |
| Build command | `npm run build` |
| Deploy command | `npx wrangler deploy` (the default — leave it) |
| Preview command | `npx wrangler preview` (default — leave it) |

Click Deploy. Node 22 is picked up from `.node-version` automatically.

## 2. Add the email secret
Worker -> Settings -> Variables and Secrets -> Add -> type **Secret**, name `RESEND_API_KEY`, value = your Resend API key. Save, then trigger a redeploy (Deployments -> redeploy, or push any commit).

## 3. Test on the free `*.workers.dev` address before touching DNS
- Open `/meta-ads` directly, view source: real page text, not an empty `<div id="root">`.
- Submit one enquiry: the email should arrive and the Calendly panel should appear.
- Open `/nope`: the 404 page should show.

## 4. Connect the domain without breaking email
Your mailboxes (`admin@ethoscreativesystems.com`) run on HostAfrica and depend on DNS records (MX, SPF, DKIM). Cloudflare needs to control the domain's DNS to serve the bare domain, so move it carefully:

1. Cloudflare -> Add a site -> `ethoscreativesystems.com` -> Free plan. It imports your existing records.
2. **Compare the imported list against HostAfrica's DNS zone before continuing.** Every `MX`, `TXT` (SPF, DKIM, DMARC) and any `mail`/`webmail`/`cpanel` records must be present. Add any that are missing.
3. Set mail-related records (`mail`, `webmail`, `smtp`, `imap`, `cpanel`) to **DNS only** (grey cloud). MX and TXT records are always DNS only. Orange-clouded mail hosts break email.
4. Cloudflare gives you two nameservers. At HostAfrica, replace the domain's nameservers with them. Propagation takes minutes to a few hours.
5. Worker -> Settings -> Domains & Routes -> Add -> Custom domain: `ethoscreativesystems.com` and `www.ethoscreativesystems.com`. SSL is automatic.
6. Send a test email to and from `admin@ethoscreativesystems.com` once propagation completes.

## 5. After the domain is live
Switch `SITE_ORIGIN` in `src/lib/site.ts`, plus `public/sitemap.xml`, `public/robots.txt` and the JSON-LD in `index.html`, from the old onrender.com address to `https://ethoscreativesystems.com`. Then re-verify the site in Google Search Console and Bing Webmaster Tools.

## 6. Optional: send enquiries from your own domain
Enquiry emails currently go out from `onboarding@resend.dev` to your personal Gmail. To send from your own domain, add it in Resend, add the SPF/DKIM records it lists to Cloudflare DNS, then change `SENDER` (and `RECIPIENT` if wanted) in `worker/enquiry.ts`.
