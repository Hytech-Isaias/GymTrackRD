import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { MainLayout } from '../components/templates/MainLayout';
import { PlannerTool } from '../components/organisms/PlannerTool';
import { ProgressTracker } from '../components/organisms/ProgressTracker';
import { AIAssistant } from '../components/organisms/AIAssistant';
import { SEOHead } from '../components/atoms/SEOHead';
import { fadeInUp, staggerContainer } from '../lib/animations/variants';
import { 
  TrendingUp, 
  Sparkles, 
  Flame, 
  Activity, 
  Calendar,
  BarChart3,
  Timer,
  Target
} from 'lucide-react';

// Minimalist Stat Card with Horizontal Layout
const StatCard = ({ icon: Icon, label, value, trend, color = "primary" }) => {
  const colors = {
    primary: "border-primary/20 bg-surface-primary/50",
    secondary: "border-secondary/20 bg-surface-primary/50",
    accent: "border-accent/20 bg-surface-primary/50"
  };

  const iconColors = {
    primary: "text-primary",
    secondary: "text-secondary",
    accent: "text-accent"
  };

  const trendColors = {
    primary: "text-primary",
    secondary: "text-secondary",
    accent: "text-accent"
  };

  return (
    <motion.div
      whileHover={{ y: -2, scale: 1.01 }}
      className={`relative overflow-hidden p-5 rounded-xl border backdrop-blur-xl transition-all ${colors[color]}`}
    >
      <div className="flex items-center gap-4">
        {/* Icon */}
        <div className={`${iconColors[color]}`}>
          <Icon size={24} />
        </div>
        
        {/* Value and Label */}
        <div className="flex-1">
          <div className="text-2xl font-bold text-text-primary">{value}</div>
          <div className="text-xs text-text-tertiary uppercase tracking-wide">{label}</div>
        </div>

        {/* Trend */}
        {trend && (
          <div className={`text-sm font-bold ${trendColors[color]}`}>
            {trend > 0 ? '+' : ''}{trend}%
          </div>
        )}
      </div>
    </motion.div>
  );
};

// Minimalist Ad Component
const MinimalAd = ({ size = 'sm', position = 'top' }) => {
  const sizes = {
    xs: 'h-16',
    sm: 'h-24',
    md: 'h-40',
    lg: 'h-60'
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.01 }}
      className={`group relative overflow-hidden bg-surface-secondary/50 ${sizes[size]} rounded-xl border border-surface-border backdrop-blur-md flex items-center justify-center`}
    >
      {/* Subtle animated gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative z-10 text-center">
        <Sparkles className="mx-auto mb-1 text-text-tertiary" size={18} />
        <p className="text-[9px] uppercase tracking-widest text-text-tertiary font-medium">Advertisement</p>
      </div>
    </motion.div>
  );
};

const PlannerPage = () => {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);

  return (
    <MainLayout title="" description="" className="pt-16 bg-background">
      <SEOHead 
        title="Dashboard" 
        description="Manage your weekly fitness schedule and track progress." 
      />
      
      {/* Hero with Parallax Effect */}
      <motion.div 
        style={{ opacity }}
        className="relative min-h-[30vh] flex items-center justify-center overflow-hidden bg-background"
      >
        {/* Background Gradient Mesh */}
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-background to-background" />

        {/* Animated Background Blobs */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-20 right-1/4 w-80 h-80 bg-secondary/10 rounded-full blur-3xl animate-float-slow" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-4 text-center py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-3"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-primary text-sm font-medium backdrop-blur-sm">
              <Activity size={16} className="animate-pulse" />
              Dashboard Overview
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display text-3xl md:text-5xl font-bold text-text-primary mb-3"
          >
            Your Fitness
            <br />
            <span className="text-gradient">
              Command Center
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-text-secondary text-base max-w-xl mx-auto"
          >
            Track, analyze, and optimize your fitness journey
          </motion.p>
        </div>
      </motion.div>
      
      <div className="container mx-auto px-4 py-6 relative z-10 -mt-16">
        {/* Stats Grid - Minimalist */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          <motion.div variants={fadeInUp}>
            <StatCard icon={Flame} label="Streak" value="12 days" trend={+15} color="primary" />
          </motion.div>
          <motion.div variants={fadeInUp} custom={1}>
            <StatCard icon={Calendar} label="This Week" value="4/7" trend={+20} color="primary" />
          </motion.div>
          <motion.div variants={fadeInUp} custom={2}>
            <StatCard icon={Timer} label="Avg Duration" value="32 min" trend={-5} color="primary" />
          </motion.div>
          <motion.div variants={fadeInUp} custom={3}>
            <StatCard icon={BarChart3} label="Total Workouts" value="84" trend={+12} color="primary" />
          </motion.div>
        </motion.div>

        {/* Top Ad - Minimal */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mb-6"
        >
          <MinimalAd size="sm" position="top" />
        </motion.div>

        {/* Main Content Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-12 gap-4"
        >
          {/* Left Column: Main Content */}
          <div className="lg:col-span-8 space-y-4">
            {/* AI Assistant - Compact */}
            <motion.div variants={fadeInUp}>
              <AIAssistant />
            </motion.div>

            {/* Mid Ad */}
            <motion.div variants={fadeInUp} custom={1} className="lg:hidden">
              <MinimalAd size="md" />
            </motion.div>

            {/* Planner Tool */}
            <motion.div variants={fadeInUp} custom={2}>
              <PlannerTool />
            </motion.div>
          </div>

          {/* Right Sidebar: Progress & Insights */}

          <div className="lg:col-span-4 space-y-4">
            {/* Sidebar Ad 1 */}
            <motion.div variants={fadeInUp} custom={2}>
              <MinimalAd size="md" />
            </motion.div>

            {/* Progress Tracker */}
            <motion.div variants={fadeInUp}>
              <ProgressTracker />
            </motion.div>

            {/* Sidebar Ad 2 */}
            <motion.div variants={fadeInUp} custom={1}>
              <MinimalAd size="lg" />
            </motion.div>

            {/* Quick Insights Card */}
            <motion.div
              variants={fadeInUp}
              custom={2}
              className="glass-panel p-6 rounded-2xl border border-surface-border backdrop-blur-xl"
            >
              <div className="flex items-center gap-2 mb-6">
                <Target className="text-secondary" size={20} />
                <h3 className="font-bold text-text-primary">Weekly Insights</h3>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                  <div>
                    <p className="text-sm text-text-primary font-medium">Strong Start!</p>
                    <p className="text-xs text-text-tertiary">You're 20% ahead of last week</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-secondary mt-2" />
                  <div>
                    <p className="text-sm text-text-primary font-medium">Consistency Win</p>
                    <p className="text-xs text-text-tertiary">12-day workout streak</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-accent mt-2" />
                  <div>
                    <p className="text-sm text-text-primary font-medium">Goal Progress</p>
                    <p className="text-xs text-text-tertiary">68% towards monthly target</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Sidebar Ad 3 */}
            <motion.div variants={fadeInUp} custom={3}>
              <MinimalAd size="lg" />
            </motion.div>
            
            {/* Sidebar Ad 4 */}
            <motion.div variants={fadeInUp} custom={3}>
              <MinimalAd size="lg" />
            </motion.div>
          </div>
        </motion.div>

        {/* Bottom Ad */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="mt-8"
        >
          <MinimalAd size="sm" position="bottom" />
        </motion.div>
      </div>
    </MainLayout>
  );
};

export default PlannerPage;
