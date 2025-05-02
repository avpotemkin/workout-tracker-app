import React, { useState, useEffect } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";
import { PROGRAMS } from "@/mockdata/programs";
import { useAppTheme } from "@/hooks/useAppTheme";
import { useAppContext } from "@/context/AppContext";

export default function WorkoutScreen() {
  const backgroundColor = useThemeColor({}, "background");
  const { colors } = useAppTheme();
  const router = useRouter();
  const [activeSession, setActiveSession] = useState(null);
  const { selectedProgram } = useAppContext();

  // Get the first program with days for quick start if no program is selected
  const defaultProgram = selectedProgram || PROGRAMS.find((p) => p.days && p.days.length > 0);

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
    // If we have a default program, start the first day of the selected program
    if (defaultProgram && defaultProgram.days.length > 0) {
      router.push({
        pathname: "/(workout)/session",
        params: {
          programId: defaultProgram.id,
          dayId: defaultProgram.days[0].id,
        },
      });
    } else {
      // Fallback to programs list if no default program
      router.push("/(tabs)/programs");
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
        <ThemedText style={styles.title}>Workout</ThemedText>

        {activeSession ? (
          <TouchableOpacity
            style={[styles.button, { backgroundColor: colors.accent }]}
            onPress={handleResumeWorkout}
          >
            <ThemedText style={styles.buttonText}>Resume Workout</ThemedText>
          </TouchableOpacity>
        ) : (
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: colors.accent }]}
              onPress={handleStartWorkout}
            >
              <ThemedText style={styles.buttonText}>
                {selectedProgram 
                  ? `Quick Start: ${selectedProgram.name}` 
                  : "Quick Start"}
              </ThemedText>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, { backgroundColor: colors.card }]}
              onPress={handleSelectProgram}
            >
              <ThemedText style={styles.buttonText}>Select Program</ThemedText>
            </TouchableOpacity>
          </View>
        )}
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
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 40,
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
    fontSize: 18,
    fontWeight: "600",
  },
});
