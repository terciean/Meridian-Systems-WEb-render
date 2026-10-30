import { useRef, type CSSProperties, type MouseEvent } from 'react';
import type { SkillShowcaseItem, SkillVariant } from '@/data/skillShowcase';

export type CardPosition = 'active' | 'next' | 'prev' | 'far';

interface SkillCardProps {
  skill: SkillShowcaseItem;
  index: number;
  position: CardPosition;
  onSelect: () => void;
}

const FRAME_CLASS: Record<SkillVariant, string> = {
  mesh: 'border border-white/25 bg-white/10 shadow-[0_24px_60px_-24px_rgba(0,0,0,0.7)]',
  halftone: 'border border-teal-300/30 bg-white/10 shadow-[0_24px_60px_-24px_rgba(0,0,0,0.7)]',
  deco: 'border-2 border-warning-500/70 bg-white/10 shadow-[0_24px_60px_-24px_rgba(0,0,0,0.7)]',
  brutal:
    'border-4 border-ink-950 bg-white/10 shadow-[10px_10px_0_0_#09121B] hover:shadow-[4px_4px_0_0_#09121B]',
};

const SURFACE_STYLE: Record<SkillVariant, CSSProperties> = {
  mesh: {
    backgroundImage:
      'radial-gradient(at 15% 18%, #5B8987 0px, transparent 55%), radial-gradient(at 88% 14%, #D9A441 0px, transparent 50%), radial-gradient(at 72% 84%, #A41D03 0px, transparent 55%), radial-gradient(at 18% 92%, #466C6A 0px, transparent 52%), linear-gradient(#0D1A25, #0D1A25)',
  },
  halftone: {
    backgroundColor: '#112231',
    backgroundImage:
      'linear-gradient(180deg, #112231 0%, transparent 30%, transparent 55%, #112231 92%), radial-gradient(circle, rgba(149,190,187,0.85) 1.2px, transparent 1.9px)',
    backgroundSize: '100% 100%, 9px 9px',
  },
  deco: {
    backgroundImage:
      'repeating-linear-gradient(45deg, rgba(217,164,65,0.14) 0 2px, transparent 2px 14px), linear-gradient(#09121B, #09121B)',
    boxShadow: 'inset 0 0 0 6px #09121B, inset 0 0 0 7px #D9A441',
  },
  brutal: {
    backgroundColor: '#E8452A',
  },
};

const SURFACE_OPACITY_CLASS: Record<SkillVariant, string> = {
  mesh: 'opacity-80',
  halftone: 'opacity-80',
  deco: 'opacity-90',
  brutal: 'opacity-90',
};

const ASCII_CLASS: Record<SkillVariant, string> = {
  mesh: 'text-teal-100',
  halftone: 'text-teal-200',
  deco: 'text-warning-500',
  brutal: 'font-bold text-ink-950',
};

const LABEL_CLASS: Record<SkillVariant, string> = {
  mesh: 'text-teal-200',
  halftone: 'text-teal-300',
  deco: 'font-display uppercase tracking-[0.25em] text-warning-500',
  brutal: 'border-2 border-ink-950 bg-ink-950 text-ember-100',
};

const GLASS_PANEL_CLASS: Record<SkillVariant, string> = {
  mesh: 'border border-white/20 bg-ink-950/45 backdrop-blur-xl',
  halftone: 'border border-white/15 bg-ink-950/55 backdrop-blur-md',
  deco: 'border border-warning-500/40 bg-ink-950/65 backdrop-blur-md',
  brutal: 'border-4 border-ink-950 bg-ink-950',
};

const MAX_TILT_DEG = 8;

export function SkillCard({ skill, index, position, onSelect }: SkillCardProps) {
  const tiltRef = useRef<HTMLDivElement>(null);
  const isActive = position === 'active';
  const labelNumber = String(index + 1).padStart(2, '0');

  function handlePointerMove(event: MouseEvent<HTMLDivElement>) {
    const el = tiltRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width;
    const py = (event.clientY - rect.top) / rect.height;
    el.style.transform = `perspective(900px) rotateX(${(0.5 - py) * MAX_TILT_DEG * 2}deg) rotateY(${(px - 0.5) * MAX_TILT_DEG * 2}deg)`;
    el.style.setProperty('--glare-x', `${px * 100}%`);
    el.style.setProperty('--glare-y', `${py * 100}%`);
  }

  function handlePointerLeave() {
    if (tiltRef.current) tiltRef.current.style.transform = '';
  }

  return (
    <article
      data-position={position}
      onClick={isActive ? undefined : onSelect}
      aria-hidden={position === 'far' ? true : undefined}
      className={`skill-card group relative h-[520px] w-full overflow-hidden rounded-3xl backdrop-blur-xl ${FRAME_CLASS[skill.variant]} ${isActive ? '' : 'cursor-pointer'}`}
    >
      <div
        ref={tiltRef}
        onMouseMove={handlePointerMove}
        onMouseLeave={handlePointerLeave}
        className="relative flex h-full flex-col transition-transform duration-200 ease-out will-change-transform"
      >
        <div
          aria-hidden="true"
          className={`absolute inset-0 ${SURFACE_OPACITY_CLASS[skill.variant]}`}
          style={SURFACE_STYLE[skill.variant]}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            backgroundImage:
              'radial-gradient(circle at var(--glare-x, 50%) var(--glare-y, 50%), rgba(255,255,255,0.22), transparent 60%)',
          }}
        />

        <div className="relative flex items-center justify-between px-6 pt-6">
          <span className={`rounded-full px-3 py-1 font-mono text-xs font-semibold ${LABEL_CLASS[skill.variant]}`}>
            {labelNumber}
          </span>
        </div>

        <div className="relative flex flex-1 items-center justify-center px-4">
          <pre
            aria-hidden="true"
            className={`whitespace-pre font-mono text-[11px] leading-[1.35] transition-transform duration-500 ease-out group-hover:scale-105 sm:text-xs ${ASCII_CLASS[skill.variant]}`}
          >
            {skill.ascii}
          </pre>
        </div>

        <div
          className={`relative m-4 space-y-2 rounded-2xl p-5 transition duration-300 group-hover:-translate-y-1 ${GLASS_PANEL_CLASS[skill.variant]}`}
        >
          <h3 className="text-lg font-bold text-ink-50">{skill.title}</h3>
          <p className="text-sm leading-relaxed text-ink-200">{skill.body}</p>
        </div>
      </div>
    </article>
  );
}
