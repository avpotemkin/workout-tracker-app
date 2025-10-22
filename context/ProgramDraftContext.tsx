import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Workout } from '@/types';
import { WorkoutSplitType, getPresetWorkouts } from '@/constants/WorkoutPresets';

interface ProgramDraftContextType {
  workouts: Workout[];
  setWorkouts: (workouts: Workout[]) => void;
  updateWorkout: (workoutId: string, updatedWorkout: Workout) => void;
  removeWorkout: (workoutId: string) => void;
  addWorkout: (workout: Workout) => void;
  getWorkout: (workoutId: string) => Workout | undefined;
  resetWithPreset: (split: WorkoutSplitType) => void;
}

const ProgramDraftContext = createContext<ProgramDraftContextType | undefined>(undefined);

export function ProgramDraftProvider({ children }: { children: ReactNode }) {
  const [workouts, setWorkouts] = useState<Workout[]>([]);

  function updateWorkout(workoutId: string, updatedWorkout: Workout) {
    setWorkouts(prevWorkouts =>
      prevWorkouts.map(w => w.id === workoutId ? updatedWorkout : w)
    );
  }

  function removeWorkout(workoutId: string) {
    setWorkouts(prevWorkouts => prevWorkouts.filter(w => w.id !== workoutId));
  }

  function addWorkout(workout: Workout) {
    setWorkouts(prevWorkouts => [...prevWorkouts, workout]);
  }

  function getWorkout(workoutId: string) {
    return workouts.find(w => w.id === workoutId);
  }

  function resetWithPreset(split: WorkoutSplitType) {
    const presetWorkouts = getPresetWorkouts(split);
    const initializedWorkouts: Workout[] = presetWorkouts.map((preset, index) => ({
      id: `workout-${Date.now()}-${index}`,
      name: preset.name,
      exercises: preset.exercises.map((ex, exIndex) => ({
        ...ex,
        id: `ex-${Date.now()}-${index}-${exIndex}`,
      })),
    }));
    setWorkouts(initializedWorkouts);
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
      }}
    >
      {children}
    </ProgramDraftContext.Provider>
  );
}

export function useProgramDraft() {
  const context = useContext(ProgramDraftContext);
  if (!context) {
    throw new Error('useProgramDraft must be used within ProgramDraftProvider');
  }
  return context;
}


