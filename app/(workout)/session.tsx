import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  ScrollView,
  Alert,
  Vibration,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";
import { WorkoutSession, WorkoutExercise, WorkoutSet } from "@/types";
import { createWorkoutSessionFromProgram } from "@/mockdata/workoutSessions";
import { useAppTheme } from "@/hooks/useAppTheme";

export default function WorkoutSessionScreen() {
  const backgroundColor = useThemeColor({}, "background");
  const { colors } = useAppTheme();
  const router = useRouter();

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
    const session = createWorkoutSessionFromProgram("1", "Full Body");
    setWorkoutSession(session);

    // Expand the first exercise by default
    if (session.exercises.length > 0) {
      setExpandedExercises({ [session.exercises[0].id]: true });
    }
  }, []);

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

  // Render a single set
  const renderSet = (
    exercise: WorkoutExercise,
    set: WorkoutSet,
    exerciseIndex: number,
    setIndex: number
  ) => {
    const isCurrentSet =
      exerciseIndex === currentExerciseIndex && setIndex === currentSetIndex;

    return (
      <View
        key={set.id}
        style={[styles.setRow, isCurrentSet && styles.currentSetRow]}
      >
        <View style={styles.setNumberContainer}>
          <ThemedText style={styles.setNumber}>{set.setNumber}</ThemedText>
        </View>

        <View style={styles.weightContainer}>
          <ThemedText style={styles.valueText}>{set.weight}</ThemedText>
          <ThemedText style={styles.inputLabel}>lbs</ThemedText>
        </View>

        <View style={styles.repsContainer}>
          <ThemedText style={styles.valueText}>{set.reps}</ThemedText>
          <ThemedText style={styles.inputLabel}>reps</ThemedText>
        </View>

        <TouchableOpacity
          style={[
            styles.checkButton,
            set.isCompleted && { backgroundColor: colors.accent },
          ]}
          onPress={() => toggleSetCompletion(exerciseIndex, setIndex)}
        >
          <Ionicons name="checkmark" size={20} color="white" />
        </TouchableOpacity>
      </View>
    );
  };

  // Render an exercise with its sets
  const renderExercise = (exercise: WorkoutExercise, index: number) => {
    const isExpanded = expandedExercises[exercise.id];

    return (
      <View key={exercise.id} style={[styles.exerciseCard, { backgroundColor: colors.card }]}>
        <TouchableOpacity
          style={styles.exerciseHeader}
          onPress={() => toggleExerciseExpansion(exercise.id)}
        >
          <ThemedText style={styles.exerciseName}>{exercise.name}</ThemedText>
          <Ionicons
            name={isExpanded ? "chevron-up" : "chevron-down"}
            size={24}
            color="white"
          />
        </TouchableOpacity>

        {isExpanded && (
          <View style={styles.setsContainer}>
            <View style={styles.setHeaderRow}>
              <ThemedText style={styles.setHeaderText}>Set</ThemedText>
              <ThemedText style={styles.setHeaderText}>Weight</ThemedText>
              <ThemedText style={styles.setHeaderText}>Reps</ThemedText>
              <ThemedText style={styles.setHeaderText}>Done</ThemedText>
            </View>

            {exercise.sets.map((set, setIndex) =>
              renderSet(exercise, set, index, setIndex)
            )}
          </View>
        )}
      </View>
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
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => {
              router.back();
            }}
          >
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>

          <ThemedText style={styles.workoutTitle}>
            {workoutSession.programName}
          </ThemedText>
        </View>

        {/* Progress Bar */}
        <View style={styles.progressContainer}>
          <View style={styles.progressBarBackground}>
            <View
              style={[
                styles.progressBarFill,
                { width: `${progress.percentage}%`, backgroundColor: colors.accent },
              ]}
            />
          </View>
          <ThemedText style={styles.progressText}>
            {progress.completed} of {progress.total} sets completed (
            {progress.percentage}%)
          </ThemedText>
        </View>

        {/* Exercise List */}
        <ScrollView style={styles.exerciseList}>
          {workoutSession.exercises.map((exercise, index) =>
            renderExercise(exercise, index)
          )}
        </ScrollView>

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
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
  },
  backButton: {
    marginRight: 16,
  },
  workoutTitle: {
    fontSize: 20,
    fontWeight: "bold",
    flex: 1,
    textAlign: "center",
    marginRight: 40, // To center the title accounting for the back button
  },
  progressContainer: {
    marginBottom: 16,
  },
  progressBarBackground: {
    height: 8,
    backgroundColor: "#333",
    borderRadius: 4,
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
  },
  progressText: {
    marginTop: 8,
    textAlign: "center",
    fontSize: 14,
  },
  exerciseList: {
    flex: 1,
  },
  exerciseCard: {
    borderRadius: 10,
    marginBottom: 16,
    overflow: "hidden",
  },
  exerciseHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
  },
  exerciseName: {
    fontSize: 18,
    fontWeight: "600",
  },
  setsContainer: {
    borderTopWidth: 1,
    borderTopColor: "#444",
  },
  setHeaderRow: {
    flexDirection: "row",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#444",
  },
  setHeaderText: {
    fontSize: 14,
    fontWeight: "600",
    flex: 1,
    textAlign: "center",
  },
  setRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#444",
  },
  currentSetRow: {
    backgroundColor: "#3a3a3a",
  },
  setNumberContainer: {
    width: 30,
    alignItems: "center",
  },
  setNumber: {
    fontSize: 16,
    fontWeight: "600",
  },
  weightContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  repsContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  valueText: {
    fontSize: 16,
    fontWeight: "600",
    marginRight: 4,
  },
  inputLabel: {
    fontSize: 14,
  },
  checkButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#555",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
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
