import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useAppTheme } from "@/hooks/useAppTheme";
import { Ionicons } from "@expo/vector-icons";
import { useAppContext } from "@/context/AppContext";
import { Exercise, WorkoutDay } from "@/types";

export default function CreateProgramScreen() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [nameError, setNameError] = useState("");
  const [days, setDays] = useState<WorkoutDay[]>([]);
  const [currentDayIndex, setCurrentDayIndex] = useState<number | null>(null);
  const [showDayForm, setShowDayForm] = useState(false);
  const [dayName, setDayName] = useState("");
  const [dayDescription, setDayDescription] = useState("");
  const [dayNameError, setDayNameError] = useState("");
  const [showExerciseForm, setShowExerciseForm] = useState(false);
  const [exerciseName, setExerciseName] = useState("");
  const [exerciseSets, setExerciseSets] = useState("");
  const [exerciseReps, setExerciseReps] = useState("");
  const [exerciseWeight, setExerciseWeight] = useState("");
  const [exerciseNameError, setExerciseNameError] = useState("");

  const backgroundColor = useThemeColor({}, "background");
  const textColor = useThemeColor({}, "text");
  const tintColor = useThemeColor({}, "tint");
  const { colors } = useAppTheme();
  const router = useRouter();
  const { addProgram } = useAppContext();

  const validateProgramForm = () => {
    if (!name.trim()) {
      setNameError("Program name is required");
      return false;
    }
    setNameError("");
    return true;
  };

  const validateDayForm = () => {
    if (!dayName.trim()) {
      setDayNameError("Day name is required");
      return false;
    }
    setDayNameError("");
    return true;
  };

  const validateExerciseForm = () => {
    if (!exerciseName.trim()) {
      setExerciseNameError("Exercise name is required");
      return false;
    }

    if (
      !exerciseSets.trim() ||
      isNaN(Number(exerciseSets)) ||
      Number(exerciseSets) <= 0
    ) {
      Alert.alert("Invalid Input", "Sets must be a positive number");
      return false;
    }

    if (
      !exerciseReps.trim() ||
      isNaN(Number(exerciseReps)) ||
      Number(exerciseReps) <= 0
    ) {
      Alert.alert("Invalid Input", "Reps must be a positive number");
      return false;
    }

    if (
      exerciseWeight.trim() &&
      (isNaN(Number(exerciseWeight)) || Number(exerciseWeight) < 0)
    ) {
      Alert.alert("Invalid Input", "Weight must be a non-negative number");
      return false;
    }

    setExerciseNameError("");
    return true;
  };

  const handleAddDay = () => {
    if (!validateDayForm()) return;

    const newDay: WorkoutDay = {
      id: `day-${Date.now()}`,
      name: dayName.trim(),
      description: dayDescription.trim() || undefined,
      exercises: [],
    };

    setDays([...days, newDay]);
    setCurrentDayIndex(days.length);
    setDayName("");
    setDayDescription("");
    setShowDayForm(false);
    setShowExerciseForm(true);
  };

  const handleAddExercise = () => {
    if (!validateExerciseForm()) return;
    if (currentDayIndex === null) return;

    const newExercise: Exercise = {
      id: `exercise-${Date.now()}`,
      name: exerciseName.trim(),
      sets: Number(exerciseSets),
      reps: Number(exerciseReps),
      weight: exerciseWeight.trim() ? Number(exerciseWeight) : undefined,
    };

    const updatedDays = [...days];
    updatedDays[currentDayIndex].exercises.push(newExercise);
    setDays(updatedDays);

    // Clear exercise form
    setExerciseName("");
    setExerciseSets("");
    setExerciseReps("");
    setExerciseWeight("");
  };

  const handleDeleteExercise = (dayIndex: number, exerciseIndex: number) => {
    const updatedDays = [...days];
    updatedDays[dayIndex].exercises.splice(exerciseIndex, 1);
    setDays(updatedDays);
  };

  const handleDeleteDay = (dayIndex: number) => {
    const updatedDays = [...days];
    updatedDays.splice(dayIndex, 1);
    setDays(updatedDays);

    if (currentDayIndex === dayIndex) {
      setCurrentDayIndex(null);
      setShowExerciseForm(false);
    } else if (currentDayIndex !== null && currentDayIndex > dayIndex) {
      setCurrentDayIndex(currentDayIndex - 1);
    }
  };

  const handleSave = () => {
    if (!validateProgramForm()) return;

    if (days.length === 0) {
      Alert.alert(
        "No Workout Days",
        "Please add at least one workout day to your program"
      );
      return;
    }

    const newProgram = {
      id: Date.now().toString(),
      name: name.trim(),
      description: description.trim() || undefined,
      days: days,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    addProgram(newProgram);
    router.back();
  };

  const renderDayTabs = () => {
    return (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.dayTabsContainer}
      >
        {days.map((day, index) => (
          <TouchableOpacity
            key={day.id}
            style={[
              styles.dayTab,
              currentDayIndex === index
                ? { backgroundColor: colors.accent }
                : { backgroundColor: colors.card },
            ]}
            onPress={() => {
              setCurrentDayIndex(index);
              setShowExerciseForm(true);
              setShowDayForm(false);
            }}
          >
            <ThemedText
              style={[
                styles.dayTabText,
                currentDayIndex === index ? { color: "white" } : {},
              ]}
            >
              {day.name}
            </ThemedText>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => handleDeleteDay(index)}
            >
              <Ionicons
                name="close-circle"
                size={18}
                color={currentDayIndex === index ? "white" : colors.error}
              />
            </TouchableOpacity>
          </TouchableOpacity>
        ))}
        <TouchableOpacity
          style={[styles.addDayButton, { backgroundColor: colors.card }]}
          onPress={() => {
            setShowDayForm(true);
            setShowExerciseForm(false);
            setDayName("");
            setDayDescription("");
            setDayNameError("");
          }}
        >
          <Ionicons name="add" size={24} color={tintColor} />
        </TouchableOpacity>
      </ScrollView>
    );
  };

  const renderExercises = () => {
    if (currentDayIndex === null || !days[currentDayIndex]) return null;

    const currentDay = days[currentDayIndex];

    return (
      <View style={styles.exercisesContainer}>
        <View style={styles.dayHeader}>
          <ThemedText style={styles.dayTitle}>{currentDay.name}</ThemedText>
          {currentDay.description && (
            <ThemedText style={styles.dayDescription}>
              {currentDay.description}
            </ThemedText>
          )}
        </View>

        {currentDay.exercises.map((exercise, index) => (
          <View
            key={exercise.id}
            style={[styles.exerciseCard, { backgroundColor: colors.card }]}
          >
            <View style={styles.exerciseHeader}>
              <ThemedText style={styles.exerciseName}>
                {exercise.name}
              </ThemedText>
              <TouchableOpacity
                onPress={() => handleDeleteExercise(currentDayIndex, index)}
              >
                <Ionicons name="trash-outline" size={20} color={colors.error} />
              </TouchableOpacity>
            </View>
            <View style={styles.exerciseDetails}>
              <View style={styles.detailItem}>
                <ThemedText style={styles.detailLabel}>Sets</ThemedText>
                <ThemedText style={styles.detailValue}>
                  {exercise.sets}
                </ThemedText>
              </View>
              <View style={styles.detailItem}>
                <ThemedText style={styles.detailLabel}>Reps</ThemedText>
                <ThemedText style={styles.detailValue}>
                  {exercise.reps}
                </ThemedText>
              </View>
              {exercise.weight !== undefined && (
                <View style={styles.detailItem}>
                  <ThemedText style={styles.detailLabel}>Weight</ThemedText>
                  <ThemedText style={styles.detailValue}>
                    {exercise.weight} kg
                  </ThemedText>
                </View>
              )}
            </View>
          </View>
        ))}

        {showExerciseForm ? (
          <View style={[styles.formCard, { backgroundColor: colors.card }]}>
            <View style={styles.formHeader}>
              <ThemedText style={styles.formTitle}>Add Exercise</ThemedText>
              <TouchableOpacity onPress={() => setShowExerciseForm(false)}>
                <Ionicons name="close" size={24} color={textColor} />
              </TouchableOpacity>
            </View>

            <View style={styles.inputGroup}>
              <ThemedText style={styles.label}>Exercise Name *</ThemedText>
              <TextInput
                style={[
                  styles.input,
                  {
                    color: textColor,
                    borderColor: exerciseNameError
                      ? colors.error
                      : colors.cardBorder,
                    backgroundColor: colors.background,
                  },
                ]}
                placeholder="Enter exercise name"
                placeholderTextColor={`${textColor}80`}
                value={exerciseName}
                onChangeText={setExerciseName}
              />
              {exerciseNameError ? (
                <ThemedText style={[styles.errorText, { color: colors.error }]}>
                  {exerciseNameError}
                </ThemedText>
              ) : null}
            </View>

            <View style={styles.rowInputs}>
              <View style={[styles.inputGroup, { flex: 1, marginRight: 8 }]}>
                <ThemedText style={styles.label}>Sets *</ThemedText>
                <TextInput
                  style={[
                    styles.input,
                    {
                      color: textColor,
                      borderColor: colors.cardBorder,
                      backgroundColor: colors.background,
                    },
                  ]}
                  placeholder="Sets"
                  placeholderTextColor={`${textColor}80`}
                  value={exerciseSets}
                  onChangeText={setExerciseSets}
                  keyboardType="numeric"
                />
              </View>

              <View style={[styles.inputGroup, { flex: 1 }]}>
                <ThemedText style={styles.label}>Reps *</ThemedText>
                <TextInput
                  style={[
                    styles.input,
                    {
                      color: textColor,
                      borderColor: colors.cardBorder,
                      backgroundColor: colors.background,
                    },
                  ]}
                  placeholder="Reps"
                  placeholderTextColor={`${textColor}80`}
                  value={exerciseReps}
                  onChangeText={setExerciseReps}
                  keyboardType="numeric"
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <ThemedText style={styles.label}>Weight (Optional)</ThemedText>
              <TextInput
                style={[
                  styles.input,
                  {
                    color: textColor,
                    borderColor: colors.cardBorder,
                    backgroundColor: colors.background,
                  },
                ]}
                placeholder="Weight (kg)"
                placeholderTextColor={`${textColor}80`}
                value={exerciseWeight}
                onChangeText={setExerciseWeight}
                keyboardType="numeric"
              />
            </View>

            <TouchableOpacity
              style={[styles.addButton, { backgroundColor: colors.accent }]}
              onPress={handleAddExercise}
            >
              <ThemedText style={styles.buttonText}>Add Exercise</ThemedText>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            style={[styles.addExerciseButton, { borderColor: tintColor }]}
            onPress={() => {
              setShowExerciseForm(true);
              setExerciseName("");
              setExerciseSets("");
              setExerciseReps("");
              setExerciseWeight("");
              setExerciseNameError("");
            }}
          >
            <Ionicons name="add-circle-outline" size={20} color={tintColor} />
            <ThemedText style={[styles.addExerciseText, { color: tintColor }]}>
              Add Exercise
            </ThemedText>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  const renderDayForm = () => {
    if (!showDayForm) return null;

    return (
      <View style={[styles.formCard, { backgroundColor: colors.card }]}>
        <View style={styles.formHeader}>
          <ThemedText style={styles.formTitle}>Add Workout Day</ThemedText>
          <TouchableOpacity onPress={() => setShowDayForm(false)}>
            <Ionicons name="close" size={24} color={textColor} />
          </TouchableOpacity>
        </View>

        <View style={styles.inputGroup}>
          <ThemedText style={styles.label}>Day Name *</ThemedText>
          <TextInput
            style={[
              styles.input,
              {
                color: textColor,
                borderColor: dayNameError ? colors.error : colors.cardBorder,
                backgroundColor: colors.background,
              },
            ]}
            placeholder="Enter day name (e.g., Chest Day, Leg Day)"
            placeholderTextColor={`${textColor}80`}
            value={dayName}
            onChangeText={setDayName}
          />
          {dayNameError ? (
            <ThemedText style={[styles.errorText, { color: colors.error }]}>
              {dayNameError}
            </ThemedText>
          ) : null}
        </View>

        <View style={styles.inputGroup}>
          <ThemedText style={styles.label}>Description (Optional)</ThemedText>
          <TextInput
            style={[
              styles.input,
              styles.textArea,
              {
                color: textColor,
                borderColor: colors.cardBorder,
                backgroundColor: colors.background,
              },
            ]}
            placeholder="Enter day description"
            placeholderTextColor={`${textColor}80`}
            value={dayDescription}
            onChangeText={setDayDescription}
            multiline
            numberOfLines={3}
            textAlignVertical="top"
          />
        </View>

        <TouchableOpacity
          style={[styles.addButton, { backgroundColor: colors.accent }]}
          onPress={handleAddDay}
        >
          <ThemedText style={styles.buttonText}>Add Day</ThemedText>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ThemedView style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => router.back()}
            >
              <Ionicons name="arrow-back" size={24} color={textColor} />
            </TouchableOpacity>

            <ThemedText style={styles.headerTitle}>Create Program</ThemedText>
          </View>

          <ScrollView
            style={styles.scrollContainer}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.formContainer}>
              <View style={styles.inputGroup}>
                <ThemedText style={styles.label}>Program Name *</ThemedText>
                <TextInput
                  style={[
                    styles.input,
                    {
                      color: textColor,
                      borderColor: nameError ? colors.error : colors.cardBorder,
                      backgroundColor: colors.card,
                    },
                  ]}
                  placeholder="Enter program name"
                  placeholderTextColor={`${textColor}80`}
                  value={name}
                  onChangeText={setName}
                />
                {nameError ? (
                  <ThemedText
                    style={[styles.errorText, { color: colors.error }]}
                  >
                    {nameError}
                  </ThemedText>
                ) : null}
              </View>

              <View style={styles.inputGroup}>
                <ThemedText style={styles.label}>
                  Description (Optional)
                </ThemedText>
                <TextInput
                  style={[
                    styles.input,
                    styles.textArea,
                    {
                      color: textColor,
                      borderColor: colors.cardBorder,
                      backgroundColor: colors.card,
                    },
                  ]}
                  placeholder="Enter program description"
                  placeholderTextColor={`${textColor}80`}
                  value={description}
                  onChangeText={setDescription}
                  multiline
                  numberOfLines={4}
                  textAlignVertical="top"
                />
              </View>

              <View style={styles.sectionHeader}>
                <ThemedText style={styles.sectionTitle}>
                  Workout Days
                </ThemedText>
              </View>

              {days.length > 0 ? (
                <>
                  {renderDayTabs()}
                  {renderExercises()}
                </>
              ) : (
                <TouchableOpacity
                  style={[styles.addFirstDayButton, { borderColor: tintColor }]}
                  onPress={() => {
                    setShowDayForm(true);
                    setDayName("");
                    setDayDescription("");
                  }}
                >
                  <Ionicons
                    name="add-circle-outline"
                    size={24}
                    color={tintColor}
                  />
                  <ThemedText
                    style={[styles.addFirstDayText, { color: tintColor }]}
                  >
                    Add Your First Workout Day
                  </ThemedText>
                </TouchableOpacity>
              )}

              {renderDayForm()}
            </View>
          </ScrollView>

          <TouchableOpacity
            style={[
              styles.saveButton,
              {
                backgroundColor:
                  name.trim() && days.length > 0
                    ? colors.accent
                    : `${colors.accent}80`,
              },
            ]}
            onPress={handleSave}
            disabled={!name.trim() || days.length === 0}
          >
            <ThemedText style={styles.saveButtonText}>Save Program</ThemedText>
          </TouchableOpacity>
        </ThemedView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    marginBottom: 16,
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    flex: 1,
    textAlign: "center",
    marginRight: 40, // To center the title accounting for the back button
  },
  scrollContainer: {
    flex: 1,
  },
  formContainer: {
    flex: 1,
  },
  inputGroup: {
    marginBottom: 16,
  },
  rowInputs: {
    flexDirection: "row",
    marginBottom: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 8,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
  },
  textArea: {
    height: 100,
    paddingTop: 12,
    paddingBottom: 12,
  },
  errorText: {
    fontSize: 14,
    marginTop: 4,
  },
  sectionHeader: {
    marginTop: 16,
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#444",
    paddingBottom: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  dayTabsContainer: {
    flexDirection: "row",
    marginBottom: 16,
  },
  dayTab: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight: 8,
  },
  dayTabText: {
    fontSize: 14,
    fontWeight: "500",
    marginRight: 4,
  },
  addDayButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  deleteButton: {
    marginLeft: 4,
  },
  exercisesContainer: {
    marginBottom: 16,
  },
  dayHeader: {
    marginBottom: 12,
  },
  dayTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 4,
  },
  dayDescription: {
    fontSize: 14,
    opacity: 0.7,
  },
  exerciseCard: {
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  exerciseHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  exerciseName: {
    fontSize: 16,
    fontWeight: "500",
  },
  exerciseDetails: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  detailItem: {
    marginRight: 16,
    marginBottom: 4,
  },
  detailLabel: {
    fontSize: 12,
    opacity: 0.7,
  },
  detailValue: {
    fontSize: 14,
    fontWeight: "500",
  },
  addExerciseButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderStyle: "dashed",
    borderRadius: 8,
    paddingVertical: 12,
    marginTop: 8,
  },
  addExerciseText: {
    marginLeft: 8,
    fontWeight: "500",
  },
  addFirstDayButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderStyle: "dashed",
    borderRadius: 8,
    paddingVertical: 24,
    marginTop: 8,
  },
  addFirstDayText: {
    marginLeft: 8,
    fontWeight: "500",
    fontSize: 16,
  },
  formCard: {
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  formHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  formTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  addButton: {
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 8,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
  },
  saveButton: {
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 8,
    marginBottom: 16,
  },
  saveButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});
