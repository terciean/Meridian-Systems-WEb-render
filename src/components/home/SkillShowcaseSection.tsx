import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { SkillCard, type CardPosition } from '@/components/home/SkillCard';
import { SKILL_SHOWCASE } from '@/data/skillShowcase';

const AUTO_ADVANCE_MS = 5000;

function positionFor(index: number, active: number, count: number): CardPosition {
  const offset = (index - active + count) % count;
  if (offset === 0) return 'active';
  if (offset === 1) return 'next';
  if (offset === count - 1) return 'prev';
  return 'far';
}

export function SkillShowcaseSection() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = SKILL_SHOWCASE.length;

  useEffect(() => {
    if (paused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const timer = window.setInterval(() => setActive((i) => (i + 1) % count), AUTO_ADVANCE_MS);
    return () => window.clearInterval(timer);
  }, [paused, count]);

  const step = (delta: number) => setActive((i) => (i + delta + count) % count);

  return (
    <section data-reveal className="overflow-hidden px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 max-w-2xl space-y-4">
          <p className="section-label">Proof of skill</p>
          <h2 className="text-3xl font-bold text-ink-50 md:text-4xl">Ten distinct looks, one team that builds any of them.</h2>
        </div>

        <div
          className="skill-stage relative flex flex-col gap-6 md:block md:h-[560px]"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
        >
          {SKILL_SHOWCASE.map((skill, index) => (
            <SkillCard
              key={skill.title}
              skill={skill}
              index={index}
              position={positionFor(index, active, count)}
              onSelect={() => setActive(index)}
            />
          ))}
        </div>

        <div className="mt-10 flex items-center justify-center gap-6">
          <button
            type="button"
            onClick={() => step(-1)}
            aria-label="Previous card"
            className="rounded-full border border-teal-400/60 p-3 text-teal-100 transition duration-300 hover:border-teal-300 hover:bg-teal-500/10 hover:shadow-glow-teal"
          >
            <ChevronLeft className="h-5 w-5" aria-hidden="true" />
          </button>
          <div className="flex items-center gap-2">
            {SKILL_SHOWCASE.map((skill, index) => (
              <button
                key={skill.title}
                type="button"
                onClick={() => setActive(index)}
                aria-label={`Show ${skill.title}`}
                aria-current={index === active}
                className={`h-2 rounded-full transition-all duration-500 ${
                  index === active ? 'w-8 bg-teal-300' : 'w-2 bg-ink-600 hover:bg-ink-400'
                }`}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={() => step(1)}
            aria-label="Next card"
            className="rounded-full border border-teal-400/60 p-3 text-teal-100 transition duration-300 hover:border-teal-300 hover:bg-teal-500/10 hover:shadow-glow-teal"
          >
            <ChevronRight className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
}
