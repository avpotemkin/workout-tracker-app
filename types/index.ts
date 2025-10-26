export type Exercise = {
  id: string;
  name: string;
  sets: number;
  reps: number;
  weight?: number;
};

export type Workout = {
  id: string;
  name: string;
  exercises: Exercise[];
};

export type Program = {
  id: string;
  name: string;
  workouts: Workout[];
  createdAt?: Date;
  updatedAt?: Date;
  isActive?: boolean
}; 

export type WorkoutSession = {
  id: string;
  programName: string;
  workoutName: string;
  exercises: WorkoutExercise[];
  startedAt: Date;
  isFinished: boolean;
};

export type WorkoutExercise = {
  id: string;
  exerciseId: string; 
  name: string; 
  sets: WorkoutSet[];
};

export type WorkoutSet = {
  id: string;
  setNumber: number;
  weight: number;
  reps: number;
  isCompleted: boolean;
};

// History types
export type WorkoutHistory = {
  id: string;
  programName: string;
  dayName: string;
  exercises: WorkoutExercise[];
  startedAt: Date;
  finishedAt: Date;
  duration: number; // in minutes
  totalSets: number;
  totalReps: number;
};

export type HistoryFilter = {
  program?: string;
  exercise?: string;
  dateRange?: {
    start: Date;
    end: Date;
  };
};

export type HistoryStats = {
  totalWorkouts: number;
  totalDuration: number;
  strongestLifts: Array<{
    exercise: string;
    maxWeight: number;
    date: Date;
  }>;
};