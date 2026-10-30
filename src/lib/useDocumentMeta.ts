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
    document.title = title;
    setMetaContent('meta[name="description"]', description);
    setMetaContent('meta[property="og:title"]', title);
    setMetaContent('meta[property="og:description"]', description);
    setMetaContent('meta[name="twitter:title"]', title);
  }, [title, description]);
}
