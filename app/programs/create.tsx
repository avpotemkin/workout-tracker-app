import React, { useState, useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useAppTheme } from "@/hooks/useAppTheme";
import { spacing } from "@/constants/Theme";
import { Ionicons } from "@expo/vector-icons";
import { usePrograms } from "@/hooks/usePrograms";
import { useProgramDraft } from "@/context/ProgramDraftContext";
import { Program, Workout, ProgramId, WorkoutId } from "@/types";
import { WORKOUT_SPLITS, WorkoutSplitType } from "@/constants/WorkoutPresets";
import { showWorkoutSplitPicker } from "@/components/WorkoutSplitPicker";
import { EditWorkoutModal } from "@/components/workout";
import { generateId } from "@/utils/ids";

export default function CreateProgramScreen() {
  const [programName, setProgramName] = useState("");
  const [selectedSplit, setSelectedSplit] = useState<WorkoutSplitType>(
    WORKOUT_SPLITS.FULL_BODY
  );
  const [editingWorkoutId, setEditingWorkoutId] = useState<string | null>(null);
  const editWorkoutModalRef = useRef<BottomSheetModal>(null);

  const backgroundColor = useThemeColor({}, "background");
  const textColor = useThemeColor({}, "text");
  const { colors } = useAppTheme();
  const router = useRouter();
  const { addProgram } = usePrograms();
  const { workouts, resetWithPreset, addWorkout } = useProgramDraft();

  useEffect(() => {
    resetWithPreset(selectedSplit);
  }, [selectedSplit]);

  function handleAddWorkout() {
    const newWorkout: Workout = {
      id: generateId() as WorkoutId,
      name: `Workout ${String.fromCharCode(65 + workouts.length)}`,
      exercises: [],
    };
    addWorkout(newWorkout);
    setEditingWorkoutId(newWorkout.id as string);
    editWorkoutModalRef.current?.present();
  }

  function handleEditWorkout(workoutId: string) {
    setEditingWorkoutId(workoutId);
    editWorkoutModalRef.current?.present();
  }

  async function handleSave() {
    if (!programName.trim()) {
      Alert.alert("Error", "Please enter a program name");
      return;
    }

    if (workouts.length === 0) {
      Alert.alert("Error", "Please add at least one workout");
      return;
    }

    const program: Program = {
      id: generateId() as ProgramId,
      name: programName.trim(),
      workouts: workouts,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    try {
      await addProgram(program);
      router.back();
    } catch {
      Alert.alert(
        "Error",
        "Failed to create program. Please check your connection and try again."
      );
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor }}>
      <ThemedView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <ThemedText type="default" style={{ color: colors.error }}>
              Cancel
            </ThemedText>
          </TouchableOpacity>

          <ThemedText type="subtitle">Create Program</ThemedText>

          <TouchableOpacity onPress={handleSave}>
            <ThemedText type="default" style={{ color: colors.accent }}>
              Done
            </ThemedText>
          </TouchableOpacity>
        </View>

        <ScrollView
          style={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          <View style={[styles.card, { backgroundColor: colors.card }]}>
            <TextInput
              style={[styles.input, { color: textColor }]}
              placeholder="Program Name"
              placeholderTextColor={`${textColor}80`}
              value={programName}
              onChangeText={setProgramName}
              autoFocus
            />
          </View>

          <TouchableOpacity
            style={[
              styles.card,
              styles.selector,
              { backgroundColor: colors.card },
            ]}
            onPress={() =>
              showWorkoutSplitPicker({ onSelect: setSelectedSplit })
            }
          >
            <View>
              <ThemedText type="caption" style={{ opacity: 0.6 }}>
                Workout Split
              </ThemedText>
              <ThemedText type="default">{selectedSplit}</ThemedText>
            </View>
            <Ionicons name="chevron-forward" size={20} color={textColor} />
          </TouchableOpacity>

          {workouts.map((workout) => (
            <TouchableOpacity
              key={workout.id}
              style={[
                styles.card,
                styles.workoutCard,
                { backgroundColor: colors.card },
              ]}
              onPress={() => handleEditWorkout(workout.id)}
            >
              <View style={styles.workoutInfo}>
                <ThemedText type="default">{workout.name}</ThemedText>
                <ThemedText type="caption" style={{ opacity: 0.6 }}>
                  {workout.exercises.length === 0
                    ? "No exercises"
                    : `${workout.exercises.length} exercise${
                        workout.exercises.length !== 1 ? "s" : ""
                      }`}
                </ThemedText>
              </View>
              <Ionicons name="chevron-forward" size={20} color={textColor} />
            </TouchableOpacity>
          ))}

          <TouchableOpacity style={styles.addButton} onPress={handleAddWorkout}>
            <ThemedText type="default" style={{ color: colors.error }}>
              Add Workout
            </ThemedText>
          </TouchableOpacity>
        </ScrollView>
      </ThemedView>

      <EditWorkoutModal
        ref={editWorkoutModalRef}
        workoutId={editingWorkoutId}
      />
    </SafeAreaView>
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
  input: {
    fontSize: 16,
  },
  selector: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  workoutCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  workoutInfo: {
    flex: 1,
  },
  addButton: {
    paddingVertical: 16,
    alignItems: "center",
  },
});
