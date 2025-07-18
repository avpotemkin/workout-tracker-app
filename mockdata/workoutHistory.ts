import { WorkoutHistory, HistoryStats } from "@/types";

// Mock workout history data
export const mockWorkoutHistory: WorkoutHistory[] = [
  {
    id: "history-1",
    programName: "Push Pull Legs",
    dayName: "Push Day",
    startedAt: new Date("2024-01-15T09:00:00Z"),
    finishedAt: new Date("2024-01-15T10:30:00Z"),
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
          { id: "set-3", setNumber: 3, weight: 90, reps: 6, isCompleted: true },
        ],
      },
      {
        id: "ex-2",
        exerciseId: "shoulder-press",
        name: "Shoulder Press",
        sets: [
          { id: "set-4", setNumber: 1, weight: 30, reps: 12, isCompleted: true },
          { id: "set-5", setNumber: 2, weight: 30, reps: 10, isCompleted: true },
          { id: "set-6", setNumber: 3, weight: 30, reps: 8, isCompleted: true },
        ],
      },
    ],
  },
  {
    id: "history-2",
    programName: "Push Pull Legs",
    dayName: "Pull Day",
    startedAt: new Date("2024-01-13T10:00:00Z"),
    finishedAt: new Date("2024-01-13T11:15:00Z"),
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
          { id: "set-9", setNumber: 3, weight: 130, reps: 4, isCompleted: true },
        ],
      },
      {
        id: "ex-4",
        exerciseId: "rows",
        name: "Barbell Rows",
        sets: [
          { id: "set-10", setNumber: 1, weight: 70, reps: 12, isCompleted: true },
          { id: "set-11", setNumber: 2, weight: 75, reps: 10, isCompleted: true },
          { id: "set-12", setNumber: 3, weight: 80, reps: 8, isCompleted: true },
        ],
      },
    ],
  },
  {
    id: "history-3",
    programName: "Push Pull Legs",
    dayName: "Leg Day",
    startedAt: new Date("2024-01-11T08:30:00Z"),
    finishedAt: new Date("2024-01-11T10:00:00Z"),
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
          { id: "set-15", setNumber: 3, weight: 110, reps: 8, isCompleted: true },
        ],
      },
      {
        id: "ex-6",
        exerciseId: "leg-press",
        name: "Leg Press",
        sets: [
          { id: "set-16", setNumber: 1, weight: 150, reps: 15, isCompleted: true },
          { id: "set-17", setNumber: 2, weight: 160, reps: 12, isCompleted: true },
          { id: "set-18", setNumber: 3, weight: 170, reps: 10, isCompleted: true },
        ],
      },
    ],
  },
];

// Mock history stats
export const mockHistoryStats: HistoryStats = {
  totalWorkouts: 3,
  totalDuration: 255, // in minutes
  totalVolume: 14550,
  averageWorkoutDuration: 85,
  strongestLifts: [
    {
      exercise: "Leg Press",
      maxWeight: 170,
      date: new Date("2024-01-11T08:30:00Z"),
    },
    {
      exercise: "Deadlift",
      maxWeight: 130,
      date: new Date("2024-01-13T10:00:00Z"),
    },
    {
      exercise: "Squats",
      maxWeight: 110,
      date: new Date("2024-01-11T08:30:00Z"),
    },
  ],
};

// Export functions to get the data
export function getWorkoutHistory(): WorkoutHistory[] {
  return mockWorkoutHistory;
}

export function getHistoryStats(): HistoryStats {
  return mockHistoryStats;
}

export function getWorkoutHistoryById(id: string): WorkoutHistory | undefined {
  return mockWorkoutHistory.find(workout => workout.id === id);
}

export function getHistoryByProgram(programName: string): WorkoutHistory[] {
  return mockWorkoutHistory.filter(workout => workout.programName === programName);
}

export function getHistoryByDateRange(startDate: Date, endDate: Date): WorkoutHistory[] {
  return mockWorkoutHistory.filter(workout => 
    workout.startedAt >= startDate && workout.startedAt <= endDate
  );
} 