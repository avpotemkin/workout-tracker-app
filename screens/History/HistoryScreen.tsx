import React, { useState, useCallback } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect } from "@react-navigation/native";
import { ThemedView } from "@/components/common/ThemedView";
import { ThemedText } from "@/components/common/ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useAppTheme } from "@/hooks/useAppTheme";
import { spacing } from "@/constants/Theme";
import { WorkoutHistory, HistoryStats } from "@/types";
import { fetchWorkoutHistory, getHistoryStats } from "@/services/api";

import { HistoryHeader } from "@/components/history/HistoryHeader";
import { HistoryStats as HistoryStatsComponent } from "@/components/history/HistoryStats";
import { HistoryList } from "@/components/history/HistoryList";

export function HistoryScreen() {
  const backgroundColor = useThemeColor({}, "background");
  const { colors } = useAppTheme();

  const [workoutHistory, setWorkoutHistory] = useState<WorkoutHistory[]>([]);
  const [historyStats, setHistoryStats] = useState<HistoryStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const loadHistory = useCallback(async () => {
    try {
      setIsLoading(true);
      setHasError(false);

      const history = await fetchWorkoutHistory();
      setWorkoutHistory(history);

      try {
        const stats = await getHistoryStats();
        setHistoryStats(stats);
      } catch {
        setHistoryStats({
          totalWorkouts: history.length,
          totalDuration: history.reduce((sum, h) => sum + h.duration, 0),
          strongestLifts: [],
        });
      }
    } catch (error) {
      setHasError(true);
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Failed to load workout history"
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadHistory();
    }, [loadHistory])
  );

  if (isLoading) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor }}>
        <ThemedView style={styles.container}>
          <HistoryHeader />
          <ThemedView style={styles.centerContent}>
            <ThemedText>Loading workout history...</ThemedText>
          </ThemedView>
        </ThemedView>
      </SafeAreaView>
    );
  }

  if (hasError) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor }}>
        <ThemedView style={styles.container}>
          <HistoryHeader />
          <ThemedView style={styles.centerContent}>
            <ThemedText style={{ color: colors.error }}>
              {errorMessage || "Failed to load workout history"}
            </ThemedText>
          </ThemedView>
        </ThemedView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor }}>
      <ThemedView style={styles.container}>
        <HistoryHeader />
        {historyStats && <HistoryStatsComponent stats={historyStats} />}
        <HistoryList
          workoutHistory={workoutHistory}
          style={styles.historyList}
        />
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: spacing.md,
  },
  historyList: {
    flex: 1,
  },
  centerContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
