export type AnswerValue = string | string[];
export type Answers = Record<string, AnswerValue>;

export interface ChoiceOption {
  value: string;
  label: string;
}

export interface QuestionField {
  key: string;
  label: string;
  kind: 'choice' | 'multi' | 'text' | 'email' | 'tel' | 'textarea';
  options?: ChoiceOption[];
  required?: boolean;
  placeholder?: string;
  maxLength: number;
}

export interface QuestionStep {
  title: string;
  description: string;
  fields: QuestionField[];
}

export const SERVICE_OPTIONS: ChoiceOption[] = [
  { value: 'lead-systems-crm', label: 'Lead Systems & CRM' },
  { value: 'website-design-seo', label: 'Website Design & SEO' },
  { value: 'stock-systems', label: 'Stock Systems' },
  { value: 'content-video', label: 'Content & Video' },
  { value: 'not-sure', label: 'Not sure yet' },
];

export const QUESTIONNAIRE_STEPS: QuestionStep[] = [
  {
    title: 'What would you like help with?',
    description: 'Choose the area that matches your need most closely. You can change this later.',
    fields: [{ key: 'service', label: 'Main focus', kind: 'choice', options: SERVICE_OPTIONS, required: true, maxLength: 60 }],
  },
  {
    title: 'Tell us about your business',
    description: 'A few details help us understand your market before we speak.',
    fields: [
      { key: 'business', label: 'Business name', kind: 'text', required: true, placeholder: 'Your business name', maxLength: 160 },
      {
        key: 'industry',
        label: 'What best describes your industry?',
        kind: 'choice',
        required: true,
        maxLength: 60,
        options: [
          { value: 'professional-services', label: 'Professional services' },
          { value: 'retail-ecommerce', label: 'Retail and e-commerce' },
          { value: 'property', label: 'Property' },
          { value: 'health-wellness', label: 'Health and wellness' },
          { value: 'hospitality', label: 'Hospitality' },
          { value: 'other', label: 'Something else' },
        ],
      },
    ],
  },
  {
    title: 'What is holding you back?',
    description: 'Pick the challenge that feels most urgent right now.',
    fields: [
      {
        key: 'challenge',
        label: 'Biggest challenge today',
        kind: 'choice',
        required: true,
        maxLength: 60,
        options: [
          { value: 'not-enough-enquiries', label: 'Not enough enquiries' },
          { value: 'slow-follow-up', label: 'Enquiries are slow to follow up' },
          { value: 'no-customer-view', label: 'No clear view of customers' },
          { value: 'website-not-converting', label: 'My website does not convert' },
          { value: 'stock-hard-to-track', label: 'Stock is hard to track' },
          { value: 'content-takes-time', label: 'Content takes too much time' },
        ],
      },
    ],
  },
  {
    title: 'How many enquiries do you get?',
    description: 'A rough monthly figure is enough.',
    fields: [
      {
        key: 'monthlyEnquiries',
        label: 'Enquiries per month',
        kind: 'choice',
        required: true,
        maxLength: 60,
        options: [
          { value: 'under-20', label: 'Fewer than 20' },
          { value: '20-50', label: '20 to 50' },
          { value: '50-150', label: '50 to 150' },
          { value: 'over-150', label: 'More than 150' },
          { value: 'not-tracked', label: 'Not tracked yet' },
        ],
      },
    ],
  },
  {
    title: 'What do you use today?',
    description: 'Select everything that applies. This shows us what we can build on.',
    fields: [
      {
        key: 'tools',
        label: 'Current tools',
        kind: 'multi',
        required: true,
        maxLength: 60,
        options: [
          { value: 'spreadsheets', label: 'Spreadsheets' },
          { value: 'whatsapp', label: 'WhatsApp' },
          { value: 'email', label: 'Email inbox' },
          { value: 'existing-crm', label: 'An existing CRM' },
          { value: 'social-media', label: 'Social media platforms' },
          { value: 'none', label: 'Nothing yet' },
        ],
      },
    ],
  },
  {
    title: 'When would you like to start?',
    description: 'This helps us plan our availability.',
    fields: [
      {
        key: 'timeline',
        label: 'Start timing',
        kind: 'choice',
        required: true,
        maxLength: 60,
        options: [
          { value: 'asap', label: 'As soon as possible' },
          { value: 'one-month', label: 'Within one month' },
          { value: 'one-to-three', label: 'In one to three months' },
          { value: 'exploring', label: 'Just exploring' },
        ],
      },
    ],
  },
  {
    title: 'How should we reach you?',
    description: 'We will only use these details to respond to your enquiry.',
    fields: [
      { key: 'name', label: 'Your name', kind: 'text', required: true, placeholder: 'Full name', maxLength: 120 },
      { key: 'email', label: 'Email address', kind: 'email', required: true, placeholder: 'you@example.com', maxLength: 254 },
      { key: 'phone', label: 'Phone number (optional)', kind: 'tel', placeholder: 'Include your country code', maxLength: 40 },
      {
        key: 'message',
        label: 'Anything else we should know? (optional)',
        kind: 'textarea',
        placeholder: 'A sentence or two is plenty.',
        maxLength: 1000,
      },
    ],
  },
];

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^[+\d\s()-]{7,}$/;

export function validateStep(step: QuestionStep, answers: Answers): Record<string, string> {
  const errors: Record<string, string> = {};

  for (const field of step.fields) {
    const raw = answers[field.key] ?? '';

    if (Array.isArray(raw)) {
      if (field.required && raw.length === 0) {
        errors[field.key] = 'Please complete this question to continue.';
      }
      continue;
    }

    const value = raw.trim();
    if (field.required && value.length === 0) {
      errors[field.key] = 'Please complete this question to continue.';
    } else if (field.kind === 'email' && value && !EMAIL_PATTERN.test(value)) {
      errors[field.key] = 'Please enter an email address in the format name@example.com.';
    } else if (field.kind === 'tel' && value && !PHONE_PATTERN.test(value)) {
      errors[field.key] = 'Please enter a phone number, including your country code if you have one.';
    }
  }

  return errors;
}
