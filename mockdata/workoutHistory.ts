import { WorkoutHistory, HistoryStats, WorkoutHistoryId, ProgramId, WorkoutId, WorkoutExerciseId, WorkoutSetId, ExerciseTemplateId } from "@/types";

// Mock workout history data
export const mockWorkoutHistory: WorkoutHistory[] = [
  {
    id: "1" as WorkoutHistoryId,
    programId: "3" as ProgramId,
    programName: "Push Pull Legs",
    workoutId: "5" as WorkoutId,
    workoutName: "Push Day",
    startedAt: new Date("2024-01-15T09:00:00Z"),
    finishedAt: new Date("2024-01-15T10:30:00Z"),
    duration: 90,
    totalSets: 18,
    totalReps: 180,
    exercises: [
      {
        id: "1" as WorkoutExerciseId,
        templateId: "bench-press" as ExerciseTemplateId,
        sets: [
          { id: "1" as WorkoutSetId, setNumber: 1, weight: { value: 80, unit: "kg" }, reps: 10, isCompleted: true },
          { id: "2" as WorkoutSetId, setNumber: 2, weight: { value: 85, unit: "kg" }, reps: 8, isCompleted: true },
          { id: "3" as WorkoutSetId, setNumber: 3, weight: { value: 90, unit: "kg" }, reps: 6, isCompleted: true },
        ],
      },
      {
        id: "2" as WorkoutExerciseId,
        templateId: "dumbbell-shoulder-press" as ExerciseTemplateId,
        sets: [
          { id: "4" as WorkoutSetId, setNumber: 1, weight: { value: 30, unit: "kg" }, reps: 12, isCompleted: true },
          { id: "5" as WorkoutSetId, setNumber: 2, weight: { value: 30, unit: "kg" }, reps: 10, isCompleted: true },
          { id: "6" as WorkoutSetId, setNumber: 3, weight: { value: 30, unit: "kg" }, reps: 8, isCompleted: true },
        ],
      },
    ],
  },
  {
    id: "2" as WorkoutHistoryId,
    programId: "3" as ProgramId,
    programName: "Push Pull Legs",
    workoutId: "6" as WorkoutId,
    workoutName: "Pull Day",
    startedAt: new Date("2024-01-13T10:00:00Z"),
    finishedAt: new Date("2024-01-13T11:15:00Z"),
    duration: 75,
    totalSets: 15,
    totalReps: 150,
    exercises: [
      {
        id: "3" as WorkoutExerciseId,
        templateId: "deadlift" as ExerciseTemplateId,
        sets: [
          { id: "7" as WorkoutSetId, setNumber: 1, weight: { value: 120, unit: "kg" }, reps: 8, isCompleted: true },
          { id: "8" as WorkoutSetId, setNumber: 2, weight: { value: 125, unit: "kg" }, reps: 6, isCompleted: true },
          { id: "9" as WorkoutSetId, setNumber: 3, weight: { value: 130, unit: "kg" }, reps: 4, isCompleted: true },
        ],
      },
      {
        id: "4" as WorkoutExerciseId,
        templateId: "barbell-row" as ExerciseTemplateId,
        sets: [
          { id: "10" as WorkoutSetId, setNumber: 1, weight: { value: 70, unit: "kg" }, reps: 12, isCompleted: true },
          { id: "11" as WorkoutSetId, setNumber: 2, weight: { value: 75, unit: "kg" }, reps: 10, isCompleted: true },
          { id: "12" as WorkoutSetId, setNumber: 3, weight: { value: 80, unit: "kg" }, reps: 8, isCompleted: true },
        ],
      },
    ],
  },
  {
    id: "3" as WorkoutHistoryId,
    programId: "3" as ProgramId,
    programName: "Push Pull Legs",
    workoutId: "7" as WorkoutId,
    workoutName: "Leg Day",
    startedAt: new Date("2024-01-11T08:30:00Z"),
    finishedAt: new Date("2024-01-11T10:00:00Z"),
    duration: 90,
    totalSets: 21,
    totalReps: 210,
    exercises: [
      {
        id: "5" as WorkoutExerciseId,
        templateId: "squat" as ExerciseTemplateId,
        sets: [
          { id: "13" as WorkoutSetId, setNumber: 1, weight: { value: 100, unit: "kg" }, reps: 12, isCompleted: true },
          { id: "14" as WorkoutSetId, setNumber: 2, weight: { value: 105, unit: "kg" }, reps: 10, isCompleted: true },
          { id: "15" as WorkoutSetId, setNumber: 3, weight: { value: 110, unit: "kg" }, reps: 8, isCompleted: true },
        ],
      },
      {
        id: "6" as WorkoutExerciseId,
        templateId: "leg-press" as ExerciseTemplateId,
        sets: [
          { id: "16" as WorkoutSetId, setNumber: 1, weight: { value: 150, unit: "kg" }, reps: 15, isCompleted: true },
          { id: "17" as WorkoutSetId, setNumber: 2, weight: { value: 160, unit: "kg" }, reps: 12, isCompleted: true },
          { id: "18" as WorkoutSetId, setNumber: 3, weight: { value: 170, unit: "kg" }, reps: 10, isCompleted: true },
        ],
      },
    ],
  },
];

// Mock history stats
export const mockHistoryStats: HistoryStats = {
  totalWorkouts: 3,
  totalDuration: 255, // in minutes
  strongestLifts: [
    {
      templateId: "leg-press" as ExerciseTemplateId,
      exerciseName: "Leg Press",
      maxWeight: { value: 170, unit: "kg" },
      date: new Date("2024-01-11T08:30:00Z"),
    },
    {
      templateId: "deadlift" as ExerciseTemplateId,
      exerciseName: "Deadlift",
      maxWeight: { value: 130, unit: "kg" },
      date: new Date("2024-01-13T10:00:00Z"),
    },
    {
      templateId: "squat" as ExerciseTemplateId,
      exerciseName: "Squats",
      maxWeight: { value: 110, unit: "kg" },
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

export function getHistoryByProgramName(programName: string): WorkoutHistory[] {
  return mockWorkoutHistory.filter(workout => workout.programName === programName);
}

export function getHistoryByDateRange(startDate: Date, endDate: Date): WorkoutHistory[] {
  return mockWorkoutHistory.filter(workout => 
    workout.startedAt >= startDate && workout.startedAt <= endDate
  );
}
