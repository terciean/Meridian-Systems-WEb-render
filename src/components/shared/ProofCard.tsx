import { Quote } from 'lucide-react';
import type { Testimonial } from '@/data/testimonials';

interface ProofCardProps {
  testimonial: Testimonial;
}

export function ProofCard({ testimonial }: ProofCardProps) {
  return (
    <figure className="panel flex h-full flex-col justify-between gap-8 p-8 md:p-10">
      <div className="space-y-6">
        <Quote className="h-8 w-8 text-teal-400/60" aria-hidden="true" />
        <blockquote className="text-base leading-relaxed text-ink-200">&ldquo;{testimonial.quote}&rdquo;</blockquote>
      </div>
      <figcaption className="flex items-center gap-4 border-t border-ink-700 pt-5">
        {testimonial.logoSrc ? (
          <img
            src={testimonial.logoSrc}
            alt={`${testimonial.company} logo`}
            width={48}
            height={48}
            loading="lazy"
            className="h-12 w-12 shrink-0 rounded-xl border border-ink-700 object-cover"
          />
        ) : (
          <span
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-teal-400/40 bg-teal-500/10 font-display text-lg font-semibold text-teal-200"
            aria-hidden="true"
          >
            {testimonial.company.charAt(0)}
          </span>
        )}
        <span className="flex flex-col">
          <span className="text-sm font-semibold text-ink-100">{testimonial.company}</span>
          <span className="text-xs text-ink-400">Verified client</span>
        </span>
      </figcaption>
    </figure>
  );
}
