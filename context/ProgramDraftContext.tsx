import React, { createContext, useContext, useState, ReactNode } from "react";
import { Workout, Program, WorkoutId, ProgramExerciseId } from "@/types";
import {
  WorkoutSplitType,
  getPresetWorkouts,
} from "@/constants/WorkoutPresets";
import { generateId } from "@/utils/ids";

interface ProgramDraftContextType {
  workouts: Workout[];
  setWorkouts: (workouts: Workout[]) => void;
  updateWorkout: (workoutId: WorkoutId, updatedWorkout: Workout) => void;
  removeWorkout: (workoutId: WorkoutId) => void;
  addWorkout: (workout: Workout) => void;
  getWorkout: (workoutId: WorkoutId) => Workout | undefined;
  resetWithPreset: (split: WorkoutSplitType) => void;
  initializeWithProgram: (program: Program) => void;
}

const ProgramDraftContext = createContext<ProgramDraftContextType | undefined>(
  undefined
);

export function ProgramDraftProvider({ children }: { children: ReactNode }) {
  const [workouts, setWorkouts] = useState<Workout[]>([]);

  function updateWorkout(workoutId: WorkoutId, updatedWorkout: Workout) {
    setWorkouts((prevWorkouts) =>
      prevWorkouts.map((w) => (w.id === workoutId ? updatedWorkout : w))
    );
  }

  function removeWorkout(workoutId: WorkoutId) {
    setWorkouts((prevWorkouts) =>
      prevWorkouts.filter((w) => w.id !== workoutId)
    );
  }

  function addWorkout(workout: Workout) {
    setWorkouts((prevWorkouts) => [...prevWorkouts, workout]);
  }

  function getWorkout(workoutId: WorkoutId) {
    return workouts.find((w) => w.id === workoutId);
  }

  function resetWithPreset(split: WorkoutSplitType) {
    const presetWorkouts = getPresetWorkouts(split);
    const initializedWorkouts: Workout[] = presetWorkouts.map((preset) => ({
      id: generateId() as WorkoutId,
      name: preset.name,
      exercises: preset.exercises.map((ex) => ({
        ...ex,
        id: generateId() as ProgramExerciseId,
      })),
    }));
    setWorkouts(initializedWorkouts);
  }

  function initializeWithProgram(program: Program) {
    setWorkouts(program.workouts);
  }

  return (
    <ProgramDraftContext.Provider
      value={{
        workouts,
        setWorkouts,
        updateWorkout,
        removeWorkout,
        addWorkout,
        getWorkout,
        resetWithPreset,
        initializeWithProgram,
      }}
    >
      {children}
    </ProgramDraftContext.Provider>
  );
}

export function useProgramDraft() {
  const context = useContext(ProgramDraftContext);
  if (!context) {
    throw new Error("useProgramDraft must be used within ProgramDraftProvider");
  }
  return context;
}
