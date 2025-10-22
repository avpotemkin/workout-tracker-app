import { Exercise } from '@/types';

export const WORKOUT_SPLITS = {
  FULL_BODY: 'Full Body',
  UPPER_LOWER: 'Upper/Lower',
  PUSH_PULL_LEGS: 'Push Pull Legs',
  PUSH_PULL: 'Push Pull',
  BODY_PART_SPLIT: 'Body-Part Split',
} as const;

export type WorkoutSplitType = typeof WORKOUT_SPLITS[keyof typeof WORKOUT_SPLITS];

export interface WorkoutPreset {
  name: string;
  exercises: Exercise[];
}

export const SPLIT_PRESETS: Record<WorkoutSplitType, WorkoutPreset[]> = {
  [WORKOUT_SPLITS.FULL_BODY]: [
    {
      name: 'Workout A',
      exercises: [
        { id: 'ex-1', name: 'Squat', sets: 3, reps: 5 },
        { id: 'ex-2', name: 'Bench Press', sets: 3, reps: 5 },
        { id: 'ex-3', name: 'Barbell Row', sets: 3, reps: 5 },
      ],
    },
    {
      name: 'Workout B',
      exercises: [
        { id: 'ex-4', name: 'Deadlift', sets: 3, reps: 5 },
        { id: 'ex-5', name: 'Overhead Press', sets: 3, reps: 5 },
        { id: 'ex-6', name: 'Pull-ups', sets: 3, reps: 8 },
      ],
    },
  ],
  [WORKOUT_SPLITS.UPPER_LOWER]: [
    {
      name: 'Upper Body',
      exercises: [
        { id: 'ex-1', name: 'Bench Press', sets: 3, reps: 8 },
        { id: 'ex-2', name: 'Barbell Row', sets: 3, reps: 8 },
        { id: 'ex-3', name: 'Overhead Press', sets: 3, reps: 8 },
        { id: 'ex-4', name: 'Pull-ups', sets: 3, reps: 8 },
      ],
    },
    {
      name: 'Lower Body',
      exercises: [
        { id: 'ex-5', name: 'Squat', sets: 3, reps: 5 },
        { id: 'ex-6', name: 'Romanian Deadlift', sets: 3, reps: 10 },
        { id: 'ex-7', name: 'Leg Press', sets: 3, reps: 10 },
        { id: 'ex-8', name: 'Leg Curl', sets: 3, reps: 12 },
      ],
    },
  ],
  [WORKOUT_SPLITS.PUSH_PULL_LEGS]: [
    {
      name: 'Push',
      exercises: [
        { id: 'ex-1', name: 'Bench Press', sets: 3, reps: 8 },
        { id: 'ex-2', name: 'Overhead Press', sets: 3, reps: 8 },
        { id: 'ex-3', name: 'Incline Press', sets: 3, reps: 10 },
        { id: 'ex-4', name: 'Lateral Raises', sets: 3, reps: 12 },
      ],
    },
    {
      name: 'Pull',
      exercises: [
        { id: 'ex-5', name: 'Deadlift', sets: 3, reps: 5 },
        { id: 'ex-6', name: 'Pull-ups', sets: 3, reps: 8 },
        { id: 'ex-7', name: 'Barbell Row', sets: 3, reps: 8 },
        { id: 'ex-8', name: 'Face Pulls', sets: 3, reps: 15 },
      ],
    },
    {
      name: 'Legs',
      exercises: [
        { id: 'ex-9', name: 'Squat', sets: 3, reps: 5 },
        { id: 'ex-10', name: 'Romanian Deadlift', sets: 3, reps: 10 },
        { id: 'ex-11', name: 'Leg Press', sets: 3, reps: 10 },
        { id: 'ex-12', name: 'Calf Raises', sets: 3, reps: 15 },
      ],
    },
  ],
  [WORKOUT_SPLITS.PUSH_PULL]: [
    {
      name: 'Push',
      exercises: [
        { id: 'ex-1', name: 'Bench Press', sets: 3, reps: 8 },
        { id: 'ex-2', name: 'Overhead Press', sets: 3, reps: 8 },
        { id: 'ex-3', name: 'Squat', sets: 3, reps: 5 },
        { id: 'ex-4', name: 'Tricep Pushdown', sets: 3, reps: 12 },
      ],
    },
    {
      name: 'Pull',
      exercises: [
        { id: 'ex-5', name: 'Deadlift', sets: 3, reps: 5 },
        { id: 'ex-6', name: 'Pull-ups', sets: 3, reps: 8 },
        { id: 'ex-7', name: 'Barbell Row', sets: 3, reps: 8 },
        { id: 'ex-8', name: 'Barbell Curl', sets: 3, reps: 10 },
      ],
    },
  ],
  [WORKOUT_SPLITS.BODY_PART_SPLIT]: [
    {
      name: 'Chest',
      exercises: [
        { id: 'ex-1', name: 'Bench Press', sets: 3, reps: 8 },
        { id: 'ex-2', name: 'Incline Press', sets: 3, reps: 10 },
        { id: 'ex-3', name: 'Chest Fly', sets: 3, reps: 12 },
      ],
    },
    {
      name: 'Back',
      exercises: [
        { id: 'ex-4', name: 'Deadlift', sets: 3, reps: 5 },
        { id: 'ex-5', name: 'Barbell Row', sets: 3, reps: 8 },
        { id: 'ex-6', name: 'Pull-ups', sets: 3, reps: 8 },
      ],
    },
    {
      name: 'Legs',
      exercises: [
        { id: 'ex-7', name: 'Squat', sets: 3, reps: 5 },
        { id: 'ex-8', name: 'Leg Press', sets: 3, reps: 10 },
        { id: 'ex-9', name: 'Leg Curl', sets: 3, reps: 12 },
      ],
    },
    {
      name: 'Shoulders',
      exercises: [
        { id: 'ex-10', name: 'Overhead Press', sets: 3, reps: 8 },
        { id: 'ex-11', name: 'Lateral Raises', sets: 3, reps: 12 },
        { id: 'ex-12', name: 'Front Raises', sets: 3, reps: 12 },
      ],
    },
    {
      name: 'Arms',
      exercises: [
        { id: 'ex-13', name: 'Barbell Curl', sets: 3, reps: 10 },
        { id: 'ex-14', name: 'Tricep Pushdown', sets: 3, reps: 12 },
        { id: 'ex-15', name: 'Hammer Curl', sets: 3, reps: 10 },
      ],
    },
  ],
};

export function getPresetWorkouts(split: WorkoutSplitType): WorkoutPreset[] {
  return SPLIT_PRESETS[split] || SPLIT_PRESETS[WORKOUT_SPLITS.FULL_BODY];
}




