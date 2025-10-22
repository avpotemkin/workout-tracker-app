export interface ExerciseTemplate {
  id: string;
  name: string;
  category: string;
  sets: number;
  reps: number;
}

export const EXERCISE_CATEGORIES = {
  CHEST: 'Chest',
  BACK: 'Back',
  LEGS: 'Legs',
  SHOULDERS: 'Shoulders',
  ARMS: 'Arms',
  CORE: 'Core',
} as const;

export const EXERCISES: ExerciseTemplate[] = [
  // Chest
  { id: 'bench-press', name: 'Bench Press', category: EXERCISE_CATEGORIES.CHEST, sets: 3, reps: 8 },
  { id: 'incline-press', name: 'Incline Press', category: EXERCISE_CATEGORIES.CHEST, sets: 3, reps: 10 },
  { id: 'dumbbell-press', name: 'Dumbbell Press', category: EXERCISE_CATEGORIES.CHEST, sets: 3, reps: 10 },
  { id: 'chest-fly', name: 'Chest Fly', category: EXERCISE_CATEGORIES.CHEST, sets: 3, reps: 12 },
  { id: 'push-ups', name: 'Push-ups', category: EXERCISE_CATEGORIES.CHEST, sets: 3, reps: 15 },
  { id: 'dips', name: 'Dips', category: EXERCISE_CATEGORIES.CHEST, sets: 3, reps: 10 },

  // Back
  { id: 'deadlift', name: 'Deadlift', category: EXERCISE_CATEGORIES.BACK, sets: 3, reps: 5 },
  { id: 'barbell-row', name: 'Barbell Row', category: EXERCISE_CATEGORIES.BACK, sets: 3, reps: 8 },
  { id: 'pull-ups', name: 'Pull-ups', category: EXERCISE_CATEGORIES.BACK, sets: 3, reps: 8 },
  { id: 'lat-pulldown', name: 'Lat Pulldown', category: EXERCISE_CATEGORIES.BACK, sets: 3, reps: 10 },
  { id: 'seated-row', name: 'Seated Row', category: EXERCISE_CATEGORIES.BACK, sets: 3, reps: 10 },
  { id: 'face-pulls', name: 'Face Pulls', category: EXERCISE_CATEGORIES.BACK, sets: 3, reps: 15 },

  // Legs
  { id: 'squat', name: 'Squat', category: EXERCISE_CATEGORIES.LEGS, sets: 3, reps: 5 },
  { id: 'front-squat', name: 'Front Squat', category: EXERCISE_CATEGORIES.LEGS, sets: 3, reps: 8 },
  { id: 'leg-press', name: 'Leg Press', category: EXERCISE_CATEGORIES.LEGS, sets: 3, reps: 10 },
  { id: 'lunges', name: 'Lunges', category: EXERCISE_CATEGORIES.LEGS, sets: 3, reps: 10 },
  { id: 'romanian-deadlift', name: 'Romanian Deadlift', category: EXERCISE_CATEGORIES.LEGS, sets: 3, reps: 10 },
  { id: 'leg-curl', name: 'Leg Curl', category: EXERCISE_CATEGORIES.LEGS, sets: 3, reps: 12 },
  { id: 'leg-extension', name: 'Leg Extension', category: EXERCISE_CATEGORIES.LEGS, sets: 3, reps: 12 },
  { id: 'calf-raises', name: 'Calf Raises', category: EXERCISE_CATEGORIES.LEGS, sets: 3, reps: 15 },

  // Shoulders
  { id: 'overhead-press', name: 'Overhead Press', category: EXERCISE_CATEGORIES.SHOULDERS, sets: 3, reps: 8 },
  { id: 'dumbbell-shoulder-press', name: 'Dumbbell Shoulder Press', category: EXERCISE_CATEGORIES.SHOULDERS, sets: 3, reps: 10 },
  { id: 'lateral-raises', name: 'Lateral Raises', category: EXERCISE_CATEGORIES.SHOULDERS, sets: 3, reps: 12 },
  { id: 'front-raises', name: 'Front Raises', category: EXERCISE_CATEGORIES.SHOULDERS, sets: 3, reps: 12 },
  { id: 'rear-delt-fly', name: 'Rear Delt Fly', category: EXERCISE_CATEGORIES.SHOULDERS, sets: 3, reps: 12 },
  { id: 'arnold-press', name: 'Arnold Press', category: EXERCISE_CATEGORIES.SHOULDERS, sets: 3, reps: 10 },

  // Arms
  { id: 'barbell-curl', name: 'Barbell Curl', category: EXERCISE_CATEGORIES.ARMS, sets: 3, reps: 10 },
  { id: 'dumbbell-curl', name: 'Dumbbell Curl', category: EXERCISE_CATEGORIES.ARMS, sets: 3, reps: 10 },
  { id: 'hammer-curl', name: 'Hammer Curl', category: EXERCISE_CATEGORIES.ARMS, sets: 3, reps: 10 },
  { id: 'tricep-pushdown', name: 'Tricep Pushdown', category: EXERCISE_CATEGORIES.ARMS, sets: 3, reps: 12 },
  { id: 'skull-crushers', name: 'Skull Crushers', category: EXERCISE_CATEGORIES.ARMS, sets: 3, reps: 10 },
  { id: 'close-grip-bench', name: 'Close Grip Bench', category: EXERCISE_CATEGORIES.ARMS, sets: 3, reps: 8 },

  // Core
  { id: 'plank', name: 'Plank', category: EXERCISE_CATEGORIES.CORE, sets: 3, reps: 60 },
  { id: 'crunches', name: 'Crunches', category: EXERCISE_CATEGORIES.CORE, sets: 3, reps: 20 },
  { id: 'leg-raises', name: 'Leg Raises', category: EXERCISE_CATEGORIES.CORE, sets: 3, reps: 15 },
  { id: 'russian-twists', name: 'Russian Twists', category: EXERCISE_CATEGORIES.CORE, sets: 3, reps: 20 },
  { id: 'mountain-climbers', name: 'Mountain Climbers', category: EXERCISE_CATEGORIES.CORE, sets: 3, reps: 20 },
];

export function getExercisesByCategory(category: string): ExerciseTemplate[] {
  return EXERCISES.filter(ex => ex.category === category);
}

export function getExerciseById(id: string): ExerciseTemplate | undefined {
  return EXERCISES.find(ex => ex.id === id);
}




