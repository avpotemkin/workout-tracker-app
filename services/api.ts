import { Program, ProgramId, Workout } from "@/types";

const API_BASE_URL = "http://localhost:8080/api";

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

