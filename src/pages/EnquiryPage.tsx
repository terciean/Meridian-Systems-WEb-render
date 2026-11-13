import { PageMeta } from '@/components/shared/PageMeta';
import { QuestionnaireForm } from '@/features/enquiry/QuestionnaireForm';
import { SERVICE_OPTIONS, type Answers } from '@/data/questionnaire';
import { useLocation } from '@/lib/router';

function initialAnswersFromSearch(search: string): Answers {
  const requested = new URLSearchParams(search).get('service');
  const isKnown = SERVICE_OPTIONS.some((option) => option.value === requested);
  return isKnown && requested ? { service: requested } : {};
}

export function EnquiryPage() {
  const { search } = useLocation();

  return (
    <section className="px-6 pb-24 pt-36 md:pt-44">
      <PageMeta
        title="Explore Your Business Needs | Ethos Creative Systems"
        description="A short questionnaire that helps Ethos Creative Systems understand your business and suggest the right starting point."
      />
      <div className="mx-auto mb-14 max-w-3xl space-y-4 text-center">
        <p className="section-label">Explore your business needs</p>
        <h1 className="text-3xl font-bold leading-tight text-ink-50 md:text-5xl">A few quick questions, about five minutes.</h1>
        <p className="mx-auto max-w-xl leading-relaxed text-ink-300">
          Your answers help us understand your business before we speak. Your details are used only to respond to your enquiry.
        </p>
      </div>
      <QuestionnaireForm initialAnswers={initialAnswersFromSearch(search)} />
    </section>
  );
}
