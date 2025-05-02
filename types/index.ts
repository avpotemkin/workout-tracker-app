export type Exercise = {
  id: string;
  name: string;
  sets: number;
  reps: number;
  weight?: number;
};

export type Program = {
  id: string;
  name: string;
  description?: string;
  exercises?: Exercise[];
  createdAt?: Date;
  updatedAt?: Date;
  isActive?: boolean
}; 

export type WorkoutSession = {
  id: string;
  programName: string;
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