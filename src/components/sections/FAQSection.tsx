import { useState } from "react";
import { motion } from "framer-motion";
import { FAQItem } from "../molecules/FAQItem";
import { staggerContainer, fadeInUp } from "../../lib/animations/variants";
import { HelpCircle } from "lucide-react";

const FAQS = [
  {
    id: 1,
    question: "How does the AI workout planner work?",
    answer:
      "Our AI analyzes your fitness level, goals, available equipment, and schedule to create a personalized workout plan. It continuously adapts based on your progress, ensuring you`re always challenged at the right level.",
  },
  {
    id: 2,
    question: "Can I use this if I`m a complete beginner?",
    answer:
      "Absolutely! Our platform is designed for all fitness levels. The AI will start you with beginner-friendly exercises and gradually progress as you build strength and confidence.",
  },
  {
    id: 3,
    question: "Do I need gym equipment?",
    answer:
      "Not at all! You can set your equipment preferences (bodyweight only, dumbbells, full gym, etc.), and the AI will create workouts tailored to what you have available.",
  },
  {
    id: 4,
    question: "How often should I work out?",
    answer:
      "This depends on your goals and schedule. Our AI typically recommends 3-5 workouts per week for most goals, with built-in rest days for optimal recovery.",
  },
  {
    id: 5,
    question: "Can I cancel my subscription anytime?",
    answer:
      "Yes, you can cancel your subscription at any time with no penalties. You`ll continue to have access until the end of your billing period.",
  },
  {
    id: 6,
    question: "Is there a mobile app?",
    answer:
      "Yes! Our mobile app is available for both iOS and Android, with offline mode so you can access your workouts anywhere.",
  },
];

export const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredFAQs = FAQS.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section id="faq" className="relative py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <motion.h2
            variants={fadeInUp}
            className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary mb-6"
          >
            Got Questions?
            <br />
            <span className="text-gradient bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              We've Got Answers
            </span>
          </motion.h2>

          <motion.p
            variants={fadeInUp}
            className="font-body text-xl text-text-tertiary max-w-2xl mx-auto mb-8"
          >
            Everything you need to know about getting started with your fitness
            journey.
          </motion.p>

          {/* Search */}
          <motion.div variants={fadeInUp} className="max-w-md mx-auto">
            <input
              type="text"
              placeholder="Search questions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-6 py-4 bg-surface-primary/10 border border-surface-border rounded-full text-text-primary placeholder-text-tertiary focus:outline-none focus:border-primary/50 transition-colors"
            />
          </motion.div>
        </motion.div>

        {/* FAQ List */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-3xl mx-auto space-y-4"
        >
          {filteredFAQs.map((faq, index) => (
            <motion.div key={faq.id} variants={fadeInUp} custom={index}>
              <FAQItem
                question={faq.question}
                answer={faq.answer}
                isOpen={openIndex === faq.id}
                onToggle={() =>
                  setOpenIndex(openIndex === faq.id ? null : faq.id)
                }
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Still have questions CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-16"
        >
          <p className="text-text-tertiary mb-4">Still have questions?</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="px-6 py-3 bg-primary text-white font-bold rounded-full hover:shadow-lg hover:shadow-primary/25 transition-all duration-300"
          >
            Contact Support
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};
