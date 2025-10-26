import React from "react";
import { View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ThemedText } from "@/components/ThemedText";
import { useAppTheme } from "@/hooks/useAppTheme";
import { WorkoutHistory } from "@/types";

type HistoryCardProps = {
  workout: WorkoutHistory;
};

export function HistoryCard({ workout }: HistoryCardProps) {
  const { colors } = useAppTheme();

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatDuration = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    if (hours > 0) {
      return `${hours}h ${remainingMinutes}m`;
    }
    return `${remainingMinutes}m`;
  };

  return (
    <View style={[styles.card, { backgroundColor: colors.card }]}>
      <View style={styles.cardHeader}>
        <View style={styles.programInfo}>
          <ThemedText type="defaultSemiBold">{workout.programName}</ThemedText>
          <ThemedText type="body" style={styles.dayName}>
            {workout.dayName}
          </ThemedText>
        </View>
        <View style={styles.dateContainer}>
          <ThemedText type="caption" style={styles.date}>
            {formatDate(workout.startedAt)}
          </ThemedText>
        </View>
      </View>

      <View style={styles.statsRow}>
        <View style={styles.statItem}>
          <Ionicons name="time-outline" size={16} color={colors.text} />
          <ThemedText type="caption" style={styles.statText}>
            {formatDuration(workout.duration)}
          </ThemedText>
        </View>

        <View style={styles.statItem}>
          <Ionicons name="fitness-outline" size={16} color={colors.text} />
          <ThemedText type="caption" style={styles.statText}>
            {workout.totalSets} sets
          </ThemedText>
        </View>
      </View>

      <View style={styles.exercisesList}>
        <ThemedText type="caption" style={styles.exercisesText}>
          {workout.exercises.map((ex) => ex.name).join(", ")}
        </ThemedText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  programInfo: {
    flex: 1,
  },
  dayName: {
    color: "#888",
    marginTop: 2,
  },
  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  date: {
    color: "#888",
    marginRight: 4,
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  statItem: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  statText: {
    marginLeft: 4,
  },
  exercisesList: {
    borderTopWidth: 1,
    borderTopColor: "#444",
    paddingTop: 8,
  },
  exercisesText: {
    color: "#999",
    lineHeight: 16,
  },
});
