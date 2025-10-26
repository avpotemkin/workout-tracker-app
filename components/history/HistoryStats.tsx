import React from "react";
import { View, StyleSheet } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useAppTheme } from "@/hooks/useAppTheme";
import { HistoryStats as HistoryStatsType } from "@/types";

type HistoryStatsProps = {
  stats: HistoryStatsType;
};

export function HistoryStats({ stats }: HistoryStatsProps) {
  const { colors } = useAppTheme();

  const formatDuration = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    if (hours > 0) {
      return `${hours}h ${remainingMinutes}m`;
    }
    return `${remainingMinutes}m`;
  };

  return (
    <ThemedView style={[styles.container, { backgroundColor: colors.card }]}>
      <ThemedText type="subtitle" style={styles.title}>
        Overview
      </ThemedText>

      <View style={styles.statsGrid}>
        <View style={styles.statItem}>
          <ThemedText type="subtitle" style={styles.statValue}>
            {stats.totalWorkouts}
          </ThemedText>
          <ThemedText type="caption" style={styles.statLabel}>
            Workouts
          </ThemedText>
        </View>

        <View style={styles.statItem}>
          <ThemedText type="subtitle" style={styles.statValue}>
            {formatDuration(stats.totalDuration)}
          </ThemedText>
          <ThemedText type="caption" style={styles.statLabel}>
            Total Time
          </ThemedText>
        </View>
      </View>

      {stats.strongestLifts.length > 0 && (
        <View style={styles.strongestLifts}>
          <ThemedText type="label" style={styles.subtitle}>
            Strongest Lifts
          </ThemedText>
          {stats.strongestLifts.slice(0, 3).map((lift, index) => (
            <View key={index} style={styles.liftRow}>
              <ThemedText type="body">{lift.exercise}</ThemedText>
              <ThemedText type="body" style={styles.liftWeight}>
                {lift.maxWeight}kg
              </ThemedText>
            </View>
          ))}
        </View>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 10,
    marginVertical: 8,
  },
  title: {
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  statItem: {
    flex: 1,
    alignItems: "center",
  },
  statValue: {
    color: "#4A90E2",
  },
  statLabel: {
    marginTop: 4,
  },
  strongestLifts: {
    borderTopWidth: 1,
    borderTopColor: "#444",
    paddingTop: 12,
  },
  subtitle: {
    marginBottom: 8,
  },
  liftRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 4,
  },
  liftWeight: {
    color: "#4A90E2",
  },
});
