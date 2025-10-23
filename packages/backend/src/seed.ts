export const PROGRAMS = [
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
    createdAt: "2024-01-01T00:00:00.000Z",
    updatedAt: "2024-01-01T00:00:00.000Z"
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
    createdAt: "2024-01-02T00:00:00.000Z",
    updatedAt: "2024-01-02T00:00:00.000Z"
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
    createdAt: "2024-01-03T00:00:00.000Z",
    updatedAt: "2024-01-03T00:00:00.000Z"
  }
];

export const HISTORY = [
  {
    id: "history-1",
    programName: "Push Pull Legs",
    dayName: "Push Day",
    startedAt: "2024-01-15T09:00:00.000Z",
    finishedAt: "2024-01-15T10:30:00.000Z",
    duration: 90,
    totalSets: 18,
    totalReps: 180,
    totalVolume: 4500,
    exercises: [
      {
        id: "ex-1",
        exerciseId: "bench-press",
        name: "Bench Press",
        sets: [
          { id: "set-1", setNumber: 1, weight: 80, reps: 10, isCompleted: true },
          { id: "set-2", setNumber: 2, weight: 85, reps: 8, isCompleted: true },
          { id: "set-3", setNumber: 3, weight: 90, reps: 6, isCompleted: true }
        ]
      },
      {
        id: "ex-2",
        exerciseId: "shoulder-press",
        name: "Shoulder Press",
        sets: [
          { id: "set-4", setNumber: 1, weight: 30, reps: 12, isCompleted: true },
          { id: "set-5", setNumber: 2, weight: 30, reps: 10, isCompleted: true },
          { id: "set-6", setNumber: 3, weight: 30, reps: 8, isCompleted: true }
        ]
      }
    ]
  },
  {
    id: "history-2",
    programName: "Push Pull Legs",
    dayName: "Pull Day",
    startedAt: "2024-01-13T10:00:00.000Z",
    finishedAt: "2024-01-13T11:15:00.000Z",
    duration: 75,
    totalSets: 15,
    totalReps: 150,
    totalVolume: 3750,
    exercises: [
      {
        id: "ex-3",
        exerciseId: "deadlift",
        name: "Deadlift",
        sets: [
          { id: "set-7", setNumber: 1, weight: 120, reps: 8, isCompleted: true },
          { id: "set-8", setNumber: 2, weight: 125, reps: 6, isCompleted: true },
          { id: "set-9", setNumber: 3, weight: 130, reps: 4, isCompleted: true }
        ]
      },
      {
        id: "ex-4",
        exerciseId: "rows",
        name: "Barbell Rows",
        sets: [
          { id: "set-10", setNumber: 1, weight: 70, reps: 12, isCompleted: true },
          { id: "set-11", setNumber: 2, weight: 75, reps: 10, isCompleted: true },
          { id: "set-12", setNumber: 3, weight: 80, reps: 8, isCompleted: true }
        ]
      }
    ]
  },
  {
    id: "history-3",
    programName: "Push Pull Legs",
    dayName: "Leg Day",
    startedAt: "2024-01-11T08:30:00.000Z",
    finishedAt: "2024-01-11T10:00:00.000Z",
    duration: 90,
    totalSets: 21,
    totalReps: 210,
    totalVolume: 6300,
    exercises: [
      {
        id: "ex-5",
        exerciseId: "squats",
        name: "Squats",
        sets: [
          { id: "set-13", setNumber: 1, weight: 100, reps: 12, isCompleted: true },
          { id: "set-14", setNumber: 2, weight: 105, reps: 10, isCompleted: true },
          { id: "set-15", setNumber: 3, weight: 110, reps: 8, isCompleted: true }
        ]
      },
      {
        id: "ex-6",
        exerciseId: "leg-press",
        name: "Leg Press",
        sets: [
          { id: "set-16", setNumber: 1, weight: 150, reps: 15, isCompleted: true },
          { id: "set-17", setNumber: 2, weight: 160, reps: 12, isCompleted: true },
          { id: "set-18", setNumber: 3, weight: 170, reps: 10, isCompleted: true }
        ]
      }
    ]
  }
];
