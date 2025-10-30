import React, {
  forwardRef,
  useCallback,
  useRef,
  useState,
  useEffect,
} from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
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
import { useProgramDraft } from "@/context/ProgramDraftContext";
import { Ionicons } from "@expo/vector-icons";
import { AddExerciseModal } from "./AddExerciseModal";
import { ExerciseTemplate, getExerciseNameById } from "@/constants/Exercises";
import { ProgramExercise, ProgramExerciseId, WorkoutId } from "@/types";
import { generateId } from "@/utils/ids";

interface EditWorkoutModalProps {
  workoutId: string | null;
}

export const EditWorkoutModal = forwardRef<
  BottomSheetModal,
  EditWorkoutModalProps
>(({ workoutId }, ref) => {
  const { colors } = useAppTheme();
  const insets = useSafeAreaInsets();
  const addExerciseModalRef = useRef<BottomSheetModal>(null);
  const { getWorkout, updateWorkout, removeWorkout } = useProgramDraft();

  const workout = workoutId ? getWorkout(workoutId as WorkoutId) : null;
  const [workoutName, setWorkoutName] = useState(workout?.name || "");
  const [exercises, setExercises] = useState<ProgramExercise[]>(
    workout?.exercises || []
  );

  useEffect(() => {
    if (workout) {
      setWorkoutName(workout.name);
      setExercises(workout.exercises);
    }
  }, [workout]);

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

  const handleWorkoutNameChange = (text: string) => {
    setWorkoutName(text);
    if (workoutId && workout) {
      updateWorkout(workoutId as WorkoutId, {
        ...workout,
        name: text,
      });
    }
  };

  const handleAddExercise = (exerciseTemplate: ExerciseTemplate) => {
    const newExercise: ProgramExercise = {
      id: generateId() as ProgramExerciseId,
      templateId: exerciseTemplate.id,
      sets: exerciseTemplate.defaultSets,
      reps: exerciseTemplate.defaultReps,
    };
    const updatedExercises = [...exercises, newExercise];
    setExercises(updatedExercises);

    if (workoutId && workout) {
      updateWorkout(workoutId as WorkoutId, {
        ...workout,
        exercises: updatedExercises,
      });
    }
  };

  const handleRemoveExercise = (exerciseId: ProgramExerciseId) => {
    const updatedExercises = exercises.filter((ex) => ex.id !== exerciseId);
    setExercises(updatedExercises);

    if (workoutId && workout) {
      updateWorkout(workoutId as WorkoutId, {
        ...workout,
        exercises: updatedExercises,
      });
    }
  };

  const handleRemoveWorkout = () => {
    Alert.alert(
      "Remove Workout",
      "Are you sure you want to remove this workout?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Remove",
          style: "destructive",
          onPress: () => {
            if (workoutId) {
              removeWorkout(workoutId as WorkoutId);
              if (ref && typeof ref !== "function") {
                ref.current?.dismiss();
              }
            }
          },
        },
      ]
    );
  };

  const handleDone = () => {
    if (ref && typeof ref !== "function") {
      ref.current?.dismiss();
    }
  };

  return (
    <>
      <BottomSheetModal
        ref={ref}
        backdropComponent={renderBackdrop}
        backgroundStyle={{ backgroundColor: colors.background }}
      >
        <BottomSheetView style={styles.contentContainer}>
          <View style={styles.header}>
            <View style={styles.headerLeft} />
            <ThemedText type="subtitle">Edit Workout</ThemedText>
            <TouchableOpacity onPress={handleDone}>
              <ThemedText type="label" style={{ color: colors.accent }}>
                Done
              </ThemedText>
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
            <View style={[styles.nameCard, { backgroundColor: colors.card }]}>
              <TextInput
                style={[styles.nameInput, { color: colors.text }]}
                placeholder="Workout Name"
                placeholderTextColor={`${colors.text}80`}
                value={workoutName}
                onChangeText={handleWorkoutNameChange}
                autoCapitalize="words"
              />
            </View>

            {exercises.map((exercise) => (
              <View
                key={exercise.id}
                style={[styles.exerciseCard, { backgroundColor: colors.card }]}
              >
                <View style={styles.exerciseContent}>
                  <View style={styles.exerciseInfo}>
                    <ThemedText type="label" style={styles.exerciseName}>
                      {getExerciseNameById(exercise.templateId)}
                    </ThemedText>
                    <ThemedText type="caption" style={styles.exerciseDetails}>
                      {exercise.sets} × {exercise.reps}
                    </ThemedText>
                  </View>
                  <TouchableOpacity
                    onPress={() => handleRemoveExercise(exercise.id)}
                    style={styles.deleteButton}
                  >
                    <Ionicons
                      name="trash-outline"
                      size={20}
                      color={colors.error}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            ))}

            <TouchableOpacity
              style={styles.addButton}
              onPress={() => addExerciseModalRef.current?.present()}
            >
              <ThemedText type="label" style={{ color: colors.accent }}>
                Add Exercise
              </ThemedText>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.removeButton}
              onPress={handleRemoveWorkout}
            >
              <ThemedText type="label" style={{ color: colors.error }}>
                Remove Workout
              </ThemedText>
            </TouchableOpacity>
            <View style={{ paddingBottom: insets.bottom }}></View>
          </BottomSheetScrollView>
        </BottomSheetView>
      </BottomSheetModal>

      <AddExerciseModal
        ref={addExerciseModalRef}
        onSelectExercise={handleAddExercise}
      />
    </>
  );
});

EditWorkoutModal.displayName = "EditWorkoutModal";

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: spacing.md,
    paddingTop: spacing.sm,
    paddingBottom: spacing.md,
  },
  headerLeft: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: spacing.md,
  },
  nameCard: {
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
  },
  nameInput: {
    fontSize: 16,
    fontWeight: "500",
  },
  exerciseCard: {
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
  },
  exerciseContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  exerciseInfo: {
    flex: 1,
  },
  exerciseName: {
    marginBottom: 4,
  },
  exerciseDetails: {
    opacity: 0.6,
  },
  deleteButton: {
    padding: 8,
    marginLeft: 12,
  },
  addButton: {
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 8,
  },
  removeButton: {
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 32,
  },
});
