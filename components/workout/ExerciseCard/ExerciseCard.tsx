import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ThemedText } from "@/components/ThemedText";
import { WorkoutExercise } from "@/types";
import { SetList } from "./SetList";
import { useAppTheme } from "@/hooks/useAppTheme";
import { useChevronRotation } from "@/animations/chevronRotation";
import Animated from "react-native-reanimated";
type ExerciseCardProps = {
  exercise: WorkoutExercise;
  isExpanded: boolean;
  onToggleExpansion: (exerciseId: string) => void;
  currentExerciseIndex: number;
  currentSetIndex: number;
  onToggleSetCompletion: (exerciseIndex: number, setIndex: number) => void;
  exerciseIndex: number;
};

export function ExerciseCard({
  exercise,
  isExpanded,
  onToggleExpansion,
  currentExerciseIndex,
  currentSetIndex,
  onToggleSetCompletion,
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
        <ThemedText style={styles.exerciseName}>{exercise.name}</ThemedText>
        <Animated.View style={rotationStyle}>
          <Ionicons name="chevron-down" size={24} color="white" />
        </Animated.View>
      </TouchableOpacity>

      {isExpanded && (
        <SetList
          exercise={exercise}
          currentExerciseIndex={currentExerciseIndex}
          currentSetIndex={currentSetIndex}
          onToggleSetCompletion={onToggleSetCompletion}
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
  exerciseName: {
    fontSize: 18,
    fontWeight: "600",
  },
});
