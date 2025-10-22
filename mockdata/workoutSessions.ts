import { WorkoutSession, WorkoutExercise, WorkoutSet, Program, Workout, Exercise } from '@/types';

export const ACTIVE_WORKOUT_SESSION: WorkoutSession | null = null;

export const createWorkoutSessionFromProgram = (programId: string, programs: Program[], workoutId?: string): WorkoutSession => {
  // Find the program in the provided programs array
  const program = programs.find((p: Program) => p.id === programId);
  const workout = program?.workouts.find((w: Workout) => w.id === workoutId || w.name === workoutId);
  
  if (!program || !workout) {
    // Fallback to an empty workout if program not found
    return {
      id: `session-${Date.now()}`,
      programName: program?.name || "Custom Workout",
      dayName: workout?.name || "Custom Workout",
      exercises: [],
      startedAt: new Date(),
      isFinished: false
    };
  }
  
  // Find the specific day
  // Workout already found earlier
  
  if (!workout) {
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
  const workoutExercises: WorkoutExercise[] = workout?.exercises.map((exercise: Exercise) => {
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
    dayName: workout.name,
    exercises: workoutExercises,
    startedAt: new Date(),
    isFinished: false
  };
};
