import React from "react";
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

  const startWorkout = () => {
    router.push({
      pathname: "/(workout)/session",
      params: { programId: program.id }
    });
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

        <ScrollView style={styles.exerciseList}>
          {program.exercises?.map((exercise) => (
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
                  <ThemedText style={styles.detailValue}>{exercise.sets}</ThemedText>
                </View>
                <View style={styles.detailItem}>
                  <ThemedText style={styles.detailLabel}>Reps</ThemedText>
                  <ThemedText style={styles.detailValue}>{exercise.reps}</ThemedText>
                </View>
                {exercise.weight && (
                  <View style={styles.detailItem}>
                    <ThemedText style={styles.detailLabel}>Weight</ThemedText>
                    <ThemedText style={styles.detailValue}>{exercise.weight} lbs</ThemedText>
                  </View>
                )}
              </View>
            </View>
          ))}
        </ScrollView>

        <TouchableOpacity 
          style={[styles.startButton, { backgroundColor: colors.accent }]}
          onPress={startWorkout}
        >
          <ThemedText style={styles.startButtonText}>Start Workout</ThemedText>
        </TouchableOpacity>
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
    marginBottom: 24,
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
  startButton: {
    paddingVertical: 16,
    borderRadius: 10,
    marginVertical: 16,
    alignItems: "center",
  },
  startButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
});
