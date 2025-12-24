import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

export const ReviewCard = ({ review }) => {
  const { author, role, avatar, rating, text } = review;

  return (
    <div className="glass-panel p-8 md:p-12 rounded-3xl border border-surface-border relative">
      {/* Quote Icon */}
      <div className="absolute top-8 right-8 opacity-10">
        <Quote size={80} className="text-primary" />
      </div>

      {/* Stars */}
      <div className="flex gap-1 mb-6">
        {[...Array(rating)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
          >
            <Star size={24} className="fill-amber-400 text-amber-400" />
          </motion.div>
        ))}
      </div>

      {/* Review Text */}
      <p className="font-body text-lg md:text-xl text-text-secondary leading-relaxed mb-8 relative z-10">
        "{text}"
      </p>

      {/* Author */}
      <div className="flex items-center gap-4">
        <img
          src={avatar}
          alt={author}
          className="w-16 h-16 rounded-full border-2 border-primary/30"
          loading="lazy"
        />
        <div>
          <p className="font-bold text-text-primary text-lg">{author}</p>
          <p className="text-text-tertiary">{role}</p>
        </div>
      </div>
    </div>
  );
};
