import React, { useState, useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useAppTheme } from "@/hooks/useAppTheme";
import { Ionicons } from "@expo/vector-icons";
import { useAppContext } from "@/context/AppContext";
import { useProgramDraft } from "@/context/ProgramDraftContext";
import { Program, Workout, ProgramId, WorkoutId } from "@/types";
import { WORKOUT_SPLITS, WorkoutSplitType } from "@/constants/WorkoutPresets";
import { showWorkoutSplitPicker } from "@/components/WorkoutSplitPicker";
import { EditWorkoutModal } from "@/components/workout";
import { generateId } from "@/utils/ids";

export default function EditProgramScreen() {
  const params = useLocalSearchParams();
  const programId = params.id as string;

  const { programs, updateProgram } = useAppContext();
  const program = programs.find((p) => p.id === (programId as ProgramId));

  const [programName, setProgramName] = useState(program?.name || "");
  const [selectedSplit, setSelectedSplit] = useState<WorkoutSplitType>(
    WORKOUT_SPLITS.FULL_BODY
  );
  const [editingWorkoutId, setEditingWorkoutId] = useState<string | null>(null);

  const editWorkoutModalRef = useRef<BottomSheetModal>(null);

  const backgroundColor = useThemeColor({}, "background");
  const textColor = useThemeColor({}, "text");
  const { colors } = useAppTheme();
  const router = useRouter();
  const { workouts, initializeWithProgram, addWorkout } = useProgramDraft();

  // Initialize workouts from the existing program
  useEffect(() => {
    if (program) {
      initializeWithProgram(program);
    }
  }, [program?.id]);

  function handleAddWorkout() {
    const newWorkout: Workout = {
      id: generateId() as WorkoutId,
      name: `Workout ${String.fromCharCode(65 + workouts.length)}`,
      exercises: [],
    };
    addWorkout(newWorkout);
    // Open bottom sheet to edit this workout
    setEditingWorkoutId(newWorkout.id);
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

    if (!program) {
      Alert.alert("Error", "Program not found");
      return;
    }

    const updatedProgram: Program = {
      ...program,
      name: programName.trim(),
      workouts: workouts,
      updatedAt: new Date(),
    };

    try {
      await updateProgram(programId as ProgramId, updatedProgram);
      router.back();
    } catch {
      Alert.alert(
        "Error",
        "Failed to update program. Please check your connection and try again."
      );
    }
  }

  if (!program) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor }}>
        <ThemedView style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => router.back()}>
              <ThemedText type="default" style={{ color: colors.error }}>
                Cancel
              </ThemedText>
            </TouchableOpacity>
            <ThemedText type="subtitle">Not Found</ThemedText>
            <View style={{ width: 60 }} />
          </View>
          <ThemedText>Program not found</ThemedText>
        </ThemedView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor }}>
      <ThemedView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <ThemedText type="default" style={{ color: colors.error }}>
              Cancel
            </ThemedText>
          </TouchableOpacity>

          <ThemedText type="subtitle">Edit Program</ThemedText>

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
          {/* Program Name */}
          <View style={[styles.card, { backgroundColor: colors.card }]}>
            <TextInput
              style={[styles.input, { color: textColor }]}
              placeholder="Program Name"
              placeholderTextColor={`${textColor}80`}
              value={programName}
              onChangeText={setProgramName}
            />
          </View>

          {/* Workout Split */}
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

          {/* Workouts List */}
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

          {/* Add Workout Button */}
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
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
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
