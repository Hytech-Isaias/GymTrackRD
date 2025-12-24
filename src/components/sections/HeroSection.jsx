import React from 'react';
import { motion } from 'framer-motion';
import { Dumbbell, Zap, Heart, Activity, Timer, Trophy, Flame, Target, BarChart, Calendar, Medal } from 'lucide-react';
import { fadeInUp, staggerContainer, textReveal, float, floatSlow, floatFast, floatReverse } from '../../lib/animations/variants';

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      {/* Dynamic Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      {/* Floating Icons with Glow */}
      <motion.div
        variants={floatSlow}
        initial="initial"
        animate="animate"
        className="absolute top-20 left-10 text-primary/30"
      >
        <div className="relative">
          <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full" />
          <Dumbbell size={64} className="relative z-10 drop-shadow-[0_0_15px_rgba(189,104,238,0.5)]" />
        </div>
      </motion.div>
      
      <motion.div
        variants={floatReverse}
        initial="initial"
        animate="animate"
        className="absolute bottom-32 right-20 text-secondary/30"
        style={{ animationDelay: '1s' }}
      >
        <div className="relative">
          <div className="absolute inset-0 bg-secondary/20 blur-xl rounded-full" />
          <Zap size={48} className="relative z-10 drop-shadow-[0_0_15px_rgba(171,81,227,0.5)]" />
        </div>
      </motion.div>

      <motion.div
        variants={float}
        initial="initial"
        animate="animate"
        className="absolute top-1/3 right-10 text-accent/30"
        style={{ animationDelay: '0.5s' }}
      >
        <div className="relative">
          <div className="absolute inset-0 bg-accent/20 blur-xl rounded-full" />
          <Heart size={56} className="relative z-10 drop-shadow-[0_0_15px_rgba(210,131,255,0.5)]" />
        </div>
      </motion.div>
      
      <motion.div
        variants={floatFast}
        initial="initial"
        animate="animate"
        className="absolute top-40 right-[20%] text-primary/20 hover:text-primary/40 transition-colors duration-300"
        style={{ animationDelay: '1.5s' }}
      >
        <Activity size={40} />
      </motion.div>

      <motion.div
        variants={floatSlow}
        initial="initial"
        animate="animate"
        className="absolute bottom-40 left-[15%] text-secondary/20 hover:text-secondary/40 transition-colors duration-300"
        style={{ animationDelay: '2s' }}
      >
        <Timer size={44} />
      </motion.div>

      <motion.div
        variants={floatReverse}
        initial="initial"
        animate="animate"
        className="absolute top-24 left-[30%] text-accent/20 hover:text-accent/40 transition-colors duration-300"
        style={{ animationDelay: '0.8s' }}
      >
        <Trophy size={32} />
      </motion.div>

      <motion.div
        variants={floatSlow}
        initial="initial"
        animate="animate"
        className="absolute top-[15%] right-[35%] text-primary/15 hover:text-primary/30 transition-colors duration-300"
        style={{ animationDelay: '1.2s' }}
      >
        <Target size={36} />
      </motion.div>

      <motion.div
        variants={floatFast}
        initial="initial"
        animate="animate"
        className="absolute bottom-[20%] left-[5%] text-accent/15 hover:text-accent/30 transition-colors duration-300"
        style={{ animationDelay: '2.5s' }}
      >
        <Flame size={48} />
      </motion.div>

      <motion.div
        variants={floatReverse}
        initial="initial"
        animate="animate"
        className="absolute top-[60%] left-[10%] text-secondary/15 hover:text-secondary/30 transition-colors duration-300"
        style={{ animationDelay: '0.3s' }}
      >
        <BarChart size={34} />
      </motion.div>
      
      <motion.div
        variants={float}
        initial="initial"
        animate="animate"
        className="absolute bottom-[25%] right-[25%] text-primary/15 hover:text-primary/30 transition-colors duration-300"
        style={{ animationDelay: '1.8s' }}
      >
        <Calendar size={38} />
      </motion.div>

      <motion.div
        variants={floatSlow}
        initial="initial"
        animate="animate"
        className="absolute top-[25%] left-[50%] -translate-x-1/2 text-accent/10 hover:text-accent/25 transition-colors duration-300"
        style={{ animationDelay: '3s' }}
      >
        <Medal size={42} />
      </motion.div>

      {/* Content */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
      >
        {/* Badge */}
        <motion.div
          variants={fadeInUp}
          className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/30 rounded-full text-primary text-sm font-medium mb-8 backdrop-blur-sm"
        >
          <Zap size={16} className="animate-pulse" />
          AI-Powered Fitness Revolution
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={textReveal}
          className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-text-primary mb-6 leading-tight"
        >
          Transform Your
          <br />
          <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Fitness Journey
          </span>
        </motion.h1>

        {/* Subcopy */}
        <motion.p
          variants={fadeInUp}
          custom={1}
          className="font-body text-xl md:text-2xl text-text-tertiary mb-12 max-w-3xl mx-auto leading-relaxed"
        >
          Personalized workout plans powered by AI. Track progress, crush goals, 
          and become the strongest version of yourself.
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={fadeInUp}
          custom={2}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white font-bold text-lg rounded-full shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-shadow duration-300"
          >
            Start Free Trial
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="px-8 py-4 bg-surface-primary/10 backdrop-blur-sm border-2 border-surface-border text-text-primary font-bold text-lg rounded-full hover:bg-surface-primary/20 transition-colors duration-300"
          >
            Watch Demo
          </motion.button>
        </motion.div>

        {/* Stats */}
        <motion.div
          variants={fadeInUp}
          custom={3}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
        >
          {[
            { value: '100K+', label: 'Active Users' },
            { value: '2M+', label: 'Workouts Completed' },
            { value: '50K+', label: 'Goals Achieved' },
            { value: '4.9★', label: 'User Rating' }
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-text-primary mb-2">{stat.value}</div>
              <div className="text-sm text-text-tertiary">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-10 border-2 border-text-tertiary/30 rounded-full flex items-start justify-center p-2"
          >
            <motion.div className="w-1 h-2 bg-primary rounded-full" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};
