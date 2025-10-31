import React, { forwardRef, useCallback } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import {
  BottomSheetModal,
  BottomSheetBackdrop,
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
      snapPoints={["90%"]}
      topInset={insets.top}
      index={0}
    >
      <BottomSheetScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: Math.max(insets.bottom, spacing.lg) },
        ]}
        stickyHeaderIndices={[0]}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.header, { backgroundColor: colors.background }]}>
          <ThemedText type="subtitle">Select Workout</ThemedText>
        </View>

        {program && program.workouts.length > 0 ? (
          <>
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
          </>
        ) : (
          <View style={styles.emptyContainer}>
            <ThemedText type="body" style={styles.emptyText}>
              No workouts available in this program.
            </ThemedText>
          </View>
        )}
      </BottomSheetScrollView>
    </BottomSheetModal>
  );
});

WorkoutSelectionModal.displayName = "WorkoutSelectionModal";

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: spacing.md,
    paddingTop: spacing.sm,
    paddingBottom: spacing.md,
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
