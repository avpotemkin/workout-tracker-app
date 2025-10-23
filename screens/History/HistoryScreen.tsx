import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemedView } from "@/components/ThemedView";
import { useThemeColor } from "@/hooks/useThemeColor";
import { WorkoutHistory, HistoryStats } from "@/types";
import { fetchWorkoutHistory, fetchHistoryStats } from "@/lib/api";

import { HistoryHeader } from "@/components/history/HistoryHeader";
import { HistoryStats as HistoryStatsComponent } from "@/components/history/HistoryStats";
import { HistoryList } from "@/components/history/HistoryList";
import { HistoryFilters } from "@/components/history/HistoryFilters";

export function HistoryScreen() {
  const backgroundColor = useThemeColor({}, "background");

  const [workoutHistory, setWorkoutHistory] = useState<WorkoutHistory[]>([]);
  const [historyStats, setHistoryStats] = useState<HistoryStats | null>(null);
  const [filteredHistory, setFilteredHistory] = useState<WorkoutHistory[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    let mounted = true;
    Promise.all([fetchWorkoutHistory(), fetchHistoryStats()])
      .then(([history, stats]) => {
        if (!mounted) return;
        setWorkoutHistory(history);
        setHistoryStats(stats);
        setFilteredHistory(history);
      })
      .catch((e) => console.warn('Failed to load history', e));
    return () => {
      mounted = false;
    };
  }, []);

  const handleFilterChange = (filteredData: WorkoutHistory[]) => {
    setFilteredHistory(filteredData);
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor }}>
      <ThemedView style={styles.container}>
        {/* Header */}
        <HistoryHeader
          onToggleFilters={toggleFilters}
          showFilters={showFilters}
        />

        {/* Stats */}
        {historyStats && (
          <HistoryStatsComponent stats={historyStats} />
        )}

        {/* Filters */}
        {showFilters && (
          <HistoryFilters
            workoutHistory={workoutHistory}
            onFilterChange={handleFilterChange}
          />
        )}

        {/* History List */}
        <HistoryList
          workoutHistory={filteredHistory}
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