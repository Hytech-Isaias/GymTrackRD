import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Loader2,
  Send,
  Zap,
  RefreshCw,
  Info,
  Check,
} from "lucide-react";
import { generateWorkoutPlan } from "../../lib/AIService";
import { useWorkoutStore } from "../../store/workoutStore";
import { ExerciseModal } from "../molecules/ExerciseModal";
import Select from "../atoms/Select";
import { cn } from "../../lib/utils";

interface PlanExercise {
  name: string;
  sets: string | number;
  reps?: string | number;
}

interface GeneratedPlan {
  title: string;
  description: string;
  exercises: PlanExercise[];
}

export const AIAssistant = () => {
  const { addWorkoutToDay } = useWorkoutStore();
  const [prompt, setPrompt] = useState("");
  const [level, setLevel] = useState("Intermediate");
  const [duration, setDuration] = useState(30);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<GeneratedPlan | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedDay, setSelectedDay] = useState("Monday");
  const [selectedExercise, setSelectedExercise] = useState<any | null>(null); // ExerciseModal expects specific shape
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedIndices, setSelectedIndices] = useState<number[]>([]);

  const quickPrompts = [
    "Build muscle with compound exercises",
    "Cardio HIIT for fat loss",
    "Full body strength training",
    "Core and abs focused workout",
  ];

  const handleQuickPrompt = (text: string) => {
    setPrompt(text);
  };

  const handleAdd = () => {
    if (result && selectedDay) {
      // Adapt generated plan to store format
      const selectedExercises = result.exercises.filter((_: any, i: number) =>
        selectedIndices.includes(i)
      );

      if (selectedExercises.length === 0) return;

      const workoutData = {
        exercises: selectedExercises.map((ex) => ({
          name: ex.name,
          sets: Number(ex.sets) || 3,
          reps: ex.reps || "12",
        })),
        stats: { focus: result.title },
      };

      addWorkoutToDay(selectedDay, workoutData);
      setResult(null);
      setPrompt("");
    }
  };

  const handleGenerate = async () => {
    if (!prompt) return;
    setLoading(true);
    setResult(null);
    setError(null);
    try {
      const plan = await generateWorkoutPlan(prompt, level, duration);
      setResult(plan);
      setSelectedIndices(plan.exercises.map((_: any, i: number) => i));
    } catch (e: any) {
      console.error(e);
      setError(e.message || "Failed to generate workout. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleExerciseInfo = (exercise: PlanExercise) => {
    // ExerciseModal expects { name, sets, rest }
    setSelectedExercise({
      name: exercise.name,
      sets: exercise.sets,
      rest: "60s", // Default
    });
    setIsModalOpen(true);
  };

  const toggleSelection = (index: number) => {
    setSelectedIndices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <>
      <div className="glass-panel rounded-2xl p-6 relative border border-surface-border backdrop-blur-xl">
        {/* Animated Background Gradient */}
        <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
          <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-secondary/5 animate-pulse-slow" />
        </div>

        <div className="relative z-10">
          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-linear-to-br from-primary/20 to-secondary/20 backdrop-blur-sm">
              <Sparkles className="text-primary" size={20} />
            </div>
            <div>
              <h3 className="font-bold text-text-primary">
                AI Workout Generator
              </h3>
              <p className="text-xs text-text-tertiary">
                Powered by advanced AI
              </p>
            </div>
          </div>

          {/* Input Section */}
          <div className="space-y-4">
            {/* Main Prompt Input */}
            <div className="relative">
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleGenerate();
                  }
                }}
                placeholder="Describe your ideal workout... (e.g., Build muscle with compound exercises, 45 min HIIT)"
                className="w-full px-4 py-3 bg-surface-primary/50 border border-surface-border rounded-xl text-text-primary placeholder-text-tertiary focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                rows={3}
              />
              <button
                onClick={handleGenerate}
                disabled={!prompt || loading}
                className="absolute bottom-3 right-3 p-2 bg-linear-to-r from-primary to-secondary text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 transition-transform"
              >
                {loading ? (
                  <Loader2 size={18} className="animate-spin" />
                ) : (
                  <Send size={18} />
                )}
              </button>
            </div>

            {/* Quick Prompts */}
            <div>
              <p className="text-xs text-text-tertiary mb-2 flex items-center gap-1">
                <Zap size={12} />
                Quick ideas
              </p>
              <div className="flex flex-wrap gap-2">
                {quickPrompts.map((text, idx) => (
                  <motion.button
                    key={idx}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleQuickPrompt(text)}
                    className="px-3 py-1.5 bg-surface-primary/50 border border-surface-border hover:border-primary/50 rounded-full text-xs text-text-secondary hover:text-text-primary transition-all"
                  >
                    {text}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Options Row */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-text-tertiary mb-1.5">
                  Fitness Level
                </label>
                <Select
                  value={level}
                  onChange={setLevel}
                  options={[
                    { value: "Beginner", label: "Beginner" },
                    { value: "Intermediate", label: "Intermediate" },
                    { value: "Advanced", label: "Advanced" },
                  ]}
                  className="w-full"
                />
              </div>
              <div>
                <label className="block text-xs text-text-tertiary mb-1.5">
                  Duration (min)
                </label>
                <Select
                  value={duration}
                  onChange={(val) => setDuration(Number(val))}
                  options={[
                    { value: "15", label: "15 min" },
                    { value: "30", label: "30 min" },
                    { value: "45", label: "45 min" },
                    { value: "60", label: "60 min" },
                  ]}
                  className="w-full"
                />
              </div>
            </div>
          </div>

          {/* Results */}
          <AnimatePresence mode="wait">
            {loading && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mt-6 p-6 bg-linear-to-r from-primary/10 to-secondary/10 rounded-xl border border-primary/20"
              >
                <div className="flex items-center gap-3">
                  <Loader2 className="animate-spin text-primary" size={20} />
                  <span className="text-sm text-text-secondary">
                    Generating your personalized workout...
                  </span>
                </div>
              </motion.div>
            )}

            {error && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mt-6 p-5 bg-error/10 border border-error/30 rounded-xl"
              >
                <div className="flex items-center gap-3">
                  <RefreshCw className="text-error" size={20} />
                  <span className="text-sm text-error">{error}</span>
                </div>
              </motion.div>
            )}

            {result && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mt-6 p-5 bg-surface-secondary/50 border border-surface-border rounded-xl space-y-3"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-bold text-text-primary mb-1">
                      {result.title}
                    </h4>
                    <p className="text-xs text-text-tertiary">
                      {result.description}
                    </p>
                  </div>
                  <button
                    onClick={() => setResult(null)}
                    className="p-1.5 hover:bg-surface-tertiary rounded-lg transition-colors"
                  >
                    <RefreshCw size={14} className="text-text-tertiary" />
                  </button>
                </div>

                <div className="space-y-2">
                  <p className="text-xs text-text-tertiary mb-2">
                    Click to select/deselect exercises:
                  </p>
                  {result.exercises.map((ex, i) => {
                    const isSelected = selectedIndices.includes(i);
                    return (
                      <motion.div
                        key={i}
                        layout
                        onClick={() => toggleSelection(i)}
                        className={cn(
                          "flex items-center gap-3 text-sm p-3 rounded-xl border transition-all cursor-pointer group",
                          isSelected
                            ? "bg-surface-primary border-primary/30 shadow-xs" // Selected state
                            : "bg-surface-secondary/30 border-transparent opacity-60 hover:opacity-100 hover:bg-surface-secondary" // Unselected state
                        )}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                      >
                        <div
                          className={cn(
                            "shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-colors",
                            isSelected
                              ? "bg-primary/20 text-primary"
                              : "bg-surface-tertiary text-text-tertiary"
                          )}
                        >
                          {isSelected && <Check size={12} strokeWidth={3} />}
                          {!isSelected && i + 1}
                        </div>
                        <span
                          className={cn(
                            "flex-1 transition-colors",
                            isSelected
                              ? "text-text-primary font-medium"
                              : "text-text-secondary"
                          )}
                        >
                          {ex.name}
                        </span>
                        <span className="text-xs text-text-tertiary">
                          {ex.sets} sets
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleExerciseInfo(ex);
                          }}
                          className="p-1.5 hover:bg-surface-tertiary rounded-lg transition-all opacity-0 group-hover:opacity-100"
                          title="View exercise details"
                        >
                          <Info size={16} className="text-primary" />
                        </button>
                      </motion.div>
                    );
                  })}
                </div>

                <div className="flex items-center gap-2 pt-3 border-t border-surface-border">
                  <Select
                    value={selectedDay}
                    onChange={setSelectedDay}
                    options={[
                      { value: "Monday", label: "Monday" },
                      { value: "Tuesday", label: "Tuesday" },
                      { value: "Wednesday", label: "Wednesday" },
                      { value: "Thursday", label: "Thursday" },
                      { value: "Friday", label: "Friday" },
                      { value: "Saturday", label: "Saturday" },
                      { value: "Sunday", label: "Sunday" },
                    ]}
                    className="flex-1"
                  />
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleAdd}
                    className="px-4 py-2 bg-linear-to-r from-primary to-secondary text-white font-bold rounded-lg shadow-lg shadow-primary/25"
                  >
                    Add to Plan
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Exercise Detail Modal */}
      <ExerciseModal
        exercise={selectedExercise}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};
