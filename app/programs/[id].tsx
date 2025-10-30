import React, { useState } from "react";
import { View, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
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
    // Show feedback to the user
    alert(`${program.name} has been set as your active program`);
  };

  // Check if there are no workouts or selectedWorkout is undefined
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
            style={[styles.selectProgramButtonText, { color: colors.background }]}
          >
            {isProgramSelected ? "Current Program" : "Set as Current Program"}
          </ThemedText>
        </TouchableOpacity>

        {/* Workout tabs */}
        <View style={styles.workoutTabs}>
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
                style={selectedWorkoutIndex === index ? { color: colors.background } : {}}
              >
                {workout.name}
              </ThemedText>
            </TouchableOpacity>
          ))}
        </View>

        <ScrollView style={styles.exerciseList}>
          {selectedWorkout.exercises.map((exercise: ProgramExercise) => (
            <View
              key={exercise.id}
              style={[styles.exerciseCard, { backgroundColor: colors.card }]}
            >
              <ThemedText type="subtitle">
                {getExerciseNameById(exercise.templateId)}
              </ThemedText>
              <View style={styles.exerciseDetails}>
                <View style={styles.detailItem}>
                  <ThemedText type="caption" style={styles.detailLabel}>
                    Sets
                  </ThemedText>
                  <ThemedText type="defaultSemiBold">
                    {exercise.sets}
                  </ThemedText>
                </View>
                <View style={styles.detailItem}>
                  <ThemedText type="caption" style={styles.detailLabel}>
                    Reps
                  </ThemedText>
                  <ThemedText type="defaultSemiBold">
                    {exercise.reps}
                  </ThemedText>
                </View>
                {exercise.weight && (
                  <View style={styles.detailItem}>
                    <ThemedText type="caption" style={styles.detailLabel}>
                      Weight
                    </ThemedText>
                    <ThemedText type="defaultSemiBold">
                      {exercise.weight.value} {exercise.weight.unit}
                    </ThemedText>
                  </View>
                )}
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
    paddingVertical: 16,
    marginBottom: 16,
  },
  backButton: {
    marginRight: 16,
  },
  selectProgramButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 16,
    alignSelf: "center",
  },
  selectProgramButtonText: {
    // Color will be set inline
  },
  workoutTabs: {
    flexDirection: "row",
    paddingBottom: 10,
  },
  workoutTab: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },
  exerciseList: {
    flex: 1,
  },
  exerciseCard: {
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
  },
  exerciseDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  detailItem: {
    alignItems: "center",
  },
  detailLabel: {
    opacity: 0.7,
    marginBottom: 4,
  },
});
