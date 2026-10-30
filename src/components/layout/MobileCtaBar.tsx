import { ArrowRight } from 'lucide-react';
import { ENQUIRE_PATH } from '@/data/navigation';
import { Link, useLocation } from '@/lib/router';

export function MobileCtaBar() {
  const { pathname } = useLocation();
  if (pathname === ENQUIRE_PATH) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-ink-700/80 bg-ink-950/95 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-md md:hidden">
      <Link to={ENQUIRE_PATH} className="btn-primary w-full">
        Explore Your Business Needs
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </Link>
    </div>
  );
}
