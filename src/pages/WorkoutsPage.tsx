import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { SEOHead } from "../components/atoms/SEOHead";
import { Footer } from "../components/organisms/Footer";
import { exerciseDB, Exercise } from "../lib/exerciseDB";
import { TrackerItem } from "../components/molecules/TrackerItem";
import { ExerciseModal } from "../components/molecules/ExerciseModal";
import { ArrowLeft, Dumbbell, Heart, Flame, Zap, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import { getServiceSchema } from "../lib/seo/schema";
import { useWorkoutStore } from "../store/workoutStore";
import { Advertisement } from "../components/atoms/Advertisement";

const workoutCategories = {
  "strength-training": {
    title: "Strength Training",
    description: "Build muscle, increase power, and develop functional strength with our comprehensive resistance training programs.",
    target: "chest,back,legs", // Multiple targets for strength
    icon: Dumbbell,
    benefits: [
      "Increased muscle mass and strength",
      "Improved bone density and joint health",
      "Enhanced metabolic rate",
      "Better posture and injury prevention"
    ]
  },
  "cardio-hiit": {
    title: "Cardio & HIIT",
    description: "Boost cardiovascular endurance and burn calories efficiently with high-intensity interval training.",
    target: "cardio",
    icon: Flame,
    benefits: [
      "Improved cardiovascular health",
      "Maximum calorie burn in minimal time",
      "Enhanced athletic performance",
      "Increased metabolic rate for 24+ hours"
    ]
  },
  "yoga-flexibility": {
    title: "Yoga & Flexibility",
    description: "Enhance mobility, reduce stress, and improve mind-body connection through dynamic stretching and yoga flows.",
    target: "waist",
    icon: Heart,
    benefits: [
      "Increased flexibility and range of motion",
      "Reduced stress and improved mental clarity",
      "Better balance and coordination",
      "Enhanced recovery and injury prevention"
    ]
  },
  "bodyweight": {
    title: "Bodyweight Training",
    description: "Train anywhere, anytime with equipment-free exercises that build strength, endurance, and athleticism.",
    target: "body weight",
    icon: Zap,
    benefits: [
      "No equipment needed - train anywhere",
      "Functional strength for daily activities",
      "Improved body control and coordination",
      "Perfect for all fitness levels"
    ]
  }
};

const WorkoutsPage = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [selectedExercises, setSelectedExercises] = useState<Set<string>>(new Set());
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { addWorkoutToDay } = useWorkoutStore();
  const [showSaveSuccess, setShowSaveSuccess] = useState(false);

  const categoryData = category && category in workoutCategories 
    ? workoutCategories[category as keyof typeof workoutCategories]
    : null;

  useEffect(() => {
    window.scrollTo(0, 0);
    
    if (categoryData) {
      const data = exerciseDB.getList(categoryData.target);
      // Show only 4 recommended exercises per category
      setExercises(data.slice(0, 4));
    }
  }, [category, categoryData]);

  const handleInfo = (exercise: Exercise) => {
    setSelectedExercise(exercise);
    setIsModalOpen(true);
  };

  const handleToggleSelect = (exerciseId: string) => {
    setSelectedExercises(prev => {
      const newSet = new Set(prev);
      if (newSet.has(exerciseId)) {
        newSet.delete(exerciseId);
      } else {
        newSet.add(exerciseId);
      }
      return newSet;
    });
  };

  const handleSaveToDashboard = () => {
    if (selectedExercises.size === 0 || !categoryData) return;
    
    const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
    const selectedExs = exercises.filter(ex => selectedExercises.has(ex.id));
    const workoutData = {
      exercises: selectedExs.map(ex => ({
        name: ex.name,
        sets: 3,
        reps: ex.name.toLowerCase().includes('plank') || ex.name.toLowerCase().includes('hold') ? '30 sec' : 12
      })),
      stats: {
        focus: categoryData.title
      }
    };
    
    addWorkoutToDay(today, workoutData);
    setShowSaveSuccess(true);
    setTimeout(() => setShowSaveSuccess(false), 3000);
  };

  // If no category, show category overview
  if (!category || !categoryData) {
    return <WorkoutCategoryOverview />;
  }

  const Icon = categoryData.icon;

  return (
    <div className="min-h-screen bg-background pt-24 pb-12">
      <SEOHead
        title={`${categoryData.title} Workouts | GymTrackRD`}
        description={`${categoryData.description} Discover expert-designed ${categoryData.title.toLowerCase()} exercises and programs.`}
        schema={getServiceSchema({
          name: `${categoryData.title} Program`,
          description: categoryData.description,
          price: "0"
        })}
      />

      <div className="container mx-auto px-4 max-w-6xl">
        <Link
          to="/"
          className="inline-flex items-center text-text-tertiary hover:text-primary mb-6 transition-colors"
        >
          <ArrowLeft size={16} className="mr-2" /> Back to Home
        </Link>

        {/* Category Header */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
              <Icon className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gradient">{categoryData.title}</h1>
              <p className="text-text-tertiary text-sm mt-1">{exercises.length} exercises available</p>
            </div>
          </div>
          <p className="text-text-secondary text-lg leading-relaxed max-w-3xl">
            {categoryData.description}
          </p>
        </motion.div>

        {/* Benefits Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-panel p-6 md:p-8 rounded-2xl border border-surface-border mb-12"
        >
          <h2 className="text-2xl font-bold text-text-primary mb-6">Key Benefits</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {categoryData.benefits.map((benefit, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-primary text-sm">✓</span>
                </div>
                <p className="text-text-secondary">{benefit}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Advertisement - Switch to real AdSense by adding adSlot prop */}
        {/* Example: <Advertisement position="top" className="mb-8" adSlot="YOUR_AD_SLOT_ID" /> */}
        <Advertisement position="top" className="mb-8" />

        {/* Additional square ad */}
        <div className="flex justify-center mb-8">
          <Advertisement position="square" className="max-w-md" />
        </div>

        {/* Exercises Grid */}
        <div>
          <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
            <div>
              <h2 className="text-2xl font-bold text-text-primary">Today's Recommended Exercises</h2>
              <p className="text-sm text-text-tertiary mt-1">Top 4 exercises selected for your {categoryData.title.toLowerCase()} workout</p>
            </div>
            <div className="flex items-center gap-3">
              {showSaveSuccess && (
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-sm text-green-400"
                >
                  ✓ Saved to dashboard
                </motion.span>
              )}
              <button
                onClick={handleSaveToDashboard}
                disabled={selectedExercises.size === 0}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all font-medium text-sm ${
                  selectedExercises.size === 0 
                    ? 'bg-surface-border text-text-tertiary cursor-not-allowed' 
                    : 'bg-primary hover:bg-primary/90 text-white'
                }`}
              >
                <Calendar className="w-4 h-4" />
                Save to Dashboard {selectedExercises.size > 0 && `(${selectedExercises.size})`}
              </button>
            </div>
          </div>
          {exercises.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {exercises.map((ex) => (
                <motion.div
                  key={ex.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.2 }}
                  className="glass-panel p-4 rounded-xl hover:border-primary/50 transition-all border border-surface-border"
                >
                  <TrackerItem
                    title={ex.name}
                    sets="3-4"
                    reps="8-12"
                    completed={false}
                    onToggle={() => {}}
                    onInfo={() => handleInfo(ex)}
                  />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="glass-panel p-12 rounded-2xl text-center border border-surface-border">
              <Dumbbell className="w-16 h-16 text-text-tertiary mx-auto mb-4 opacity-50" />
              <h3 className="text-xl font-semibold text-text-primary mb-2">No exercises found</h3>
              <p className="text-text-tertiary">
                We're constantly adding new exercises. Check back soon!
              </p>
            </div>
          )}
        </div>
      </div>

      {selectedExercise && (
        <ExerciseModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          exercise={selectedExercise}
        />
      )}

      {/* Ad before Footer */}
      <div className="container mx-auto px-4 py-8">
        <Advertisement position="bottom" className="max-w-5xl mx-auto" />
      </div>

      <div className="mt-20">
        <Footer />
      </div>
    </div>
  );
};

const WorkoutCategoryOverview = () => {
  return (
    <div className="min-h-screen bg-background pt-24 pb-12">
      <SEOHead
        title="Workout Programs & Exercise Library | GymTrackRD"
        description="Explore our comprehensive workout programs including strength training, HIIT, yoga, and bodyweight exercises. Expert-designed routines for all fitness levels."
      />

      <div className="container mx-auto px-4 max-w-6xl">
        <Link
          to="/"
          className="inline-flex items-center text-text-tertiary hover:text-primary mb-6 transition-colors"
        >
          <ArrowLeft size={16} className="mr-2" /> Back to Home
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gradient mb-4">
            Workout Programs
          </h1>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            Choose from our expertly designed workout categories to achieve your fitness goals. 
            Each program is backed by science and tailored to your needs.
          </p>
        </motion.div>

        {/* Ad after header */}
        <Advertisement position="top" className="mb-12" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.entries(workoutCategories).map(([key, data], idx) => {
            const Icon = data.icon;
            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <Link
                  to={`/workouts/${key}`}
                  className="block glass-panel p-8 rounded-2xl border border-surface-border hover:border-primary transition-all group"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Icon className="w-7 h-7 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-text-primary mb-2 group-hover:text-primary transition-colors">
                        {data.title}
                      </h3>
                      <p className="text-text-secondary text-sm">
                        {data.description}
                      </p>
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-surface-border">
                    <p className="text-sm text-text-tertiary mb-3">What you'll gain:</p>
                    <ul className="space-y-2">
                      {data.benefits.slice(0, 2).map((benefit, i) => (
                        <li key={i} className="text-sm text-text-secondary flex items-start gap-2">
                          <span className="text-primary mt-1">•</span>
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-6 text-primary font-medium text-sm group-hover:translate-x-2 transition-transform inline-flex items-center gap-1">
                    Explore Exercises →
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>

      <div className="mt-20">
        <Footer />
      </div>
    </div>
  );
};

export default WorkoutsPage;
