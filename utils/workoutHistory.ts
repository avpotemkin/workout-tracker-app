import {
  WorkoutSession,
  WorkoutHistory,
  WorkoutHistoryId,
  WorkoutExercise,
  WorkoutSet,
  Program,
  Workout,
  ProgramExercise,
  WorkoutSessionId,
  WorkoutExerciseId,
  WorkoutSetId,
} from "@/types";
import { generateId } from "./ids";

export function convertSessionToHistory(
  session: WorkoutSession
): WorkoutHistory {
  if (!session.finishedAt) {
    throw new Error("Cannot convert session to history: session is not finished");
  }

  // Calculate duration in minutes
  const durationMs = session.finishedAt.getTime() - session.startedAt.getTime();
  const duration = Math.round(durationMs / 1000 / 60); // Convert to minutes

  // Calculate total sets and reps from completed sets
  let totalSets = 0;
  let totalReps = 0;

  session.exercises.forEach((exercise) => {
    exercise.sets.forEach((set) => {
      if (set.isCompleted) {
        totalSets++;
        totalReps += set.reps;
      }
    });
  });

  return {
    id: generateId() as WorkoutHistoryId,
    programId: session.programId,
    programName: session.programName,
    workoutId: session.workoutId,
    workoutName: session.workoutName,
    exercises: session.exercises,
    startedAt: session.startedAt,
    finishedAt: session.finishedAt,
    duration,
    totalSets,
    totalReps,
  };
}

export function createWorkoutSessionFromProgram(
  program: Program,
  workout: Workout
): WorkoutSession {
  const workoutExercises: WorkoutExercise[] = workout.exercises.map(
    (exercise: ProgramExercise) => {
      const sets: WorkoutSet[] = Array.from({ length: exercise.sets }, (_, i) => ({
        id: generateId() as WorkoutSetId,
        setNumber: i + 1,
        weight: exercise.weight || { value: 0, unit: "kg" },
        reps: exercise.reps,
        isCompleted: false,
      }));

      return {
        id: generateId() as WorkoutExerciseId,
        templateId: exercise.templateId,
        sets,
      };
    }
  );

  return {
    id: generateId() as WorkoutSessionId,
    programId: program.id,
    programName: program.name,
    workoutId: workout.id,
    workoutName: workout.name,
    exercises: workoutExercises,
    startedAt: new Date(),
    isFinished: false,
  };
}

