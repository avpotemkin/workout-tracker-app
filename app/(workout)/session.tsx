import React from "react";
import { useLocalSearchParams } from "expo-router";
import { WorkoutSessionScreen } from "@/screens/Workout/WorkoutSessionScreen";

export default function SessionRoute() {
  const { programId, workoutId } = useLocalSearchParams<{
    programId?: string;
    workoutId?: string;
  }>();

  return <WorkoutSessionScreen programId={programId} workoutId={workoutId} />;
}
