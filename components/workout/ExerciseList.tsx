import React from "react";
import { ScrollView, StyleSheet, ViewStyle } from "react-native";
import { WorkoutExercise, WorkoutSet } from "@/types";
import { ExerciseCard } from "./ExerciseCard/ExerciseCard";

type ExerciseListProps = {
  exercises: WorkoutExercise[];
  expandedExercises: Record<string, boolean>;
  toggleExerciseExpansion: (exerciseId: string) => void;
  toggleSetCompletion: (exerciseIndex: number, setIndex: number) => void;
  onUpdateSet: (
    exerciseIndex: number,
    setIndex: number,
    updates: Partial<WorkoutSet>
  ) => void;
  currentExerciseIndex: number;
  currentSetIndex: number;
  style?: ViewStyle;
};

export function ExerciseList({
  exercises,
  expandedExercises,
  toggleExerciseExpansion,
  toggleSetCompletion,
  onUpdateSet,
  style,
}: ExerciseListProps) {
  return (
    <ScrollView style={[styles.exerciseList, style]}>
      {exercises.map((exercise, index) => (
        <ExerciseCard
          key={exercise.id}
          exercise={exercise}
          isExpanded={
            expandedExercises[exercise.id] ||
            Object.keys(expandedExercises).length === 0
          }
          onToggleExpansion={toggleExerciseExpansion}
          onToggleSetCompletion={toggleSetCompletion}
          onUpdateSet={onUpdateSet}
          exerciseIndex={index}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  exerciseList: {
    flex: 1,
  },
});
