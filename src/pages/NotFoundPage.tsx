import { ArrowRight } from 'lucide-react';
import { Link } from '@/lib/router';
import { useDocumentMeta } from '@/lib/useDocumentMeta';

export function NotFoundPage() {
  useDocumentMeta({
    title: 'Page not found | Meridian Systems',
    description: 'The page you were looking for could not be found.',
  });

  return (
    <section className="flex min-h-[70vh] flex-col items-center justify-center px-6 pb-24 pt-40 text-center">
      <p className="section-label">Error 404</p>
      <h1 className="mt-6 text-4xl font-bold text-ink-50 md:text-5xl">This page has moved or does not exist.</h1>
      <p className="mt-4 max-w-md text-ink-300">Head back to the homepage to explore the solutions Meridian Systems offers.</p>
      <Link to="/" className="btn-primary mt-10">
        Back to the homepage
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </Link>
    </section>
  );
}
