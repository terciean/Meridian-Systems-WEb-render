import { useEffect } from 'react';

const CALENDLY_SCRIPT_SRC = 'https://assets.calendly.com/assets/external/widget.js';

export function CalendlyInlineWidget({ url, height = 700 }: { url: string; height?: number }) {
  useEffect(() => {
    if (document.querySelector<HTMLScriptElement>(`script[src="${CALENDLY_SCRIPT_SRC}"]`)) return;

    const script = document.createElement('script');
    script.src = CALENDLY_SCRIPT_SRC;
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <div
      className="calendly-inline-widget w-full overflow-hidden rounded-2xl border border-ink-700"
      data-url={url}
      style={{ minWidth: '280px', height }}
    />
  );
}
