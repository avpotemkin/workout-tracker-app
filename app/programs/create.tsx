import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useAppTheme } from "@/hooks/useAppTheme";
import { Ionicons } from "@expo/vector-icons";
import { useAppContext } from "@/context/AppContext";
import { useProgramDraft } from "@/context/ProgramDraftContext";
import { Program, Workout } from "@/types";
import { WORKOUT_SPLITS, WorkoutSplitType } from "@/constants/WorkoutPresets";
import { showWorkoutSplitPicker } from "@/components/WorkoutSplitPicker";
import { showSchedulePicker, ScheduleType } from "@/components/SchedulePicker";

export default function CreateProgramScreen() {
  const [programName, setProgramName] = useState("Custom");
  const [selectedSplit, setSelectedSplit] = useState<WorkoutSplitType>(
    WORKOUT_SPLITS.FULL_BODY
  );
  const [schedule, setSchedule] = useState<ScheduleType>("3x/week");

  const backgroundColor = useThemeColor({}, "background");
  const textColor = useThemeColor({}, "text");
  const { colors } = useAppTheme();
  const router = useRouter();
  const { addProgram } = useAppContext();
  const { workouts, resetWithPreset, addWorkout } = useProgramDraft();

  // Initialize workouts from preset when split changes
  useEffect(() => {
    resetWithPreset(selectedSplit);
  }, [selectedSplit]);

  function handleAddWorkout() {
    const newWorkout: Workout = {
      id: `workout-${Date.now()}`,
      name: `Workout ${String.fromCharCode(65 + workouts.length)}`,
      exercises: [],
    };
    addWorkout(newWorkout);
    // Navigate to edit this workout
    router.push(`/programs/edit-workout?id=${newWorkout.id}`);
  }

  function handleEditWorkout(workoutId: string) {
    router.push(`/programs/edit-workout?id=${workoutId}`);
  }

  function handleSave() {
    if (!programName.trim()) {
      Alert.alert("Error", "Please enter a program name");
      return;
    }

    if (workouts.length === 0) {
      Alert.alert("Error", "Please add at least one workout");
      return;
    }

    const program: Program = {
      id: Date.now().toString(),
      name: programName.trim(),
      workouts: workouts,
      schedule: schedule,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    addProgram(program);
    router.back();
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.select({ ios: 0, android: 0 })}
      >
      <ThemedView style={styles.container}>
        {/* Header */}
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
          {/* Program Name */}
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

          {/* Schedule */}
          <TouchableOpacity
            style={[
              styles.card,
              styles.selector,
              { backgroundColor: colors.card },
            ]}
            onPress={() => showSchedulePicker({ onSelect: setSchedule })}
          >
            <View>
              <ThemedText
                type="caption"
                style={{ opacity: 0.6, color: colors.error }}
              >
                Schedule
              </ThemedText>
              <ThemedText type="default">{schedule}</ThemedText>
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
      </KeyboardAvoidingView>
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
