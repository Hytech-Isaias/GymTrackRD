import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Users, Dumbbell, Flame, Trophy } from "lucide-react";
import { staggerContainer, fadeInUp } from "../../lib/animations/variants";

// Animated counter hook
const useCounter = (end: number, duration = 2000, inView: boolean) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;

    let startTime: number | undefined;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);

      setCount(Math.floor(progress * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, inView]);

  return count;
};

interface StatCounterProps {
  icon: React.ElementType;
  value: number;
  label: string;
  suffix?: string;
  inView: boolean;
}

const StatCounter = ({
  icon: Icon,
  value,
  label,
  suffix = "",
  inView,
}: StatCounterProps) => {
  const count = useCounter(value, 2000, inView);

  return (
    <motion.div variants={fadeInUp} className="text-center">
      <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-surface-secondary border border-surface-border mb-4">
        <Icon className="text-primary" size={36} />
      </div>
      <div className="text-5xl md:text-6xl font-bold text-text-primary mb-2">
        {count.toLocaleString()}
        {suffix}
      </div>
      <div className="text-text-tertiary text-lg">{label}</div>
    </motion.div>
  );
};

export const CommunitySection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <section
      id="community"
      className="relative py-32 bg-background overflow-hidden"
    >
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-float-slow" />
      </div>

      <div
        ref={ref}
        className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
      >
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-20"
        >
          <motion.h2
            variants={fadeInUp}
            className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary mb-6"
          >
            Join the
            <br />
            <span className="text-gradient bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
              Movement
            </span>
          </motion.h2>

          <motion.p
            variants={fadeInUp}
            className="font-body text-xl text-text-secondary max-w-2xl mx-auto"
          >
            Be part of a global community crushing goals and redefining what's
            possible.
          </motion.p>
        </motion.div>

        {/* Animated Stats */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-20"
        >
          <StatCounter
            icon={Users}
            value={100000}
            suffix="+"
            label="Active Members"
            inView={inView}
          />
          <StatCounter
            icon={Dumbbell}
            value={2500000}
            suffix="+"
            label="Workouts Logged"
            inView={inView}
          />
          <StatCounter
            icon={Flame}
            value={50000000}
            suffix="+"
            label="Calories Burned"
            inView={inView}
          />
          <StatCounter
            icon={Trophy}
            value={75000}
            suffix="+"
            label="Goals Achieved"
            inView={inView}
          />
        </motion.div>
      </div>
    </section>
  );
};
