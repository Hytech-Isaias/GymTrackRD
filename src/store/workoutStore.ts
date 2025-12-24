import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface WorkoutExercise {
  title: string;
  sets: number;
  reps: number | string;
  completed: boolean;
  name?: string; // Sometimes incoming data uses 'name'
}

export interface DayPlan {
  day: string;
  focus: string;
  exercises: WorkoutExercise[];
}

export interface WorkoutStats {
  workoutsCompleted: number;
  caloriesBurned: number;
  activeMinutes: number;
}

interface WorkoutState {
  weeklyPlan: DayPlan[];
  stats: WorkoutStats;
  addWorkoutToDay: (dayName: string, workoutData: { exercises: { name: string; sets: number; reps: number | string }[]; stats: { focus: string } }) => void;
  toggleExercise: (dayIndex: number, exerciseIndex: number) => void;
}

const INITIAL_PLAN: DayPlan[] = [
  { day: 'Monday', focus: 'Upper Body Power', exercises: [{ title: 'Bench Press', sets: 4, reps: 8, completed: false }, { title: 'Pull Ups', sets: 3, reps: 10, completed: false }] },
  { day: 'Tuesday', focus: 'Lower Body Strength', exercises: [{ title: 'Squats', sets: 5, reps: 5, completed: false }, { title: 'RDLs', sets: 4, reps: 8, completed: false }] },
  { day: 'Wednesday', focus: 'Active Recovery', exercises: [{ title: 'Yoga Flow', sets: 1, reps: '30 min', completed: false }] },
  { day: 'Thursday', focus: 'Rest or Cardio', exercises: [] },
  { day: 'Friday', focus: 'Full Body', exercises: [] },
  { day: 'Saturday', focus: 'Cardio', exercises: [] },
  { day: 'Sunday', focus: 'Rest', exercises: [] },
];

const INITIAL_STATS: WorkoutStats = {
  workoutsCompleted: 12,
  caloriesBurned: 14050,
  activeMinutes: 1110
};

export const useWorkoutStore = create<WorkoutState>()(
  persist(
    (set) => ({
      weeklyPlan: INITIAL_PLAN,
      stats: INITIAL_STATS,

      addWorkoutToDay: (dayName, workoutData) => set((state) => {
        const newPlan = state.weeklyPlan.map((day) => {
          if (day.day === dayName) {
            const newExercises = workoutData.exercises.map(ex => ({
              title: ex.name,
              sets: ex.sets,
              reps: ex.reps,
              completed: false
            }));
            return {
              ...day,
              focus: workoutData.stats.focus,
              exercises: [...day.exercises, ...newExercises]
            };
          }
          return day;
        });
        return { weeklyPlan: newPlan };
      }),

      toggleExercise: (dayIndex, exerciseIndex) => set((state) => {
        const newPlan = [...state.weeklyPlan];
        const day = { ...newPlan[dayIndex] };
        const exercises = [...day.exercises];
        const exercise = { ...exercises[exerciseIndex] };
        
        const wasCompleted = exercise.completed;
        exercise.completed = !wasCompleted;

        // Update stats
        const newStats = { ...state.stats };
        if (!wasCompleted) {
          newStats.workoutsCompleted += 1;
          newStats.caloriesBurned += 150;
          newStats.activeMinutes += 15;
        } else {
          newStats.workoutsCompleted -= 1;
          newStats.caloriesBurned -= 150;
          newStats.activeMinutes -= 15;
        }

        exercises[exerciseIndex] = exercise;
        day.exercises = exercises;
        newPlan[dayIndex] = day;

        return { weeklyPlan: newPlan, stats: newStats };
      }),
    }),
    {
      name: 'workout-storage', // unique name
    }
  )
);
