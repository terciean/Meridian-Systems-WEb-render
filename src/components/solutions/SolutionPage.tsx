import { ArrowRight, Zap } from 'lucide-react';
import { Link } from '@/lib/router';
import { ClosingCta } from '@/components/shared/ClosingCta';
import { ENQUIRE_PATH } from '@/data/navigation';
import { SOLUTION_LIST, type Solution } from '@/data/solutions';
import { useDocumentMeta } from '@/lib/useDocumentMeta';
import { MeetingBookingSection } from '@/components/solutions/MeetingBookingSection';
import { LeadSegmentsSection } from '@/components/solutions/LeadSegmentsSection';
import { FaqSection } from '@/components/shared/FaqSection';

function enquireLink(slug: string) {
  return `${ENQUIRE_PATH}?service=${slug}`;
}

export function SolutionPage({ solution }: { solution: Solution }) {
  useDocumentMeta({ title: solution.title, description: solution.description });

  const relatedSolutions = SOLUTION_LIST.filter((item) => item.slug !== solution.slug);

  return (
    <div>
      <section className="relative overflow-hidden px-6 pb-24 pt-40 md:pt-48">
        <div className="relative mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-8">
            <span className="reveal inline-flex items-center gap-2 rounded-full border border-teal-400/30 bg-teal-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-teal-200">
              {solution.eyebrow}
            </span>
            <h1 className="reveal text-4xl font-bold leading-[1.12] text-ink-50 md:text-5xl lg:text-6xl">{solution.headline}</h1>
            <p className="reveal max-w-xl text-lg leading-relaxed text-ink-300">{solution.intro}</p>
            <div className="reveal flex flex-wrap items-center gap-4">
              <Link to={enquireLink(solution.slug)} className="btn-primary">
                Explore Your Business Needs
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <a href="#features" className="btn-secondary">
                See what is included
              </a>
            </div>
          </div>

          <div className="reveal relative hidden lg:block" aria-hidden="true">
            <div className="panel relative space-y-5 p-8 shadow-glow-teal">
              {solution.features.map((feature, index) => (
                <div key={feature.title} className="flex items-center gap-4 rounded-xl border border-ink-700 bg-ink-950/60 p-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-teal-400/50 text-sm font-semibold text-teal-200">
                    {index + 1}
                  </span>
                  <span className="text-sm font-semibold text-ink-100">{feature.title}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="features" data-reveal className="scroll-mt-24 px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 max-w-2xl space-y-4">
            <p className="section-label">What is included</p>
            <h2 className="text-3xl font-bold text-ink-50 md:text-4xl">Built to work as one connected system.</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {solution.features.map((feature, index) => (
              <article key={feature.title} className="panel-interactive p-8">
                <span className="font-display text-sm font-semibold text-teal-300">0{index + 1}</span>
                <h3 className="mt-6 text-xl font-semibold text-ink-50">{feature.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-ink-300">{feature.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {solution.automations && (
        <section data-reveal className="px-6 pb-24">
          <div className="mx-auto grid max-w-7xl items-center gap-10 rounded-3xl border border-ember-300/25 bg-ink-900/70 p-10 md:grid-cols-[auto_1fr] md:p-14">
            <span className="flex h-16 w-16 items-center justify-center rounded-2xl border border-ember-300/40 bg-ember-500/15 text-ember-100">
              <Zap className="h-7 w-7" aria-hidden="true" />
            </span>
            <div className="space-y-3">
              <p className="section-label">Supporting capability</p>
              <h2 className="text-2xl font-bold text-ink-50 md:text-3xl">{solution.automations.title}</h2>
              <p className="max-w-3xl leading-relaxed text-ink-300">{solution.automations.body}</p>
            </div>
          </div>
        </section>
      )}

      {solution.leadSegments && <LeadSegmentsSection />}

      {solution.meetingBooking && <MeetingBookingSection />}

      {solution.faqs && <FaqSection items={solution.faqs} />}

      <ClosingCta
        title="Ready to see how this fits your business?"
        body="Answer a short questionnaire and we will come back to you with a clear plan."
        to={enquireLink(solution.slug)}
      />

      <section data-reveal className="border-t border-ink-800 px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <p className="section-label mb-6">Also part of Meridian Systems</p>
          <div className="grid gap-4 md:grid-cols-3">
            {relatedSolutions.map((item) => (
              <Link key={item.slug} to={item.path} className="panel-interactive flex items-center justify-between p-6">
                <span className="font-semibold text-ink-100">{item.pathwayLabel}</span>
                <ArrowRight className="h-4 w-4 text-teal-300" aria-hidden="true" />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
