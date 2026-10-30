import { ArrowRight } from 'lucide-react';
import { Link } from '@/lib/router';

interface ClosingCtaProps {
  title: string;
  body: string;
  to: string;
}

export function ClosingCta({ title, body, to }: ClosingCtaProps) {
  return (
    <section data-reveal className="px-6 pb-24">
      <div className="mx-auto max-w-7xl rounded-3xl border border-ink-700 bg-ink-900 p-10 text-center md:p-16">
        <h2 className="mx-auto max-w-2xl text-3xl font-bold text-ink-50 md:text-4xl">{title}</h2>
        <p className="mx-auto mt-4 max-w-xl text-ink-300">{body}</p>
        <div className="mt-8 flex justify-center">
          <Link to={to} className="btn-primary">
            Explore Your Business Needs
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
