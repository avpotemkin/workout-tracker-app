import React, { useState } from "react";
import { View, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemedView } from "@/components/common/ThemedView";
import { ThemedText } from "@/components/common/ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useAppTheme } from "@/hooks/useAppTheme";
import { spacing } from "@/constants/Theme";
import { Ionicons } from "@expo/vector-icons";
import { useAppContext } from "@/context/AppContext";
import { Workout, ProgramExercise } from "@/types";
import { getExerciseNameById } from "@/constants/Exercises";

export default function ProgramDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const backgroundColor = useThemeColor({}, "background");
  const { colors } = useAppTheme();
  const router = useRouter();
  const { programs } = useAppContext();
  const program = programs.find((p) => p.id === id);
  const [selectedWorkoutIndex, setSelectedWorkoutIndex] = useState(0);
  const { selectedProgram, setSelectedProgram } = useAppContext();

  if (!program) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor }}>
        <ThemedView style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => router.back()}
            >
              <Ionicons name="arrow-back" size={24} color={colors.text} />
            </TouchableOpacity>

            <ThemedText type="subtitle">Not Found</ThemedText>
          </View>
          <ThemedText>Program not found</ThemedText>
        </ThemedView>
      </SafeAreaView>
    );
  }

  const selectedWorkout = program.workouts[selectedWorkoutIndex];
  const isProgramSelected = selectedProgram?.id === program.id;

  const handleSelectProgram = () => {
    setSelectedProgram(program);
    alert(`${program.name} has been set as your active program`);
  };

  if (!program.workouts || program.workouts.length === 0) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor }}>
        <ThemedView style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => router.back()}
            >
              <Ionicons name="arrow-back" size={24} color={colors.text} />
            </TouchableOpacity>

            <ThemedText type="subtitle">{program.name}</ThemedText>

            <TouchableOpacity
              onPress={() => router.push(`/programs/edit?id=${program.id}`)}
            >
              <ThemedText type="label" style={{ color: colors.accent }}>
                Edit
              </ThemedText>
            </TouchableOpacity>
          </View>
          <ThemedText>No workouts in this program</ThemedText>
        </ThemedView>
      </SafeAreaView>
    );
  }

  if (!selectedWorkout) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor }}>
        <ThemedView style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => router.back()}
            >
              <Ionicons name="arrow-back" size={24} color={colors.text} />
            </TouchableOpacity>

            <ThemedText type="subtitle">{program.name}</ThemedText>

            <TouchableOpacity
              onPress={() => router.push(`/programs/edit?id=${program.id}`)}
            >
              <ThemedText type="label" style={{ color: colors.accent }}>
                Edit
              </ThemedText>
            </TouchableOpacity>
          </View>
          <ThemedText>Workout not found</ThemedText>
        </ThemedView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor }}>
      <ThemedView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={24} color={colors.text} />
          </TouchableOpacity>

          <ThemedText type="subtitle">{program.name}</ThemedText>

          <TouchableOpacity
            onPress={() => router.push(`/programs/edit?id=${program.id}`)}
          >
            <ThemedText type="label" style={{ color: colors.accent }}>
              Edit
            </ThemedText>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={[
            styles.selectProgramButton,
            {
              backgroundColor: isProgramSelected
                ? colors.success
                : colors.accent,
            },
          ]}
          onPress={handleSelectProgram}
        >
          <ThemedText
            type="defaultSemiBold"
            style={{ color: colors.background }}
          >
            {isProgramSelected ? "Current Program" : "Set as Current Program"}
          </ThemedText>
        </TouchableOpacity>

        <View style={styles.workoutTabsContainer}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.workoutTabs}
          >
            {program.workouts.map((workout: Workout, index: number) => (
              <TouchableOpacity
                key={workout.id}
                style={[
                  styles.workoutTab,
                  selectedWorkoutIndex === index
                    ? { backgroundColor: colors.accent }
                    : { backgroundColor: colors.card },
                ]}
                onPress={() => setSelectedWorkoutIndex(index)}
              >
                <ThemedText
                  type="body"
                  style={
                    selectedWorkoutIndex === index
                      ? { color: colors.background }
                      : {}
                  }
                >
                  {workout.name}
                </ThemedText>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <ScrollView style={styles.exerciseList}>
          {selectedWorkout.exercises.map((exercise: ProgramExercise) => (
            <View
              key={exercise.id}
              style={[styles.exerciseCard, { backgroundColor: colors.card }]}
            >
              <View style={styles.exerciseContent}>
                <View style={styles.exerciseInfo}>
                  <View style={styles.exerciseHeader}>
                    <ThemedText
                      type="label"
                      style={styles.exerciseName}
                      numberOfLines={2}
                    >
                      {getExerciseNameById(exercise.templateId)}
                    </ThemedText>
                    <View style={styles.setsRepsContainer}>
                      <View style={styles.counterGroup}>
                        <View
                          style={[
                            styles.valueContainer,
                            { backgroundColor: colors.card },
                          ]}
                        >
                          <ThemedText type="defaultSemiBold">
                            {exercise.sets}
                          </ThemedText>
                        </View>
                        <ThemedText type="caption" style={styles.counterLabel}>
                          Sets
                        </ThemedText>
                      </View>
                      <View style={styles.counterGroup}>
                        <View
                          style={[
                            styles.valueContainer,
                            { backgroundColor: colors.card },
                          ]}
                        >
                          <ThemedText type="defaultSemiBold">
                            {exercise.reps}
                          </ThemedText>
                        </View>
                        <ThemedText type="caption" style={styles.counterLabel}>
                          Reps
                        </ThemedText>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: spacing.md,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: spacing.md,
    marginBottom: spacing.md,
  },
  backButton: {
    marginRight: spacing.md,
  },
  selectProgramButton: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
    borderRadius: 8,
    marginBottom: spacing.md,
    alignSelf: "center",
  },
  workoutTabsContainer: {
    marginBottom: spacing.md,
    height: 44,
  },
  workoutTabs: {
    flexDirection: "row",
    alignItems: "center",
    paddingRight: spacing.md,
  },
  workoutTab: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: 20,
    marginRight: spacing.sm,
    minHeight: 36,
    justifyContent: "center",
    alignItems: "center",
  },
  exerciseList: {
    flex: 1,
  },
  exerciseCard: {
    borderRadius: 10,
    padding: spacing.md,
    marginBottom: 12,
  },
  exerciseContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  exerciseInfo: {
    flex: 1,
  },
  exerciseHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  exerciseName: {
    flex: 1,
    marginRight: spacing.md,
  },
  setsRepsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  counterGroup: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: spacing.sm,
  },
  valueContainer: {
    minWidth: 28,
    height: 24,
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: spacing.xs,
    marginRight: spacing.xs,
  },
  counterLabel: {
    opacity: 0.7,
  },
});
