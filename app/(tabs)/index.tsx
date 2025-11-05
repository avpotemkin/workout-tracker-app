import { ThemedText } from "@/components/common/ThemedText";
import { ThemedView } from "@/components/common/ThemedView";
import React, { useRef, useState, useEffect, useCallback } from "react";
import { StyleSheet, ScrollView, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useFocusEffect } from "@react-navigation/native";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useAppTheme } from "@/hooks/useAppTheme";
import { spacing } from "@/constants/Theme";
import { useAppContext } from "@/context/AppContext";
import { fetchWorkoutHistory } from "@/services/api";
import { WorkoutHistory } from "@/types";
import { HistoryCard } from "@/components/history/HistoryCard";
import { WorkoutSelectionModal } from "@/components/programs";
import { BottomSheetModal } from "@gorhom/bottom-sheet";

export default function HomeScreen() {
  const backgroundColor = useThemeColor({}, "background");
  const { colors } = useAppTheme();
  const router = useRouter();
  const { selectedProgram } = useAppContext();
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const [lastWorkout, setLastWorkout] = useState<WorkoutHistory | null>(null);

  const loadRecentHistory = useCallback(async () => {
    try {
      const workoutHistory = await fetchWorkoutHistory();
      setLastWorkout(workoutHistory.length > 0 ? workoutHistory[0] : null);
    } catch {
      setLastWorkout(null);
    }
  }, []);

  useEffect(() => {
    loadRecentHistory();
  }, [loadRecentHistory]);

  useFocusEffect(
    useCallback(() => {
      loadRecentHistory();
    }, [loadRecentHistory])
  );

  const handleStartWorkout = () => {
    if (selectedProgram && selectedProgram.workouts.length > 0) {
      bottomSheetModalRef.current?.present();
    } else {
      router.push("/(tabs)/programs");
    }
  };

  const handleSelectWorkout = (workoutId: string) => {
    if (selectedProgram) {
      router.push({
        pathname: "/(workout)/session",
        params: {
          programId: selectedProgram.id,
          workoutId: workoutId,
        },
      });
    }
  };

  const handleBrowsePrograms = () => {
    router.push("/(tabs)/programs");
  };

  const handleViewAllHistory = () => {
    router.push("/(tabs)/history");
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor }}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        <ThemedView style={styles.container}>
          <ThemedText type="title" style={styles.header}>
            Home
          </ThemedText>

          <View style={styles.section}>
            <ThemedText type="defaultSemiBold" style={styles.sectionTitle}>
              Active Program
            </ThemedText>

            {selectedProgram ? (
              <View style={[styles.card, { backgroundColor: colors.card }]}>
                <ThemedText type="label" style={styles.programName}>
                  {selectedProgram.name}
                </ThemedText>
                {selectedProgram.workouts.length > 0 && (
                  <View style={[styles.nextWorkoutContainer, { borderTopColor: colors.divider }]}>
                    <ThemedText type="caption" style={styles.nextWorkoutLabel}>
                      Next Workout:
                    </ThemedText>
                    <ThemedText type="defaultSemiBold">
                      {selectedProgram.workouts[0].name}
                    </ThemedText>
                  </View>
                )}
              </View>
            ) : (
              <View style={[styles.card, { backgroundColor: colors.card }]}>
                <ThemedText type="body" style={styles.emptyText}>
                  No program selected. Browse programs to get started.
                </ThemedText>
              </View>
            )}
          </View>

          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <ThemedText type="defaultSemiBold" style={styles.sectionTitle}>
                Recent Activity
              </ThemedText>
              {lastWorkout && (
                <TouchableOpacity onPress={handleViewAllHistory}>
                  <ThemedText type="link">View All</ThemedText>
                </TouchableOpacity>
              )}
            </View>

            {lastWorkout ? (
              <HistoryCard workout={lastWorkout} />
            ) : (
              <View style={[styles.card, { backgroundColor: colors.card }]}>
                <ThemedText type="body" style={styles.emptyText}>
                  No workouts yet. Start your first workout!
                </ThemedText>
              </View>
            )}
          </View>

          <View style={styles.section}>
            <ThemedText type="defaultSemiBold" style={styles.sectionTitle}>
              Quick Actions
            </ThemedText>

            <TouchableOpacity
              style={[styles.button, { backgroundColor: colors.accent }]}
              onPress={handleStartWorkout}
            >
              <ThemedText type="defaultSemiBold" style={{ color: colors.background }}>
                Start Workout
              </ThemedText>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, { backgroundColor: colors.card }]}
              onPress={handleBrowsePrograms}
            >
              <ThemedText
                type="defaultSemiBold"
                style={{ color: colors.text }}
              >
                Browse Programs
              </ThemedText>
            </TouchableOpacity>
          </View>
        </ThemedView>
      </ScrollView>

      <WorkoutSelectionModal
        ref={bottomSheetModalRef}
        program={selectedProgram}
        onSelectWorkout={handleSelectWorkout}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 32,
  },
  container: {
    flex: 1,
    paddingHorizontal: spacing.md,
  },
  header: {
    paddingVertical: spacing.md,
    marginBottom: spacing.lg,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  sectionTitle: {
    marginBottom: 12,
  },
  card: {
    padding: 16,
    borderRadius: 10,
    marginBottom: 16,
  },
  programName: {
    marginBottom: 8,
  },
  nextWorkoutContainer: {
    marginTop: 8,
    paddingTop: 12,
    borderTopWidth: 1,
  },
  nextWorkoutLabel: {
    opacity: 0.7,
    marginBottom: 4,
  },
  emptyText: {
    opacity: 0.7,
    textAlign: "center",
  },
  button: {
    width: "100%",
    paddingVertical: 15,
    borderRadius: 10,
    marginBottom: 12,
    alignItems: "center",
  },
});
