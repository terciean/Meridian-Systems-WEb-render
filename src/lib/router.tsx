import { useEffect, useState, type MouseEvent, type AnchorHTMLAttributes } from 'react';

export interface Location {
  pathname: string;
  search: string;
}

function readLocation(): Location {
  return { pathname: window.location.pathname, search: window.location.search };
}

export function useLocation(): Location {
  const [location, setLocation] = useState<Location>(readLocation);

  useEffect(() => {
    const sync = () => setLocation(readLocation());
    window.addEventListener('popstate', sync);
    return () => window.removeEventListener('popstate', sync);
  }, []);

  return location;
}

export function navigate(to: string) {
  window.history.pushState({}, '', to);
  window.dispatchEvent(new PopStateEvent('popstate'));
  window.scrollTo({ top: 0, behavior: 'instant' });
}

type LinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & { to: string };

export function Link({ to, onClick, ...rest }: LinkProps) {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);
    if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) {
      return;
    }
    event.preventDefault();
    navigate(to);
  };

  return <a href={to} onClick={handleClick} {...rest} />;
}
