import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { SEOHead } from "../components/atoms/SEOHead";
import { Footer } from "../components/organisms/Footer";
import {
  ArrowLeft,
  Calculator,
  BookOpen,
  Utensils,
  HelpCircle,
  TrendingUp,
  Apple,
  Droplet,
  Clock,
  Target,
  User,
  Calendar as CalendarIcon,
} from "lucide-react";
import { motion } from "framer-motion";
import { Advertisement } from "../components/atoms/Advertisement";

const ResourcesPage = () => {
  const { type, id } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [type, id]);

  const renderContent = () => {
    // Check if it's a blog article route
    if (type === "blog" && id) {
      return <BlogArticle articleId={id} />;
    }

    switch (type) {
      case "roi-calculator":
        return <ROICalculator />;
      case "fitness-blog":
        return <BlogList />;
      case "nutrition-guide":
        return <NutritionGuide />;
      case "help-center":
        return <HelpCenter />;
      default:
        return <ResourcesOverview />;
    }
  };

  const title = type
    ? type
        .split("-")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ")
    : "Resources";

  return (
    <div className="min-h-screen bg-background pt-24 pb-12">
      <SEOHead
        title={`${title} | GymTrackRD - Free Fitness Resources`}
        description="Access free fitness resources, calculators, nutrition guides, and expert advice to help you achieve your health and wellness goals."
      />

      <div className="container mx-auto px-4 max-w-5xl">
        <Link
          to="/"
          className="inline-flex items-center text-text-tertiary hover:text-primary mb-6 transition-colors"
        >
          <ArrowLeft size={16} className="mr-2" /> Back to Home
        </Link>

        {renderContent()}
      </div>

      <div className="mt-20">
        <Footer />
      </div>
    </div>
  );
};

const ResourcesOverview = () => (
  <div>
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center mb-12"
    >
      <h1 className="text-4xl md:text-5xl font-bold text-gradient mb-4">
        Fitness Resources
      </h1>
      <p className="text-text-secondary text-lg max-w-2xl mx-auto">
        Everything you need to succeed on your fitness journey - completely free.
      </p>
    </motion.div>

    <Advertisement position="top" className="mb-8" />

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {[
        {
          title: "Fitness Blog",
          icon: BookOpen,
          path: "/resources/fitness-blog",
          desc: "Expert tips, workout guides, and motivational content to keep you inspired and informed.",
          color: "primary",
        },
        {
          title: "Nutrition Guide",
          icon: Utensils,
          path: "/resources/nutrition-guide",
          desc: "Science-backed nutrition strategies, meal planning tips, and healthy eating made simple.",
          color: "secondary",
        },
        {
          title: "Fitness ROI Calculator",
          icon: Calculator,
          path: "/resources/roi-calculator",
          desc: "Calculate your potential calorie burn, fat loss, and fitness gains based on your workout commitment.",
          color: "primary",
        },
        {
          title: "Help Center",
          icon: HelpCircle,
          path: "/resources/help-center",
          desc: "Find answers to common questions, troubleshooting guides, and platform support.",
          color: "secondary",
        },
      ].map((item, idx) => (
        <motion.div
          key={item.path}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.1 }}
        >
          <Link
            to={item.path}
            className="block glass-panel p-8 rounded-2xl border border-surface-border hover:border-primary transition-all group h-full"
          >
            <item.icon className="w-10 h-10 text-primary mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-2xl font-bold text-text-primary mb-2 group-hover:text-primary transition-colors">
              {item.title}
            </h3>
            <p className="text-text-secondary mb-4">{item.desc}</p>
            <span className="text-primary font-medium text-sm group-hover:translate-x-2 transition-transform inline-flex items-center gap-1">
              Learn More →
            </span>
          </Link>
        </motion.div>
      ))}
    </div>
  </div>
);

