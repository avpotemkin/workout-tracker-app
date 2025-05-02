import { Program } from '@/types';

export const PROGRAMS: Program[] = [
  { 
    id: "1", 
    name: "Full Body",
    description: "A comprehensive full-body workout targeting all major muscle groups",
    workouts: [
      {
        id: "1-day-1",
        name: "Full Body A",
        exercises: [
          { id: "1-1", name: "Squats", sets: 3, reps: 5, weight: 100 },
          { id: "1-2", name: "Bench Press", sets: 3, reps: 5, weight: 80 },
          { id: "1-3", name: "Deadlifts", sets: 3, reps: 5, weight: 120 }
        ]
      },
      {
        id: "1-day-2",
        name: "Full Body B",
        exercises: [
          { id: "1-4", name: "Lunges", sets: 3, reps: 8, weight: 60 },
          { id: "1-5", name: "Incline Press", sets: 3, reps: 8, weight: 70 },
          { id: "1-6", name: "Barbell Rows", sets: 3, reps: 8, weight: 80 }
        ]
      }
    ],
    isActive: true,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },
  { 
    id: "2", 
    name: "5×5",
    description: "Strength training program focusing on compound lifts",
    workouts: [
      {
        id: "2-day-1",
        name: "Workout A",
        exercises: [
          { id: "2-1", name: "Squats", sets: 5, reps: 5, weight: 110 },
          { id: "2-2", name: "Overhead Press", sets: 5, reps: 5, weight: 70 },
          { id: "2-3", name: "Barbell Rows", sets: 5, reps: 5, weight: 90 }
        ]
      },
      {
        id: "2-day-2",
        name: "Workout B",
        exercises: [
          { id: "2-4", name: "Squats", sets: 5, reps: 5, weight: 110 },
          { id: "2-5", name: "Bench Press", sets: 5, reps: 5, weight: 85 },
          { id: "2-6", name: "Deadlifts", sets: 5, reps: 5, weight: 130 }
        ]
      }
    ],
    isActive: true,
    createdAt: new Date('2024-01-02'),
    updatedAt: new Date('2024-01-02')
  },
  { 
    id: "3", 
    name: "Push, Pull, Legs",
    description: "Split routine targeting different muscle groups on different days",
    workouts: [
      {
        id: "3-day-1",
        name: "Push",
        description: "Chest, shoulders, and triceps",
        exercises: [
          { id: "3-1", name: "Bench Press", sets: 3, reps: 8, weight: 85 },
          { id: "3-2", name: "Shoulder Press", sets: 3, reps: 8, weight: 65 },
          { id: "3-3", name: "Tricep Extensions", sets: 3, reps: 10, weight: 30 },
          { id: "3-4", name: "Incline Dumbbell Press", sets: 3, reps: 10, weight: 30 }
        ]
      },
      {
        id: "3-day-2",
        name: "Pull",
        description: "Back and biceps",
        exercises: [
          { id: "3-5", name: "Deadlifts", sets: 3, reps: 8, weight: 120 },
          { id: "3-6", name: "Pull-ups", sets: 3, reps: 8 },
          { id: "3-7", name: "Barbell Rows", sets: 3, reps: 8, weight: 70 },
          { id: "3-8", name: "Bicep Curls", sets: 3, reps: 12, weight: 20 }
        ]
      },
      {
        id: "3-day-3",
        name: "Legs",
        description: "Quadriceps, hamstrings, and calves",
        exercises: [
          { id: "3-9", name: "Squats", sets: 4, reps: 8, weight: 100 },
          { id: "3-10", name: "Leg Press", sets: 3, reps: 10, weight: 150 },
          { id: "3-11", name: "Romanian Deadlifts", sets: 3, reps: 10, weight: 80 },
          { id: "3-12", name: "Calf Raises", sets: 4, reps: 15, weight: 40 }
        ]
      }
    ],
    isActive: true,
    createdAt: new Date('2024-01-03'),
    updatedAt: new Date('2024-01-03')
  }
];
