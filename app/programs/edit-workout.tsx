import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Modal,
  Alert,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useAppTheme } from "@/hooks/useAppTheme";
import { spacing } from "@/constants/Theme";
import { Ionicons } from "@expo/vector-icons";
import { ProgramExercise, ProgramExerciseId, WorkoutId } from "@/types";
import {
  EXERCISES,
  EXERCISE_CATEGORIES,
  ExerciseTemplate,
  getExerciseNameById,
} from "@/constants/Exercises";
import { useProgramDraft } from "@/context/ProgramDraftContext";
import { generateId } from "@/utils/ids";
import { SetsRepsCounter } from "@/components/workout/SetsRepsCounter";

export default function EditWorkoutScreen() {
  const params = useLocalSearchParams();
  const workoutId = params.id as string;

  const { getWorkout, updateWorkout, removeWorkout } = useProgramDraft();
  const workout = getWorkout(workoutId as WorkoutId);

  const [workoutName, setWorkoutName] = useState(workout?.name || "Workout");
  const [exercises, setExercises] = useState<ProgramExercise[]>(
    workout?.exercises || []
  );
  const [showExercisePicker, setShowExercisePicker] = useState(false);
  const [isEditingName, setIsEditingName] = useState(false);

  const backgroundColor = useThemeColor({}, "background");
  const textColor = useThemeColor({}, "text");
  const { colors } = useAppTheme();
  const router = useRouter();

  useEffect(() => {
    if (workout) {
      setWorkoutName(workout.name);
      setExercises(workout.exercises);
    }
  }, [workout]);

  function handleAddExercise(exerciseTemplate: ExerciseTemplate) {
    const newExercise: ProgramExercise = {
      id: generateId() as ProgramExerciseId,
      templateId: exerciseTemplate.id,
      sets: 3,
      reps: 12,
    };
    setExercises([...exercises, newExercise]);
    setShowExercisePicker(false);
  }

  function handleUpdateSets(exerciseId: ProgramExerciseId, sets: number) {
    const updatedExercises = exercises.map((ex) =>
      ex.id === exerciseId ? { ...ex, sets } : ex
    );
    setExercises(updatedExercises);
  }

  function handleUpdateReps(exerciseId: ProgramExerciseId, reps: number) {
    const updatedExercises = exercises.map((ex) =>
      ex.id === exerciseId ? { ...ex, reps } : ex
    );
    setExercises(updatedExercises);
  }

  function handleRemoveExercise(exerciseId: ProgramExerciseId) {
    setExercises(exercises.filter((ex) => ex.id !== exerciseId));
  }

  function handleRemoveWorkout() {
    Alert.alert(
      "Remove Workout",
      "Are you sure you want to remove this workout?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Remove",
          style: "destructive",
          onPress: () => {
            removeWorkout(workoutId as WorkoutId);
            router.back();
          },
        },
      ]
    );
  }

  function handleBack() {
    if (workout) {
      updateWorkout(workoutId as WorkoutId, {
        ...workout,
        name: workoutName,
        exercises: exercises,
      });
    }
    router.back();
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor }}>
      <ThemedView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBack}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Ionicons name="chevron-back" size={24} color={colors.error} />
              <ThemedText type="default" style={{ color: colors.error }}>
                Back
              </ThemedText>
            </View>
          </TouchableOpacity>

          <ThemedText type="subtitle">Edit Workout</ThemedText>

          <TouchableOpacity onPress={() => setIsEditingName(!isEditingName)}>
            <ThemedText type="default" style={{ color: colors.accent }}>
              {isEditingName ? "Done" : "Edit"}
            </ThemedText>
          </TouchableOpacity>
        </View>

        <ScrollView
          style={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          <View style={[styles.card, { backgroundColor: colors.card }]}>
            <TextInput
              style={{ color: textColor }}
              placeholder="Workout Name"
              placeholderTextColor={`${textColor}80`}
              value={workoutName}
              onChangeText={setWorkoutName}
              editable={isEditingName}
              autoFocus={isEditingName}
            />
          </View>

          {exercises.map((exercise, index) => (
            <View
              key={`exercise-${index}-${exercise.id}`}
              style={[
                styles.card,
                styles.exerciseCard,
                { backgroundColor: colors.card },
              ]}
            >
              <View style={styles.exerciseContent}>
                <View style={styles.exerciseInfo}>
                  <View style={styles.exerciseHeader}>
                    <ThemedText type="default">
                      {getExerciseNameById(exercise.templateId)}
                    </ThemedText>
                    <SetsRepsCounter
                      sets={exercise.sets}
                      reps={exercise.reps}
                      onSetsChange={(sets) =>
                        handleUpdateSets(exercise.id, sets)
                      }
                      onRepsChange={(reps) =>
                        handleUpdateReps(exercise.id, reps)
                      }
                    />
                  </View>
                </View>
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => handleRemoveExercise(exercise.id)}
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
            onPress={() => setShowExercisePicker(true)}
          >
            <ThemedText type="default" style={{ color: colors.error }}>
              Add Exercise
            </ThemedText>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.removeWorkoutButton}
            onPress={handleRemoveWorkout}
          >
            <ThemedText type="default" style={{ color: colors.error }}>
              Remove Workout
            </ThemedText>
          </TouchableOpacity>
        </ScrollView>
      </ThemedView>

      <ExercisePicker
        visible={showExercisePicker}
        onSelect={handleAddExercise}
        onClose={() => setShowExercisePicker(false)}
      />
    </SafeAreaView>
  );
}

