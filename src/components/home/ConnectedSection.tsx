import { Waypoints } from 'lucide-react';

const CONNECTIONS = [
  { name: 'Lead Systems & CRM', role: 'The engine that captures and moves every enquiry forward.' },
  { name: 'Website & SEO', role: 'The front door that brings the right people in.' },
  { name: 'Stock Systems', role: 'The supply side, timed to match what sells.' },
  { name: 'Content & Video', role: 'The visibility that keeps your business in view.' },
];

export function ConnectedSection() {
  return (
    <section data-reveal className="px-6 pb-24">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-3xl border border-ink-700 bg-ink-900/60 p-10 md:p-16">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="space-y-6">
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl border border-teal-400/40 bg-teal-500/10 text-teal-200 shadow-glow-teal">
              <Waypoints className="h-7 w-7" aria-hidden="true" />
            </span>
            <h2 className="text-3xl font-bold text-ink-50 md:text-4xl">Every part works toward the same result.</h2>
            <p className="leading-relaxed text-ink-300">
              Your lead system sits at the centre. The website, stock and content support it, so each one adds to the enquiries and
              meetings that matter most.
            </p>
          </div>
          <ul className="grid gap-4 sm:grid-cols-2">
            {CONNECTIONS.map((item) => (
              <li key={item.name} className="rounded-2xl border border-ink-700 bg-ink-950/70 p-6 transition duration-300 hover:border-teal-400/50">
                <p className="font-semibold text-ink-100">{item.name}</p>
                <p className="mt-2 text-sm leading-relaxed text-ink-400">{item.role}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
