import React from 'react';
import { ScrollView, StyleSheet, ViewStyle } from 'react-native';
import { WorkoutExercise } from '@/types';
import { ExerciseCard } from './ExerciseCard/ExerciseCard';

type ExerciseListProps = {
  exercises: WorkoutExercise[];
  expandedExercises: Record<string, boolean>;
  toggleExerciseExpansion: (exerciseId: string) => void;
  toggleSetCompletion: (exerciseIndex: number, setIndex: number) => void;
  currentExerciseIndex: number;
  currentSetIndex: number;
  style?: ViewStyle;
};

export function ExerciseList({
  exercises,
  expandedExercises,
  toggleExerciseExpansion,
  toggleSetCompletion,
  currentExerciseIndex,
  currentSetIndex,
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
          currentExerciseIndex={currentExerciseIndex}
          currentSetIndex={currentSetIndex}
          onToggleSetCompletion={toggleSetCompletion}
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
