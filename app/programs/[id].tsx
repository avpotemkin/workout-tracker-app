import React, { useState } from "react";
import { View, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";
import { PROGRAMS } from "@/mockdata/programs";
import { useAppTheme } from "@/hooks/useAppTheme";
import { Ionicons } from "@expo/vector-icons";

export default function ProgramDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const backgroundColor = useThemeColor({}, "background");
  const { colors } = useAppTheme();
  const router = useRouter();
  const program = PROGRAMS.find((p) => p.id === id);
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);

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

  const selectedDay = program.days[selectedDayIndex];

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

        {/* Day tabs */}
        <View style={styles.dayTabs}>
          {program.days.map((day, index) => (
            <TouchableOpacity
              key={day.id}
              style={[
                styles.dayTab,
                selectedDayIndex === index
                  ? { backgroundColor: colors.accent }
                  : { backgroundColor: colors.card },
              ]}
              onPress={() => setSelectedDayIndex(index)}
            >
              <ThemedText
                style={[
                  styles.dayTabText,
                  selectedDayIndex === index ? { color: "white" } : {},
                ]}
              >
                {day.name}
              </ThemedText>
            </TouchableOpacity>
          ))}
        </View>

        {/* Day description if available */}
        {selectedDay.description && (
          <ThemedText style={styles.dayDescription}>
            {selectedDay.description}
          </ThemedText>
        )}

        <ScrollView style={styles.exerciseList}>
          {selectedDay.exercises.map((exercise) => (
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
                      {exercise.weight} lbs
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
    fontSize: 14,
    opacity: 0.7,
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 16,
    fontWeight: "600",
  },
});
