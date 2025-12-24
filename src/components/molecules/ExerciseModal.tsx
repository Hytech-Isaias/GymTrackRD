import { useState, useEffect } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import {
  X,
  Info,
  Dumbbell,
  Timer,
  Repeat,
  Target,
  Loader2,
} from "lucide-react";
import { getExerciseData, Exercise } from "../../lib/exerciseDB";

export interface ExerciseModalProps {
  exercise: {
    name: string;
    sets?: number | string;
    rest?: string;
  } | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ExerciseModal = ({
  exercise,
  isOpen,
  onClose,
}: ExerciseModalProps) => {
  const [exerciseData, setExerciseData] = useState<Exercise | null>(null);
  const [loading, setLoading] = useState(false);

  // Fetch exercise data when modal opens
  useEffect(() => {
    const fetchData = async () => {
      if (!isOpen || !exercise) {
        setExerciseData(null);
        return;
      }

      setLoading(true);
      try {
        const data = await getExerciseData(exercise.name);
        setExerciseData(data);
      } catch (error) {
        console.error("Error loading exercise:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [isOpen, exercise]);

  if (!isOpen) return null;

  const backdropVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const modalVariants: Variants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { type: "spring", damping: 25, stiffness: 300 },
    },
    exit: { opacity: 0, scale: 0.9, y: 20 },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={onClose}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            {/* Modal */}
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto glass-panel rounded-2xl border border-surface-border shadow-2xl"
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-lg bg-surface-primary/50 hover:bg-surface-tertiary transition-colors z-10"
              >
                <X size={20} className="text-text-primary" />
              </button>

              {/* Loading State */}
              {loading ? (
                <div className="flex flex-col items-center justify-center p-20">
                  <Loader2
                    className="animate-spin text-primary mb-4"
                    size={48}
                  />
                  <p className="text-text-tertiary">Loading exercise data...</p>
                </div>
              ) : exerciseData && exercise ? (
                <>
                  {/* Exercise GIF/Image */}
                  <div className="relative h-80 overflow-hidden rounded-t-2xl bg-surface-secondary">
                    <img
                      src={exerciseData.gifUrl}
                      alt={exerciseData.name}
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        // Fallback to generic workout image if GIF fails to load
                        const target = e.target as HTMLImageElement;
                        target.src =
                          "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&h=500&fit=crop&auto=format&q=80";
                      }}
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-background via-background/30 to-transparent" />

                    {/* Exercise Name Overlay */}
                    <div className="absolute bottom-6 left-6 right-6">
                      <h2 className="text-3xl font-bold text-text-primary mb-2">
                        {exerciseData.name}
                      </h2>
                      <div className="flex items-center gap-2 text-sm text-text-secondary">
                        <span className="px-2 py-1 bg-primary/20 border border-primary/30 rounded-full">
                          {exerciseData.targetMuscle}
                        </span>
                        <span className="px-2 py-1 bg-secondary/20 border border-secondary/30 rounded-full">
                          {exerciseData.equipment}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 space-y-6">
                    {/* Quick Stats */}
                    <div className="grid grid-cols-3 gap-3">
                      <div className="glass-panel p-4 rounded-xl border border-primary/20 text-center">
                        <Repeat
                          className="mx-auto mb-2 text-primary"
                          size={20}
                        />
                        <div className="text-lg font-bold text-text-primary">
                          {exercise.sets || "3x12"}
                        </div>
                        <div className="text-xs text-text-tertiary">
                          Sets x Reps
                        </div>
                      </div>
                      <div className="glass-panel p-4 rounded-xl border border-accent/20 text-center">
                        <Timer className="mx-auto mb-2 text-accent" size={20} />
                        <div className="text-lg font-bold text-text-primary">
                          {exercise.rest || "60s"}
                        </div>
                        <div className="text-xs text-text-tertiary">
                          Rest Time
                        </div>
                      </div>
                      <div className="glass-panel p-4 rounded-xl border border-secondary/20 text-center">
                        <Target
                          className="mx-auto mb-2 text-secondary"
                          size={20}
                        />
                        <div className="text-lg font-bold text-text-primary">
                          {exerciseData.targetMuscle}
                        </div>
                        <div className="text-xs text-text-tertiary">Target</div>
                      </div>
                    </div>

                    {/* Instructions */}
                    <div>
                      <h3 className="text-lg font-bold text-text-primary mb-3 flex items-center gap-2">
                        <Info size={18} className="text-primary" />
                        How to Perform
                      </h3>
                      <ol className="space-y-2">
                        {exerciseData.instructions.map((instruction, i) => (
                          <li
                            key={i}
                            className="flex gap-3 text-text-secondary text-sm"
                          >
                            <span className="shrink-0 w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-bold">
                              {i + 1}
                            </span>
                            <span className="flex-1">{instruction}</span>
                          </li>
                        ))}
                      </ol>
                    </div>

                    {/* Tips */}
                    <div className="glass-panel p-4 rounded-xl border border-accent/20 bg-surface-secondary/50">
                      <h4 className="text-sm font-bold text-text-primary mb-2 flex items-center gap-2">
                        <Dumbbell size={16} className="text-accent" />
                        Pro Tips
                      </h4>
                      <ul className="space-y-1 text-xs text-text-secondary">
                        <li>• Start with lighter weights to master form</li>
                        <li>• Keep movements slow and controlled</li>
                        <li>• Don't sacrifice form for heavier weight</li>
                        <li>• Stay hydrated throughout your workout</li>
                      </ul>
                    </div>
                  </div>
                </>
              ) : (
                <div className="p-20 text-center">
                  <p className="text-text-tertiary">Exercise not found</p>
                </div>
              )}
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
