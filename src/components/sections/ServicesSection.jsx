import React from 'react';
import { motion } from 'framer-motion';
import { ServiceCard } from '../molecules/ServiceCard';
import { staggerContainer, fadeInUp } from '../../lib/animations/variants';
import { Dumbbell, Apple, Trophy, Users } from 'lucide-react';

const SERVICES = [
  {
    id: 1,
    icon: Dumbbell,
    title: 'Free Plan',
    description: 'Get started with AI-powered workouts, basic tracking, and community support - completely free!',
    features: [
      'AI workout plans',
      'Basic progress tracking',
      'Community access',
      'Exercise library',
      'Mobile app access',
      'Includes advertisements'
    ],
    price: 'Free',
    popular: false,
    badge: 'Always Free'
  },
  {
    id: 2,
    icon: Trophy,
    title: 'Premium Plan',
    description: 'Unlock the full experience with advanced features, no ads, and premium support.',
    features: [
      'Everything in Free',
      'Advanced AI coaching',
      'Nutrition meal plans',
      'Live group classes',
      'Priority support',
      'Ad-free experience',
      'Offline mode',
      'Custom workout builder'
    ],
    price: '$5',
    priceDetail: '/month',
    popular: true,
    badge: 'Most Popular'
  }
];

export const ServicesSection = () => {
  return (
    <section id="services" className="relative py-32 bg-background">
      {/* Decorative Elements - Subtle neutral glow only */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-white/5 rounded-full blur-3xl opacity-20" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-white/5 rounded-full blur-3xl opacity-20" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <motion.div
            variants={fadeInUp}
            className="inline-block px-4 py-2 bg-secondary/10 border border-secondary/30 rounded-full text-secondary text-sm font-medium mb-4"
          >
            Our Services
          </motion.div>
          
          <motion.h2
            variants={fadeInUp}
            className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary mb-6"
          >
            Choose Your
            <br />
            <span className="text-gradient bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
              Plan
            </span>
          </motion.h2>
          
          <motion.p
            variants={fadeInUp}
            className="font-body text-xl text-text-tertiary max-w-2xl mx-auto"
          >
            Start free and upgrade anytime for an ad-free experience with premium features.
          </motion.p>
        </motion.div>

        {/* Pricing Cards */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-500px" }}
          className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto"
        >
          {SERVICES.map((service, index) => (
            <motion.div
              key={service.id}
              variants={fadeInUp}
              custom={index}
            >
              <ServiceCard service={service} />
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="mt-16 text-center"
        >
          <p className="text-text-tertiary mb-4">Not sure which plan is right for you?</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="px-6 py-3 bg-white/5 border border-white/20 text-white font-medium rounded-full hover:bg-white/10 transition-colors duration-300"
          >
            Talk to an Expert
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};
