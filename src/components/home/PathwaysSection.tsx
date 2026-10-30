import { ArrowRight } from 'lucide-react';
import { Link } from '@/lib/router';
import { SOLUTION_LIST, type Solution } from '@/data/solutions';

function PathwayCard({ solution, featured }: { solution: Solution; featured: boolean }) {
  return (
    <Link
      to={solution.path}
      className={`group relative flex flex-col justify-between overflow-hidden p-8 ${
        featured ? 'panel border-teal-400/50 shadow-glow-teal md:p-12 lg:col-span-3' : 'panel-interactive'
      }`}
    >
      <div className="space-y-5">
        <span className="section-label text-[0.65rem]">{solution.eyebrow}</span>
        <h3 className={`font-semibold text-ink-50 ${featured ? 'text-3xl md:text-4xl' : 'text-xl'}`}>{solution.pathwayLabel}</h3>
        <p className={`leading-relaxed text-ink-300 ${featured ? 'max-w-xl text-base' : 'text-sm'}`}>{solution.description}</p>
      </div>
      <span className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-teal-200 transition group-hover:gap-3 group-hover:text-teal-100">
        Explore this solution
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </span>
    </Link>
  );
}

export function PathwaysSection() {
  const [lead, ...supporting] = SOLUTION_LIST;

  return (
    <section data-reveal className="px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 max-w-2xl space-y-4">
          <p className="section-label">Where would you like to start?</p>
          <h2 className="text-3xl font-bold text-ink-50 md:text-4xl">Four pathways, one connected system.</h2>
          <p className="leading-relaxed text-ink-300">Start with the part of your business that needs attention most. Each pathway feeds the others.</p>
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          <PathwayCard solution={lead} featured />
          {supporting.map((solution) => (
            <PathwayCard key={solution.slug} solution={solution} featured={false} />
          ))}
        </div>
      </div>
    </section>
  );
}
