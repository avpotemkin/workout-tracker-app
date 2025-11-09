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
  UserData,
} from '@/types'
import AsyncStorage from '@react-native-async-storage/async-storage'

const API_BASE_URL =
  process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3001/api'
const AUTH_STORAGE_KEY = '@auth_userId'

// Helper to get userId from storage
async function getUserId(): Promise<string | null> {
  try {
    return await AsyncStorage.getItem(AUTH_STORAGE_KEY)
  } catch {
    return null
  }
}

// Helper to create headers with userId
async function createHeaders(): Promise<Record<string, string>> {
  const userId = await getUserId()
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  }

  if (userId) {
    headers['X-User-Id'] = userId
  }

  return headers
}

interface ApiResponse<T> {
  data: T
}

interface ApiError {
  error: string
}

interface ProgramDTO {
  id: string
  name: string
  workouts: Workout[]
  isActive: boolean
  createdAt: string
  updatedAt: string
}

interface WorkoutHistoryDTO {
  id: string
  programId: string
  programName: string
  workoutId: string
  workoutName: string
  exercises: string | WorkoutExercise[] // JSON serialized WorkoutExercise[]
  startedAt: string
  finishedAt: string
  duration: number
  totalSets: number
  totalReps: number
}

// Helper to convert API response to proper Program type with Date objects
function parseProgramDates(program: ProgramDTO): Program {
  return {
    ...program,
    id: program.id as ProgramId,
    createdAt: new Date(program.createdAt),
    updatedAt: new Date(program.updatedAt),
  }
}

async function handleResponse<T>(response: globalThis.Response): Promise<T> {
  if (!response.ok) {
    return response.json().then((error: ApiError) => {
      throw new Error(error.error || 'API request failed')
    })
  }
  return response.json().then((json: ApiResponse<T>) => json.data)
}

export async function fetchPrograms(): Promise<Program[]> {
  const headers = await createHeaders()
  const response = await fetch(`${API_BASE_URL}/programs`, {
    headers,
  })
  const programs = await handleResponse<ProgramDTO[]>(response)
  return programs.map(parseProgramDates)
}

export async function fetchProgram(id: ProgramId): Promise<Program> {
  const headers = await createHeaders()
  const response = await fetch(`${API_BASE_URL}/programs/${id}`, {
    headers,
  })
  const program = await handleResponse<ProgramDTO>(response)
  return parseProgramDates(program)
}

export async function createProgram(program: Program): Promise<Program> {
  const headers = await createHeaders()
  const response = await fetch(`${API_BASE_URL}/programs`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      ...program,
      createdAt: program.createdAt.toISOString(),
      updatedAt: program.updatedAt.toISOString(),
    }),
  })
  const created = await handleResponse<ProgramDTO>(response)
  return parseProgramDates(created)
}

export async function updateProgram(
  id: ProgramId,
  program: Program
): Promise<Program> {
  const headers = await createHeaders()
  const response = await fetch(`${API_BASE_URL}/programs/${id}`, {
    method: 'PUT',
    headers,
    body: JSON.stringify({
      ...program,
      updatedAt: new Date().toISOString(),
    }),
  })
  const updated = await handleResponse<ProgramDTO>(response)
  return parseProgramDates(updated)
}

export async function deleteProgram(id: ProgramId): Promise<void> {
  const headers = await createHeaders()
  const response = await fetch(`${API_BASE_URL}/programs/${id}`, {
    method: 'DELETE',
    headers,
  })
  await handleResponse<{ success: boolean }>(response)
}

// Helper to convert API response to proper WorkoutHistory type with Date objects
function parseWorkoutHistoryDates(history: WorkoutHistoryDTO): WorkoutHistory {
  return {
    ...history,
    id: history.id as WorkoutHistoryId,
    programId: history.programId as ProgramId,
    workoutId: history.workoutId as WorkoutId,
    exercises:
      typeof history.exercises === 'string'
        ? (JSON.parse(history.exercises) as WorkoutExercise[])
        : history.exercises,
    startedAt: new Date(history.startedAt),
    finishedAt: new Date(history.finishedAt),
  }
}

