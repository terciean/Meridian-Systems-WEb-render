import { CheckCircle2, MessageCircle } from 'lucide-react';
import { Link } from '@/lib/router';
import { CONTACT } from '@/data/contact';

export function EnquiryConfirmation({ name }: { name: string }) {
  const firstName = name.trim().split(/\s+/)[0];

  return (
    <div className="panel mx-auto max-w-2xl space-y-8 p-10 text-center md:p-14">
      <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-success-500/50 bg-success-500/15 text-success-500 shadow-[0_0_30px_-6px_rgba(79,178,134,0.7)]">
        <CheckCircle2 className="h-8 w-8" aria-hidden="true" />
      </span>
      <div className="space-y-3">
        <h2 className="text-3xl font-bold text-ink-50">Thank you{firstName ? `, ${firstName}` : ''}.</h2>
        <p className="leading-relaxed text-ink-300">
          Your answers have been received. We will review them and come back to you with a clear next step.
        </p>
      </div>
      <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
        <a href={CONTACT.whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn-secondary">
          <MessageCircle className="h-4 w-4" aria-hidden="true" />
          Message on WhatsApp
        </a>
        <Link to="/" className="text-sm font-semibold text-teal-200 transition hover:text-teal-100">
          Back to the homepage
        </Link>
      </div>
    </div>
  );
}
