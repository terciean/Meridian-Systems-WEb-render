import { useEffect } from 'react';

const REVEAL_SELECTOR = '[data-reveal]';

export function useScrollReveal(pathname: string) {
  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>(REVEAL_SELECTOR));
    elements.forEach((element) => element.classList.add('reveal-on-scroll'));

    if (!('IntersectionObserver' in window)) {
      elements.forEach((element) => element.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [pathname]);
}
