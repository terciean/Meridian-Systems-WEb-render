import { MessageCircle, Phone } from 'lucide-react';
import { ClosingCta } from '@/components/shared/ClosingCta';
import { PageHero } from '@/components/shared/PageHero';
import { PageMeta } from '@/components/shared/PageMeta';
import { CONTACT } from '@/data/contact';
import { ENQUIRE_PATH } from '@/data/navigation';
import { Link } from '@/lib/router';

export function ContactPage() {
  return (
    <>
      <PageMeta
        title="Contact | Meridian Systems"
        description="Get in touch with Meridian Systems on WhatsApp or through a short questionnaire about your business."
      />
      <PageHero
        eyebrow="Contact"
        title="Speak to us directly."
        description="The quickest way to reach us is WhatsApp. If you would rather share your business details first, the questionnaire takes a few minutes."
      />
      <section data-reveal className="px-6 pb-24">
        <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-2">
          <a
            href={CONTACT.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="panel-interactive group flex flex-col gap-6 p-10"
          >
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl border border-teal-400/40 bg-teal-500/10 text-teal-200">
              <MessageCircle className="h-6 w-6" aria-hidden="true" />
            </span>
            <div className="space-y-3">
              <h2 className="text-2xl font-semibold text-ink-50">Message us on WhatsApp</h2>
              <p className="text-sm leading-relaxed text-ink-300">Send a message any time and we will get back to you as soon as we can.</p>
            </div>
            <span className="mt-auto flex items-center gap-2 text-lg font-semibold text-teal-200 transition group-hover:text-teal-100">
              <Phone className="h-4 w-4" aria-hidden="true" />
              {CONTACT.phoneDisplay}
            </span>
          </a>

          <div className="panel flex flex-col gap-6 p-10">
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl border border-ember-300/40 bg-ember-500/15 text-ember-100">
              <Phone className="h-6 w-6" aria-hidden="true" />
            </span>
            <div className="space-y-3">
              <h2 className="text-2xl font-semibold text-ink-50">Prefer a considered reply?</h2>
              <p className="text-sm leading-relaxed text-ink-300">
                Share your business details through the questionnaire and we will respond with a plan tailored to what you need.
              </p>
            </div>
            <Link to={ENQUIRE_PATH} className="btn-secondary mt-auto self-start">
              Start the questionnaire
            </Link>
          </div>
        </div>
      </section>
      <ClosingCta
        title="Not sure where to begin?"
        body="Answer seven quick questions and we will suggest the right starting point."
        to={ENQUIRE_PATH}
      />
    </>
  );
}
