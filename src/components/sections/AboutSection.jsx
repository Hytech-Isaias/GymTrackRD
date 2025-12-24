import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Target, Users, Award } from 'lucide-react';
import { fadeInUp, staggerContainer, slideInFromLeft, slideInFromRight } from '../../lib/animations/variants';

export const AboutSection = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

  return (
    <section id="about" className="relative py-32 bg-background overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-2 gap-16 items-center"
        >
          {/* Left: Image with Parallax */}
          <motion.div
            variants={slideInFromLeft}
            className="relative"
          >
            <motion.div
              style={{ y }}
              className="relative rounded-3xl overflow-hidden aspect-square"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/40 to-secondary/40" />
              <img 
                src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80"
                alt="Fitness Training"
                className="w-full h-full object-cover mix-blend-overlay"
                loading="lazy"
              />
              
              {/* Floating Stats Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
                className="absolute bottom-8 right-8 glass-panel p-6 rounded-2xl border border-surface-border backdrop-blur-md"
              >
                <div className="text-5xl font-bold text-text-primary mb-2">98%</div>
                <div className="text-sm text-text-secondary">Success Rate</div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right: Content */}
          <motion.div
            variants={slideInFromRight}
            className="space-y-8"
          >
            <div>
              <motion.div
                variants={fadeInUp}
                className="inline-block px-4 py-2 bg-primary/10 border border-primary/30 rounded-full text-primary text-sm font-medium mb-4"
              >
                About Us
              </motion.div>
              
              <motion.h2
                variants={fadeInUp}
                className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary mb-6"
              >
                Your Fitness,
                <br />
                <span className="text-gradient bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Our Mission
                </span>
              </motion.h2>
              
              <motion.p
                variants={fadeInUp}
                className="font-body text-lg text-text-secondary leading-relaxed mb-6"
              >
                We believe fitness should be accessible, personalized, and powered by 
                cutting-edge technology. Our AI-driven platform adapts to your goals, 
                schedule, and progress—making every workout count.
              </motion.p>
              
              <motion.p
                variants={fadeInUp}
                className="font-body text-lg text-text-secondary leading-relaxed"
              >
                Join thousands who've transformed their lives through intelligent training, 
                expert guidance, and a supportive community that celebrates every milestone.
              </motion.p>
            </div>

            {/* Core Values */}
            <motion.div
              variants={staggerContainer}
              className="grid gap-4"
            >
              {[
                { icon: Target, title: 'Goal-Oriented', description: 'Every plan tailored to your unique objectives' },
                { icon: Users, title: 'Community-Driven', description: 'Connect with motivated individuals worldwide' },
                { icon: Award, title: 'Results-Focused', description: 'Data-backed programs that deliver real outcomes' }
              ].map((value, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  custom={index}
                  className="flex items-start gap-4 p-4 rounded-xl bg-surface-primary/5 backdrop-blur-sm border border-surface-border hover:border-primary/30 transition-colors duration-300"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                    <value.icon className="text-primary" size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-text-primary mb-1">{value.title}</h4>
                    <p className="text-sm text-text-tertiary">{value.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
