import type { Program, WorkoutHistory, HistoryStats, WorkoutSession } from '@/types';

function resolveBaseUrl(): string {
  // Allow override via Expo public env
  const env = (process as any).env || {};
  const fromEnv = env.EXPO_PUBLIC_API_URL || env.API_BASE_URL;
  if (fromEnv) return fromEnv;
  // Default for local dev
  return 'http://localhost:4000';
}

const API_BASE_URL = resolveBaseUrl();

async function getJson<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...init,
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`API ${path} failed: ${res.status} ${text}`);
  }
  return (await res.json()) as T;
}

function reviveDate(value: any): any {
  if (typeof value === 'string' && /\d{4}-\d{2}-\d{2}T/.test(value)) {
    const d = new Date(value);
    if (!isNaN(d.getTime())) return d;
  }
  if (Array.isArray(value)) return value.map(reviveDate);
  if (value && typeof value === 'object') {
    const out: any = {};
    for (const k of Object.keys(value)) out[k] = reviveDate(value[k]);
    return out;
  }
  return value;
}

export async function fetchPrograms(): Promise<Program[]> {
  const data = await getJson<any[]>('/programs');
  return reviveDate(data) as Program[];
}

export async function createProgram(program: Program): Promise<void> {
  await getJson('/programs', {
    method: 'POST',
    body: JSON.stringify(program),
  });
}

export async function fetchWorkoutHistory(): Promise<WorkoutHistory[]> {
  const data = await getJson<any[]>('/history');
  return reviveDate(data) as WorkoutHistory[];
}

export async function fetchHistoryStats(): Promise<HistoryStats> {
  const data = await getJson<any>('/history/stats');
  return reviveDate(data) as HistoryStats;
}

export async function fetchWorkoutSession(
  programId: string,
  workoutId: string
): Promise<WorkoutSession> {
  const q = new URLSearchParams({ programId, workoutId });
  const data = await getJson<any>(`/session?${q.toString()}`);
  return reviveDate(data) as WorkoutSession;
}
