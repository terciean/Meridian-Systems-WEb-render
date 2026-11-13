import { ArrowRight } from 'lucide-react';
import { Link } from '@/lib/router';
import { ClosingCta } from '@/components/shared/ClosingCta';
import { ENQUIRE_PATH } from '@/data/navigation';
import { PageMeta } from '@/components/shared/PageMeta';
import { SOLUTION_LIST, type Solution } from '@/data/solutions';
import { MeetingBookingSection } from '@/components/solutions/MeetingBookingSection';
import { LeadSegmentsSection } from '@/components/solutions/LeadSegmentsSection';
import { FaqSection } from '@/components/shared/FaqSection';
import { OfferDeck } from '@/components/solutions/OfferDeck';
import { SITE_ORIGIN } from '@/lib/site';

function enquireLink(slug: string) {
  return `${ENQUIRE_PATH}?service=${slug}`;
}

export function SolutionPage({ solution }: { solution: Solution }) {
  const relatedSolutions = SOLUTION_LIST.filter((item) => item.slug !== solution.slug);

  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        name: solution.pathwayLabel,
        description: solution.description,
        url: `${SITE_ORIGIN}${solution.path}`,
        provider: { '@type': 'Organization', name: 'Ethos Creative Systems' },
        areaServed: { '@type': 'Country', name: 'South Africa' },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_ORIGIN}/` },
          { '@type': 'ListItem', position: 2, name: solution.pathwayLabel, item: `${SITE_ORIGIN}${solution.path}` },
        ],
      },
    ],
  };

  return (
    <div>
      <PageMeta title={solution.title} description={solution.description} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      <OfferDeck solution={solution} enquireHref={enquireLink(solution.slug)} />

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
          <p className="section-label mb-6">Also part of Ethos Creative Systems</p>
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
