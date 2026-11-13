import { ArrowRight } from 'lucide-react';
import { ClosingCta } from '@/components/shared/ClosingCta';
import { PageHero } from '@/components/shared/PageHero';
import { PageMeta } from '@/components/shared/PageMeta';
import { ProofCard } from '@/components/shared/ProofCard';
import { TESTIMONIALS } from '@/data/testimonials';
import { ENQUIRE_PATH } from '@/data/navigation';
import { Link } from '@/lib/router';

export function OurWorkPage() {
  return (
    <>
      <PageMeta
        title="Our Work | Ethos Creative Systems"
        description="See the businesses Ethos Creative Systems works with and the results their lead systems, websites and content are delivering."
      />
      <PageHero
        eyebrow="Our work"
        title="Systems built for businesses that want more meetings."
        description="Every project starts with the enquiries a business is losing today. Client stories will appear here as they are approved."
        actions={
          <Link to={ENQUIRE_PATH} className="btn-primary">
            Explore Your Business Needs
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        }
      />
      <section data-reveal className="px-6 pb-24">
        <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-2">
          {TESTIMONIALS.map((testimonial) => (
            <ProofCard key={testimonial.company} testimonial={testimonial} />
          ))}
        </div>
      </section>
      <ClosingCta
        title="Want your business next?"
        body="Tell us where enquiries are slipping and we will show you how the system would close the gap."
        to={ENQUIRE_PATH}
      />
    </>
  );
}
