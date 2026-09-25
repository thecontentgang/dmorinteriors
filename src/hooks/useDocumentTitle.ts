import { useEffect } from 'react';

interface SEOProps {
  title: string;
  description?: string;
  canonical?: string;
  type?: string;
}

export function useDocumentTitle(title: string | SEOProps) {
  useEffect(() => {
    let t = typeof title === 'string' ? title : title.title;
    document.title = t;

    if (typeof title !== 'string') {
      const { description, canonical, type = 'website' } = title;
      
      // Update or create meta description
      let metaDesc = document.querySelector('meta[name="description"]');
      if (!metaDesc) {
        metaDesc = document.createElement('meta');
        metaDesc.setAttribute('name', 'description');
        document.head.appendChild(metaDesc);
      }
      if (description) metaDesc.setAttribute('content', description);

      // Update or create canonical link
      let linkCanonical = document.querySelector('link[rel="canonical"]');
      if (!linkCanonical) {
        linkCanonical = document.createElement('link');
        linkCanonical.setAttribute('rel', 'canonical');
        document.head.appendChild(linkCanonical);
      }
      if (canonical) {
        linkCanonical.setAttribute('href', canonical);
      } else {
        linkCanonical.setAttribute('href', window.location.href);
      }

      // Update or create OG Title
      let ogTitle = document.querySelector('meta[property="og:title"]');
      if (!ogTitle) {
        ogTitle = document.createElement('meta');
        ogTitle.setAttribute('property', 'og:title');
        document.head.appendChild(ogTitle);
      }
      ogTitle.setAttribute('content', t);

      // Update or create OG Type
      let ogType = document.querySelector('meta[property="og:type"]');
      if (!ogType) {
        ogType = document.createElement('meta');
        ogType.setAttribute('property', 'og:type');
        document.head.appendChild(ogType);
      }
      ogType.setAttribute('content', type);
    }
  }, [title]);
}