const ROICalculator = () => {
  const [hours, setHours] = useState(5);
  const [years, setYears] = useState(1);
  const [intensity, setIntensity] = useState<"low" | "moderate" | "high">("moderate");

  const intensityMultiplier = {
    low: 300,
    moderate: 500,
    high: 700,
  };

  const caloriesPerSession = intensityMultiplier[intensity];
  const totalCalories = hours * caloriesPerSession * 52 * years;
  const pounds = Math.floor(totalCalories / 3500);
  const muscleGain = Math.floor(hours * 0.5 * 52 * years); // rough estimate

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-bold text-gradient mb-2 flex items-center gap-3">
          <Calculator className="w-10 h-10" /> Fitness ROI Calculator
        </h1>
        <p className="text-text-secondary">
          Visualize your fitness potential based on weekly commitment and training intensity.
        </p>
      </motion.div>
      <Advertisement position="top" className="mb-6" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-panel p-8 rounded-2xl max-w-3xl mx-auto"
      >
        <div className="space-y-6 mb-8">
          <div>
            <label className="block text-text-secondary mb-2 font-medium">
              Weekly Workout Hours: <span className="text-primary font-bold">{hours}</span>
            </label>
            <input
              type="range"
              min="1"
              max="20"
              value={hours}
              onChange={(e) => setHours(Number(e.target.value))}
              className="w-full accent-primary h-2 bg-surface-tertiary rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-text-tertiary mt-1">
              <span>1 hour</span>
              <span>20 hours</span>
            </div>
          </div>

          <div>
            <label className="block text-text-secondary mb-2 font-medium">
              Training Intensity
            </label>
            <div className="grid grid-cols-3 gap-3">
              {(["low", "moderate", "high"] as const).map((level) => (
                <button
                  key={level}
                  onClick={() => setIntensity(level)}
                  className={`px-4 py-3 rounded-lg font-medium transition-all ${
                    intensity === level
                      ? "bg-primary text-white"
                      : "bg-surface-secondary/50 text-text-secondary hover:bg-surface-secondary border border-surface-border"
                  }`}
                >
                  {level.charAt(0).toUpperCase() + level.slice(1)}
                </button>
              ))}
            </div>
            <p className="text-xs text-text-tertiary mt-2">
              {intensity === "low" && "Light activity: Walking, yoga, stretching"}
              {intensity === "moderate" && "Moderate activity: Jogging, resistance training"}
              {intensity === "high" && "High intensity: HIIT, competitive sports, heavy lifting"}
            </p>
          </div>

          <div>
            <label className="block text-text-secondary mb-2 font-medium">
              Years of Consistency: <span className="text-primary font-bold">{years}</span>
            </label>
            <input
              type="range"
              min="1"
              max="10"
              value={years}
              onChange={(e) => setYears(Number(e.target.value))}
              className="w-full accent-primary h-2 bg-surface-tertiary rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-text-tertiary mt-1">
              <span>1 year</span>
              <span>10 years</span>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-primary/10 to-secondary/10 p-6 rounded-xl border border-primary/20">
          <h3 className="text-lg font-bold text-text-primary mb-4 text-center">Your Projected Results</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-center">
            <div className="bg-surface-primary/50 p-4 rounded-lg">
              <Droplet className="w-6 h-6 text-primary mx-auto mb-2" />
              <div className="text-sm text-text-tertiary mb-1">Calories Burned</div>
              <div className="text-2xl font-bold text-primary">
                {totalCalories.toLocaleString()}
              </div>
            </div>
            <div className="bg-surface-primary/50 p-4 rounded-lg">
              <TrendingUp className="w-6 h-6 text-secondary mx-auto mb-2" />
              <div className="text-sm text-text-tertiary mb-1">Est. Fat Loss</div>
              <div className="text-2xl font-bold text-secondary">{pounds} lbs</div>
            </div>
            <div className="bg-surface-primary/50 p-4 rounded-lg md:col-span-1 col-span-2">
              <Target className="w-6 h-6 text-primary mx-auto mb-2" />
              <div className="text-sm text-text-tertiary mb-1">Muscle Potential</div>
              <div className="text-2xl font-bold text-primary">{muscleGain}+ lbs</div>
            </div>
          </div>
        </div>

        <div className="mt-6 p-4 bg-surface-secondary/30 rounded-lg border border-surface-border">
          <p className="text-xs text-text-tertiary text-center">
            *These are estimates based on average values. Actual results vary based on diet, genetics, and individual factors.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

const BlogArticle = ({ articleId }: { articleId: string }) => {
  const articles: Record<string, { title: string; category: string; readTime: string; date: string; author: string; content: string[] }> = {
    "progressive-overload-guide": {
      title: "The Ultimate Guide to Progressive Overload",
      category: "Strength Training",
      readTime: "8 min read",
      date: "December 20, 2025",
      author: "Dr. Sarah Martinez",
      content: [
        "Progressive overload is the cornerstone of any successful strength training program. It's the gradual increase of stress placed on your body during exercise, forcing your muscles to adapt and grow stronger over time.",
        "The principle is simple: to continue making gains, you must consistently challenge your muscles beyond their current capacity. This can be achieved through various methods including increasing weight, reps, sets, or reducing rest time.",
        "Research shows that progressive overload is essential for muscle hypertrophy and strength gains. Without it, your body adapts to the current stimulus and plateaus, halting your progress.",
        "Key methods to implement progressive overload: 1) Increase weight by 2.5-5% when you can complete all prescribed reps with good form, 2) Add 1-2 reps per set when increasing weight isn't feasible, 3) Add an extra set to your exercises, 4) Decrease rest periods between sets by 10-15 seconds, 5) Improve exercise technique and tempo control.",
        "Remember to track your workouts meticulously. Keep a detailed log of weights, sets, reps, and how each session felt. This data is crucial for making informed decisions about when and how to progress.",
        "Be patient and consistent. Progressive overload is a marathon, not a sprint. Expect to add small amounts of weight or reps over weeks and months, not days. Trust the process and the results will come."
      ]
    },
    "hiit-vs-steady-cardio": {
      title: "HIIT vs Steady-State Cardio: Which Burns More Fat?",
      category: "Cardio",
      readTime: "6 min read",
      date: "December 18, 2025",
      author: "Coach Mike Thompson",
      content: [
        "The debate between HIIT (High-Intensity Interval Training) and steady-state cardio has been ongoing for years. Both have their place in a well-rounded fitness program, but they work differently.",
        "HIIT involves short bursts of maximum effort followed by brief recovery periods. Studies show it can burn more calories in less time and create an 'afterburn effect' (EPOC) that keeps your metabolism elevated for hours post-workout.",
        "Steady-state cardio, on the other hand, maintains a consistent moderate pace for extended periods. It's excellent for building aerobic endurance, is easier on the joints, and can be sustained for longer durations.",
        "Research indicates that HIIT may burn up to 30% more calories than traditional cardio in the same amount of time. However, steady-state cardio burns a higher percentage of calories from fat during the actual workout.",
        "The best approach? Incorporate both! Use HIIT 2-3 times per week for efficiency and metabolic benefits, and add steady-state cardio 1-2 times weekly for active recovery and endurance building.",
        "Listen to your body and consider your fitness level. Beginners should start with steady-state and gradually introduce HIIT as conditioning improves."
      ]
    },
    "workout-nutrition-science": {
      title: "Pre and Post-Workout Nutrition: What Science Says",
      category: "Nutrition",
      readTime: "10 min read",
      date: "December 15, 2025",
      author: "Dr. Sarah Martinez",
      content: [
        "Proper nutrition around your workouts can significantly impact performance, recovery, and results. Let's dive into what science actually says about pre and post-workout nutrition.",
        "Pre-workout nutrition serves two main purposes: providing energy for your session and preventing muscle breakdown. Ideally, consume a meal 2-3 hours before training with a mix of carbs and protein.",
        "If training within an hour, opt for easily digestible carbs like a banana or energy bar. Protein isn't as critical immediately pre-workout unless you're training fasted.",
        "Post-workout is your 'anabolic window' - though research shows it's wider than once thought (up to several hours). The key is consuming protein to stimulate muscle protein synthesis and carbs to replenish glycogen.",
        "Aim for 20-40g of protein post-workout, depending on body size and workout intensity. Pair with carbs at a 2:1 or 3:1 ratio to protein for optimal recovery.",
        "Hydration is equally important. Drink 16-20oz of water 2-3 hours before exercise, and 8oz every 15-20 minutes during. Post-workout, replenish based on sweat loss - roughly 16-24oz per pound lost.",
        "Supplements like creatine, beta-alanine, and caffeine have strong scientific backing for performance enhancement. However, whole foods should always form the foundation of your nutrition strategy."
      ]
    },
    "common-squat-mistakes": {
      title: "5 Common Squat Mistakes and How to Fix Them",
      category: "Technique",
      readTime: "7 min read",
      date: "December 12, 2025",
      author: "Coach Mike Thompson",
      content: [
        "The squat is the king of exercises, but it's also one of the most commonly performed incorrectly. Let's address the five most frequent mistakes and their solutions.",
        "Mistake #1: Knees caving inward (valgus collapse). This puts tremendous stress on the knee joint and can lead to injury. Fix: Focus on driving knees outward, strengthen glutes with targeted exercises, and reduce weight until form improves.",
        "Mistake #2: Not going deep enough. Quarter squats severely limit muscle activation and strength gains. Fix: Work on mobility (especially ankles and hips), use box squats to gauge depth, and aim for at least parallel or below.",
        "Mistake #3: Heels lifting off the ground. This shifts weight forward and reduces power. Fix: Improve ankle mobility, try elevated heel squat shoes, or place small plates under heels temporarily while working on flexibility.",
        "Mistake #4: Excessive forward lean. While some forward lean is natural, too much can strain the lower back. Fix: Strengthen your core, work on thoracic spine mobility, and ensure you're bracing properly throughout the movement.",
        "Mistake #5: Not bracing the core. This creates instability and increases injury risk. Fix: Take a deep breath before descending, brace your abs as if preparing for a punch, maintain this tension throughout the rep.",
        "Film yourself squatting from multiple angles. Often we don't realize our form issues until we see them. Be honest about your weaknesses and address them systematically."
      ]
    },
    "home-gym-budget": {
      title: "Building a Home Gym on a Budget",
      category: "Equipment",
      readTime: "5 min read",
      date: "December 10, 2025",
      author: "Alex Rivera",
      content: [
        "You don't need thousands of dollars to build an effective home gym. With smart purchasing and prioritization, you can create a functional training space for under $500.",
        "Start with the essentials: A quality barbell and weight plates are your foundation. Look for used options on marketplace sites - you can often find Olympic barbells for $100-150. Start with 300lbs of plates ($150-200 used).",
        "Invest in adjustable dumbbells. While new PowerBlocks or Bowflex can cost $300+, there are budget alternatives like Yes4All adjustable dumbbells for under $100 that work great.",
        "A sturdy bench is crucial. Don't cheap out here - a wobbly bench is dangerous. Budget $100-150 for a decent adjustable bench that allows flat, incline, and decline positions.",
        "Add resistance bands ($20-40) for warm-ups and accessory work. A pull-up bar ($20-30) provides incredible value for upper body development. Consider gymnastic rings ($30) as a versatile alternative.",
        "Skip the machines initially. Barbells, dumbbells, and bodyweight movements can train every muscle group effectively. As budget allows, add a power rack ($200-400 used) for safety and exercise variety.",
        "Shop used equipment, but inspect carefully for damage. Black Friday and New Year sales offer great deals on new equipment. Build gradually - you don't need everything at once."
      ]
    },
    "recovery-muscle-growth": {
      title: "The Role of Recovery in Muscle Growth",
      category: "Recovery",
      readTime: "9 min read",
      date: "December 8, 2025",
      author: "Dr. Sarah Martinez",
      content: [
        "Muscle growth doesn't happen in the gym - it happens during recovery. Understanding and optimizing recovery is just as important as your training program.",
        "When you train, you create micro-tears in muscle fibers. Recovery is when your body repairs these tears, building them back stronger and larger. This process requires adequate rest, nutrition, and sleep.",
        "Sleep is your most powerful recovery tool. During deep sleep, growth hormone levels peak, facilitating muscle repair and growth. Aim for 7-9 hours nightly. Even one night of poor sleep can significantly impact recovery and performance.",
        "Nutrition fuels recovery. You need sufficient protein (0.8-1g per pound of bodyweight) to rebuild muscle tissue, and adequate calories to support the anabolic process. Don't undereat while trying to build muscle.",
        "Active recovery strategies: Light cardio, stretching, and foam rolling can improve blood flow and reduce muscle soreness without impeding recovery. Contrast showers (alternating hot and cold) may also help.",
        "Stress management is crucial. Chronic stress elevates cortisol, a catabolic hormone that breaks down muscle tissue. Practice stress-reduction techniques like meditation, yoga, or simple breathing exercises.",
        "Listen to your body. Persistent fatigue, decreased performance, or unusual muscle soreness may indicate inadequate recovery. Don't be afraid to take an extra rest day - it's better than pushing into overtraining.",
        "Plan deload weeks every 4-8 weeks. Reduce training volume and intensity by 40-60% to allow full recovery. You'll come back stronger and avoid burnout."
      ]
    }
  };

  const article = articles[articleId];

  if (!article) {
    return (
      <div className="text-center py-20">
        <BookOpen className="w-16 h-16 text-text-tertiary mx-auto mb-4 opacity-50" />
        <h2 className="text-2xl font-bold text-text-primary mb-2">Article Not Found</h2>
        <p className="text-text-tertiary mb-6">The article you're looking for doesn't exist.</p>
        <Link to="/resources/fitness-blog" className="text-primary hover:underline">
          ← Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <Link to="/resources/fitness-blog" className="text-primary hover:underline inline-flex items-center gap-2 mb-6">
        <ArrowLeft size={16} /> Back to Blog
      </Link>

      <Advertisement position="top" className="mb-6" />

      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel p-8 rounded-2xl border border-surface-border"
      >
        <span className="text-xs px-3 py-1 bg-primary/10 text-primary rounded-full border border-primary/20 inline-block mb-4">
          {article.category}
        </span>
        
        <h1 className="text-4xl font-bold text-gradient mb-4">{article.title}</h1>
        
        <div className="flex flex-wrap items-center gap-4 text-sm text-text-tertiary mb-8 pb-6 border-b border-surface-border">
          <span className="flex items-center gap-1">
            <User className="w-4 h-4" />
            {article.author}
          </span>
          <span className="flex items-center gap-1">
            <CalendarIcon className="w-4 h-4" />
            {article.date}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {article.readTime}
          </span>
        </div>

        <Advertisement position="top" className="my-6" />

        <div className="prose prose-invert max-w-none">
          {article.content.map((paragraph, idx) => (
            <p key={idx} className="text-text-secondary leading-relaxed mb-4 text-base">
              {paragraph}
            </p>
          ))}
        </div>

        <div className="mt-8 pt-6 border-t border-surface-border">
          <Link to="/resources/fitness-blog" className="text-primary hover:underline inline-flex items-center gap-2">
            <ArrowLeft size={16} /> Read More Articles
          </Link>
        </div>
      </motion.article>
    </div>
  );
};

const BlogList = () => {
  const blogPosts = [
    {
      id: "progressive-overload-guide",
      title: "The Ultimate Guide to Progressive Overload",
      excerpt: "Learn the science behind progressive overload and how to systematically increase your strength gains over time with proven strategies.",
      category: "Strength Training",
      readTime: "8 min read",
    },
    {
      id: "hiit-vs-steady-cardio",
      title: "HIIT vs Steady-State Cardio: Which Burns More Fat?",
      excerpt: "Discover the metabolic differences between HIIT and traditional cardio, and find out which approach is best for your fat loss goals.",
      category: "Cardio",
      readTime: "6 min read",
    },
    {
      id: "workout-nutrition-science",
      title: "Pre and Post-Workout Nutrition: What Science Says",
      excerpt: "Optimize your performance and recovery with evidence-based nutrition strategies for before and after your workouts.",
      category: "Nutrition",
      readTime: "10 min read",
    },
    {
      id: "common-squat-mistakes",
      title: "5 Common Squat Mistakes and How to Fix Them",
      excerpt: "Perfect your squat form with these expert tips to prevent injuries and maximize muscle activation.",
      category: "Technique",
      readTime: "7 min read",
    },
    {
      id: "home-gym-budget",
      title: "Building a Home Gym on a Budget",
      excerpt: "Get the most value from your fitness investment with our guide to essential equipment and smart purchasing decisions.",
      category: "Equipment",
      readTime: "5 min read",
    },
    {
      id: "recovery-muscle-growth",
      title: "The Role of Recovery in Muscle Growth",
      excerpt: "Understand why rest days are just as important as training days, and learn strategies to optimize your recovery.",
      category: "Recovery",
      readTime: "9 min read",
    },
  ];

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-bold text-gradient mb-2 flex items-center gap-3">
          <BookOpen className="w-10 h-10" /> Fitness Blog
        </h1>
        <p className="text-text-secondary">
          Expert insights, training tips, and evidence-based fitness advice.
        </p>
      </motion.div>

      <Advertisement position="top" className="mb-6" />

      <div className="flex flex-col gap-6">
        {blogPosts.map((post, i) => (
          <Link key={i} to={`/resources/blog/${post.id}`}>
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="glass-panel p-6 rounded-xl border border-surface-border hover:border-primary/50 transition-all group cursor-pointer"
            >
            <div className="flex items-start justify-between gap-4 mb-3">
              <span className="text-xs px-3 py-1 bg-primary/10 text-primary rounded-full border border-primary/20">
                {post.category}
              </span>
              <span className="text-xs text-text-tertiary flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {post.readTime}
              </span>
            </div>
            <h2 className="text-2xl font-bold text-text-primary mb-3 group-hover:text-primary transition-colors">
              {post.title}
            </h2>
            <p className="text-text-secondary mb-4 leading-relaxed">{post.excerpt}</p>
            <span className="text-primary font-medium hover:underline inline-flex items-center gap-1">
              Read Full Article →
            </span>
          </motion.article>
          </Link>
        ))}
      </div>
    </div>
  );
};


const NutritionGuide = () => (
  <div>
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-8"
    >
      <h1 className="text-4xl font-bold text-gradient mb-2 flex items-center gap-3">
        <Utensils className="w-10 h-10" /> Nutrition Guide
      </h1>
      <p className="text-text-secondary">
        Science-backed nutrition strategies for optimal fitness performance.
      </p>
    </motion.div>

    <Advertisement position="top" className="mb-6" />

    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel p-8 rounded-2xl border border-surface-border"
      >
        <h2 className="text-2xl font-bold text-text-primary mb-6">Macronutrient Breakdown</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-6 bg-surface-secondary/30 rounded-xl">
            <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-primary">P</span>
            </div>
            <h3 className="font-bold text-text-primary mb-2">Protein</h3>
            <p className="text-sm text-text-secondary mb-3">
              0.8-1.2g per lb of body weight
            </p>
            <ul className="text-xs text-text-tertiary space-y-1 text-left">
              <li>• Muscle repair and growth</li>
              <li>• Satiety and appetite control</li>
              <li>• Immune function support</li>
            </ul>
          </div>
          
          <div className="text-center p-6 bg-surface-secondary/30 rounded-xl">
            <div className="w-16 h-16 rounded-full bg-secondary/20 flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-secondary">C</span>
            </div>
            <h3 className="font-bold text-text-primary mb-2">Carbohydrates</h3>
            <p className="text-sm text-text-secondary mb-3">
              45-65% of total calories
            </p>
            <ul className="text-xs text-text-tertiary space-y-1 text-left">
              <li>• Primary energy source</li>
              <li>• Glycogen replenishment</li>
              <li>• Athletic performance fuel</li>
            </ul>
          </div>
          
          <div className="text-center p-6 bg-surface-secondary/30 rounded-xl">
            <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-primary">F</span>
            </div>
            <h3 className="font-bold text-text-primary mb-2">Healthy Fats</h3>
            <p className="text-sm text-text-secondary mb-3">
              20-35% of total calories
            </p>
            <ul className="text-xs text-text-tertiary space-y-1 text-left">
              <li>• Hormone production</li>
              <li>• Nutrient absorption</li>
              <li>• Brain and heart health</li>
            </ul>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-panel p-8 rounded-2xl border border-surface-border"
      >
        <h2 className="text-2xl font-bold text-text-primary mb-6">Meal Timing & Frequency</h2>
        <div className="space-y-4">
          <div className="flex gap-4 items-start">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Clock className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-text-primary mb-1">Pre-Workout (1-2 hours before)</h3>
              <p className="text-text-secondary text-sm">
                Moderate carbs + lean protein. Example: Oatmeal with banana and protein powder, or chicken with rice.
              </p>
            </div>
          </div>
          
          <div className="flex gap-4 items-start">
            <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center flex-shrink-0">
              <TrendingUp className="w-6 h-6 text-secondary" />
            </div>
            <div>
              <h3 className="font-semibold text-text-primary mb-1">Post-Workout (30-60 minutes after)</h3>
              <p className="text-text-secondary text-sm">
                High protein + fast carbs for recovery. Example: Protein shake with fruit, or salmon with sweet potato.
              </p>
            </div>
          </div>
          
          <div className="flex gap-4 items-start">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Apple className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-text-primary mb-1">General Meals</h3>
              <p className="text-text-secondary text-sm">
                Eat 4-6 smaller meals throughout the day to maintain stable energy and optimize muscle protein synthesis.
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass-panel p-8 rounded-2xl border border-surface-border"
      >
        <h2 className="text-2xl font-bold text-text-primary mb-6">Hydration Guidelines</h2>
        <div className="flex items-start gap-4">
          <Droplet className="w-10 h-10 text-primary flex-shrink-0" />
          <div>
            <p className="text-text-secondary leading-relaxed mb-4">
              Proper hydration is crucial for performance, recovery, and overall health. Aim for:
            </p>
            <ul className="space-y-2 text-text-secondary">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span><strong className="text-text-primary">Baseline:</strong> Half your body weight in ounces daily (e.g., 150 lbs = 75 oz)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span><strong className="text-text-primary">During Exercise:</strong> Add 16-20 oz per hour of training</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span><strong className="text-text-primary">Post-Workout:</strong> 20-24 oz for every pound lost through sweat</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span><strong className="text-text-primary">Monitor:</strong> Urine should be pale yellow; dark urine indicates dehydration</span>
              </li>
            </ul>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass-panel p-6 rounded-xl border border-primary/20 bg-primary/5"
      >
        <h3 className="font-bold text-text-primary mb-2">💡 Pro Tip</h3>
        <p className="text-text-secondary text-sm">
          Nutrition is highly individual. These are general guidelines - consider consulting a registered 
          dietitian or nutritionist for personalized recommendations based on your specific goals, body type, 
          and training intensity.
        </p>
      </motion.div>

      {/* Additional ad in nutrition section */}
      <div className="flex justify-center mt-8">
        <Advertisement position="square" className="max-w-md" />
      </div>
    </div>
  </div>
);

const HelpCenter = () => {
  const faqs = [
    {
      question: "How do I reset my password?",
      answer: "Click on 'Forgot Password' at the login screen, enter your email, and follow the reset link sent to your inbox. If you don't receive it within 5 minutes, check your spam folder.",
    },
    {
      question: "Can I export my workout data?",
      answer: "Yes! Go to Settings → Data & Privacy → Export Data. You can download your complete workout history, progress metrics, and personal records in CSV or JSON format.",
    },
    {
      question: "Is the AI workout planner included in the free plan?",
      answer: "The basic AI planner is free with limited customization. Premium subscribers get access to advanced AI features including adaptive programming, progressive overload automation, and unlimited workout variations.",
    },
    {
      question: "How accurate are the calorie calculations?",
      answer: "Our calculations use scientifically validated MET (Metabolic Equivalent of Task) values and adjust for your body weight and workout intensity. However, individual metabolism varies, so treat these as estimates.",
    },
    {
      question: "Can I use the app offline?",
      answer: "Yes! Premium users can download workouts for offline access. Your progress will automatically sync when you reconnect to the internet.",
    },
    {
      question: "How do I cancel my subscription?",
      answer: "Go to Settings → Subscription → Manage Plan → Cancel Subscription. You'll retain access until the end of your current billing period, and your data will be preserved.",
    },
    {
      question: "What equipment do I need?",
      answer: "Our workout library includes bodyweight, dumbbell, barbell, and machine-based exercises. Filter workouts by available equipment when creating your plan.",
    },
    {
      question: "How often should I update my fitness profile?",
      answer: "Update your weight and measurements every 2-4 weeks, and adjust your fitness level when you notice significant strength or endurance improvements for more accurate AI recommendations.",
    },
  ];

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 text-center"
      >
        <h1 className="text-4xl font-bold text-gradient mb-2 flex items-center justify-center gap-3">
          <HelpCircle className="w-10 h-10" /> Help Center
        </h1>
        <p className="text-text-secondary">
          Find answers to common questions and get the support you need.
        </p>
      </motion.div>

      <Advertisement position="top" className="mb-6" />

      <div className="max-w-3xl mx-auto space-y-4">
        {faqs.map((faq, i) => (
          <motion.details
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="glass-panel p-5 rounded-xl border border-surface-border group"
          >
            <summary className="font-semibold text-text-primary cursor-pointer list-none flex items-center justify-between hover:text-primary transition-colors">
              <span>{faq.question}</span>
              <span className="text-primary text-xl">+</span>
            </summary>
            <p className="text-text-secondary text-sm mt-4 leading-relaxed pl-4 border-l-2 border-primary/20">
              {faq.answer}
            </p>
          </motion.details>
        ))}
      </div>

      {/* Ad after FAQ list */}
      <div className="flex justify-center mt-8">
        <Advertisement position="top" className="max-w-4xl" />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mt-12 text-center glass-panel p-8 rounded-2xl border border-surface-border max-w-2xl mx-auto"
      >
        <h3 className="text-xl font-bold text-text-primary mb-3">Still need help?</h3>
        <p className="text-text-secondary mb-6">
          Our support team is here to assist you with any questions or issues.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/contact"
            className="px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-300"
          >
            Contact Support
          </Link>
          <a
            href="mailto:support@gymtrackrd.com"
            className="px-6 py-3 bg-surface-secondary/50 text-text-primary font-semibold rounded-lg hover:bg-surface-secondary border border-surface-border transition-all"
          >
            Email Us
          </a>
        </div>
      </motion.div>
    </div>
  );
};

export default ResourcesPage;
