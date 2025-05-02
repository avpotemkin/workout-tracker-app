import { WorkoutSession, WorkoutExercise, WorkoutSet } from '@/types';
import { PROGRAMS } from './programs';

export const ACTIVE_WORKOUT_SESSION: WorkoutSession | null = null;

export const createWorkoutSessionFromProgram = (programId: string, dayId: string): WorkoutSession => {
  // Find the program in our mock data
  const program = PROGRAMS.find(p => p.id === programId);
  
  if (!program || !program.days) {
    // Fallback to an empty workout if program not found
    return {
      id: `session-${Date.now()}`,
      programName: "Custom Workout",
      dayName: "Custom Day",
      exercises: [],
      startedAt: new Date(),
      isFinished: false
    };
  }
  
  // Find the specific day
  const day = program.days.find(d => d.id === dayId);
  
  if (!day) {
    // Fallback to an empty workout if day not found
    return {
      id: `session-${Date.now()}`,
      programName: program.name,
      dayName: "Custom Day",
      exercises: [],
      startedAt: new Date(),
      isFinished: false
    };
  }
  
  // Create workout exercises from day exercises
  const workoutExercises: WorkoutExercise[] = day.exercises.map(exercise => {
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
    dayName: day.name,
    exercises: workoutExercises,
    startedAt: new Date(),
    isFinished: false
  };
};
