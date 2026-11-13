import { Link } from '@/lib/router';

export function BrandMark({ footer = false }: { footer?: boolean }) {
  return (
    <Link to="/" className="inline-flex shrink-0 items-center" aria-label="Ethos Creative Systems home">
      <img
        src="/ethos-logo.svg"
        alt="Ethos Creative Systems"
        width={340}
        height={310}
        className={footer ? 'h-28 w-auto' : 'h-[4.5rem] w-auto'}
      />
    </Link>
  );
}
