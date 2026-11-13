type PlausibleFn = (event: string, options?: { props?: Record<string, string | number | boolean> }) => void;

declare global {
  interface Window {
    plausible?: PlausibleFn;
  }
}

export function trackEvent(name: string, props?: Record<string, string | number | boolean>): void {
  if (typeof window === 'undefined' || typeof window.plausible !== 'function') return;
  window.plausible(name, props ? { props } : undefined);
}

export function trackPageview(path: string): void {
  trackEvent('pageview', { path });
}
