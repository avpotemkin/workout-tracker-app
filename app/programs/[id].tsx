import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";
import { PROGRAMS } from "@/mockdata/programs";

export default function ProgramDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const backgroundColor = useThemeColor({}, "background");
  const program = PROGRAMS.find((p) => p.id === id);

  if (!program) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor }}>
        <ThemedView style={styles.container}>
          <ThemedText>Program not found</ThemedText>
        </ThemedView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor }}>
      <ThemedView style={styles.container}>
        <ThemedText style={styles.title}>{program.name}</ThemedText>
        {program.description && (
          <ThemedText style={styles.description}>
            {program.description}
          </ThemedText>
        )}
        <ScrollView>
          {program.exercises?.map((exercise) => (
            <View key={exercise.id} style={styles.exerciseCard}>
              <ThemedText style={styles.exerciseName}>
                {exercise.name}
              </ThemedText>
              <View style={styles.exerciseDetails}>
                <ThemedText>Sets: {exercise.sets}</ThemedText>
                <ThemedText>Reps: {exercise.reps}</ThemedText>
                {exercise.weight && (
                  <ThemedText>Weight: {exercise.weight} lbs</ThemedText>
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
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
    color: "gray",
  },
  exerciseCard: {
    backgroundColor: "grey",
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  exerciseName: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
  },
  exerciseDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
