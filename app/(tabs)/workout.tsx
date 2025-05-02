import React, { useState, useEffect } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";

export default function WorkoutScreen() {
  const backgroundColor = useThemeColor({}, "background");
  const router = useRouter();
  const [activeSession, setActiveSession] = useState(null);

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
    // Using object notation for proper typing
    router.push({
      pathname: "/(workout)/session",
    });
  };

  const handleResumeWorkout = () => {
    // Using object notation for proper typing
    router.push({
      pathname: "/(workout)/session",
    });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor }}>
      <ThemedView style={styles.container}>
        <ThemedText style={styles.title}>Workout</ThemedText>

        {activeSession ? (
          <TouchableOpacity style={styles.button} onPress={handleResumeWorkout}>
            <ThemedText style={styles.buttonText}>Resume Workout</ThemedText>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.button} onPress={handleStartWorkout}>
            <ThemedText style={styles.buttonText}>Start Workout</ThemedText>
          </TouchableOpacity>
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
  button: {
    backgroundColor: "#FF4500", // Accent color (can be adjusted to match app theme)
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
    marginVertical: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
});
