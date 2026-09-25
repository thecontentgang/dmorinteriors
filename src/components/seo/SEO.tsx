import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description?: string;
  canonical?: string;
  type?: string;
  name?: string;
  image?: string;
}

export default function SEO({ 
  title, 
  description = "DMOR Interiors - Crafting environments of enduring quality.", 
  canonical, 
  type = "website", 
  name = "DMOR", 
  image = "/images/og-image.jpg" 
}: SEOProps) {
  
  const siteUrl = "https://dmor.com"; // Change to actual production URL
  const currentUrl = canonical || siteUrl;

  return (
    <Helmet>
      {/* Standard metadata tags */}
      <title>{title}</title>
      <meta name='description' content={description} />
      <link rel="canonical" href={currentUrl} />

      {/* OpenGraph tags */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:site_name" content={name} />
      <meta property="og:image" content={image} />

      {/* Twitter tags */}
      <meta name="twitter:creator" content={name} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
}
