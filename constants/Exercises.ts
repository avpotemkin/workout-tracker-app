import { ExerciseTemplateId, ExerciseCategory } from '@/types'

export interface ExerciseTemplate {
  id: ExerciseTemplateId
  name: string
  category: ExerciseCategory
}

export const EXERCISE_CATEGORIES = {
  CHEST: 'Chest',
  BACK: 'Back',
  LEGS: 'Legs',
  SHOULDERS: 'Shoulders',
  ARMS: 'Arms',
  CORE: 'Core',
} as const

export const EXERCISES: ExerciseTemplate[] = [
  // Chest
  {
    id: 'bench-press' as ExerciseTemplateId,
    name: 'Bench Press',
    category: EXERCISE_CATEGORIES.CHEST,
  },
  {
    id: 'incline-press' as ExerciseTemplateId,
    name: 'Incline Press',
    category: EXERCISE_CATEGORIES.CHEST,
  },
  {
    id: 'dumbbell-press' as ExerciseTemplateId,
    name: 'Dumbbell Press',
    category: EXERCISE_CATEGORIES.CHEST,
  },
  {
    id: 'chest-fly' as ExerciseTemplateId,
    name: 'Chest Fly',
    category: EXERCISE_CATEGORIES.CHEST,
  },
  {
    id: 'push-ups' as ExerciseTemplateId,
    name: 'Push-ups',
    category: EXERCISE_CATEGORIES.CHEST,
  },
  {
    id: 'dips' as ExerciseTemplateId,
    name: 'Dips',
    category: EXERCISE_CATEGORIES.CHEST,
  },

  // Back
  {
    id: 'deadlift' as ExerciseTemplateId,
    name: 'Deadlift',
    category: EXERCISE_CATEGORIES.BACK,
  },
  {
    id: 'barbell-row' as ExerciseTemplateId,
    name: 'Barbell Row',
    category: EXERCISE_CATEGORIES.BACK,
  },
  {
    id: 'pull-ups' as ExerciseTemplateId,
    name: 'Pull-ups',
    category: EXERCISE_CATEGORIES.BACK,
  },
  {
    id: 'lat-pulldown' as ExerciseTemplateId,
    name: 'Lat Pulldown',
    category: EXERCISE_CATEGORIES.BACK,
  },
  {
    id: 'seated-row' as ExerciseTemplateId,
    name: 'Seated Row',
    category: EXERCISE_CATEGORIES.BACK,
  },
  {
    id: 'face-pulls' as ExerciseTemplateId,
    name: 'Face Pulls',
    category: EXERCISE_CATEGORIES.BACK,
  },

  // Legs
  {
    id: 'squat' as ExerciseTemplateId,
    name: 'Squat',
    category: EXERCISE_CATEGORIES.LEGS,
  },
  {
    id: 'front-squat' as ExerciseTemplateId,
    name: 'Front Squat',
    category: EXERCISE_CATEGORIES.LEGS,
  },
  {
    id: 'leg-press' as ExerciseTemplateId,
    name: 'Leg Press',
    category: EXERCISE_CATEGORIES.LEGS,
  },
  {
    id: 'lunges' as ExerciseTemplateId,
    name: 'Lunges',
    category: EXERCISE_CATEGORIES.LEGS,
  },
  {
    id: 'romanian-deadlift' as ExerciseTemplateId,
    name: 'Romanian Deadlift',
    category: EXERCISE_CATEGORIES.LEGS,
  },
  {
    id: 'leg-curl' as ExerciseTemplateId,
    name: 'Leg Curl',
    category: EXERCISE_CATEGORIES.LEGS,
  },
  {
    id: 'leg-extension' as ExerciseTemplateId,
    name: 'Leg Extension',
    category: EXERCISE_CATEGORIES.LEGS,
  },
  {
    id: 'calf-raises' as ExerciseTemplateId,
    name: 'Calf Raises',
    category: EXERCISE_CATEGORIES.LEGS,
  },

  // Shoulders
  {
    id: 'overhead-press' as ExerciseTemplateId,
    name: 'Overhead Press',
    category: EXERCISE_CATEGORIES.SHOULDERS,
  },
  {
    id: 'dumbbell-shoulder-press' as ExerciseTemplateId,
    name: 'Dumbbell Shoulder Press',
    category: EXERCISE_CATEGORIES.SHOULDERS,
  },
  {
    id: 'lateral-raises' as ExerciseTemplateId,
    name: 'Lateral Raises',
    category: EXERCISE_CATEGORIES.SHOULDERS,
  },
  {
    id: 'front-raises' as ExerciseTemplateId,
    name: 'Front Raises',
    category: EXERCISE_CATEGORIES.SHOULDERS,
  },
  {
    id: 'rear-delt-fly' as ExerciseTemplateId,
    name: 'Rear Delt Fly',
    category: EXERCISE_CATEGORIES.SHOULDERS,
  },
  {
    id: 'arnold-press' as ExerciseTemplateId,
    name: 'Arnold Press',
    category: EXERCISE_CATEGORIES.SHOULDERS,
  },

  // Arms
  {
    id: 'barbell-curl' as ExerciseTemplateId,
    name: 'Barbell Curl',
    category: EXERCISE_CATEGORIES.ARMS,
  },
  {
    id: 'dumbbell-curl' as ExerciseTemplateId,
    name: 'Dumbbell Curl',
    category: EXERCISE_CATEGORIES.ARMS,
  },
  {
    id: 'hammer-curl' as ExerciseTemplateId,
    name: 'Hammer Curl',
    category: EXERCISE_CATEGORIES.ARMS,
  },
  {
    id: 'tricep-pushdown' as ExerciseTemplateId,
    name: 'Tricep Pushdown',
    category: EXERCISE_CATEGORIES.ARMS,
  },
  {
    id: 'skull-crushers' as ExerciseTemplateId,
    name: 'Skull Crushers',
    category: EXERCISE_CATEGORIES.ARMS,
  },
  {
    id: 'close-grip-bench' as ExerciseTemplateId,
    name: 'Close Grip Bench',
    category: EXERCISE_CATEGORIES.ARMS,
  },

  // Core
  {
    id: 'plank' as ExerciseTemplateId,
    name: 'Plank',
    category: EXERCISE_CATEGORIES.CORE,
  },
  {
    id: 'crunches' as ExerciseTemplateId,
    name: 'Crunches',
    category: EXERCISE_CATEGORIES.CORE,
  },
  {
    id: 'leg-raises' as ExerciseTemplateId,
    name: 'Leg Raises',
    category: EXERCISE_CATEGORIES.CORE,
  },
  {
    id: 'russian-twists' as ExerciseTemplateId,
    name: 'Russian Twists',
    category: EXERCISE_CATEGORIES.CORE,
  },
  {
    id: 'mountain-climbers' as ExerciseTemplateId,
    name: 'Mountain Climbers',
    category: EXERCISE_CATEGORIES.CORE,
  },
]

export function getExercisesByCategory(
  category: ExerciseCategory
): ExerciseTemplate[] {
  return EXERCISES.filter((ex) => ex.category === category)
}

export function getExerciseById(
  id: ExerciseTemplateId
): ExerciseTemplate | undefined {
  return EXERCISES.find((ex) => ex.id === id)
}

export function getExerciseNameById(id: ExerciseTemplateId): string {
  const exercise = getExerciseById(id)
  return exercise?.name || 'Unknown Exercise'
}
