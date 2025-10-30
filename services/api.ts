import {
  Program,
  ProgramId,
  Workout,
  WorkoutHistory,
  WorkoutHistoryId,
  HistoryFilter,
  HistoryStats,
  WorkoutExercise,
  WorkoutId,
} from "@/types";

const API_BASE_URL =
  process.env.EXPO_PUBLIC_API_URL || "http://localhost:3001/api";

interface ApiResponse<T> {
  data: T;
}

interface ApiError {
  error: string;
}

interface ProgramDTO {
  id: string;
  name: string;
  workouts: Workout[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface WorkoutHistoryDTO {
  id: string;
  programId: string;
  programName: string;
  workoutId: string;
  workoutName: string;
  exercises: string | WorkoutExercise[]; // JSON serialized WorkoutExercise[]
  startedAt: string;
  finishedAt: string;
  duration: number;
  totalSets: number;
  totalReps: number;
}

// Helper to convert API response to proper Program type with Date objects
function parseProgramDates(program: ProgramDTO): Program {
  return {
    ...program,
    id: program.id as ProgramId,
    createdAt: new Date(program.createdAt),
    updatedAt: new Date(program.updatedAt),
  };
}

async function handleResponse<T>(response: globalThis.Response): Promise<T> {
  if (!response.ok) {
    return response.json().then((error: ApiError) => {
      throw new Error(error.error || "API request failed");
    });
  }
  return response.json().then((json: ApiResponse<T>) => json.data);
}

export async function fetchPrograms(): Promise<Program[]> {
  const response = await fetch(`${API_BASE_URL}/programs`);
  const programs = await handleResponse<ProgramDTO[]>(response);
  return programs.map(parseProgramDates);
}

export async function fetchProgram(id: ProgramId): Promise<Program> {
  const response = await fetch(`${API_BASE_URL}/programs/${id}`);
  const program = await handleResponse<ProgramDTO>(response);
  return parseProgramDates(program);
}

export async function createProgram(program: Program): Promise<Program> {
  const response = await fetch(`${API_BASE_URL}/programs`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...program,
      createdAt: program.createdAt.toISOString(),
      updatedAt: program.updatedAt.toISOString(),
    }),
  });
  const created = await handleResponse<ProgramDTO>(response);
  return parseProgramDates(created);
}

export async function updateProgram(
  id: ProgramId,
  program: Program
): Promise<Program> {
  const response = await fetch(`${API_BASE_URL}/programs/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...program,
      updatedAt: new Date().toISOString(),
    }),
  });
  const updated = await handleResponse<ProgramDTO>(response);
  return parseProgramDates(updated);
}

export async function deleteProgram(id: ProgramId): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/programs/${id}`, {
    method: "DELETE",
  });
  await handleResponse<{ success: boolean }>(response);
}

// Helper to convert API response to proper WorkoutHistory type with Date objects
function parseWorkoutHistoryDates(history: WorkoutHistoryDTO): WorkoutHistory {
  return {
    ...history,
    id: history.id as WorkoutHistoryId,
    programId: history.programId as ProgramId,
    workoutId: history.workoutId as WorkoutId,
    exercises:
      typeof history.exercises === "string"
        ? (JSON.parse(history.exercises) as WorkoutExercise[])
        : history.exercises,
    startedAt: new Date(history.startedAt),
    finishedAt: new Date(history.finishedAt),
  };
}

// History API functions

function buildQueryString(params: Record<string, string>): string {
  const parts: string[] = [];
  for (const [key, value] of Object.entries(params)) {
    if (value) {
      parts.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`);
    }
  }
  return parts.length > 0 ? `?${parts.join("&")}` : "";
}

export async function fetchWorkoutHistory(
  filters?: HistoryFilter
): Promise<WorkoutHistory[]> {
  const queryParams: Record<string, string> = {};
  if (filters?.programId) {
    queryParams.programId = filters.programId;
  }
  if (filters?.templateId) {
    queryParams.templateId = filters.templateId;
  }
  if (filters?.dateRange) {
    queryParams.startDate = filters.dateRange.start.toISOString();
    queryParams.endDate = filters.dateRange.end.toISOString();
  }

  const queryString = buildQueryString(queryParams);
  const url = `${API_BASE_URL}/history${queryString}`;

  const response = await fetch(url);
  const history = await handleResponse<WorkoutHistoryDTO[]>(response);
  return history.map(parseWorkoutHistoryDates);
}

export async function fetchWorkoutHistoryById(
  id: WorkoutHistoryId
): Promise<WorkoutHistory> {
  const response = await fetch(`${API_BASE_URL}/history/${id}`);
  const history = await handleResponse<WorkoutHistoryDTO>(response);
  return parseWorkoutHistoryDates(history);
}

export async function createWorkoutHistory(
  history: WorkoutHistory
): Promise<WorkoutHistory> {
  const response = await fetch(`${API_BASE_URL}/history`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...history,
      exercises: JSON.stringify(history.exercises),
      startedAt: history.startedAt.toISOString(),
      finishedAt: history.finishedAt.toISOString(),
    }),
  });
  const created = await handleResponse<WorkoutHistoryDTO>(response);
  return parseWorkoutHistoryDates(created);
}

export async function getHistoryStats(
  filters?: HistoryFilter
): Promise<HistoryStats> {
  const queryParams: Record<string, string> = {};
  if (filters?.programId) {
    queryParams.programId = filters.programId;
  }
  if (filters?.templateId) {
    queryParams.templateId = filters.templateId;
  }
  if (filters?.dateRange) {
    queryParams.startDate = filters.dateRange.start.toISOString();
    queryParams.endDate = filters.dateRange.end.toISOString();
  }

  const queryString = buildQueryString(queryParams);
  const url = `${API_BASE_URL}/history/stats${queryString}`;

  const response = await fetch(url);
  const stats = await handleResponse<HistoryStats>(response);
  // Parse dates in strongestLifts
  return {
    ...stats,
    strongestLifts: stats.strongestLifts.map((lift) => ({
      ...lift,
      date: new Date(lift.date),
    })),
  };
}

