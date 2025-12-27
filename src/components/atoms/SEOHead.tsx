import { Helmet } from "react-helmet-async";

export interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  schema?: Record<string, any>;
  canonical?: string;
  type?: string;
  author?: string;
}

export const SEOHead = ({
  title,
  description,
  keywords,
  image,
  schema,
  canonical,
  type = "website",
  author = "GymTrackRD Team",
}: SEOHeadProps) => {
  const siteTitle = "GymTrackRD - AI-Powered Fitness & Workout Planner";
  const fullTitle = title ? `${title}` : siteTitle;
  const metaDesc = description || 
    "Transform your fitness journey with GymTrackRD's AI-powered workout planning, progress tracking, and personalized training programs. Start achieving your goals today!";
  const siteUrl = typeof window !== 'undefined' ? window.location.origin : 'https://gymtrackrd.com';
  const canonicalUrl = canonical || (typeof window !== 'undefined' ? window.location.href : siteUrl);
  const ogImage = image || `${siteUrl}/og-image.jpg`;
  const defaultKeywords = [
    "workout planner",
    "fitness tracker",
    "AI fitness",
    "personal trainer",
    "exercise database",
    "strength training",
    "HIIT workouts",
    "workout app",
    "fitness app",
    "gym tracker"
  ];
  const metaKeywords = keywords ? [...keywords, ...defaultKeywords].join(", ") : defaultKeywords.join(", ");

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={metaDesc} />
      <meta name="keywords" content={metaKeywords} />
      <meta name="author" content={author} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDesc} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="GymTrackRD" />
      <meta property="og:locale" content="en_US" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDesc} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:creator" content="@gymtrackrd" />
      <meta name="twitter:site" content="@gymtrackrd" />

      {/* Additional SEO Meta Tags */}
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow" />
      <meta name="bingbot" content="index, follow" />
      <meta name="theme-color" content="#6818a5" />
      <meta name="msapplication-TileColor" content="#6818a5" />

      {/* Mobile Optimization */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      <meta name="apple-mobile-web-app-title" content="GymTrackRD" />

      {/* JSON-LD Structured Data */}
      {schema && (
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      )}
    </Helmet>
  );
};
