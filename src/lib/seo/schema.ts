/**
 * JSON-LD Structured Data Schemas
 * For enhanced SEO and rich snippets
 */

// Local Business Schema
export const getLocalBusinessSchema = () => ({
  "@context": "https://schema.org",
  "@type": "SportsActivityLocation",
  "name": "Workout Planner",
  "description": "AI-powered fitness and wellness platform",
  "url": window.location.origin,
  "logo": `${window.location.origin}/logo.png`,
  "image": `${window.location.origin}/hero-image.jpg`,
  "telephone": "+1-555-0123",
  "email": "hello@workoutplanner.com",
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
      "opens": "06:00",
      "closes": "22:00"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Saturday", "Sunday"],
      "opens": "08:00",
      "closes": "20:00"
    }
  ],
  "priceRange": "$$",
  "sameAs": [
    "https://facebook.com/workoutplanner",
    "https://instagram.com/workoutplanner",
    "https://twitter.com/workoutplanner"
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

// Service Schema
export const getServiceSchema = (service: Service) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": service.name,
  "provider": {
    "@type": "Organization",
    "name": "Workout Planner"
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
  "name": "Workout Planner",
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
    "name": "Workout Planner"
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
  "name": "Workout Planner",
  "url": window.location.origin,
  "logo": `${window.location.origin}/logo.png`,
  "description": "AI-powered fitness and wellness platform for personalized workout planning and tracking",
  "foundingDate": "2024",
  "founders": [
    {
      "@type": "Person",
      "name": "Workout Planner Team"
    }
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "customer support",
    "email": "support@workoutplanner.com"
  }
});

// WebSite Schema with Search Action
export const getWebSiteSchema = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Workout Planner",
  "url": window.location.origin,
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": `${window.location.origin}/search?q={search_term_string}`
    },
    "query-input": "required name=search_term_string"
  }
});
