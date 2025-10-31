import React, { useState, useEffect } from "react";
import { StyleSheet, TouchableOpacity, Alert, Vibration } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";
import {
  WorkoutSession,
  WorkoutSet,
  Program,
  WorkoutExerciseId,
  WorkoutId,
  ProgramId,
} from "@/types";
import { createWorkoutSessionFromProgram } from "@/mockdata/workoutSessions";
import { useAppTheme } from "@/hooks/useAppTheme";
import { spacing } from "@/constants/Theme";
import { convertSessionToHistory } from "@/utils/workoutHistory";
import { createWorkoutHistory } from "@/services/api";

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
  workoutId = "1",
  programs,
}: WorkoutSessionScreenProps) {
  const backgroundColor = useThemeColor({}, "background");
  const { colors } = useAppTheme();
  const router = useRouter();

  if (!programId || !workoutId) {
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
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const program = programs.find((p) => p.id === (programId as ProgramId));
    const workout = program?.workouts.find(
      (w) => w.id === (workoutId as WorkoutId)
    );

    if (!program || !workout) {
      return;
    }

    const session = createWorkoutSessionFromProgram(program, workout);
    setWorkoutSession(session);

    if (session.exercises.length > 0) {
      setExpandedExercises({ [session.exercises[0].id as string]: true });
    }
  }, [programId, workoutId, programs]);

  const toggleExerciseExpansion = (exerciseId: WorkoutExerciseId) => {
    setExpandedExercises((prev) => ({
      ...prev,
      [exerciseId as string]: !prev[exerciseId as string],
    }));
  };

  const toggleSetCompletion = (exerciseIndex: number, setIndex: number) => {
    if (!workoutSession) return;

    const updatedExercises = [...workoutSession.exercises];
    const currentSet = updatedExercises[exerciseIndex].sets[setIndex];
    currentSet.isCompleted = !currentSet.isCompleted;

    setWorkoutSession({
      ...workoutSession,
      exercises: updatedExercises,
    });

    if (currentSet.isCompleted) {
      Vibration.vibrate();
      moveToNextSet(exerciseIndex, setIndex);
    }
  };

  const updateSet = (
    exerciseIndex: number,
    setIndex: number,
    updates: Partial<WorkoutSet>
  ) => {
    if (!workoutSession) return;

    const updatedExercises = [...workoutSession.exercises];
    const currentSet = updatedExercises[exerciseIndex].sets[setIndex];

    Object.assign(currentSet, updates);

    setWorkoutSession({
      ...workoutSession,
      exercises: updatedExercises,
    });
  };

  const moveToNextSet = (exerciseIndex: number, setIndex: number) => {
    if (!workoutSession) return;

    const currentExercise = workoutSession.exercises[exerciseIndex];

    if (setIndex < currentExercise.sets.length - 1) {
      setCurrentSetIndex(setIndex + 1);
    } else if (exerciseIndex < workoutSession.exercises.length - 1) {
      setExpandedExercises((prev) => {
        const newExpanded = { ...prev };
        delete newExpanded[
          workoutSession.exercises[exerciseIndex].id as string
        ];

        newExpanded[workoutSession.exercises[exerciseIndex + 1].id as string] =
          true;

        return newExpanded;
      });

      setCurrentExerciseIndex(exerciseIndex + 1);
      setCurrentSetIndex(0);
    }
  };

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

  const handleFinishWorkout = async () => {
    if (!workoutSession) return;

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
          onPress: async () => {
            try {
              setIsSaving(true);

              const finishedSession: WorkoutSession = {
                ...workoutSession,
                isFinished: true,
                finishedAt: new Date(),
              };

              const history = convertSessionToHistory(finishedSession);
              await createWorkoutHistory(history);
              setWorkoutSession(finishedSession);

              router.back();
            } catch {
              Alert.alert(
                "Error",
                "Failed to save workout history. Please try again."
              );
            } finally {
              setIsSaving(false);
            }
          },
        },
      ]
    );
  };

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
        <WorkoutHeader
          onBackPress={() => router.back()}
          title={workoutSession.workoutName}
        />

        <WorkoutProgress
          completed={progress.completed}
          total={progress.total}
          percentage={progress.percentage}
        />

        <ExerciseList
          exercises={workoutSession.exercises}
          expandedExercises={expandedExercises}
          toggleExerciseExpansion={toggleExerciseExpansion}
          toggleSetCompletion={toggleSetCompletion}
          onUpdateSet={updateSet}
          currentExerciseIndex={currentExerciseIndex}
          currentSetIndex={currentSetIndex}
        />

        <TouchableOpacity
          style={[
            styles.finishButton,
            { backgroundColor: colors.accent },
            isSaving && styles.finishButtonDisabled,
          ]}
          onPress={handleFinishWorkout}
          disabled={isSaving}
        >
          <ThemedText type="subtitle" style={{ color: colors.background }}>
            {isSaving ? "Saving..." : "Finish Workout"}
          </ThemedText>
        </TouchableOpacity>
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: spacing.md,
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
  finishButtonDisabled: {
    opacity: 0.6,
  },
});
