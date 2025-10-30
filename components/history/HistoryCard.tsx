import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ThemedText } from "@/components/ThemedText";
import { useAppTheme } from "@/hooks/useAppTheme";
import { WorkoutHistory, WorkoutSet } from "@/types";
import { getExerciseNameById } from "@/constants/Exercises";
import { useChevronRotation } from "@/animations/chevronRotation";
import Animated from "react-native-reanimated";

type HistoryCardProps = {
  workout: WorkoutHistory;
};

export function HistoryCard({ workout }: HistoryCardProps) {
  const { colors } = useAppTheme();
  const [isExpanded, setIsExpanded] = useState(false);
  const rotationStyle = useChevronRotation(isExpanded);

  const formatDuration = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    if (hours > 0) {
      return `${hours}h ${remainingMinutes}m`;
    }
    return `${remainingMinutes}m`;
  };

  const formatWeight = (weight: { value: number; unit: string }): string => {
    return `${weight.value} ${weight.unit}`;
  };

  return (
    <View style={[styles.card, { backgroundColor: colors.card }]}>
      <TouchableOpacity
        onPress={() => setIsExpanded(!isExpanded)}
        activeOpacity={0.7}
      >
        <View style={styles.cardHeader}>
          <View style={styles.programInfo}>
            <ThemedText type="defaultSemiBold">
              {workout.programName}
            </ThemedText>
            <ThemedText type="default" style={{ color: colors.text }}>
              {workout.workoutName}
            </ThemedText>
          </View>
          <Animated.View style={rotationStyle}>
            <Ionicons name="chevron-down" size={20} color={colors.text} />
          </Animated.View>
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

        <View style={[styles.exercisesList, { borderTopColor: colors.divider }]}>
          <ThemedText type="caption" style={[styles.exercisesText, { opacity: 0.7 }]}>
            {workout.exercises
              .map((ex) => getExerciseNameById(ex.templateId))
              .join(", ")}
          </ThemedText>
        </View>
      </TouchableOpacity>

      {isExpanded && (
        <View style={[styles.expandedContent, { borderTopColor: colors.divider }]}>
          {workout.exercises.map((exercise) => (
            <View key={exercise.id} style={styles.exerciseSection}>
              <ThemedText type="defaultSemiBold" style={styles.exerciseName}>
                {getExerciseNameById(exercise.templateId)}
              </ThemedText>
              <View style={styles.setsContainer}>
                {exercise.sets
                  .filter((set) => set.isCompleted)
                  .map((set: WorkoutSet) => (
                    <View key={set.id} style={[styles.setRow, { borderBottomColor: colors.divider }]}>
                      <ThemedText type="body" style={styles.setNumber}>
                        Set {set.setNumber}
                      </ThemedText>
                      <ThemedText type="body" style={styles.setWeight}>
                        {formatWeight(set.weight)}
                      </ThemedText>
                      <ThemedText type="body" style={styles.setReps}>
                        {set.reps} reps
                      </ThemedText>
                    </View>
                  ))}
              </View>
            </View>
          ))}
        </View>
      )}
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
    paddingTop: 8,
  },
  exercisesText: {
    lineHeight: 16,
  },
  expandedContent: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
  },
  exerciseSection: {
    marginBottom: 16,
  },
  exerciseName: {
    marginBottom: 8,
  },
  setsContainer: {
    paddingLeft: 8,
  },
  setRow: {
    flexDirection: "row",
    paddingVertical: 6,
    borderBottomWidth: 1,
  },
  setNumber: {
    flex: 1,
  },
  setWeight: {
    flex: 1,
    textAlign: "center",
  },
  setReps: {
    flex: 1,
    textAlign: "right",
  },
});
