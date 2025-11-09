import { ProgramExercise, ProgramExerciseId, ExerciseTemplateId } from '@/types'

export const WORKOUT_SPLITS = {
  FULL_BODY: 'Full Body',
  UPPER_LOWER: 'Upper/Lower',
  PUSH_PULL_LEGS: 'Push Pull Legs',
  PUSH_PULL: 'Push Pull',
  BODY_PART_SPLIT: 'Body-Part Split',
} as const

export type WorkoutSplitType =
  (typeof WORKOUT_SPLITS)[keyof typeof WORKOUT_SPLITS]

export interface WorkoutPreset {
  name: string
  exercises: ProgramExercise[]
}

export const SPLIT_PRESETS: Record<WorkoutSplitType, WorkoutPreset[]> = {
  [WORKOUT_SPLITS.FULL_BODY]: [
    {
      name: 'Workout A',
      exercises: [
        {
          id: 'preset-1' as ProgramExerciseId,
          templateId: 'squat' as ExerciseTemplateId,
          sets: 3,
          reps: 5,
        },
        {
          id: 'preset-2' as ProgramExerciseId,
          templateId: 'bench-press' as ExerciseTemplateId,
          sets: 3,
          reps: 5,
        },
        {
          id: 'preset-3' as ProgramExerciseId,
          templateId: 'barbell-row' as ExerciseTemplateId,
          sets: 3,
          reps: 5,
        },
      ],
    },
    {
      name: 'Workout B',
      exercises: [
        {
          id: 'preset-4' as ProgramExerciseId,
          templateId: 'deadlift' as ExerciseTemplateId,
          sets: 3,
          reps: 5,
        },
        {
          id: 'preset-5' as ProgramExerciseId,
          templateId: 'overhead-press' as ExerciseTemplateId,
          sets: 3,
          reps: 5,
        },
        {
          id: 'preset-6' as ProgramExerciseId,
          templateId: 'pull-ups' as ExerciseTemplateId,
          sets: 3,
          reps: 8,
        },
      ],
    },
  ],
  [WORKOUT_SPLITS.UPPER_LOWER]: [
    {
      name: 'Upper Body',
      exercises: [
        {
          id: 'preset-7' as ProgramExerciseId,
          templateId: 'bench-press' as ExerciseTemplateId,
          sets: 3,
          reps: 8,
        },
        {
          id: 'preset-8' as ProgramExerciseId,
          templateId: 'barbell-row' as ExerciseTemplateId,
          sets: 3,
          reps: 8,
        },
        {
          id: 'preset-9' as ProgramExerciseId,
          templateId: 'overhead-press' as ExerciseTemplateId,
          sets: 3,
          reps: 8,
        },
        {
          id: 'preset-10' as ProgramExerciseId,
          templateId: 'pull-ups' as ExerciseTemplateId,
          sets: 3,
          reps: 8,
        },
      ],
    },
    {
      name: 'Lower Body',
      exercises: [
        {
          id: 'preset-11' as ProgramExerciseId,
          templateId: 'squat' as ExerciseTemplateId,
          sets: 3,
          reps: 5,
        },
        {
          id: 'preset-12' as ProgramExerciseId,
          templateId: 'romanian-deadlift' as ExerciseTemplateId,
          sets: 3,
          reps: 10,
        },
        {
          id: 'preset-13' as ProgramExerciseId,
          templateId: 'leg-press' as ExerciseTemplateId,
          sets: 3,
          reps: 10,
        },
        {
          id: 'preset-14' as ProgramExerciseId,
          templateId: 'leg-curl' as ExerciseTemplateId,
          sets: 3,
          reps: 12,
        },
      ],
    },
  ],
  [WORKOUT_SPLITS.PUSH_PULL_LEGS]: [
    {
      name: 'Push',
      exercises: [
        {
          id: 'preset-15' as ProgramExerciseId,
          templateId: 'bench-press' as ExerciseTemplateId,
          sets: 3,
          reps: 8,
        },
        {
          id: 'preset-16' as ProgramExerciseId,
          templateId: 'overhead-press' as ExerciseTemplateId,
          sets: 3,
          reps: 8,
        },
        {
          id: 'preset-17' as ProgramExerciseId,
          templateId: 'incline-press' as ExerciseTemplateId,
          sets: 3,
          reps: 10,
        },
        {
          id: 'preset-18' as ProgramExerciseId,
          templateId: 'lateral-raises' as ExerciseTemplateId,
          sets: 3,
          reps: 12,
        },
      ],
    },
    {
      name: 'Pull',
      exercises: [
        {
          id: 'preset-19' as ProgramExerciseId,
          templateId: 'deadlift' as ExerciseTemplateId,
          sets: 3,
          reps: 5,
        },
        {
          id: 'preset-20' as ProgramExerciseId,
          templateId: 'pull-ups' as ExerciseTemplateId,
          sets: 3,
          reps: 8,
        },
        {
          id: 'preset-21' as ProgramExerciseId,
          templateId: 'barbell-row' as ExerciseTemplateId,
          sets: 3,
          reps: 8,
        },
        {
          id: 'preset-22' as ProgramExerciseId,
          templateId: 'face-pulls' as ExerciseTemplateId,
          sets: 3,
          reps: 15,
        },
      ],
    },
    {
      name: 'Legs',
      exercises: [
        {
          id: 'preset-23' as ProgramExerciseId,
          templateId: 'squat' as ExerciseTemplateId,
          sets: 3,
          reps: 5,
        },
        {
          id: 'preset-24' as ProgramExerciseId,
          templateId: 'romanian-deadlift' as ExerciseTemplateId,
          sets: 3,
          reps: 10,
        },
        {
          id: 'preset-25' as ProgramExerciseId,
          templateId: 'leg-press' as ExerciseTemplateId,
          sets: 3,
          reps: 10,
        },
        {
          id: 'preset-26' as ProgramExerciseId,
          templateId: 'calf-raises' as ExerciseTemplateId,
          sets: 3,
          reps: 15,
        },
      ],
    },
  ],
  [WORKOUT_SPLITS.PUSH_PULL]: [
    {
      name: 'Push',
      exercises: [
        {
          id: 'preset-27' as ProgramExerciseId,
          templateId: 'bench-press' as ExerciseTemplateId,
          sets: 3,
          reps: 8,
        },
        {
          id: 'preset-28' as ProgramExerciseId,
          templateId: 'overhead-press' as ExerciseTemplateId,
          sets: 3,
          reps: 8,
        },
        {
          id: 'preset-29' as ProgramExerciseId,
          templateId: 'squat' as ExerciseTemplateId,
          sets: 3,
          reps: 5,
        },
        {
          id: 'preset-30' as ProgramExerciseId,
          templateId: 'tricep-pushdown' as ExerciseTemplateId,
          sets: 3,
          reps: 12,
        },
      ],
    },
    {
      name: 'Pull',
      exercises: [
        {
          id: 'preset-31' as ProgramExerciseId,
          templateId: 'deadlift' as ExerciseTemplateId,
          sets: 3,
          reps: 5,
        },
        {
          id: 'preset-32' as ProgramExerciseId,
          templateId: 'pull-ups' as ExerciseTemplateId,
          sets: 3,
          reps: 8,
        },
        {
          id: 'preset-33' as ProgramExerciseId,
          templateId: 'barbell-row' as ExerciseTemplateId,
          sets: 3,
          reps: 8,
        },
        {
          id: 'preset-34' as ProgramExerciseId,
          templateId: 'barbell-curl' as ExerciseTemplateId,
          sets: 3,
          reps: 10,
        },
      ],
    },
  ],
  [WORKOUT_SPLITS.BODY_PART_SPLIT]: [
    {
      name: 'Chest',
      exercises: [
        {
          id: 'preset-35' as ProgramExerciseId,
          templateId: 'bench-press' as ExerciseTemplateId,
          sets: 3,
          reps: 8,
        },
        {
          id: 'preset-36' as ProgramExerciseId,
          templateId: 'incline-press' as ExerciseTemplateId,
          sets: 3,
          reps: 10,
        },
        {
          id: 'preset-37' as ProgramExerciseId,
          templateId: 'chest-fly' as ExerciseTemplateId,
          sets: 3,
          reps: 12,
        },
      ],
    },
    {
      name: 'Back',
      exercises: [
        {
          id: 'preset-38' as ProgramExerciseId,
          templateId: 'deadlift' as ExerciseTemplateId,
          sets: 3,
          reps: 5,
        },
        {
          id: 'preset-39' as ProgramExerciseId,
          templateId: 'barbell-row' as ExerciseTemplateId,
          sets: 3,
          reps: 8,
        },
        {
          id: 'preset-40' as ProgramExerciseId,
          templateId: 'pull-ups' as ExerciseTemplateId,
          sets: 3,
          reps: 8,
        },
      ],
    },
    {
      name: 'Legs',
      exercises: [
        {
          id: 'preset-41' as ProgramExerciseId,
          templateId: 'squat' as ExerciseTemplateId,
          sets: 3,
          reps: 5,
        },
        {
          id: 'preset-42' as ProgramExerciseId,
          templateId: 'leg-press' as ExerciseTemplateId,
          sets: 3,
          reps: 10,
        },
        {
          id: 'preset-43' as ProgramExerciseId,
          templateId: 'leg-curl' as ExerciseTemplateId,
          sets: 3,
          reps: 12,
        },
      ],
    },
    {
      name: 'Shoulders',
      exercises: [
        {
          id: 'preset-44' as ProgramExerciseId,
          templateId: 'overhead-press' as ExerciseTemplateId,
          sets: 3,
          reps: 8,
        },
        {
          id: 'preset-45' as ProgramExerciseId,
          templateId: 'lateral-raises' as ExerciseTemplateId,
          sets: 3,
          reps: 12,
        },
        {
          id: 'preset-46' as ProgramExerciseId,
          templateId: 'front-raises' as ExerciseTemplateId,
          sets: 3,
          reps: 12,
        },
      ],
    },
    {
      name: 'Arms',
      exercises: [
        {
          id: 'preset-47' as ProgramExerciseId,
          templateId: 'barbell-curl' as ExerciseTemplateId,
          sets: 3,
          reps: 10,
        },
        {
          id: 'preset-48' as ProgramExerciseId,
          templateId: 'tricep-pushdown' as ExerciseTemplateId,
          sets: 3,
          reps: 12,
        },
        {
          id: 'preset-49' as ProgramExerciseId,
          templateId: 'hammer-curl' as ExerciseTemplateId,
          sets: 3,
          reps: 10,
        },
      ],
    },
  ],
}

export function getPresetWorkouts(split: WorkoutSplitType): WorkoutPreset[] {
  return SPLIT_PRESETS[split] || SPLIT_PRESETS[WORKOUT_SPLITS.FULL_BODY]
}
