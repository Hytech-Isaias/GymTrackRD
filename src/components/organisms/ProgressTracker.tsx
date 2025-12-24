import { motion } from "framer-motion";
import { Trophy, Flame, Activity } from "lucide-react";
import { useWorkoutStore } from "../../store/workoutStore";

const ProgressTracker = () => {
  const { stats } = useWorkoutStore();

  // Calculate percentages (Mock goals for now)
  const weeklyGoal = 20;
  const weeklyProgress = Math.min(
    Math.round((stats.workoutsCompleted / weeklyGoal) * 100),
    100
  );

  return (
    <div className="glass-panel p-6 rounded-2xl border border-surface-border backdrop-blur-xl">
      <h3 className="font-bold text-text-primary mb-6 flex items-center gap-2">
        <Activity className="text-primary" size={20} />
        Your Progress
      </h3>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-4 mb-6">
        {/* Workouts */}
        <div className="relative overflow-hidden glass-panel p-4 rounded-xl border border-primary/20 bg-surface-secondary/50">
          <div className="absolute inset-0 bg-primary/5 pointer-events-none" />
          <div className="relative flex items-center justify-between mb-2">
            <span className="text-xs uppercase tracking-wide text-text-tertiary">
              Workouts
            </span>
          </div>
          <div className="relative flex items-baseline gap-2">
            <Trophy className="text-primary" size={20} />
            <span className="text-2xl font-bold text-text-primary">
              {stats.workoutsCompleted}
            </span>
            <span className="text-sm text-text-tertiary">/ {weeklyGoal}</span>
          </div>
        </div>

        {/* Calories */}
        <div className="relative overflow-hidden glass-panel p-4 rounded-xl border border-accent/20 bg-surface-secondary/50">
          <div className="absolute inset-0 bg-accent/5 pointer-events-none" />
          <div className="relative flex items-center justify-between mb-2">
            <span className="text-xs uppercase tracking-wide text-text-tertiary">
              Calories
            </span>
          </div>
          <div className="relative flex items-baseline gap-2">
            <Flame className="text-accent" size={20} />
            <span className="text-2xl font-bold text-text-primary">
              {stats.caloriesBurned.toLocaleString()}
            </span>
            <span className="text-sm text-text-tertiary">kcal</span>
          </div>
        </div>

        {/* Active Time */}
        <div className="relative overflow-hidden glass-panel p-4 rounded-xl border border-secondary/20 bg-surface-secondary/50">
          <div className="absolute inset-0 bg-secondary/5 pointer-events-none" />
          <div className="relative flex items-center justify-between mb-2">
            <span className="text-xs uppercase tracking-wide text-text-tertiary">
              Active Time
            </span>
          </div>
          <div className="relative flex items-baseline gap-2">
            <Activity className="text-secondary" size={20} />
            <span className="text-2xl font-bold text-text-primary">
              {(stats.activeMinutes / 60).toFixed(1)}
            </span>
            <span className="text-sm text-text-tertiary">hours</span>
          </div>
        </div>
      </div>

      {/* Progress Bars */}
      <div className="space-y-4">
        <div>
          <div className="flex justify-between text-xs text-text-tertiary mb-2">
            <span>Weekly Goal</span>
            <span className="font-bold text-primary">{weeklyProgress}%</span>
          </div>
          <div className="h-2 bg-surface-tertiary rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${weeklyProgress}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="h-full bg-linear-to-r from-primary to-secondary rounded-full"
            />
          </div>
        </div>

        <div>
          <div className="flex justify-between text-xs text-text-tertiary mb-2">
            <span>Monthly Challenge</span>
            <span className="font-bold text-accent">68%</span>
          </div>
          <div className="h-2 bg-surface-tertiary rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "68%" }}
              transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
              className="h-full bg-linear-to-r from-accent to-secondary rounded-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export { ProgressTracker };
