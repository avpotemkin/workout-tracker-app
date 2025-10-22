import React, { useState, useEffect } from "react";
import { StyleSheet, TouchableOpacity, Alert, Vibration } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";
import { WorkoutSession, WorkoutSet, Program } from "@/types";
import { createWorkoutSessionFromProgram } from "@/mockdata/workoutSessions";
import { useAppTheme } from "@/hooks/useAppTheme";

import { WorkoutHeader } from "@/components/workout/WorkoutHeader";
import { WorkoutProgress } from "@/components/workout/WorkoutProgress";
import { ExerciseList } from "@/components/workout/ExerciseList";

type WorkoutSessionScreenProps = {
  programId?: string;
  workoutId?: string;
  programs: Program[];
};

export function WorkoutSessionScreen({
  programId = "1",
  workoutId = "1-day-1",
  programs,
}: WorkoutSessionScreenProps) {
  const backgroundColor = useThemeColor({}, "background");
  const { colors } = useAppTheme();
  const router = useRouter();

  // Validate params
  if (!programId || !workoutId) {
    console.warn("Missing required programId or workoutId");
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor }}>
        <ThemedView style={styles.loadingContainer}>
          <ThemedText>Invalid workout session parameters</ThemedText>
        </ThemedView>
      </SafeAreaView>
    );
  }

  // State for workout session
  const [workoutSession, setWorkoutSession] = useState<WorkoutSession | null>(
    null
  );
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [currentSetIndex, setCurrentSetIndex] = useState(0);
  const [expandedExercises, setExpandedExercises] = useState<
    Record<string, boolean>
  >({});

  useEffect(() => {
    const session = createWorkoutSessionFromProgram(
      programId,
      programs,
      workoutId
    );
    setWorkoutSession(session);

    // Expand the first exercise by default
    if (session.exercises.length > 0) {
      setExpandedExercises({ [session.exercises[0].id]: true });
    }
  }, [programId, workoutId, programs]);

  // Toggle exercise expansion
  const toggleExerciseExpansion = (exerciseId: string) => {
    setExpandedExercises((prev) => ({
      ...prev,
      [exerciseId]: !prev[exerciseId],
    }));
  };

  // Toggle set completion
  const toggleSetCompletion = (exerciseIndex: number, setIndex: number) => {
    if (!workoutSession) return;

    const updatedExercises = [...workoutSession.exercises];
    const currentSet = updatedExercises[exerciseIndex].sets[setIndex];
    currentSet.isCompleted = !currentSet.isCompleted;

    // Update workout session
    setWorkoutSession({
      ...workoutSession,
      exercises: updatedExercises,
    });

    // If set was marked as completed
    if (currentSet.isCompleted) {
      // Vibrate to provide feedback
      Vibration.vibrate();

      // Move to next set or exercise
      moveToNextSet(exerciseIndex, setIndex);
    }
  };

  // Update set values (weight, reps)
  const updateSet = (
    exerciseIndex: number,
    setIndex: number,
    updates: Partial<WorkoutSet>
  ) => {
    if (!workoutSession) return;

    const updatedExercises = [...workoutSession.exercises];
    const currentSet = updatedExercises[exerciseIndex].sets[setIndex];

    // Update the set with new values
    Object.assign(currentSet, updates);

    // Update workout session
    setWorkoutSession({
      ...workoutSession,
      exercises: updatedExercises,
    });
  };

  // Move to next set or exercise
  const moveToNextSet = (exerciseIndex: number, setIndex: number) => {
    if (!workoutSession) return;

    const currentExercise = workoutSession.exercises[exerciseIndex];

    // If there are more sets in the current exercise
    if (setIndex < currentExercise.sets.length - 1) {
      setCurrentSetIndex(setIndex + 1);
    }
    // If there are more exercises
    else if (exerciseIndex < workoutSession.exercises.length - 1) {
      // Close the previous exercise
      setExpandedExercises((prev) => {
        const newExpanded = { ...prev };
        delete newExpanded[workoutSession.exercises[exerciseIndex].id];

        // Expand the next exercise
        newExpanded[workoutSession.exercises[exerciseIndex + 1].id] = true;

        return newExpanded;
      });

      setCurrentExerciseIndex(exerciseIndex + 1);
      setCurrentSetIndex(0);
    }
  };

  // Calculate progress
  const calculateProgress = () => {
    if (!workoutSession) return { completed: 0, total: 0, percentage: 0 };

    let completed = 0;
    let total = 0;

    workoutSession.exercises.forEach((exercise) => {
      exercise.sets.forEach((set) => {
        total++;
        if (set.isCompleted) completed++;
      });
    });

    return {
      completed,
      total,
      percentage: total > 0 ? Math.round((completed / total) * 100) : 0,
    };
  };

  // Finish workout
  const handleFinishWorkout = () => {
    Alert.alert(
      "Finish Workout",
      "Are you sure you want to finish this workout?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Finish",
          onPress: () => {
            // Mark session as finished
            // This would be where we'd save the workout data to storage
            if (workoutSession) {
              setWorkoutSession({
                ...workoutSession,
                isFinished: true,
              });
            }
            router.back();
          },
        },
      ]
    );
  };

  // If no workout session is available yet
  if (!workoutSession) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor }}>
        <ThemedView style={styles.loadingContainer}>
          <ThemedText>Loading workout session...</ThemedText>
        </ThemedView>
      </SafeAreaView>
    );
  }

  const progress = calculateProgress();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor }}>
      <ThemedView style={styles.container}>
        {/* Header */}
        <WorkoutHeader
          onBackPress={() => router.back()}
          title={workoutSession.programName}
        />

        {/* Progress Bar */}
        <WorkoutProgress
          completed={progress.completed}
          total={progress.total}
          percentage={progress.percentage}
        />

        {/* Exercise List */}
        <ExerciseList
          exercises={workoutSession.exercises}
          expandedExercises={expandedExercises}
          toggleExerciseExpansion={toggleExerciseExpansion}
          toggleSetCompletion={toggleSetCompletion}
          onUpdateSet={updateSet}
          currentExerciseIndex={currentExerciseIndex}
          currentSetIndex={currentSetIndex}
        />

        {/* Finish Button */}
        <TouchableOpacity
          style={[styles.finishButton, { backgroundColor: colors.accent }]}
          onPress={handleFinishWorkout}
        >
          <ThemedText type="subtitle" style={styles.finishButtonText}>
            Finish Workout
          </ThemedText>
        </TouchableOpacity>
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  finishButton: {
    paddingVertical: 16,
    borderRadius: 10,
    marginVertical: 16,
    alignItems: "center",
  },
  finishButtonText: {
    color: "white",
  },
});
