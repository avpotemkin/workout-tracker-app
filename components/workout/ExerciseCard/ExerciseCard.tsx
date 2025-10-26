import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ThemedText } from "@/components/ThemedText";
import { WorkoutExercise, WorkoutSet } from "@/types";
import { SetList } from "./SetList";
import { useAppTheme } from "@/hooks/useAppTheme";
import { useChevronRotation } from "@/animations/chevronRotation";
import Animated from "react-native-reanimated";

type ExerciseCardProps = {
  exercise: WorkoutExercise;
  isExpanded: boolean;
  onToggleExpansion: (exerciseId: string) => void;
  onToggleSetCompletion: (exerciseIndex: number, setIndex: number) => void;
  onUpdateSet: (
    exerciseIndex: number,
    setIndex: number,
    updates: Partial<WorkoutSet>
  ) => void;
  exerciseIndex: number;
};

export function ExerciseCard({
  exercise,
  isExpanded,
  onToggleExpansion,
  onToggleSetCompletion,
  onUpdateSet,
  exerciseIndex,
}: ExerciseCardProps) {
  const { colors } = useAppTheme();
  const rotationStyle = useChevronRotation(isExpanded);
  return (
    <View style={[styles.exerciseCard, { backgroundColor: colors.card }]}>
      <TouchableOpacity
        style={styles.exerciseHeader}
        onPress={() => onToggleExpansion(exercise.id)}
      >
        <ThemedText type="subtitle">{exercise.name}</ThemedText>
        <Animated.View style={rotationStyle}>
          <Ionicons name="chevron-down" size={24} color={colors.text} />
        </Animated.View>
      </TouchableOpacity>

      {isExpanded && (
        <SetList
          exercise={exercise}
          onToggleSetCompletion={onToggleSetCompletion}
          onUpdateSet={onUpdateSet}
          exerciseIndex={exerciseIndex}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  exerciseCard: {
    borderRadius: 10,
    marginBottom: 16,
    overflow: "hidden",
  },
  exerciseHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
  },
});
