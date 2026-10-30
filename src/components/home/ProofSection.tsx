import { ProofCard } from '@/components/shared/ProofCard';
import { TESTIMONIALS } from '@/data/testimonials';

export function ProofSection() {
  return (
    <section data-reveal className="px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 max-w-2xl space-y-4">
          <p className="section-label">Client voices</p>
          <h2 className="text-3xl font-bold text-ink-50 md:text-4xl">Words from the businesses we work with.</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {TESTIMONIALS.map((testimonial) => (
            <ProofCard key={testimonial.company} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
}
