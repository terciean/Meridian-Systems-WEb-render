import { Flame, ShieldCheck, Snowflake } from 'lucide-react';

const SEGMENTS = [
  {
    icon: Flame,
    tone: 'border-ember-300/40 bg-ember-500/15 text-ember-100',
    label: 'Warm leads',
    title: 'People who asked to hear from you.',
    body: 'Enquiries from your website, referrals, past clients and anyone who has opted in. Follow-ups run automatically across email, WhatsApp and calls, and a meeting can be booked in one step.',
    points: ['Automated follow-up sequences', 'WhatsApp and email integrations', 'Meetings booked and alarmed automatically'],
  },
  {
    icon: Snowflake,
    tone: 'border-teal-400/40 bg-teal-500/10 text-teal-200',
    label: 'Cold leads',
    title: 'Prospects who have not asked yet.',
    body: 'New names you are researching or have been referred to, but who have not yet opted in. They are tracked in the CRM and contacted personally, in line with POPIA.',
    points: ['Tracked in one pipeline', 'Personal, permission-based outreach', 'No automated WhatsApp messages'],
  },
];

export function LeadSegmentsSection() {
  return (
    <section data-reveal className="px-6 pb-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 max-w-2xl space-y-4">
          <p className="section-label">Two kinds of lead</p>
          <h2 className="text-3xl font-bold text-ink-50 md:text-4xl">Warm and cold leads are handled differently.</h2>
          <p className="leading-relaxed text-ink-300">
            The system knows the difference, so every lead gets the right kind of follow-up for how they reached you.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {SEGMENTS.map((segment) => {
            const Icon = segment.icon;
            return (
              <article key={segment.label} className="panel-interactive flex flex-col p-8 md:p-10">
                <div className="flex items-center gap-4">
                  <span className={`flex h-12 w-12 items-center justify-center rounded-xl border ${segment.tone}`}>
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span className="section-label">{segment.label}</span>
                </div>
                <h3 className="mt-6 text-2xl font-bold text-ink-50">{segment.title}</h3>
                <p className="mt-4 leading-relaxed text-ink-300">{segment.body}</p>
                <ul className="mt-6 grid gap-3 border-t border-ink-800 pt-6 text-sm text-ink-200">
                  {segment.points.map((point) => (
                    <li key={point} className="flex items-center gap-3">
                      <span className="h-1.5 w-1.5 rounded-full bg-teal-300" aria-hidden="true" />
                      {point}
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>

        <div className="mt-6 flex items-start gap-4 rounded-2xl border border-ink-700 bg-ink-900/60 p-6">
          <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-teal-300" aria-hidden="true" />
          <p className="text-sm leading-relaxed text-ink-300">
            Automated WhatsApp messages are used only for warm leads who have opted in. Cold leads are never sent automated
            WhatsApp messages, and their details are used only for the purpose they were collected for.
          </p>
        </div>
      </div>
    </section>
  );
}
