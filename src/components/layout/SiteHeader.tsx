import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from '@/lib/router';
import { ENQUIRE_PATH, NAV_ITEMS } from '@/data/navigation';
import { BrandMark } from '@/components/layout/BrandMark';

export function SiteHeader() {
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition duration-300 ${
        scrolled || menuOpen ? 'border-b border-ink-700/70 bg-ink-950/90 backdrop-blur-md' : 'border-b border-transparent bg-transparent'
      }`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-6 px-6">
        <BrandMark />

        <nav aria-label="Main" className="hidden items-center gap-1 xl:flex">
          {NAV_ITEMS.map((item) => {
            const active = pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                aria-current={active ? 'page' : undefined}
                className={`whitespace-nowrap rounded-full px-3 py-2 text-sm transition duration-200 hover:text-teal-200 ${
                  active ? 'text-teal-200' : 'text-ink-200'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <Link to={ENQUIRE_PATH} className="btn-primary hidden px-5 py-2.5 md:inline-flex">
            Explore Your Business Needs
          </Link>
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-ink-600 text-ink-100 transition hover:border-teal-400 hover:text-teal-200 xl:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            {menuOpen ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav id="mobile-menu" aria-label="Mobile" className="border-t border-ink-800 bg-ink-950 px-6 pb-8 pt-4 xl:hidden">
          <ul className="flex flex-col gap-1">
            {NAV_ITEMS.map((item) => (
              <li key={item.to}>
                <Link to={item.to} className="block rounded-xl px-4 py-3 text-base text-ink-100 transition hover:bg-ink-800 hover:text-teal-200">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link to={ENQUIRE_PATH} className="btn-primary mt-6 w-full">
            Explore Your Business Needs
          </Link>
        </nav>
      )}
    </header>
  );
}
