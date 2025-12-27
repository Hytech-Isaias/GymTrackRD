/**
 * JSON-LD Structured Data Schemas
 * For enhanced SEO and rich snippets
 */

// Local Business Schema
export const getLocalBusinessSchema = () => ({
  "@context": "https://schema.org",
  "@type": "SportsActivityLocation",
  "name": "GymTrackRD",
  "description": "AI-powered fitness and wellness platform for personalized workout planning and tracking",
  "url": typeof window !== 'undefined' ? window.location.origin : "https://gymtrackrd.com",
  "logo": `${typeof window !== 'undefined' ? window.location.origin : "https://gymtrackrd.com"}/logo.png`,
  "image": `${typeof window !== 'undefined' ? window.location.origin : "https://gymtrackrd.com"}/hero-image.jpg`,
  "telephone": "+1-555-123-4567",
  "email": "hello@gymtrackrd.com",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "123 Fitness Ave",
    "addressLocality": "San Francisco",
    "addressRegion": "CA",
    "postalCode": "94102",
    "addressCountry": "US"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "37.7749",
    "longitude": "-122.4194"
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday"
      ],
      "opens": "00:00",
      "closes": "23:59"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Saturday", "Sunday"],
      "opens": "00:00",
      "closes": "23:59"
    }
  ],
  "priceRange": "Free - $$",
  "sameAs": [
    "https://facebook.com/gymtrackrd",
    "https://instagram.com/gymtrackrd",
    "https://twitter.com/gymtrackrd",
    "https://linkedin.com/company/gymtrackrd"
  ]
});

interface Service {
  name: string;
  description: string;
  price?: string;
}

interface Review {
  author: string;
  rating: number;
  text: string;
  date: string;
}

interface FAQ {
  question: string;
  answer: string;
}

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface Article {
  title: string;
  description: string;
  image?: string;
  author?: string;
  datePublished?: string;
  dateModified?: string;
}

// Service Schema
export const getServiceSchema = (service: Service) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": service.name,
  "provider": {
    "@type": "Organization",
    "name": "GymTrackRD"
  },
  "description": service.description,
  "offers": {
    "@type": "Offer",
    "price": service.price || "0",
    "priceCurrency": "USD"
  }
});

// Aggregate Rating Schema
export const getAggregateRatingSchema = (rating: number, reviewCount: number) => ({
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "GymTrackRD",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": rating,
    "reviewCount": reviewCount,
    "bestRating": "5",
    "worstRating": "1"
  }
});

// Review Schema
export const getReviewSchema = (review: Review) => ({
  "@context": "https://schema.org",
  "@type": "Review",
  "itemReviewed": {
    "@type": "LocalBusiness",
    "name": "GymTrackRD"
  },
  "author": {
    "@type": "Person",
    "name": review.author
  },
  "reviewRating": {
    "@type": "Rating",
    "ratingValue": review.rating,
    "bestRating": "5",
    "worstRating": "1"
  },
  "reviewBody": review.text,
  "datePublished": review.date
});

// FAQ Schema
export const getFAQSchema = (faqs: FAQ[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map((faq: FAQ) => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer
    }
  }))
});

// Organization Schema
export const getOrganizationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "GymTrackRD",
  "url": typeof window !== 'undefined' ? window.location.origin : "https://gymtrackrd.com",
  "logo": `${typeof window !== 'undefined' ? window.location.origin : "https://gymtrackrd.com"}/logo.png`,
  "description": "AI-powered fitness and wellness platform for personalized workout planning and tracking",
  "foundingDate": "2025",
  "founders": [
    {
      "@type": "Person",
      "name": "GymTrackRD Team"
    }
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "customer support",
    "email": "support@gymtrackrd.com",
    "telephone": "+1-555-123-4567",
    "availableLanguage": ["English"]
  },
  "sameAs": [
    "https://facebook.com/gymtrackrd",
    "https://instagram.com/gymtrackrd",
    "https://twitter.com/gymtrackrd",
    "https://linkedin.com/company/gymtrackrd"
  ]
});

// WebSite Schema with Search Action
export const getWebSiteSchema = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "GymTrackRD",
  "url": typeof window !== 'undefined' ? window.location.origin : "https://gymtrackrd.com",
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": `${typeof window !== 'undefined' ? window.location.origin : "https://gymtrackrd.com"}/search?q={search_term_string}`
    },
    "query-input": "required name=search_term_string"
  }
});

// Breadcrumb List Schema
export const getBreadcrumbSchema = (items: BreadcrumbItem[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": items.map((item, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": item.name,
    "item": item.url
  }))
});

// Article Schema (for blog posts)
export const getArticleSchema = (article: Article) => {
  const siteUrl = typeof window !== 'undefined' ? window.location.origin : "https://gymtrackrd.com";
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.title,
    "description": article.description,
    "image": article.image || `${siteUrl}/og-image.jpg`,
    "author": {
      "@type": "Person",
      "name": article.author || "GymTrackRD Team"
    },
    "publisher": {
      "@type": "Organization",
      "name": "GymTrackRD",
      "logo": {
        "@type": "ImageObject",
        "url": `${siteUrl}/logo.png`
      }
    },
    "datePublished": article.datePublished || new Date().toISOString(),
    "dateModified": article.dateModified || new Date().toISOString()
  };
};

// Software Application Schema
export const getSoftwareApplicationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "GymTrackRD",
  "applicationCategory": "HealthApplication",
  "operatingSystem": "Web, iOS, Android",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "ratingCount": "2500"
  }
});
