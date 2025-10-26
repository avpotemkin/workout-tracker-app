type Brand<K, T> = K & { __brand: T };

export type ExerciseTemplateId = Brand<string, "ExerciseTemplateId">;
export type ProgramId = Brand<string, "ProgramId">;
export type WorkoutId = Brand<string, "WorkoutId">;
export type ProgramExerciseId = Brand<string, "ProgramExerciseId">;
export type WorkoutSessionId = Brand<string, "WorkoutSessionId">;
export type WorkoutExerciseId = Brand<string, "WorkoutExerciseId">;
export type WorkoutSetId = Brand<string, "WorkoutSetId">;
export type WorkoutHistoryId = Brand<string, "WorkoutHistoryId">;

export type WeightUnit = "kg" | "lbs";

export type Weight = {
  value: number;
  unit: WeightUnit;
};

export type ExerciseCategory = "Chest" | "Back" | "Legs" | "Shoulders" | "Arms" | "Core";

export type ProgramExercise = {
  id: ProgramExerciseId;
  templateId: ExerciseTemplateId;
  sets: number;
  reps: number;
  weight?: Weight;
};

export type WorkoutExercise = {
  id: WorkoutExerciseId;
  templateId: ExerciseTemplateId;
  sets: WorkoutSet[];
};

export type WorkoutSet = {
  id: WorkoutSetId;
  setNumber: number;
  weight: Weight;
  reps: number;
  isCompleted: boolean;
};

export type Workout = {
  id: WorkoutId;
  name: string;
  exercises: ProgramExercise[];
};

export type Program = {
  id: ProgramId;
  name: string;
  workouts: Workout[];
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
};

export type WorkoutSession = {
  id: WorkoutSessionId;
  programId: ProgramId;
  programName: string;
  workoutId: WorkoutId;
  workoutName: string;
  exercises: WorkoutExercise[];
  startedAt: Date;
  finishedAt?: Date;
  isFinished: boolean;
};

export type WorkoutHistory = {
  id: WorkoutHistoryId;
  programId: ProgramId;
  programName: string;
  workoutId: WorkoutId;
  workoutName: string;
  exercises: WorkoutExercise[];
  startedAt: Date;
  finishedAt: Date;
  duration: number;
  totalSets: number;
  totalReps: number;
};

export type HistoryFilter = {
  programId?: ProgramId;
  templateId?: ExerciseTemplateId;
  dateRange?: {
    start: Date;
    end: Date;
  };
};

export type HistoryStats = {
  totalWorkouts: number;
  totalDuration: number;
  strongestLifts: Array<{
    templateId: ExerciseTemplateId;
    exerciseName: string;
    maxWeight: Weight;
    date: Date;
  }>;
};
