import React from "react";
import { useLocalSearchParams } from "expo-router";
import { WorkoutSessionScreen } from "@/screens/Workout/WorkoutSessionScreen";
import { useAppContext } from "@/context/AppContext";

export default function SessionRoute() {
  const { programId, workoutId } = useLocalSearchParams<{
    programId?: string;
    workoutId?: string;
  }>();
  const { programs } = useAppContext();

  return (
    <WorkoutSessionScreen
      programId={programId}
      workoutId={workoutId}
      programs={programs}
    />
  );
}
