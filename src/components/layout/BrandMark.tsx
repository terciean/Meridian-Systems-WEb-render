import { Link } from '@/lib/router';

export function BrandMark() {
  return (
    <Link to="/" className="group inline-flex items-center" aria-label="Meridian Systems home">
      <img
        src="/Meridian_Systems_Geometric_Logo.png"
        alt="Meridian Systems"
        width={1072}
        height={1072}
        className="h-14 w-14 rounded-xl border border-ink-700 transition duration-300 group-hover:border-teal-400/60 group-hover:shadow-glow-teal md:h-16 md:w-16"
      />
    </Link>
  );
}
