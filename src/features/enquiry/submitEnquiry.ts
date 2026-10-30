import { SERVICE_OPTIONS, QUESTIONNAIRE_STEPS, type Answers, type AnswerValue, type QuestionField } from '@/data/questionnaire';

const CONTACT_KEYS = ['name', 'email', 'phone'];
const ENQUIRY_ENDPOINT = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-enquiry`;

function text(answers: Answers, key: string): string {
  const value: AnswerValue | undefined = answers[key];
  return typeof value === 'string' ? value.trim() : '';
}

function optionLabel(field: QuestionField, value: string): string {
  return field.options?.find((option) => option.value === value)?.label ?? value;
}

function answerText(field: QuestionField, value: AnswerValue | undefined): string {
  if (Array.isArray(value)) {
    return value.map((item) => optionLabel(field, item)).join(', ');
  }
  if (!value) return '';
  return field.kind === 'choice' ? optionLabel(field, value) : value.trim();
}

function buildFlow(answers: Answers) {
  return QUESTIONNAIRE_STEPS.flatMap((step) => step.fields)
    .filter((field) => !CONTACT_KEYS.includes(field.key))
    .map((field) => ({ question: field.label, answer: answerText(field, answers[field.key]) }))
    .filter((item) => item.answer.length > 0);
}

export async function submitEnquiry(answers: Answers): Promise<void> {
  const service = SERVICE_OPTIONS.find((option) => option.value === text(answers, 'service'))?.label ?? 'Not specified';
  const phone = text(answers, 'phone');
  const business = text(answers, 'business');

  const response = await fetch(ENQUIRY_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Apikey: import.meta.env.VITE_SUPABASE_ANON_KEY,
      Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
    },
    body: JSON.stringify({
      service,
      name: text(answers, 'name'),
      email: text(answers, 'email'),
      phone,
      business,
      flow: buildFlow(answers),
      website: text(answers, 'website'),
    }),
  });

  const result: unknown = await response.json().catch(() => null);
  const ok = response.ok && typeof result === 'object' && result !== null && (result as { ok?: unknown }).ok === true;

  if (!ok) {
    const message = typeof result === 'object' && result !== null ? (result as { error?: unknown }).error : undefined;
    throw new Error(typeof message === 'string' ? message : 'We could not send your enquiry.');
  }
}
