import { ArrowRight, Calendar, CheckCircle2, Mail, Send } from 'lucide-react';
import { Link } from '@/lib/router';
import { ENQUIRE_PATH } from '@/data/navigation';

const PIPELINE = [
  { icon: Mail, label: 'Enquiry received', detail: 'Captured from your website' },
  { icon: Send, label: 'Follow-up sent', detail: 'Within minutes, not days' },
  { icon: Calendar, label: 'Meeting booked', detail: 'Added to your calendar' },
  { icon: CheckCircle2, label: 'Client won', detail: 'Tracked from start to finish' },
];

function PipelinePreview() {
  return (
    <div className="panel relative w-full max-w-md space-y-6 p-8 shadow-glow-teal" aria-hidden="true">
      <div className="flex items-center justify-between">
        <span className="section-label text-[0.65rem]">Live pipeline</span>
        <span className="flex items-center gap-2 text-xs text-teal-200">
          <span className="h-2 w-2 animate-pulse rounded-full bg-success-500 shadow-[0_0_12px_rgba(79,178,134,0.9)]" />
          Active
        </span>
      </div>
      <div className="relative">
        <span className="absolute left-[1.15rem] top-6 bottom-6 w-px bg-gradient-to-b from-teal-300 via-teal-400/60 to-ember-300/70" aria-hidden="true" />
        <ol className="relative space-y-5">
          {PIPELINE.map((stage) => {
            const Icon = stage.icon;
            return (
              <li key={stage.label} className="relative flex items-center gap-4 rounded-xl border border-ink-700 bg-ink-950/80 p-4">
                <span className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-teal-400/50 bg-ink-900 text-teal-200">
                  <Icon className="h-4 w-4" />
                </span>
                <span className="flex flex-col">
                  <span className="text-sm font-semibold text-ink-100">{stage.label}</span>
                  <span className="text-xs text-ink-400">{stage.detail}</span>
                </span>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}

export function HeroSection() {
  return (
    <section className="relative overflow-hidden px-6 pb-24 pt-40 md:pb-32 md:pt-52">
      <div className="pointer-events-none absolute left-1/2 top-24 h-[32rem] w-[32rem] -translate-x-1/2 rounded-full bg-teal-500/10 blur-3xl" aria-hidden="true" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="space-y-8">
          <p className="section-label reveal">Lead systems and CRM</p>
          <h1 className="reveal text-4xl font-bold leading-[1.08] text-ink-50 sm:text-5xl md:text-6xl lg:text-7xl">
            Turn every enquiry into a <span className="text-teal-300 text-neon">booked meeting.</span>
          </h1>
          <p className="reveal max-w-xl text-lg leading-relaxed text-ink-300">
            Ethos Creative Systems is a CRM and lead management system for South African businesses. It captures, follows up and books every lead, with supporting websites, stock systems and content that keep the whole business moving.
          </p>
          <div className="reveal flex flex-wrap items-center gap-4">
            <Link to={ENQUIRE_PATH} className="btn-primary">
              Explore Your Business Needs
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link to="/lead-systems-crm" className="btn-secondary">
              See Lead Systems
            </Link>
          </div>
        </div>

        <div className="reveal flex justify-center lg:justify-end">
          <PipelinePreview />
        </div>
      </div>
    </section>
  );
}
