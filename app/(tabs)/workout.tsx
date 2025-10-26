import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";
import { PROGRAMS } from "@/mockdata/programs";
import { useAppTheme } from "@/hooks/useAppTheme";
import { useAppContext } from "@/context/AppContext";
import { WorkoutSelectionModal } from "@/components/workout";
import { BottomSheetModal } from "@gorhom/bottom-sheet";

export default function WorkoutScreen() {
  const backgroundColor = useThemeColor({}, "background");
  const { colors } = useAppTheme();
  const router = useRouter();
  const [activeSession, setActiveSession] = useState(null);
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const { selectedProgram } = useAppContext();

  // Get the first program with days for quick start if no program is selected
  const defaultProgram =
    selectedProgram ||
    PROGRAMS.find((p) => p.workouts && p.workouts.length > 0);

  // This would be replaced with actual session management logic
  useEffect(() => {
    // Check if there's an active session (would be from storage/state management in a real app)
    const checkActiveSession = () => {
      // Mock check for active session - would be replaced with actual state/storage check
      setActiveSession(null);
    };

    checkActiveSession();
  }, []);

  const handleStartWorkout = () => {
    if (defaultProgram && defaultProgram.workouts.length > 0) {
      bottomSheetModalRef.current?.present();
    } else {
      router.push("/(tabs)/programs");
    }
  };

  const handleSelectWorkout = (workoutId: string) => {
    if (defaultProgram) {
      router.push({
        pathname: "/(workout)/session",
        params: {
          programId: defaultProgram.id,
          workoutId: workoutId,
        },
      });
    }
  };

  const handleResumeWorkout = () => {
    // Using object notation for proper typing
    router.push({
      pathname: "/(workout)/session",
    });
  };

  const handleSelectProgram = () => {
    router.push("/(tabs)/programs");
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor }}>
      <ThemedView style={styles.container}>
        <ThemedText type="title">Workout</ThemedText>

        {activeSession ? (
          <TouchableOpacity
            style={[styles.button, { backgroundColor: colors.accent }]}
            onPress={handleResumeWorkout}
          >
            <ThemedText type="subtitle" style={styles.buttonText}>
              Resume Workout
            </ThemedText>
          </TouchableOpacity>
        ) : (
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: colors.accent }]}
              onPress={handleStartWorkout}
            >
              <ThemedText type="subtitle" style={styles.buttonText}>
                {selectedProgram
                  ? `Quick Start: ${selectedProgram.name}`
                  : "Quick Start"}
              </ThemedText>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, { backgroundColor: colors.card }]}
              onPress={handleSelectProgram}
            >
              <ThemedText
                type="subtitle"
                style={[styles.buttonText, { color: colors.text }]}
              >
                Select Program
              </ThemedText>
            </TouchableOpacity>
          </View>
        )}

        <WorkoutSelectionModal
          ref={bottomSheetModalRef}
          program={defaultProgram || null}
          onSelectWorkout={handleSelectWorkout}
        />
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    width: "100%",
    alignItems: "center",
  },
  button: {
    width: "80%",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
    marginVertical: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
  },
});
