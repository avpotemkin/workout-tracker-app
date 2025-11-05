import React, { forwardRef, useCallback } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import {
  BottomSheetModal,
  BottomSheetBackdrop,
  BottomSheetScrollView,
  BottomSheetBackdropProps,
} from "@gorhom/bottom-sheet";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ThemedText } from "@/components/common/ThemedText";
import { useAppTheme } from "@/hooks/useAppTheme";
import { spacing } from "@/constants/Theme";
import {
  EXERCISES,
  EXERCISE_CATEGORIES,
  ExerciseTemplate,
} from "@/constants/Exercises";

interface AddExerciseModalProps {
  onSelectExercise: (exercise: ExerciseTemplate) => void;
}

export const AddExerciseModal = forwardRef<
  BottomSheetModal,
  AddExerciseModalProps
>(({ onSelectExercise }, ref) => {
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

  const handleSelectExercise = (exercise: ExerciseTemplate) => {
    onSelectExercise(exercise);
    if (ref && typeof ref !== "function") {
      ref.current?.dismiss();
    }
  };

  const categories = Object.values(EXERCISE_CATEGORIES);

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
          <ThemedText type="subtitle" style={styles.headerText}>
            Add Exercise
          </ThemedText>
        </View>

        {categories.map((category) => {
          const categoryExercises = EXERCISES.filter(
            (ex) => ex.category === category
          );

          return (
            <View key={category} style={styles.categorySection}>
              <ThemedText type="defaultSemiBold" style={styles.categoryTitle}>
                {category}
              </ThemedText>
              {categoryExercises.map((exercise) => (
                <TouchableOpacity
                  key={exercise.id}
                  style={[
                    styles.exerciseCard,
                    { backgroundColor: colors.card },
                  ]}
                  onPress={() => handleSelectExercise(exercise)}
                  activeOpacity={0.7}
                >
                  <View style={styles.exerciseCardContent}>
                    <ThemedText type="label" style={styles.exerciseName}>
                      {exercise.name}
                    </ThemedText>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          );
        })}
      </BottomSheetScrollView>
    </BottomSheetModal>
  );
});

AddExerciseModal.displayName = "AddExerciseModal";

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: spacing.md,
    paddingTop: spacing.sm,
    paddingBottom: spacing.md,
  },
  headerText: {
    textAlign: "center",
  },
  scrollContent: {
    paddingHorizontal: spacing.md,
  },
  categorySection: {
    marginBottom: 16,
  },
  categoryTitle: {
    marginBottom: 8,
    opacity: 0.7,
  },
  exerciseCard: {
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
  },
  exerciseCardContent: {
    flex: 1,
  },
  exerciseName: {
    marginBottom: 4,
  },
  exerciseInfo: {
    opacity: 0.6,
  },
});
