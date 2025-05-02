import { WorkoutSession, WorkoutExercise, WorkoutSet } from '@/types';
import { PROGRAMS } from './programs';

export const ACTIVE_WORKOUT_SESSION: WorkoutSession | null = null;

export const createWorkoutSessionFromProgram = (programId: string, programName: string): WorkoutSession => {
  // Find the program in our mock data
  const program = PROGRAMS.find(p => p.id === programId);
  
  if (!program || !program.exercises) {
    // Fallback to an empty workout if program not found
    return {
      id: `session-${Date.now()}`,
      programName: programName || "Custom Workout",
      exercises: [],
      startedAt: new Date(),
      isFinished: false
    };
  }
  
  // Create workout exercises from program exercises
  const workoutExercises: WorkoutExercise[] = program.exercises.map(exercise => {
    // Create sets based on the exercise's set count
    const sets: WorkoutSet[] = Array.from({ length: exercise.sets }, (_, i) => ({
      id: `${exercise.id}-set-${i + 1}`,
      setNumber: i + 1,
      weight: exercise.weight || 0,
      reps: exercise.reps,
      isCompleted: false
    }));
    
    return {
      id: exercise.id,
      exerciseId: exercise.id,
      name: exercise.name,
      sets
    };
  });

  return {
    id: `session-${Date.now()}`,
    programName: program.name,
    exercises: workoutExercises,
    startedAt: new Date(),
    isFinished: false
  };
};
