import { renderToString } from 'react-dom/server';
import { HelmetProvider, type HelmetServerState } from 'react-helmet-async';
import App from './App';
import { setSSRLocation } from '@/lib/router';
import { SOLUTION_LIST } from '@/data/solutions';

export { SOLUTION_LIST };

export function render(pathname: string): { html: string; helmet: HelmetServerState } {
  setSSRLocation(pathname);

  const helmetContext: { helmet?: HelmetServerState } = {};
  const html = renderToString(
    <HelmetProvider context={helmetContext}>
      <App />
    </HelmetProvider>,
  );

  return { html, helmet: helmetContext.helmet! };
}
