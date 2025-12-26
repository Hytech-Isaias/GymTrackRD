import { TrackerItem } from "../molecules/TrackerItem";
import { Calendar } from "lucide-react";
import { useWorkoutStore } from "../../store/workoutStore";
import { useState } from "react";
import { ExerciseModal } from "../molecules/ExerciseModal";
import { cn } from "../../lib/utils";

const PlannerTool = () => {
  const { weeklyPlan, toggleExercise, removeExercise } = useWorkoutStore();
  const [selectedExercise, setSelectedExercise] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const handleInfo = (exercise: any) => {
    setSelectedExercise(exercise);
    setIsModalOpen(true);
  };

  return (
    <div className="glass-panel rounded-2xl p-6 border border-surface-border">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-text-primary flex items-center gap-2">
          <Calendar className="text-primary" />
          <span className="text-gradient">Weekly Schedule</span>
        </h2>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className={cn(
            "text-sm font-medium transition-colors px-3 py-1 rounded-lg",
            isEditing
              ? "bg-primary text-white hover:bg-primary/90"
              : "text-primary hover:text-primary/80 hover:bg-primary/10"
          )}
        >
          {isEditing ? "Done" : "Edit Plan"}
        </button>
      </div>

      <div className="space-y-6">
        {weeklyPlan.map((day, dayIdx) => (
          <div
            key={dayIdx}
            className="relative pl-6 border-l-2 border-surface-border hover:border-primary transition-colors group"
          >
            <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-background border-2 border-surface-border group-hover:border-primary transition-colors"></div>
            <div className="flex justify-between items-baseline mb-3">
              <h3 className="text-lg font-semibold text-text-primary">
                {day.day}
              </h3>
              <span className="text-xs text-text-tertiary uppercase tracking-widest">
                {day.focus}
              </span>
            </div>
            {day.exercises.length > 0 ? (
              <div className="space-y-2">
                {day.exercises.map((ex: any, exIdx) => (
                  <TrackerItem
                    key={exIdx}
                    title={ex.name || ex.title || "Exercise"}
                    sets={ex.sets}
                    reps={ex.reps}
                    completed={ex.completed}
                    isEditing={isEditing}
                    onToggle={() => toggleExercise(dayIdx, exIdx)}
                    onInfo={() => handleInfo(ex)}
                    onDelete={() => removeExercise(dayIdx, exIdx)}
                  />
                ))}
              </div>
            ) : (
              <div className="text-sm text-text-tertiary italic">
                Rest Day or No Workout Planned
              </div>
            )}
          </div>
        ))}
      </div>

      <ExerciseModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        exercise={selectedExercise}
      />
    </div>
  );
};

export { PlannerTool };
