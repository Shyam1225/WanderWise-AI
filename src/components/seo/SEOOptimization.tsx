import React, { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: 'website' | 'article' | 'profile';
  twitterCard?: 'summary' | 'summary_large_image';
  structuredData?: any;
  keywords?: string[];
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
}

export function SEOOptimization({
  title,
  description,
  canonicalUrl,
  ogImage,
  ogType = 'website',
  twitterCard = 'summary_large_image',
  structuredData,
  keywords,
  author,
  publishedTime,
  modifiedTime
}: SEOProps) {
  useEffect(() => {
    // Update document title
    document.title = `${title} | WanderWise AI`;
    
    // Update meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', description);
    
    // Update canonical URL
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (canonicalUrl) {
      if (!canonicalLink) {
        canonicalLink = document.createElement('link');
        canonicalLink.setAttribute('rel', 'canonical');
        document.head.appendChild(canonicalLink);
      }
      canonicalLink.setAttribute('href', canonicalUrl);
    } else if (canonicalLink) {
      canonicalLink.remove();
    }
    
    // Update Open Graph meta tags
    updateMetaTag('og:title', title);
    updateMetaTag('og:description', description);
    updateMetaTag('og:type', ogType);
    if (ogImage) updateMetaTag('og:image', ogImage);
    if (canonicalUrl) updateMetaTag('og:url', canonicalUrl);
    
    // Update Twitter Card meta tags
    updateMetaTag('twitter:card', twitterCard);
    updateMetaTag('twitter:title', title);
    updateMetaTag('twitter:description', description);
    if (ogImage) updateMetaTag('twitter:image', ogImage);
    
    // Update keywords
    if (keywords && keywords.length > 0) {
      updateMetaTag('keywords', keywords.join(', '));
    }
    
    // Update author
    if (author) {
      updateMetaTag('author', author);
    }
    
    // Update article meta tags if applicable
    if (ogType === 'article') {
      if (publishedTime) updateMetaTag('article:published_time', publishedTime);
      if (modifiedTime) updateMetaTag('article:modified_time', modifiedTime);
      if (author) updateMetaTag('article:author', author);
    }
    
    // Add structured data if provided
    if (structuredData) {
      let scriptTag = document.querySelector('script[type="application/ld+json"]');
      if (!scriptTag) {
        scriptTag = document.createElement('script');
        scriptTag.setAttribute('type', 'application/ld+json');
        document.head.appendChild(scriptTag);
      }
      scriptTag.textContent = JSON.stringify(structuredData);
    }
    
    // Cleanup function
    return () => {
      // Remove structured data script
      const scriptTag = document.querySelector('script[type="application/ld+json"]');
      if (scriptTag) {
        scriptTag.remove();
      }
    };
  }, [
    title,
    description,
    canonicalUrl,
    ogImage,
    ogType,
    twitterCard,
    structuredData,
    keywords,
    author,
    publishedTime,
    modifiedTime
  ]);
  
  // Helper function to update meta tags
  const updateMetaTag = (name: string, content: string) => {
    let metaTag = document.querySelector(`meta[property="${name}"], meta[name="${name}"]`);
    if (!metaTag) {
      metaTag = document.createElement('meta');
      if (name.startsWith('og:') || name.startsWith('article:')) {
        metaTag.setAttribute('property', name);
      } else {
        metaTag.setAttribute('name', name);
      }
      document.head.appendChild(metaTag);
    }
    metaTag.setAttribute('content', content);
  };
  
  // This component doesn't render anything visible
  return null;
}