import React from "react";
import { Footer } from "../organisms/Footer";
import { Helmet } from "react-helmet-async";

interface MainLayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  className?: string;
}

const MainLayout = ({
  children,
  title = "Workout Planner",
  description = "Track your fitness journey",
  className = "",
}: MainLayoutProps) => {
  return (
    <div
      className={`flex flex-col min-h-screen font-sans text-text-primary bg-background ${className}`}
    >
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href="https://fitplan-demo.com" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "FitPlan",
            url: "https://fitplan-demo.com",
          })}
        </script>
      </Helmet>

      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
};

export { MainLayout };
