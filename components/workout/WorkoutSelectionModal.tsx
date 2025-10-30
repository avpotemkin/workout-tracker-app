import React, { forwardRef, useCallback } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import {
  BottomSheetModal,
  BottomSheetBackdrop,
  BottomSheetView,
  BottomSheetScrollView,
  BottomSheetBackdropProps,
} from "@gorhom/bottom-sheet";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ThemedText } from "@/components/ThemedText";
import { useAppTheme } from "@/hooks/useAppTheme";
import { spacing } from "@/constants/Theme";
import { Program } from "@/types";

interface WorkoutSelectionModalProps {
  program: Program | null;
  onSelectWorkout: (workoutId: string) => void;
}

export const WorkoutSelectionModal = forwardRef<
  BottomSheetModal,
  WorkoutSelectionModalProps
>(({ program, onSelectWorkout }, ref) => {
  const { colors } = useAppTheme();
  const insets = useSafeAreaInsets();

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
      />
    ),
    []
  );

  const handleSelectWorkout = (workoutId: string) => {
    onSelectWorkout(workoutId);
    if (ref && typeof ref !== "function") {
      ref.current?.dismiss();
    }
  };

  return (
    <BottomSheetModal
      ref={ref}
      backdropComponent={renderBackdrop}
      backgroundStyle={{ backgroundColor: colors.background }}
    >
      <BottomSheetView style={styles.contentContainer}>
        <View style={styles.header}>
          <ThemedText type="subtitle">Select Workout</ThemedText>
        </View>

        {program && program.workouts.length > 0 ? (
          <BottomSheetScrollView
            style={styles.scrollView}
            contentContainerStyle={[
              styles.scrollContent,
              { paddingBottom: Math.max(insets.bottom, 30) },
            ]}
            showsVerticalScrollIndicator={false}
          >
            {program.workouts.map((workout) => (
              <TouchableOpacity
                key={workout.id}
                style={[styles.workoutCard, { backgroundColor: colors.card }]}
                onPress={() => handleSelectWorkout(workout.id)}
                activeOpacity={0.7}
              >
                <View style={styles.workoutCardContent}>
                  <ThemedText type="label" style={styles.workoutName}>
                    {workout.name}
                  </ThemedText>
                  <View style={styles.exerciseCountContainer}>
                    <ThemedText type="caption" style={styles.exerciseCount}>
                      {workout.exercises.length}{" "}
                      {workout.exercises.length === 1
                        ? "exercise"
                        : "exercises"}
                    </ThemedText>
                  </View>
                </View>
                <ThemedText
                  type="title"
                  style={[styles.chevron, { color: colors.accent }]}
                >
                  ›
                </ThemedText>
              </TouchableOpacity>
            ))}
            <View style={{ paddingBottom: insets.bottom }}></View>
          </BottomSheetScrollView>
        ) : (
          <View style={styles.emptyContainer}>
            <ThemedText type="body" style={styles.emptyText}>
              No workouts available in this program.
            </ThemedText>
          </View>
        )}
      </BottomSheetView>
    </BottomSheetModal>
  );
});

WorkoutSelectionModal.displayName = "WorkoutSelectionModal";

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
  },
  header: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.sm,
    paddingBottom: spacing.md,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: spacing.md,
  },
  workoutCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
  },
  workoutCardContent: {
    flex: 1,
  },
  workoutName: {
    marginBottom: 4,
  },
  exerciseCountContainer: {
    marginTop: 4,
  },
  exerciseCount: {
    opacity: 0.6,
  },
  chevron: {
    marginLeft: 12,
  },
  emptyContainer: {
    padding: 40,
    alignItems: "center",
  },
  emptyText: {
    opacity: 0.7,
    textAlign: "center",
  },
});
