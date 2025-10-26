import { WorkoutSession, WorkoutExercise, WorkoutSet, Program, Workout, ProgramExercise, WorkoutSessionId, WorkoutExerciseId, WorkoutSetId } from '@/types';
import { generateId } from '@/utils/ids';

export const ACTIVE_WORKOUT_SESSION: WorkoutSession | null = null;

export function createWorkoutSessionFromProgram(
  program: Program,
  workout: Workout
): WorkoutSession {
  // Create workout exercises from program exercises
  const workoutExercises: WorkoutExercise[] = workout.exercises.map((exercise: ProgramExercise) => {
    // Create sets based on the exercise's set count
    const sets: WorkoutSet[] = Array.from({ length: exercise.sets }, (_, i) => ({
      id: generateId() as WorkoutSetId,
      setNumber: i + 1,
      weight: exercise.weight || { value: 0, unit: "kg" },
      reps: exercise.reps,
      isCompleted: false
    }));
    
    return {
      id: generateId() as WorkoutExerciseId,
      templateId: exercise.templateId,
      sets
    };
  });

  return {
    id: generateId() as WorkoutSessionId,
    programId: program.id,
    programName: program.name,
    workoutId: workout.id,
    workoutName: workout.name,
    exercises: workoutExercises,
    startedAt: new Date(),
    isFinished: false
  };
}
