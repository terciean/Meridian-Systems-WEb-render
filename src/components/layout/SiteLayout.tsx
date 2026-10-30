import type { ReactNode } from 'react';
import { MobileCtaBar } from '@/components/layout/MobileCtaBar';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { SiteHeader } from '@/components/layout/SiteHeader';

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-teal-300 focus:px-4 focus:py-2 focus:text-ink-950"
      >
        Skip to content
      </a>
      <SiteHeader />
      <main id="main" className="flex-1 pb-24 md:pb-0">
        {children}
      </main>
      <SiteFooter />
      <MobileCtaBar />
    </div>
  );
}
