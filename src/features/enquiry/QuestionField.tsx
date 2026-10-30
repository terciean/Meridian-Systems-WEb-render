import { Check } from 'lucide-react';
import type { AnswerValue, QuestionField as QuestionFieldConfig } from '@/data/questionnaire';

interface QuestionFieldProps {
  field: QuestionFieldConfig;
  value: AnswerValue | undefined;
  error?: string;
  onChange: (value: AnswerValue) => void;
}

const INPUT_CLASS =
  'w-full rounded-xl border bg-ink-950/80 px-4 py-3.5 text-base text-ink-50 placeholder:text-ink-500 transition duration-200 focus:border-teal-300 focus:shadow-glow-teal focus:outline-none';

function inputBorder(error?: string) {
  return error ? 'border-ember-300/70' : 'border-ink-600';
}

export function QuestionField({ field, value, error, onChange }: QuestionFieldProps) {
  const errorId = `${field.key}-error`;

  if (field.kind === 'choice' || field.kind === 'multi') {
    const selected = Array.isArray(value) ? value : value ? [value] : [];
    const isMulti = field.kind === 'multi';

    const toggle = (optionValue: string) => {
      if (!isMulti) {
        onChange(optionValue);
        return;
      }
      const next = selected.includes(optionValue)
        ? selected.filter((item) => item !== optionValue)
        : [...selected, optionValue];
      onChange(next);
    };

    return (
      <fieldset className="space-y-4">
        <legend className="mb-4 text-sm font-semibold text-ink-200">{field.label}</legend>
        <div className="grid gap-3 sm:grid-cols-2" role={isMulti ? undefined : 'radiogroup'} aria-label={field.label}>
          {field.options?.map((option) => {
            const isSelected = selected.includes(option.value);
            return (
              <button
                key={option.value}
                type="button"
                role={isMulti ? undefined : 'radio'}
                aria-checked={isMulti ? undefined : isSelected}
                aria-pressed={isMulti ? isSelected : undefined}
                onClick={() => toggle(option.value)}
                className={`group flex items-center justify-between gap-4 rounded-xl border px-5 py-4 text-left text-sm font-medium transition duration-200 ${
                  isSelected
                    ? 'border-teal-300 bg-teal-500/15 text-ink-50 shadow-glow-teal'
                    : 'border-ink-600 bg-ink-950/60 text-ink-200 hover:border-teal-400/60 hover:text-ink-50'
                }`}
              >
                {option.label}
                <span
                  className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition duration-200 ${
                    isSelected ? 'border-teal-300 bg-teal-300 text-ink-950' : 'border-ink-500 text-transparent'
                  } ${isMulti ? 'rounded-md' : ''}`}
                  aria-hidden="true"
                >
                  <Check className="h-3.5 w-3.5" />
                </span>
              </button>
            );
          })}
        </div>
        {error && (
          <p id={errorId} role="alert" className="text-sm text-ember-100">
            {error}
          </p>
        )}
      </fieldset>
    );
  }

  const stringValue = typeof value === 'string' ? value : '';
  const inputId = `field-${field.key}`;

  return (
    <div className="space-y-2">
      <label htmlFor={inputId} className="block text-sm font-semibold text-ink-200">
        {field.label}
      </label>
      {field.kind === 'textarea' ? (
        <textarea
          id={inputId}
          rows={4}
          maxLength={field.maxLength}
          placeholder={field.placeholder}
          value={stringValue}
          onChange={(event) => onChange(event.target.value)}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
          className={`${INPUT_CLASS} ${inputBorder(error)} resize-none`}
        />
      ) : (
        <input
          id={inputId}
          type={field.kind === 'text' ? 'text' : field.kind}
          autoComplete={field.kind === 'email' ? 'email' : field.kind === 'tel' ? 'tel' : field.key === 'name' ? 'name' : 'off'}
          maxLength={field.maxLength}
          placeholder={field.placeholder}
          value={stringValue}
          onChange={(event) => onChange(event.target.value)}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
          className={`${INPUT_CLASS} ${inputBorder(error)}`}
        />
      )}
      {error && (
        <p id={errorId} role="alert" className="text-sm text-ember-100">
          {error}
        </p>
      )}
    </div>
  );
}
