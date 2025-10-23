import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import React from "react";
import { StyleSheet, ScrollView, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useAppTheme } from "@/hooks/useAppTheme";
import { useAppContext } from "@/context/AppContext";
import { fetchWorkoutHistory } from "@/lib/api";
import { HistoryCard } from "@/components/history/HistoryCard";

export default function HomeScreen() {
  const backgroundColor = useThemeColor({}, "background");
  const { colors } = useAppTheme();
  const router = useRouter();
  const { selectedProgram } = useAppContext();

  const [lastWorkout, setLastWorkout] = React.useState<any | null>(null);
  React.useEffect(() => {
    fetchWorkoutHistory()
      .then((items) => setLastWorkout(items[0] || null))
      .catch(() => setLastWorkout(null));
  }, []);

  const handleStartWorkout = () => {
    if (selectedProgram && selectedProgram.workouts.length > 0) {
      router.push({
        pathname: "/(workout)/session",
        params: {
          programId: selectedProgram.id,
          workoutId: selectedProgram.workouts[0].id,
        },
      });
    } else {
      router.push("/(tabs)/programs");
    }
  };

  const handleBrowsePrograms = () => {
    router.push("/(tabs)/programs");
  };

  const handleViewAllHistory = () => {
    router.push("/(tabs)/history");
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor }}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        <ThemedView style={styles.container}>
          {/* Header */}
          <ThemedText type="title" style={styles.header}>
            Dashboard
          </ThemedText>

          {/* Active Program Overview */}
          <View style={styles.section}>
            <ThemedText type="defaultSemiBold" style={styles.sectionTitle}>
              Active Program
            </ThemedText>

            {selectedProgram ? (
              <View style={[styles.card, { backgroundColor: colors.card }]}>
                <ThemedText type="label" style={styles.programName}>
                  {selectedProgram.name}
                </ThemedText>
                {selectedProgram.description && (
                  <ThemedText type="body" style={styles.programDescription}>
                    {selectedProgram.description}
                  </ThemedText>
                )}
                {selectedProgram.workouts.length > 0 && (
                  <View style={styles.nextWorkoutContainer}>
                    <ThemedText type="caption" style={styles.nextWorkoutLabel}>
                      Next Workout:
                    </ThemedText>
                    <ThemedText type="defaultSemiBold">
                      {selectedProgram.workouts[0].name}
                    </ThemedText>
                  </View>
                )}
              </View>
            ) : (
              <View style={[styles.card, { backgroundColor: colors.card }]}>
                <ThemedText type="body" style={styles.emptyText}>
                  No program selected. Browse programs to get started.
                </ThemedText>
              </View>
            )}
          </View>

          {/* Recent Activity */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <ThemedText type="defaultSemiBold" style={styles.sectionTitle}>
                Recent Activity
              </ThemedText>
              {lastWorkout && (
                <TouchableOpacity onPress={handleViewAllHistory}>
                  <ThemedText type="link">
                    View All
                  </ThemedText>
                </TouchableOpacity>
              )}
            </View>

            {lastWorkout ? (
              <HistoryCard workout={lastWorkout} />
            ) : (
              <View style={[styles.card, { backgroundColor: colors.card }]}>
                <ThemedText type="body" style={styles.emptyText}>
                  No workouts yet. Start your first workout!
                </ThemedText>
              </View>
            )}
          </View>

          {/* Quick Actions */}
          <View style={styles.section}>
            <ThemedText type="defaultSemiBold" style={styles.sectionTitle}>
              Quick Actions
            </ThemedText>

            <TouchableOpacity
              style={[styles.button, { backgroundColor: colors.accent }]}
              onPress={handleStartWorkout}
            >
              <ThemedText type="defaultSemiBold" style={styles.buttonText}>Start Workout</ThemedText>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, { backgroundColor: colors.card }]}
              onPress={handleBrowsePrograms}
            >
              <ThemedText type="defaultSemiBold" style={styles.buttonText}>Browse Programs</ThemedText>
            </TouchableOpacity>
          </View>
        </ThemedView>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 32,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    marginTop: 16,
    marginBottom: 24,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  sectionTitle: {
    marginBottom: 12,
  },
  card: {
    padding: 16,
    borderRadius: 10,
    marginBottom: 16,
  },
  programName: {
    marginBottom: 8,
  },
  programDescription: {
    opacity: 0.7,
    marginBottom: 12,
  },
  nextWorkoutContainer: {
    marginTop: 8,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#444",
  },
  nextWorkoutLabel: {
    opacity: 0.7,
    marginBottom: 4,
  },
  emptyText: {
    opacity: 0.7,
    textAlign: "center",
  },
  button: {
    width: "100%",
    paddingVertical: 15,
    borderRadius: 10,
    marginBottom: 12,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
  },
});
