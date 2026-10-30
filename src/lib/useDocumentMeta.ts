import { useEffect } from 'react';

interface DocumentMeta {
  title: string;
  description: string;
}

function setMetaContent(selector: string, content: string) {
  document.querySelector<HTMLMetaElement>(selector)?.setAttribute('content', content);
}

export function useDocumentMeta({ title, description }: DocumentMeta) {
  useEffect(() => {
    const url = `${window.location.origin}${window.location.pathname}`;
    document.title = title;
    setMetaContent('meta[name="description"]', description);
    setMetaContent('meta[property="og:title"]', title);
    setMetaContent('meta[property="og:description"]', description);
    setMetaContent('meta[property="og:url"]', url);
    setMetaContent('meta[name="twitter:title"]', title);
    setMetaContent('meta[name="twitter:description"]', description);
    document.querySelector<HTMLLinkElement>('link[rel="canonical"]')?.setAttribute('href', url);
  }, [title, description]);
}
