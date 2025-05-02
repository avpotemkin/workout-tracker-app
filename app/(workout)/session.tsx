import React, { useState, useEffect } from "react";
import { StyleSheet, TouchableOpacity, Alert, Vibration } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter, useLocalSearchParams } from "expo-router";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";
import { WorkoutSession } from "@/types";
import { createWorkoutSessionFromProgram } from "@/mockdata/workoutSessions";
import { useAppTheme } from "@/hooks/useAppTheme";

import { WorkoutHeader } from "@/components/workout/WorkoutHeader";
import { WorkoutProgress } from "@/components/workout/WorkoutProgress";
import { ExerciseList } from "@/components/workout/ExerciseList";

export default function WorkoutSessionScreen() {
  const backgroundColor = useThemeColor({}, "background");
  const { colors } = useAppTheme();
  const router = useRouter();
  const params = useLocalSearchParams<{
    programId: string;
    workoutId: string;
  }>();

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
    // Get the program and day IDs from the URL params
    const programId = params.programId || "1";
    const workoutId = params.workoutId || "1-day-1";

    const session = createWorkoutSessionFromProgram(programId, workoutId);
    setWorkoutSession(session);

    // Expand the first exercise by default
    if (session.exercises.length > 0) {
      setExpandedExercises({ [session.exercises[0].id]: true });

      // Log exercise details for debugging
      session.exercises.forEach((exercise, index) => {
        console.log(`Exercise ${index}:`, {
          id: exercise.id,
          name: exercise.name,
          sets: exercise.sets.length,
          setDetails: exercise.sets,
        });
      });
    }
  }, [params.programId, params.workoutId]);

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
      setCurrentExerciseIndex(exerciseIndex + 1);
      setCurrentSetIndex(0);

      // Expand the next exercise
      setExpandedExercises((prev) => ({
        ...prev,
        [workoutSession.exercises[exerciseIndex + 1].id]: true,
      }));
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
          currentExerciseIndex={currentExerciseIndex}
          currentSetIndex={currentSetIndex}
        />

        {/* Finish Button */}
        <TouchableOpacity
          style={[styles.finishButton, { backgroundColor: colors.accent }]}
          onPress={handleFinishWorkout}
        >
          <ThemedText style={styles.finishButtonText}>
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
    fontSize: 18,
    fontWeight: "600",
  },
});
