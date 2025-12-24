import { motion } from "framer-motion";
import { SEOHead } from "../components/atoms/SEOHead";
import { HeroSection } from "../components/sections/HeroSection";
import { AboutSection } from "../components/sections/AboutSection";
import { ServicesSection } from "../components/sections/ServicesSection";
import { ReviewsSection } from "../components/sections/ReviewsSection";
import { FAQSection } from "../components/sections/FAQSection";
import { CommunitySection } from "../components/sections/CommunitySection";
import { ContactSection } from "../components/sections/ContactSection";
import {
  getLocalBusinessSchema,
  getOrganizationSchema,
  getWebSiteSchema,
  getFAQSchema,
} from "../lib/seo/schema";
import { pageTransition } from "../lib/animations/variants";

// FAQ data for schema
const faqData = [
  {
    question: "How does the AI workout planner work?",
    answer:
      "Our AI analyzes your fitness level, goals, available equipment, and schedule to create a personalized workout plan that continuously adapts based on your progress.",
  },
  {
    question: "Can I use this if I`m a complete beginner?",
    answer:
      "Absolutely! Our platform is designed for all fitness levels, starting with beginner-friendly exercises and progressively challenging you as you build strength.",
  },
  {
    question: "Do I need gym equipment?",
    answer:
      "No! You can customize your equipment preferences, and the AI will create workouts tailored to what you have available, even bodyweight-only options.",
  },
];

const HomePage = () => {
  // Combine schemas
  const schemas = [
    getLocalBusinessSchema(),
    getOrganizationSchema(),
    getWebSiteSchema(),
    getFAQSchema(faqData),
  ];

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageTransition}
      className="min-h-screen pt-16"
    >
      <SEOHead
        title="AI-Powered Fitness & Wellness"
        description="Transform your fitness journey with personalized AI workout plans, nutrition coaching, and a supportive community. Start your free trial today!"
        schema={schemas}
      />

      {/* Sections */}
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <ReviewsSection />
      <CommunitySection />
      <FAQSection />
      <ContactSection />

      {/* Sticky Mobile CTA */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1 }}
        className="md:hidden fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-background via-background/95 to-transparent z-50"
      >
        <motion.button
          whileTap={{ scale: 0.95 }}
          className="w-full px-6 py-4 bg-gradient-to-r from-primary to-secondary text-white font-bold text-lg rounded-full shadow-lg shadow-primary/25"
        >
          Start Free Trial
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default HomePage;
