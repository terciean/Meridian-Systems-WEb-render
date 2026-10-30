import type { ReactNode } from 'react';

interface PageHeroProps {
  eyebrow: string;
  title: string;
  description: string;
  actions?: ReactNode;
}

export function PageHero({ eyebrow, title, description, actions }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden px-6 pb-20 pt-40 md:pt-48">
      <div className="pointer-events-none absolute -right-32 top-10 h-96 w-96 rounded-full bg-teal-500/10 blur-3xl animate-drift" aria-hidden="true" />
      <div className="mx-auto max-w-4xl space-y-8 text-center">
        <p className="section-label reveal">{eyebrow}</p>
        <h1 className="reveal text-4xl font-bold leading-[1.15] text-ink-50 md:text-6xl">{title}</h1>
        <p className="reveal mx-auto max-w-2xl text-lg leading-relaxed text-ink-300">{description}</p>
        {actions && <div className="reveal flex flex-wrap items-center justify-center gap-4 pt-2">{actions}</div>}
      </div>
    </section>
  );
}