// History API functions

function buildQueryString(params: Record<string, string>): string {
  const parts: string[] = []
  for (const [key, value] of Object.entries(params)) {
    if (value) {
      parts.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    }
  }
  return parts.length > 0 ? `?${parts.join('&')}` : ''
}

export async function fetchWorkoutHistory(
  filters?: HistoryFilter
): Promise<WorkoutHistory[]> {
  const queryParams: Record<string, string> = {}
  if (filters?.programId) {
    queryParams.programId = filters.programId
  }
  if (filters?.templateId) {
    queryParams.templateId = filters.templateId
  }
  if (filters?.dateRange) {
    queryParams.startDate = filters.dateRange.start.toISOString()
    queryParams.endDate = filters.dateRange.end.toISOString()
  }

  const queryString = buildQueryString(queryParams)
  const url = `${API_BASE_URL}/history${queryString}`
  const headers = await createHeaders()

  const response = await fetch(url, { headers })
  const history = await handleResponse<WorkoutHistoryDTO[]>(response)
  return history.map(parseWorkoutHistoryDates)
}

export async function fetchWorkoutHistoryById(
  id: WorkoutHistoryId
): Promise<WorkoutHistory> {
  const headers = await createHeaders()
  const response = await fetch(`${API_BASE_URL}/history/${id}`, {
    headers,
  })
  const history = await handleResponse<WorkoutHistoryDTO>(response)
  return parseWorkoutHistoryDates(history)
}

export async function createWorkoutHistory(
  history: WorkoutHistory
): Promise<WorkoutHistory> {
  const headers = await createHeaders()
  const response = await fetch(`${API_BASE_URL}/history`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      ...history,
      exercises: JSON.stringify(history.exercises),
      startedAt: history.startedAt.toISOString(),
      finishedAt: history.finishedAt.toISOString(),
    }),
  })
  const created = await handleResponse<WorkoutHistoryDTO>(response)
  return parseWorkoutHistoryDates(created)
}

export async function getHistoryStats(
  filters?: HistoryFilter
): Promise<HistoryStats> {
  const queryParams: Record<string, string> = {}
  if (filters?.programId) {
    queryParams.programId = filters.programId
  }
  if (filters?.templateId) {
    queryParams.templateId = filters.templateId
  }
  if (filters?.dateRange) {
    queryParams.startDate = filters.dateRange.start.toISOString()
    queryParams.endDate = filters.dateRange.end.toISOString()
  }

  const queryString = buildQueryString(queryParams)
  const url = `${API_BASE_URL}/history/stats${queryString}`
  const headers = await createHeaders()

  const response = await fetch(url, { headers })
  const stats = await handleResponse<HistoryStats>(response)
  // Parse dates in strongestLifts
  return {
    ...stats,
    strongestLifts: stats.strongestLifts.map((lift) => ({
      ...lift,
      date: new Date(lift.date),
    })),
  }
}

// User Data API functions

interface UserDataDTO {
  userId: string
  currentProgramId: string | null
  updatedAt: string
}

// Helper to convert API response to proper UserData type with Date objects
function parseUserDataDates(userData: UserDataDTO): UserData {
  return {
    ...userData,
    currentProgramId: userData.currentProgramId
      ? (userData.currentProgramId as ProgramId)
      : null,
    updatedAt: new Date(userData.updatedAt),
  }
}

export async function fetchUserData(): Promise<UserData> {
  const headers = await createHeaders()
  const response = await fetch(`${API_BASE_URL}/user-data`, {
    headers,
  })
  const userData = await handleResponse<UserDataDTO>(response)
  return parseUserDataDates(userData)
}

export async function updateUserData(
  data: Partial<UserData>
): Promise<UserData> {
  const headers = await createHeaders()
  const response = await fetch(`${API_BASE_URL}/user-data`, {
    method: 'PUT',
    headers,
    body: JSON.stringify({
      ...data,
      updatedAt: data.updatedAt?.toISOString(),
    }),
  })
  const updated = await handleResponse<UserDataDTO>(response)
  return parseUserDataDates(updated)
}
