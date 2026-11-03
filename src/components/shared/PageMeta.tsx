import { Helmet } from 'react-helmet-async';
import { useLocation } from '@/lib/router';

interface PageMetaProps {
  title: string;
  description: string;
  noIndex?: boolean;
}

const SITE_ORIGIN = 'https://meridian-systems.onrender.com';
const SOCIAL_IMAGE = `${SITE_ORIGIN}/Meridian_Systems_Geometric_Logo.png`;

export function PageMeta({ title, description, noIndex = false }: PageMetaProps) {
  const { pathname } = useLocation();
  const url = `${SITE_ORIGIN}${pathname}`;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      {noIndex && <meta name="robots" content="noindex, nofollow" />}

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Meridian Systems" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={SOCIAL_IMAGE} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={SOCIAL_IMAGE} />
    </Helmet>
  );
}
