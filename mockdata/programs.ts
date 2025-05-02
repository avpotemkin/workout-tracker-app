import { Program } from '@/types';

export const PROGRAMS: Program[] = [
  { 
    id: "1", 
    name: "Full Body",
    description: "A comprehensive full-body workout targeting all major muscle groups",
    exercises: [
      { id: "1-1", name: "Squats", sets: 3, reps: 5, weight: 100 },
      { id: "1-2", name: "Bench Press", sets: 3, reps: 5, weight: 80 },
      { id: "1-3", name: "Deadlifts", sets: 3, reps: 5, weight: 120 }
    ],
    isActive: true,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },
  { 
    id: "2", 
    name: "5×5",
    description: "Strength training program focusing on compound lifts",
    exercises: [
      { id: "2-1", name: "Squats", sets: 5, reps: 5, weight: 110 },
      { id: "2-2", name: "Overhead Press", sets: 5, reps: 5, weight: 70 },
      { id: "2-3", name: "Barbell Rows", sets: 5, reps: 5, weight: 90 }
    ],
    isActive: true,
    createdAt: new Date('2024-01-02'),
    updatedAt: new Date('2024-01-02')
  },
  { 
    id: "3", 
    name: "Push, Pull, Legs",
    description: "Split routine targeting different muscle groups on different days",
    exercises: [
      { id: "3-1", name: "Bench Press", sets: 3, reps: 8, weight: 85 },
      { id: "3-2", name: "Shoulder Press", sets: 3, reps: 8, weight: 65 },
      { id: "3-3", name: "Tricep Extensions", sets: 3, reps: 10, weight: 30 }
    ],
    isActive: true,
    createdAt: new Date('2024-01-03'),
    updatedAt: new Date('2024-01-03')
  }
];
