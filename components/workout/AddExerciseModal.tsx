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
import {
  EXERCISES,
  EXERCISE_CATEGORIES,
  ExerciseTemplate,
} from "@/constants/Exercises";
import { Ionicons } from "@expo/vector-icons";

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
      snapPoints={["80%"]}
    >
      <BottomSheetView style={styles.contentContainer}>
        <View style={styles.header}>
          <ThemedText type="subtitle">Add Exercise</ThemedText>
          <TouchableOpacity
            onPress={() => {
              if (ref && typeof ref !== "function") {
                ref.current?.dismiss();
              }
            }}
          >
            <Ionicons name="close" size={24} color={colors.text} />
          </TouchableOpacity>
        </View>

        <BottomSheetScrollView
          style={styles.scrollView}
          contentContainerStyle={[
            styles.scrollContent,
            { paddingBottom: Math.max(insets.bottom, 30) },
          ]}
          showsVerticalScrollIndicator={false}
        >
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
                      <ThemedText type="caption" style={styles.exerciseInfo}>
                        {exercise.defaultSets} × {exercise.defaultReps}
                      </ThemedText>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            );
          })}
          <View style={{ paddingBottom: insets.bottom }}></View>
        </BottomSheetScrollView>
      </BottomSheetView>
    </BottomSheetModal>
  );
});

AddExerciseModal.displayName = "AddExerciseModal";

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 16,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
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
