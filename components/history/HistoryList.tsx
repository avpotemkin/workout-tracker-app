import React from 'react';
import { FlatList, StyleSheet, ViewStyle } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { WorkoutHistory } from '@/types';
import { HistoryCard } from './HistoryCard';

type HistoryListProps = {
  workoutHistory: WorkoutHistory[];
  onWorkoutPress?: (workout: WorkoutHistory) => void;
  style?: ViewStyle;
};

export function HistoryList({ 
  workoutHistory, 
  onWorkoutPress, 
  style 
}: HistoryListProps) {
  
  const renderWorkoutItem = ({ item }: { item: WorkoutHistory }) => (
    <HistoryCard
      workout={item}
      onPress={() => onWorkoutPress?.(item)}
    />
  );

  const renderEmptyState = () => (
    <ThemedView style={styles.emptyState}>
      <ThemedText style={styles.emptyText}>
        No workout history found
      </ThemedText>
      <ThemedText style={styles.emptySubtext}>
        Complete your first workout to see your history here
      </ThemedText>
    </ThemedView>
  );

  return (
    <FlatList
      data={workoutHistory}
      renderItem={renderWorkoutItem}
      keyExtractor={(item) => item.id}
      style={[styles.list, style]}
      contentContainerStyle={styles.listContent}
      showsVerticalScrollIndicator={false}
      ListEmptyComponent={renderEmptyState}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
  listContent: {
    paddingBottom: 16,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 32,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    textAlign: 'center',
    color: '#888',
    paddingHorizontal: 32,
  },
}); 