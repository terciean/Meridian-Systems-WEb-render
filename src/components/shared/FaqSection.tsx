import { ChevronDown } from 'lucide-react';
import type { FaqItem } from '@/data/solutions';

export function FaqSection({ items }: { items: FaqItem[] }) {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  };

  return (
    <section data-reveal className="px-6 pb-24">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="space-y-4">
          <p className="section-label">Common questions</p>
          <h2 className="text-3xl font-bold text-ink-50 md:text-4xl">Answers before you enquire.</h2>
        </div>
        <div className="divide-y divide-ink-800 border-y border-ink-800">
          {items.map((item) => (
            <details key={item.question} className="group py-6">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-left text-lg font-semibold text-ink-50 transition hover:text-teal-200">
                {item.question}
                <ChevronDown className="h-5 w-5 shrink-0 text-teal-300 transition duration-300 group-open:rotate-180" aria-hidden="true" />
              </summary>
              <p className="mt-4 max-w-2xl leading-relaxed text-ink-300">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
