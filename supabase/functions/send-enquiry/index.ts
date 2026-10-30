const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const RECIPIENT = "unknowntsn062@gmail.com";
const SENDER = "Meridian Systems <onboarding@resend.dev>";
const MAX_FLOW_ITEMS = 30;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface FlowItem {
  question: string;
  answer: string;
}

interface EnquiryPayload {
  service: string;
  name: string;
  email: string;
  phone: string;
  business: string;
  flow: FlowItem[];
}

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

function requiredText(value: unknown, max: number): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  if (trimmed.length === 0 || trimmed.length > max) return null;
  return trimmed;
}

function optionalText(value: unknown, max: number): string | null {
  if (value === undefined || value === null || value === "") return "";
  return requiredText(value, max);
}

function parseFlow(value: unknown): FlowItem[] | null {
  if (!Array.isArray(value) || value.length === 0 || value.length > MAX_FLOW_ITEMS) return null;
  const flow: FlowItem[] = [];
  for (const item of value) {
    if (!item || typeof item !== "object") return null;
    const question = requiredText((item as Record<string, unknown>).question, 200);
    const answer = optionalText((item as Record<string, unknown>).answer, 1200);
    if (!question || answer === null) return null;
    flow.push({ question, answer: answer || "Not answered" });
  }
  return flow;
}

function parsePayload(input: unknown): EnquiryPayload | null {
  if (!input || typeof input !== "object") return null;
  const data = input as Record<string, unknown>;
  const service = requiredText(data.service, 60);
  const name = requiredText(data.name, 120);
  const email = requiredText(data.email, 254);
  const phone = optionalText(data.phone, 40);
  const business = optionalText(data.business, 160);
  const flow = parseFlow(data.flow);

  if (!service || !name || !email || !EMAIL_PATTERN.test(email) || phone === null || business === null || !flow) {
    return null;
  }
  return { service, name, email, phone, business, flow };
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function buildEmail(enquiry: EnquiryPayload) {
  const contactRows: [string, string][] = [
    ["Name", enquiry.name],
    ["Email", enquiry.email],
    ["Phone", enquiry.phone || "Not provided"],
    ["Business", enquiry.business || "Not provided"],
    ["Interested in", enquiry.service],
  ];

  const contactHtml = contactRows
    .map(
      ([label, value]) =>
        `<tr><td style="padding:8px 16px 8px 0;color:#7C93A3;white-space:nowrap;vertical-align:top">${escapeHtml(label)}</td><td style="padding:8px 0;color:#09121B;font-weight:600">${escapeHtml(value)}</td></tr>`,
    )
    .join("");

  const flowHtml = enquiry.flow
    .map(
      (item, index) =>
        `<tr><td style="padding:12px 0;border-top:1px solid #E6EEF0;vertical-align:top;color:#5B8987;font-weight:700;width:32px">${index + 1}</td><td style="padding:12px 0;border-top:1px solid #E6EEF0"><div style="color:#4A6679;font-size:13px">${escapeHtml(item.question)}</div><div style="color:#09121B;margin-top:4px;white-space:pre-wrap">${escapeHtml(item.answer)}</div></td></tr>`,
    )
    .join("");

  const html = `<div style="font-family:Arial,Helvetica,sans-serif;background:#F4F8F9;padding:24px"><div style="max-width:620px;margin:0 auto;background:#ffffff;border-radius:16px;padding:32px"><p style="margin:0 0 4px;color:#5B8987;font-size:12px;letter-spacing:3px;text-transform:uppercase">New enquiry</p><h1 style="margin:0 0 24px;color:#09121B;font-size:22px">${escapeHtml(enquiry.name)} wants to talk</h1><h2 style="font-size:14px;color:#4A6679;text-transform:uppercase;letter-spacing:2px;margin:0 0 8px">Contact details</h2><table style="border-collapse:collapse;width:100%;font-size:14px;margin-bottom:32px">${contactHtml}</table><h2 style="font-size:14px;color:#4A6679;text-transform:uppercase;letter-spacing:2px;margin:0 0 8px">Their journey through the questionnaire</h2><table style="border-collapse:collapse;width:100%;font-size:14px">${flowHtml}</table><p style="margin:32px 0 0;color:#7C93A3;font-size:12px">Replying to this email goes straight to ${escapeHtml(enquiry.email)}.</p></div></div>`;

  const text = [
    `New enquiry from ${enquiry.name}`,
    "",
    "Contact details",
    ...contactRows.map(([label, value]) => `${label}: ${value}`),
    "",
    "Their journey through the questionnaire",
    ...enquiry.flow.map((item, index) => `${index + 1}. ${item.question}\n   ${item.answer}`),
  ].join("\n");

  return {
    subject: `New enquiry: ${enquiry.name} (${enquiry.service})`,
    html,
    text,
  };
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    if (req.method !== "POST") {
      return json({ error: "Method not allowed." }, 405);
    }

    const body: unknown = await req.json().catch(() => null);

    if (body && typeof body === "object" && typeof (body as Record<string, unknown>).website === "string"
      && ((body as Record<string, unknown>).website as string).length > 0) {
      return json({ ok: true });
    }

    const enquiry = parsePayload(body);
    if (!enquiry) {
      return json({ error: "Please check your answers and try again." }, 400);
    }

    const apiKey = Deno.env.get("RESEND_API_KEY");
    if (!apiKey) {
      return json({ error: "The enquiry service is not available right now." }, 500);
    }

    const email = buildEmail(enquiry);
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: SENDER,
        to: [RECIPIENT],
        reply_to: enquiry.email,
        subject: email.subject,
        html: email.html,
        text: email.text,
      }),
    });

    if (!response.ok) {
      console.error("Resend rejected the enquiry email", response.status, await response.text());
      return json({ error: "We could not send your enquiry just now." }, 502);
    }

    return json({ ok: true });
  } catch (err) {
    console.error("send-enquiry failed", err);
    return json({ error: "Something went wrong. Please try again." }, 500);
  }
});
