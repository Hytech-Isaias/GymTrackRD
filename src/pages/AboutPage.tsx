import { useEffect } from "react";
import { AboutSection } from "../components/sections/AboutSection";
import { Footer } from "../components/organisms/Footer";
import { SEOHead } from "../components/atoms/SEOHead";
import { Advertisement } from "../components/atoms/Advertisement";
import { motion } from "framer-motion";
import { Target, Users, Zap, Heart, Award, TrendingUp } from "lucide-react";
import { getOrganizationSchema } from "../lib/seo/schema";

const AboutPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="About Us - AI-Powered Fitness Platform | GymTrackRD"
        description="Learn about GymTrackRD's mission to democratize fitness through AI. Meet our team and discover how we're revolutionizing personalized workout planning and tracking."
        schema={getOrganizationSchema()}
      />
      <div className="pt-20">
        <AboutSection />

        {/* Ad after About Section */}
        <div className="container mx-auto px-4 py-6">
          <Advertisement position="top" className="max-w-5xl mx-auto" />
        </div>

        {/* Mission & Vision */}
        <section className="container mx-auto px-4 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-6">
              Our Mission & Vision
            </h2>
            <p className="text-text-secondary text-lg leading-relaxed mb-8">
              Founded in 2025, GymTrackRD was born from a simple yet powerful idea: 
              everyone deserves access to elite-level fitness guidance. By leveraging 
              cutting-edge AI technology, we've democratized personal training, making 
              it accessible, affordable, and personalized for everyone.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-panel p-8 rounded-2xl border border-surface-border"
            >
              <Target className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-2xl font-bold text-text-primary mb-4">Our Mission</h3>
              <p className="text-text-secondary leading-relaxed">
                To empower individuals worldwide with AI-driven fitness solutions that 
                adapt to their unique goals, preferences, and lifestyles. We believe 
                fitness should be inclusive, sustainable, and scientifically backed.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-panel p-8 rounded-2xl border border-surface-border"
            >
              <Zap className="w-12 h-12 text-secondary mb-4" />
              <h3 className="text-2xl font-bold text-text-primary mb-4">Our Vision</h3>
              <p className="text-text-secondary leading-relaxed">
                To become the world's most trusted AI fitness companion, transforming 
                how millions achieve their health goals through intelligent, personalized, 
                and evidence-based training programs that evolve with you.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Core Values */}
        <section className="bg-surface-secondary/30 py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-text-primary mb-12">
              Our Core Values
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {[
                {
                  icon: Users,
                  title: "User-Centric",
                  description: "Every feature, every algorithm, every decision is made with our users' success in mind."
                },
                {
                  icon: Award,
                  title: "Excellence",
                  description: "We strive for the highest quality in our AI models, user experience, and customer support."
                },
                {
                  icon: Heart,
                  title: "Inclusivity",
                  description: "Fitness is for everyone, regardless of age, ability, or experience level."
                },
              ].map((value, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="glass-panel p-6 rounded-xl text-center border border-surface-border"
                >
                  <value.icon className="w-10 h-10 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-text-primary mb-3">{value.title}</h3>
                  <p className="text-text-secondary">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Additional square ad */}
        <div className="container mx-auto px-4 py-6">
          <Advertisement position="square" className="max-w-md mx-auto" />
        </div>

        {/* Ad after Core Values */}
        <div className="container mx-auto px-4 py-6">
          <Advertisement position="top" className="max-w-5xl mx-auto" />
        </div>

        {/* Stats Section */}
        <section className="container mx-auto px-4 py-20">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
              Our Impact in Numbers
            </h2>
            <p className="text-text-secondary text-lg">
              Join thousands who have transformed their fitness journey with GymTrackRD
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { label: "Active Users", value: "50,000+", icon: Users },
              { label: "Workouts Generated", value: "2M+", icon: TrendingUp },
              { label: "Countries", value: "85+", icon: Target },
              { label: "Success Rate", value: "94%", icon: Award },
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="glass-panel p-8 rounded-2xl text-center border border-surface-border hover:border-primary/50 transition-all"
              >
                <stat.icon className="w-8 h-8 text-primary mx-auto mb-3" />
                <div className="text-4xl font-bold text-primary mb-2">
                  {stat.value}
                </div>
                <div className="text-text-tertiary">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Square ad after stats */}
        <div className="container mx-auto px-4 py-6">
          <Advertisement position="square" className="max-w-md mx-auto" />
        </div>

        {/* Ad before Team Section */}
        <div className="container mx-auto px-4 py-6">
          <Advertisement position="top" className="max-w-5xl mx-auto" />
        </div>

        {/* Team Section */}
        <section className="bg-surface-secondary/30 py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-text-primary mb-4">
              Meet Our Team
            </h2>
            <p className="text-center text-text-secondary text-lg mb-12 max-w-2xl mx-auto">
              A passionate team of fitness experts, AI engineers, and health enthusiasts 
              dedicated to revolutionizing your workout experience.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                {
                  name: "Dr. Sarah Mitchell",
                  role: "Chief Science Officer",
                  bio: "PhD in Exercise Physiology with 15+ years in sports science and AI research."
                },
                {
                  name: "James Rodriguez",
                  role: "Lead AI Engineer",
                  bio: "Former Google engineer specializing in machine learning and personalization algorithms."
                },
                {
                  name: "Emily Chen",
                  role: "Head of Product",
                  bio: "NASM-certified trainer and UX expert passionate about making fitness accessible."
                },
              ].map((member, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="glass-panel p-6 rounded-xl border border-surface-border text-center"
                >
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 mx-auto mb-4 flex items-center justify-center">
                    <span className="text-3xl font-bold text-primary">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-text-primary mb-1">{member.name}</h3>
                  <p className="text-primary font-medium mb-3">{member.role}</p>
                  <p className="text-text-secondary text-sm">{member.bio}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Technology Section */}
        <section className="container mx-auto px-4 py-20">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-6">
              Powered by Advanced AI
            </h2>
            <p className="text-text-secondary text-lg leading-relaxed mb-8">
              Our proprietary AI algorithms analyze your fitness level, goals, available equipment, 
              and preferences to generate personalized workout plans that adapt in real-time. 
              We combine machine learning with evidence-based exercise science to deliver results 
              that traditional one-size-fits-all programs simply can't match.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              {["Machine Learning", "Natural Language Processing", "Predictive Analytics", 
                "Adaptive Algorithms", "Computer Vision", "Data Science"].map((tech, idx) => (
                <span key={idx} className="px-4 py-2 bg-primary/10 text-primary rounded-full border border-primary/20">
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>
        </section>
      </div>
      
      {/* Bottom Ad before Footer */}
      <div className="container mx-auto px-4 py-8">
        <Advertisement position="bottom" className="max-w-5xl mx-auto" />
      </div>
      
      <Footer />
    </div>
  );
};

export default AboutPage;
