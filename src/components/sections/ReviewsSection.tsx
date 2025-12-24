import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ReviewCard } from "../molecules/ReviewCard";
import { staggerContainer, fadeInUp } from "../../lib/animations/variants";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

const REVIEWS = [
  {
    id: 1,
    author: "Sarah Johnson",
    role: "Marathon Runner",
    avatar: "https://i.pravatar.cc/150?img=1",
    rating: 5,
    text: "The AI workout plans are incredible! They adapt perfectly to my training schedule and have helped me shave 15 minutes off my marathon time.",
    date: "2024-01-15",
  },
  {
    id: 2,
    author: "Mike Chen",
    role: "Fitness Enthusiast",
    avatar: "https://i.pravatar.cc/150?img=12",
    rating: 5,
    text: "Best fitness app I`ve ever used. The nutrition coaching combined with personalized workouts helped me lose 30 pounds in 4 months!",
    date: "2024-01-10",
  },
  {
    id: 3,
    author: "Emily Rodriguez",
    role: "Yoga Instructor",
    avatar: "https://i.pravatar.cc/150?img=5",
    rating: 5,
    text: "Love the community features! Being able to connect with others on similar journeys keeps me motivated every single day.",
    date: "2024-01-08",
  },
  {
    id: 4,
    author: "David Park",
    role: "Bodybuilder",
    avatar: "https://i.pravatar.cc/150?img=8",
    rating: 5,
    text: "The progressive overload tracking is fantastic. I`ve seen consistent gains month over month. Highly recommend for serious lifters!",
    date: "2024-01-05",
  },
];

export const ReviewsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextReview = () => {
    setCurrentIndex((prev) => (prev + 1) % REVIEWS.length);
  };

  const prevReview = () => {
    setCurrentIndex((prev) => (prev - 1 + REVIEWS.length) % REVIEWS.length);
  };

  return (
    <section
      id="reviews"
      className="relative py-32 bg-background overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
            color: "var(--color-text-tertiary)",
          }}
        />
      </div>

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
            Loved by
            <br />
            <span className="text-gradient bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
              Thousands
            </span>
          </motion.h2>

          {/* Average Rating */}
          <motion.div
            variants={fadeInUp}
            className="flex items-center justify-center gap-2 text-xl"
          >
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={24}
                  className="fill-amber-400 text-amber-400"
                />
              ))}
            </div>
            <span className="text-text-primary font-bold">4.9</span>
            <span className="text-text-tertiary">out of 5</span>
          </motion.div>
        </motion.div>

        {/* Carousel */}
        <div className="relative max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.3 }}
            >
              <ReviewCard review={REVIEWS[currentIndex]} />
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={prevReview}
              className="w-12 h-12 rounded-full bg-surface-primary/10 border border-surface-border flex items-center justify-center text-text-primary hover:bg-surface-primary/20 transition-colors"
            >
              <ChevronLeft size={24} />
            </motion.button>

            <div className="flex gap-2">
              {REVIEWS.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? "bg-primary w-8"
                      : "bg-surface-tertiary/20 hover:bg-surface-tertiary/40"
                  }`}
                />
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={nextReview}
              className="w-12 h-12 rounded-full bg-surface-primary/10 border border-surface-border flex items-center justify-center text-text-primary hover:bg-surface-primary/20 transition-colors"
            >
              <ChevronRight size={24} />
            </motion.button>
          </div>
        </div>

        {/* Grid of all reviews (small cards) */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mt-16"
        >
          {REVIEWS.map((review, index) => (
            <motion.div
              key={review.id}
              variants={fadeInUp}
              custom={index}
              className="glass-panel p-4 rounded-xl border border-surface-border cursor-pointer hover:border-primary/30 transition-colors"
              onClick={() => setCurrentIndex(index)}
            >
              <div className="flex items-center gap-3 mb-2">
                <img
                  src={review.avatar}
                  alt={review.author}
                  className="w-10 h-10 rounded-full"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-text-primary font-medium text-sm truncate">
                    {review.author}
                  </p>
                  <p className="text-text-tertiary text-xs truncate">
                    {review.role}
                  </p>
                </div>
              </div>
              <div className="flex gap-0.5 mb-2">
                {[...Array(review.rating)].map((_, i) => (
                  <Star
                    key={i}
                    size={12}
                    className="fill-amber-400 text-amber-400"
                  />
                ))}
              </div>
              <p className="text-text-secondary text-xs line-clamp-3">
                {review.text}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
