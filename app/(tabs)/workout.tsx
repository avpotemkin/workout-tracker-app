import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, TouchableOpacity, View, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";
import { PROGRAMS } from "@/mockdata/programs";
import { useAppTheme } from "@/hooks/useAppTheme";
import { spacing } from "@/constants/Theme";
import { useAppContext } from "@/context/AppContext";
import { WorkoutSelectionModal } from "@/components/workout";
import { BottomSheetModal } from "@gorhom/bottom-sheet";

export default function WorkoutScreen() {
  const backgroundColor = useThemeColor({}, "background");
  const { colors, spacing } = useAppTheme();
  const router = useRouter();
  const [activeSession, setActiveSession] = useState(null);
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const { selectedProgram } = useAppContext();

  // Get the first program with days for quick start if no program is selected
  const defaultProgram =
    selectedProgram ||
    PROGRAMS.find((p) => p.workouts && p.workouts.length > 0);

  // This would be replaced with actual session management logic
  useEffect(() => {
    // Check if there's an active session (would be from storage/state management in a real app)
    const checkActiveSession = () => {
      // Mock check for active session - would be replaced with actual state/storage check
      setActiveSession(null);
    };

    checkActiveSession();
  }, []);

  const handleStartWorkout = () => {
    if (defaultProgram && defaultProgram.workouts.length > 0) {
      bottomSheetModalRef.current?.present();
    } else {
      router.push("/(tabs)/programs");
    }
  };

  const handleSelectWorkout = (workoutId: string) => {
    if (defaultProgram) {
      router.push({
        pathname: "/(workout)/session",
        params: {
          programId: defaultProgram.id,
          workoutId: workoutId,
        },
      });
    }
  };

  const handleResumeWorkout = () => {
    // Using object notation for proper typing
    router.push({
      pathname: "/(workout)/session",
    });
  };

  const handleSelectProgram = () => {
    router.push("/(tabs)/programs");
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor }}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        <ThemedView style={styles.container}>
          {/* Header */}
          <ThemedText type="title" style={styles.header}>
            Workout
          </ThemedText>

          {/* Active Session */}
          {activeSession ? (
            <View style={styles.section}>
              <View style={[styles.card, { backgroundColor: colors.card }]}>
                <View style={styles.cardHeader}>
                  <View style={styles.cardHeaderLeft}>
                    <Ionicons
                      name="fitness"
                      size={24}
                      color={colors.accent}
                      style={styles.cardIcon}
                    />
                    <ThemedText type="defaultSemiBold">
                      Active Workout
                    </ThemedText>
                  </View>
                </View>
                <ThemedText type="body" style={styles.cardDescription}>
                  You have an active workout session. Resume to continue where
                  you left off.
                </ThemedText>
                <TouchableOpacity
                  style={[styles.button, { backgroundColor: colors.accent }]}
                  onPress={handleResumeWorkout}
                >
                  <Ionicons name="play" size={20} color={colors.background} />
                  <ThemedText type="defaultSemiBold" style={[styles.buttonText, { color: colors.background }]}>
                    Resume Workout
                  </ThemedText>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <>
              {/* Current Program */}
              <View style={styles.section}>
                <ThemedText type="defaultSemiBold" style={styles.sectionTitle}>
                  Current Program
                </ThemedText>

                {selectedProgram ? (
                  <View style={[styles.card, { backgroundColor: colors.card }]}>
                    <View style={styles.cardHeader}>
                      <View style={styles.cardHeaderLeft}>
                        <Ionicons
                          name="barbell"
                          size={24}
                          color={colors.accent}
                          style={styles.cardIcon}
                        />
                        <ThemedText type="label" style={styles.programName}>
                          {selectedProgram.name}
                        </ThemedText>
                      </View>
                    </View>
                    {selectedProgram.workouts.length > 0 && (
                      <View style={[styles.nextWorkoutContainer, { borderTopColor: colors.divider }]}>
                        <ThemedText
                          type="caption"
                          style={styles.nextWorkoutLabel}
                        >
                          Next Workout:
                        </ThemedText>
                        <ThemedText type="defaultSemiBold">
                          {selectedProgram.workouts[0].name}
                        </ThemedText>
                      </View>
                    )}
                    <View style={[styles.workoutStats, { borderTopColor: colors.divider }]}>
                      <View style={styles.statItem}>
                        <Ionicons
                          name="calendar-outline"
                          size={16}
                          color={colors.text}
                        />
                        <ThemedText type="caption" style={styles.statText}>
                          {selectedProgram.workouts.length} workout
                          {selectedProgram.workouts.length !== 1 ? "s" : ""}
                        </ThemedText>
                      </View>
                    </View>
                  </View>
                ) : (
                  <View style={[styles.card, { backgroundColor: colors.card }]}>
                    <View style={styles.emptyCardContent}>
                      <Ionicons
                        name="clipboard-outline"
                        size={32}
                        color={colors.text}
                        style={styles.emptyIcon}
                      />
                      <ThemedText type="body" style={styles.emptyText}>
                        No program selected. Select a program to get started
                        with your workouts.
                      </ThemedText>
                    </View>
                  </View>
                )}
              </View>

              {/* Quick Actions */}
              <View style={styles.section}>
                <ThemedText type="defaultSemiBold" style={styles.sectionTitle}>
                  Quick Actions
                </ThemedText>

                <TouchableOpacity
                  style={[styles.button, { backgroundColor: colors.accent }]}
                  onPress={handleStartWorkout}
                >
                  <Ionicons name="play-circle" size={24} color={colors.background} />
                  <ThemedText type="defaultSemiBold" style={[styles.buttonText, { color: colors.background }]}>
                    {selectedProgram
                      ? `Quick Start: ${selectedProgram.name}`
                      : "Quick Start"}
                  </ThemedText>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.button, { backgroundColor: colors.card }]}
                  onPress={handleSelectProgram}
                >
                  <Ionicons name="list" size={24} color={colors.text} />
                  <ThemedText
                    type="defaultSemiBold"
                    style={[styles.buttonText, { color: colors.text }]}
                  >
                    Select Program
                  </ThemedText>
                </TouchableOpacity>
              </View>
            </>
          )}
        </ThemedView>
      </ScrollView>

      <WorkoutSelectionModal
        ref={bottomSheetModalRef}
        program={defaultProgram || null}
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
  sectionTitle: {
    marginBottom: 12,
  },
  card: {
    padding: 16,
    borderRadius: 10,
    marginBottom: 16,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  cardHeaderLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  cardIcon: {
    marginRight: 12,
  },
  programName: {
    flex: 1,
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
  workoutStats: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
  },
  statItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  statText: {
    marginLeft: 6,
    opacity: 0.8,
  },
  emptyCardContent: {
    alignItems: "center",
    paddingVertical: 8,
  },
  emptyIcon: {
    marginBottom: 12,
    opacity: 0.5,
  },
  emptyText: {
    opacity: 0.7,
    textAlign: "center",
  },
  cardDescription: {
    opacity: 0.8,
    marginBottom: 16,
  },
  button: {
    width: "100%",
    paddingVertical: 15,
    borderRadius: 10,
    marginBottom: 12,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  buttonText: {
    // Color will be set inline based on button type
    marginLeft: 8,
  },
});
