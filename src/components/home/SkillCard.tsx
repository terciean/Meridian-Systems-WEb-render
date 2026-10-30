import type { CSSProperties } from 'react';
import type { SkillShowcaseItem, SkillVariant } from '@/data/skillShowcase';

export type CardPosition = 'active' | 'next' | 'prev' | 'far';

interface SkillCardProps {
  skill: SkillShowcaseItem;
  index: number;
  position: CardPosition;
  onSelect: () => void;
}

const SURFACE_CLASS: Record<SkillVariant, string> = {
  mesh: 'border border-white/10',
  halftone: 'border border-teal-400/30',
  deco: 'border-2 border-warning-500',
  brutal: 'border-4 border-ink-950 shadow-[10px_10px_0_0_#09121B] hover:shadow-[4px_4px_0_0_#09121B]',
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

const GLASS_CLASS: Record<SkillVariant, string> = {
  mesh: 'border border-white/20 bg-ink-950/45 backdrop-blur-xl',
  halftone: 'border border-white/15 bg-ink-950/55 backdrop-blur-md',
  deco: 'border border-warning-500/40 bg-ink-950/65 backdrop-blur-md',
  brutal: 'border-4 border-ink-950 bg-ink-950',
};

export function SkillCard({ skill, index, position, onSelect }: SkillCardProps) {
  const isActive = position === 'active';
  const labelNumber = String(index + 1).padStart(2, '0');

  return (
    <article
      data-position={position}
      onClick={isActive ? undefined : onSelect}
      aria-hidden={position === 'far' ? true : undefined}
      className={`skill-card relative flex h-[520px] w-full flex-col overflow-hidden rounded-3xl ${SURFACE_CLASS[skill.variant]} ${isActive ? '' : 'cursor-pointer'}`}
      style={SURFACE_STYLE[skill.variant]}
    >
      <div className="relative flex items-center justify-between px-6 pt-6">
        <span
          className={`rounded-full px-3 py-1 font-mono text-xs font-semibold ${LABEL_CLASS[skill.variant]}`}
        >
          {labelNumber}
        </span>
      </div>

      <div className="relative flex flex-1 items-center justify-center px-4">
        <pre
          aria-hidden="true"
          className={`whitespace-pre font-mono text-[11px] leading-[1.35] sm:text-xs ${ASCII_CLASS[skill.variant]}`}
        >
          {skill.ascii}
        </pre>
      </div>

      <div className={`relative m-4 space-y-2 rounded-2xl p-5 ${GLASS_CLASS[skill.variant]}`}>
        <h3 className="text-lg font-bold text-ink-50">{skill.title}</h3>
        <p className="text-sm leading-relaxed text-ink-200">{skill.body}</p>
      </div>
    </article>
  );
}
