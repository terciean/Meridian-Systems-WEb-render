import { useState, type FormEvent } from 'react';
import { ArrowLeft, ArrowRight, Loader2, Send } from 'lucide-react';
import { EnquiryConfirmation } from '@/features/enquiry/EnquiryConfirmation';
import { QuestionField } from '@/features/enquiry/QuestionField';
import { submitEnquiry } from '@/features/enquiry/submitEnquiry';
import { QUESTIONNAIRE_STEPS, validateStep, type Answers } from '@/data/questionnaire';

type SubmitStatus = 'idle' | 'submitting' | 'error' | 'sent';

export function QuestionnaireForm({ initialAnswers }: { initialAnswers: Answers }) {
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>(initialAnswers);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<SubmitStatus>('idle');

  const step = QUESTIONNAIRE_STEPS[stepIndex];
  const isLast = stepIndex === QUESTIONNAIRE_STEPS.length - 1;
  const progress = ((stepIndex + 1) / QUESTIONNAIRE_STEPS.length) * 100;

  if (status === 'sent') {
    return <EnquiryConfirmation name={typeof answers.name === 'string' ? answers.name : ''} />;
  }

  const updateAnswer = (key: string, value: Answers[string]) => {
    setAnswers((previous) => ({ ...previous, [key]: value }));
    setErrors({});
  };

  const goBack = () => {
    setErrors({});
    setStatus('idle');
    setStepIndex((index) => Math.max(0, index - 1));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === 'submitting') return;

    const stepErrors = validateStep(step, answers);
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      return;
    }

    if (!isLast) {
      setErrors({});
      setStepIndex((index) => index + 1);
      return;
    }

    setStatus('submitting');
    try {
      await submitEnquiry(answers);
      setStatus('sent');
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <div className="space-y-4">
        <div className="flex items-center justify-between text-sm">
          <span className="font-semibold text-teal-200">
            Step {stepIndex + 1} of {QUESTIONNAIRE_STEPS.length}
          </span>
          <span className="text-ink-400">{Math.round(progress)}% complete</span>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-ink-800" role="progressbar" aria-valuemin={1} aria-valuemax={QUESTIONNAIRE_STEPS.length} aria-valuenow={stepIndex + 1}>
          <div
            className="h-full rounded-full bg-gradient-to-r from-teal-400 to-teal-200 shadow-glow-teal transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <form onSubmit={handleSubmit} noValidate className="panel space-y-10 p-8 md:p-12">
        <div key={stepIndex} className="reveal space-y-3">
          <h2 className="text-2xl font-bold text-ink-50 md:text-3xl">{step.title}</h2>
          <p className="leading-relaxed text-ink-300">{step.description}</p>
        </div>

        <div key={`fields-${stepIndex}`} className="reveal space-y-8">
          {step.fields.map((field) => (
            <QuestionField
              key={field.key}
              field={field}
              value={answers[field.key]}
              error={errors[field.key]}
              onChange={(value) => updateAnswer(field.key, value)}
            />
          ))}
        </div>

        {isLast && (
          <div className="absolute -left-[9999px] h-0 overflow-hidden" aria-hidden="true">
            <label>
              Leave this field empty
              <input
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={typeof answers.website === 'string' ? answers.website : ''}
                onChange={(event) => updateAnswer('website', event.target.value)}
              />
            </label>
          </div>
        )}

        {status === 'error' && (
          <div role="alert" className="rounded-xl border border-ember-300/50 bg-ember-500/15 p-4 text-sm text-ember-100">
            We could not send your enquiry just now. Please check your connection and try again. Your answers have been kept.
          </div>
        )}

        <div className="flex items-center justify-between gap-4 border-t border-ink-700 pt-8">
          <button
            type="button"
            onClick={goBack}
            disabled={stepIndex === 0 || status === 'submitting'}
            className="inline-flex items-center gap-2 rounded-full px-4 py-3 text-sm font-semibold text-ink-300 transition hover:text-ink-50 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Back
          </button>

          <button type="submit" disabled={status === 'submitting'} className="btn-primary min-w-[10rem] disabled:cursor-wait disabled:opacity-70">
            {status === 'submitting' ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                Sending
              </>
            ) : isLast ? (
              <>
                <Send className="h-4 w-4" aria-hidden="true" />
                Send enquiry
              </>
            ) : (
              <>
                Continue
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