interface ExercisePickerProps {
  visible: boolean;
  onSelect: (exercise: ExerciseTemplate) => void;
  onClose: () => void;
}

function ExercisePicker({ visible, onSelect, onClose }: ExercisePickerProps) {
  const { colors } = useAppTheme();
  const textColor = useThemeColor({}, "text");

  const categories = Object.values(EXERCISE_CATEGORIES);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={[styles.modalContainer, { backgroundColor: colors.card }]}>
          <View
            style={[styles.modalHeader, { borderBottomColor: colors.divider }]}
          >
            <ThemedText type="subtitle">Add Exercise</ThemedText>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color={textColor} />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.modalContent}>
            {categories.map((category) => {
              const categoryExercises = EXERCISES.filter(
                (ex) => ex.category === category
              );

              return (
                <View key={category} style={styles.categorySection}>
                  <ThemedText
                    type="defaultSemiBold"
                    style={styles.categoryTitle}
                  >
                    {category}
                  </ThemedText>
                  {categoryExercises.map((exercise) => (
                    <TouchableOpacity
                      key={exercise.id}
                      style={[
                        styles.exerciseOption,
                        { borderBottomColor: colors.cardBorder },
                      ]}
                      onPress={() => onSelect(exercise)}
                    >
                      <ThemedText type="default">{exercise.name}</ThemedText>
                    </TouchableOpacity>
                  ))}
                </View>
              );
            })}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: spacing.md,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: spacing.md,
    marginBottom: spacing.md,
  },
  scrollContainer: {
    flex: 1,
  },
  card: {
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
  },
  exerciseCard: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
  },
  exerciseContent: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  exerciseInfo: {
    flex: 1,
  },
  exerciseHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  deleteButton: {
    padding: 8,
    marginLeft: 8,
  },
  addButton: {
    paddingVertical: 16,
    alignItems: "center",
  },
  removeWorkoutButton: {
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 32,
    marginBottom: 32,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContainer: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: "80%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
  },
  modalContent: {
    maxHeight: "100%",
  },
  categorySection: {
    paddingTop: 16,
  },
  categoryTitle: {
    paddingHorizontal: 16,
    paddingBottom: 8,
    opacity: 0.7,
  },
  exerciseOption: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
  },
});
