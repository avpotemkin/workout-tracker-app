import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemedView } from "@/components/ThemedView";
import { useThemeColor } from "@/hooks/useThemeColor";
import { WorkoutHistory, HistoryStats } from "@/types";
import { getWorkoutHistory, getHistoryStats } from "@/mockdata/workoutHistory";

import { HistoryHeader } from "@/components/history/HistoryHeader";
import { HistoryStats as HistoryStatsComponent } from "@/components/history/HistoryStats";
import { HistoryList } from "@/components/history/HistoryList";

export function HistoryScreen() {
  const backgroundColor = useThemeColor({}, "background");

  const [workoutHistory, setWorkoutHistory] = useState<WorkoutHistory[]>([]);
  const [historyStats, setHistoryStats] = useState<HistoryStats | null>(null);

  useEffect(() => {
    // Load workout history and stats
    const history = getWorkoutHistory();
    const stats = getHistoryStats();

    setWorkoutHistory(history);
    setHistoryStats(stats);
  }, []);

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
    paddingHorizontal: 16,
  },
  historyList: {
    flex: 1,
  },
});
