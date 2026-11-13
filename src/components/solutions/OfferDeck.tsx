import { useRef, useState, type ReactNode } from 'react';
import { ArrowLeft, ArrowRight, Check, Clock, ShieldCheck } from 'lucide-react';
import { Link } from '@/lib/router';
import { trackEvent } from '@/lib/analytics';
import type { Solution } from '@/data/solutions';

function Panel({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="w-full shrink-0 snap-center px-1" role="group" aria-label={label}>
      <div className="panel mx-auto flex min-h-[22rem] max-w-3xl flex-col justify-center gap-6 p-8 md:min-h-[26rem] md:p-12">
        {children}
      </div>
    </div>
  );
}

export function OfferDeck({ solution, enquireHref }: { solution: Solution; enquireHref: string }) {
  const { offer } = solution;
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const panelCount = 4 + (offer.guarantee ? 1 : 0) + 1;

  const goTo = (index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const clamped = Math.max(0, Math.min(panelCount - 1, index));
    track.scrollTo({ left: clamped * track.clientWidth, behavior: 'smooth' });
    setActiveIndex(clamped);
    trackEvent('offer_deck_panel_view', { service: solution.slug, panel: clamped });
  };

  const handleScroll = () => {
    const track = trackRef.current;
    if (!track || track.clientWidth === 0) return;
    const index = Math.round(track.scrollLeft / track.clientWidth);
    if (index !== activeIndex) setActiveIndex(index);
  };

  let panelIndex = 0;
  const openerIndex = panelIndex++;
  const outcomeIndex = panelIndex++;
  const mechanismIndex = panelIndex++;
  const investmentIndex = panelIndex++;
  const guaranteeIndex = offer.guarantee ? panelIndex++ : -1;
  const closerIndex = panelIndex++;

  return (
    <section data-reveal className="px-6 pb-16 pt-40 md:pt-48">
      <div className="mx-auto mb-8 max-w-3xl space-y-4 text-center">
        <span className="section-label">{solution.eyebrow}</span>
        <h1 className="text-3xl font-bold leading-tight text-ink-50 md:text-5xl">{offer.mechanismName}</h1>
      </div>

      <div
        ref={trackRef}
        onScroll={handleScroll}
        className="flex snap-x snap-mandatory items-start overflow-x-auto scroll-smooth pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        <Panel label="The problem">
          <p className="section-label">The problem</p>
          <p className="text-2xl font-semibold leading-snug text-ink-50 md:text-3xl">{offer.painPoint}</p>
        </Panel>

        <Panel label="What changes">
          <p className="section-label">What changes</p>
          <p className="text-2xl font-semibold leading-snug text-ink-50 md:text-3xl">{offer.dreamOutcome}</p>
        </Panel>

        <Panel label="How it works">
          <p className="section-label">How it works — {offer.mechanismName}</p>
          <p className="leading-relaxed text-ink-200">{offer.mechanismBody}</p>
          <ul className="space-y-4">
            {offer.valueStack.map((item) => (
              <li key={item.label} className="flex items-start justify-between gap-4 rounded-xl border border-ink-700 bg-ink-950/60 p-4">
                <div className="flex items-start gap-3">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-teal-300" aria-hidden="true" />
                  <div>
                    <p className="font-semibold text-ink-50">{item.label}</p>
                    <p className="text-sm leading-relaxed text-ink-300">{item.body}</p>
                  </div>
                </div>
                {item.value && <span className="shrink-0 whitespace-nowrap text-sm font-semibold text-teal-200">{item.value}</span>}
              </li>
            ))}
          </ul>
        </Panel>

        <Panel label="Investment">
          <p className="section-label">Investment</p>
          <ul className="space-y-3">
            {offer.investmentLines.map((line) => (
              <li key={line.label} className="flex flex-col gap-1 rounded-xl border border-ink-700 bg-ink-950/60 p-4 sm:flex-row sm:items-center sm:justify-between">
                <span className="font-semibold text-ink-50">{line.label}</span>
                <span className="text-sm font-semibold text-teal-200">{line.price}</span>
              </li>
            ))}
          </ul>
          {offer.stackedValueNote && <p className="text-sm leading-relaxed text-ink-300">{offer.stackedValueNote}</p>}
        </Panel>

        {offer.guarantee && (
          <Panel label="Our guarantee">
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl border border-teal-400/40 bg-teal-500/10 text-teal-200">
              <ShieldCheck className="h-7 w-7" aria-hidden="true" />
            </span>
            <p className="section-label">Our guarantee</p>
            <p className="text-xl font-semibold leading-snug text-ink-50">{offer.guarantee}</p>
          </Panel>
        )}

        <Panel label="Next step">
          {offer.urgencyNote && (
            <p className="flex items-center gap-2 text-sm font-semibold text-teal-200">
              <Clock className="h-4 w-4" aria-hidden="true" />
              {offer.urgencyNote}
            </p>
          )}
          <p className="text-xl font-semibold leading-snug text-ink-50">{offer.closerCta}</p>
          <Link to={enquireHref} className="btn-primary self-start">
            Explore Your Business Needs
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </Panel>
      </div>

      <div className="mx-auto mt-6 flex max-w-3xl items-center justify-between">
        <button
          type="button"
          onClick={() => goTo(activeIndex - 1)}
          disabled={activeIndex === 0}
          aria-label="Previous"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-ink-600 text-ink-200 transition hover:border-teal-400/60 hover:text-ink-50 disabled:cursor-not-allowed disabled:opacity-30"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        </button>

        <div className="flex items-center gap-2" role="tablist" aria-label="Offer sections">
          {Array.from({ length: panelCount }).map((_, index) => (
            <button
              key={index}
              type="button"
              role="tab"
              aria-selected={index === activeIndex}
              aria-label={
                index === openerIndex
                  ? 'The problem'
                  : index === outcomeIndex
                  ? 'What changes'
                  : index === mechanismIndex
                  ? 'How it works'
                  : index === investmentIndex
                  ? 'Investment'
                  : index === guaranteeIndex
                  ? 'Our guarantee'
                  : index === closerIndex
                  ? 'Next step'
                  : `Section ${index + 1}`
              }
              onClick={() => goTo(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === activeIndex ? 'w-6 bg-teal-400' : 'w-2 bg-ink-600 hover:bg-ink-500'
              }`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={() => goTo(activeIndex + 1)}
          disabled={activeIndex === panelCount - 1}
          aria-label="Next"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-ink-600 text-ink-200 transition hover:border-teal-400/60 hover:text-ink-50 disabled:cursor-not-allowed disabled:opacity-30"
        >
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </section>
  );
}
