const STAGES = [
  { title: 'Discover', body: 'We learn how your business earns, where enquiries stall and what success looks like.' },
  { title: 'Design', body: 'We map the lead system, the website and any stock or content needs as one connected plan.' },
  { title: 'Build', body: 'Each part is built and tested, with every automation explained to you before it runs.' },
  { title: 'Launch', body: 'We go live with your team, check the first real enquiries and tidy anything that needs attention.' },
  { title: 'Grow', body: 'We review the numbers together and refine the system as your business changes.' },
];

export function ProcessSection() {
  return (
    <section data-reveal className="border-y border-ink-800 bg-ink-900/40 px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 max-w-2xl space-y-4">
          <p className="section-label">How we work</p>
          <h2 className="text-3xl font-bold text-ink-50 md:text-4xl">Five clear stages, from first conversation to growth.</h2>
        </div>
        <ol className="grid gap-8 md:grid-cols-2 lg:grid-cols-5">
          {STAGES.map((stage, index) => (
            <li key={stage.title} className="relative space-y-4 border-t border-teal-400/30 pt-6">
              <span className="absolute -top-[5px] left-0 h-2.5 w-2.5 rounded-full bg-teal-300 shadow-glow-teal" aria-hidden="true" />
              <span className="font-display text-sm font-semibold text-ink-500">0{index + 1}</span>
              <h3 className="text-xl font-semibold text-ink-50">{stage.title}</h3>
              <p className="text-sm leading-relaxed text-ink-300">{stage.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
