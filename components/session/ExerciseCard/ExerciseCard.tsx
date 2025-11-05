import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ThemedText } from "@/components/common/ThemedText";
import { WorkoutExercise, WorkoutSet, WorkoutExerciseId } from "@/types";
import { SetList } from "./SetList";
import { useAppTheme } from "@/hooks/useAppTheme";
import { useChevronRotation } from "@/animations/chevronRotation";
import Animated from "react-native-reanimated";
import { getExerciseNameById } from "@/constants/Exercises";

type ExerciseCardProps = {
  exercise: WorkoutExercise;
  isExpanded: boolean;
  onToggleExpansion: (exerciseId: WorkoutExerciseId) => void;
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
        <ThemedText type="subtitle">
          {getExerciseNameById(exercise.templateId)}
        </ThemedText>
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
