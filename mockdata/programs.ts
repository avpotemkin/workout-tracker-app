import { Program, ProgramId, WorkoutId, ProgramExerciseId, ExerciseTemplateId } from '@/types';

export const PROGRAMS: Program[] = [
  { 
    id: "1" as ProgramId,
    name: "Full Body",
    workouts: [
      {
        id: "1" as WorkoutId,
        name: "Full Body A",
        exercises: [
          { 
            id: "1" as ProgramExerciseId,
            templateId: "squat" as ExerciseTemplateId,
            sets: 3,
            reps: 5,
            weight: { value: 100, unit: "kg" }
          },
          { 
            id: "2" as ProgramExerciseId,
            templateId: "bench-press" as ExerciseTemplateId,
            sets: 3,
            reps: 5,
            weight: { value: 80, unit: "kg" }
          },
          { 
            id: "3" as ProgramExerciseId,
            templateId: "deadlift" as ExerciseTemplateId,
            sets: 3,
            reps: 5,
            weight: { value: 120, unit: "kg" }
          }
        ]
      },
      {
        id: "2" as WorkoutId,
        name: "Full Body B",
        exercises: [
          { 
            id: "4" as ProgramExerciseId,
            templateId: "lunges" as ExerciseTemplateId,
            sets: 3,
            reps: 8,
            weight: { value: 60, unit: "kg" }
          },
          { 
            id: "5" as ProgramExerciseId,
            templateId: "incline-press" as ExerciseTemplateId,
            sets: 3,
            reps: 8,
            weight: { value: 70, unit: "kg" }
          },
          { 
            id: "6" as ProgramExerciseId,
            templateId: "barbell-row" as ExerciseTemplateId,
            sets: 3,
            reps: 8,
            weight: { value: 80, unit: "kg" }
          }
        ]
      }
    ],
    isActive: true,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },
  { 
    id: "2" as ProgramId,
    name: "5×5",
    workouts: [
      {
        id: "3" as WorkoutId,
        name: "Workout A",
        exercises: [
          { 
            id: "7" as ProgramExerciseId,
            templateId: "squat" as ExerciseTemplateId,
            sets: 5,
            reps: 5,
            weight: { value: 110, unit: "kg" }
          },
          { 
            id: "8" as ProgramExerciseId,
            templateId: "overhead-press" as ExerciseTemplateId,
            sets: 5,
            reps: 5,
            weight: { value: 70, unit: "kg" }
          },
          { 
            id: "9" as ProgramExerciseId,
            templateId: "barbell-row" as ExerciseTemplateId,
            sets: 5,
            reps: 5,
            weight: { value: 90, unit: "kg" }
          }
        ]
      },
      {
        id: "4" as WorkoutId,
        name: "Workout B",
        exercises: [
          { 
            id: "10" as ProgramExerciseId,
            templateId: "squat" as ExerciseTemplateId,
            sets: 5,
            reps: 5,
            weight: { value: 110, unit: "kg" }
          },
          { 
            id: "11" as ProgramExerciseId,
            templateId: "bench-press" as ExerciseTemplateId,
            sets: 5,
            reps: 5,
            weight: { value: 85, unit: "kg" }
          },
          { 
            id: "12" as ProgramExerciseId,
            templateId: "deadlift" as ExerciseTemplateId,
            sets: 5,
            reps: 5,
            weight: { value: 130, unit: "kg" }
          }
        ]
      }
    ],
    isActive: true,
    createdAt: new Date('2024-01-02'),
    updatedAt: new Date('2024-01-02')
  },
  { 
    id: "3" as ProgramId,
    name: "Push, Pull, Legs",
    workouts: [
      {
        id: "5" as WorkoutId,
        name: "Push",
        exercises: [
          { 
            id: "13" as ProgramExerciseId,
            templateId: "bench-press" as ExerciseTemplateId,
            sets: 3,
            reps: 8,
            weight: { value: 85, unit: "kg" }
          },
          { 
            id: "14" as ProgramExerciseId,
            templateId: "dumbbell-shoulder-press" as ExerciseTemplateId,
            sets: 3,
            reps: 8,
            weight: { value: 65, unit: "kg" }
          },
          { 
            id: "15" as ProgramExerciseId,
            templateId: "tricep-pushdown" as ExerciseTemplateId,
            sets: 3,
            reps: 10,
            weight: { value: 30, unit: "kg" }
          },
          { 
            id: "16" as ProgramExerciseId,
            templateId: "dumbbell-press" as ExerciseTemplateId,
            sets: 3,
            reps: 10,
            weight: { value: 30, unit: "kg" }
          }
        ]
      },
      {
        id: "6" as WorkoutId,
        name: "Pull",
        exercises: [
          { 
            id: "17" as ProgramExerciseId,
            templateId: "deadlift" as ExerciseTemplateId,
            sets: 3,
            reps: 8,
            weight: { value: 120, unit: "kg" }
          },
          { 
            id: "18" as ProgramExerciseId,
            templateId: "pull-ups" as ExerciseTemplateId,
            sets: 3,
            reps: 8
          },
          { 
            id: "19" as ProgramExerciseId,
            templateId: "barbell-row" as ExerciseTemplateId,
            sets: 3,
            reps: 8,
            weight: { value: 70, unit: "kg" }
          },
          { 
            id: "20" as ProgramExerciseId,
            templateId: "barbell-curl" as ExerciseTemplateId,
            sets: 3,
            reps: 12,
            weight: { value: 20, unit: "kg" }
          }
        ]
      },
      {
        id: "7" as WorkoutId,
        name: "Legs",
        exercises: [
          { 
            id: "21" as ProgramExerciseId,
            templateId: "squat" as ExerciseTemplateId,
            sets: 4,
            reps: 8,
            weight: { value: 100, unit: "kg" }
          },
          { 
            id: "22" as ProgramExerciseId,
            templateId: "leg-press" as ExerciseTemplateId,
            sets: 3,
            reps: 10,
            weight: { value: 150, unit: "kg" }
          },
          { 
            id: "23" as ProgramExerciseId,
            templateId: "romanian-deadlift" as ExerciseTemplateId,
            sets: 3,
            reps: 10,
            weight: { value: 80, unit: "kg" }
          },
          { 
            id: "24" as ProgramExerciseId,
            templateId: "calf-raises" as ExerciseTemplateId,
            sets: 4,
            reps: 15,
            weight: { value: 40, unit: "kg" }
          }
        ]
      }
    ],
    isActive: true,
    createdAt: new Date('2024-01-03'),
    updatedAt: new Date('2024-01-03')
  }
];
