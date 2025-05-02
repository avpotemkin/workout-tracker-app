import React, { useState } from "react";
import { View, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useAppTheme } from "@/hooks/useAppTheme";
import { Ionicons } from "@expo/vector-icons";
import { useAppContext } from "@/context/AppContext";
import { Workout, Exercise } from "@/types";

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
              <Ionicons name="arrow-back" size={24} color="white" />
            </TouchableOpacity>

            <ThemedText style={styles.headerTitle}>Not Found</ThemedText>
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

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor }}>
      <ThemedView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>

          <ThemedText style={styles.headerTitle}>{program.name}</ThemedText>
        </View>

        {program.description && (
          <ThemedText style={styles.description}>
            {program.description}
          </ThemedText>
        )}

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
          <ThemedText style={styles.selectProgramButtonText}>
            {isProgramSelected ? "Current Program" : "Set as Current Program"}
          </ThemedText>
        </TouchableOpacity>

        {/* Workout tabs */}
        <View style={styles.dayTabs}>
          {program.workouts.map((workout: Workout, index: number) => (
            <TouchableOpacity
              key={workout.id}
              style={[
                styles.dayTab,
                selectedWorkoutIndex === index
                  ? { backgroundColor: colors.accent }
                  : { backgroundColor: colors.card },
              ]}
              onPress={() => setSelectedWorkoutIndex(index)}
            >
              <ThemedText
                style={[
                  styles.dayTabText,
                  selectedWorkoutIndex === index ? { color: "white" } : {},
                ]}
              >
                {workout.name}
              </ThemedText>
            </TouchableOpacity>
          ))}
        </View>

        {/* Workout description if available */}
        {selectedWorkout.description && (
          <ThemedText style={styles.dayDescription}>
            {selectedWorkout.description}
          </ThemedText>
        )}

        <ScrollView style={styles.exerciseList}>
          {selectedWorkout.exercises.map((exercise: Exercise) => (
            <View
              key={exercise.id}
              style={[styles.exerciseCard, { backgroundColor: colors.card }]}
            >
              <ThemedText style={styles.exerciseName}>
                {exercise.name}
              </ThemedText>
              <View style={styles.exerciseDetails}>
                <View style={styles.detailItem}>
                  <ThemedText style={styles.detailLabel}>Sets</ThemedText>
                  <ThemedText style={styles.detailValue}>
                    {exercise.sets}
                  </ThemedText>
                </View>
                <View style={styles.detailItem}>
                  <ThemedText style={styles.detailLabel}>Reps</ThemedText>
                  <ThemedText style={styles.detailValue}>
                    {exercise.reps}
                  </ThemedText>
                </View>
                {exercise.weight && (
                  <View style={styles.detailItem}>
                    <ThemedText style={styles.detailLabel}>Weight</ThemedText>
                    <ThemedText style={styles.detailValue}>
                      {exercise.weight} kg
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
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    marginBottom: 16,
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    flex: 1,
    textAlign: "center",
    marginRight: 40, // To center the title accounting for the back button
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 16,
    opacity: 0.7,
  },
  selectProgramButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 16,
    alignSelf: "center",
  },
  selectProgramButtonText: {
    color: "white",
    fontWeight: "600",
  },
  dayTabs: {
    flexDirection: "row",
    paddingBottom: 10,
  },
  dayTab: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },
  dayTabText: {
    fontSize: 14,
    fontWeight: "600",
  },
  dayDescription: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: 16,
    fontStyle: "italic",
    opacity: 0.7,
  },
  exerciseList: {
    flex: 1,
  },
  exerciseCard: {
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
  },
  exerciseName: {
    fontSize: 18,
    fontWeight: "600",
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
    fontSize: 12,
    opacity: 0.7,
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 16,
    fontWeight: "600",
  },
});
