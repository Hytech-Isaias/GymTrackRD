import { useEffect } from "react";
import { ContactSection } from "../components/sections/ContactSection";
import { Footer } from "../components/organisms/Footer";
import { SEOHead } from "../components/atoms/SEOHead";
import { Advertisement } from "../components/atoms/Advertisement";

const ContactPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background pt-20">
      <SEOHead
        title="Contact Us | GymTrackRD"
        description="Get in touch with the GymTrackRD team for support or inquiries."
      />
      
      {/* Top Ad */}
      <div className="container mx-auto px-4 pt-6">
        <Advertisement position="top" className="max-w-5xl mx-auto" />
      </div>

      {/* Square ad */}
      <div className="container mx-auto px-4 pt-6 flex justify-center">
        <Advertisement position="square" className="max-w-md" />
      </div>
      
      <ContactSection />
      
      {/* Bottom Ad before Footer */}
      <div className="container mx-auto px-4 py-8">
        <Advertisement position="bottom" className="max-w-5xl mx-auto" />
      </div>
      
      <Footer />
    </div>
  );
};

export default ContactPage;
