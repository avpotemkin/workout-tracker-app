import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { WorkoutExercise, WorkoutSet } from '@/types';
import { SetRow } from './SetRow';

type SetListProps = {
  exercise: WorkoutExercise;
  currentExerciseIndex: number;
  currentSetIndex: number;
  onToggleSetCompletion: (exerciseIndex: number, setIndex: number) => void;
  onUpdateSet: (exerciseIndex: number, setIndex: number, updates: Partial<WorkoutSet>) => void;
  exerciseIndex: number;
};

export function SetList({ 
  exercise, 
  currentExerciseIndex, 
  currentSetIndex, 
  onToggleSetCompletion,
  onUpdateSet,
  exerciseIndex
}: SetListProps) {
  return (
    <View style={styles.setsContainer}>
      <View style={styles.setHeaderRow}>
        <ThemedText style={styles.setHeaderText}>Set</ThemedText>
        <ThemedText style={styles.setHeaderText}>Weight</ThemedText>
        <ThemedText style={styles.setHeaderText}>Reps</ThemedText>
        <ThemedText style={styles.setHeaderText}>Done</ThemedText>
      </View>

      {exercise.sets.map((set: WorkoutSet, setIndex: number) => (
        <SetRow
          key={set.id}
          set={set}
          onToggle={() => onToggleSetCompletion(exerciseIndex, setIndex)}
          onUpdateSet={(updates) => onUpdateSet(exerciseIndex, setIndex, updates)}
          isCurrent={
            exerciseIndex === currentExerciseIndex && 
            setIndex === currentSetIndex
          }
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  setsContainer: {
    borderTopWidth: 1,
    borderTopColor: '#444',
  },
  setHeaderRow: {
    flexDirection: 'row',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#444',
  },
  setHeaderText: {
    fontSize: 14,
    fontWeight: '600',
    flex: 1,
    textAlign: 'center',
  },
});
