import { Quote } from 'lucide-react';

interface ProofCardProps {
  client: string;
}

export function ProofCard({ client }: ProofCardProps) {
  return (
    <figure className="panel flex h-full flex-col justify-between gap-8 p-8">
      <div className="space-y-6">
        <Quote className="h-8 w-8 text-teal-400/60" aria-hidden="true" />
        <blockquote className="text-base leading-relaxed text-ink-300">
          The approved comment from {client} will appear here once it has been confirmed.
        </blockquote>
      </div>
      <figcaption className="flex items-center justify-between gap-4 border-t border-ink-700 pt-5">
        <span>
          <span className="block text-sm font-semibold text-ink-100">{client}</span>
          <span className="block text-xs text-ink-400">Name, role and business to be confirmed</span>
        </span>
        <span className="rounded-full border border-warning-500/40 bg-warning-500/10 px-3 py-1 text-xs font-semibold text-warning-500">
          Pending
        </span>
      </figcaption>
    </figure>
  );
}
