import React from 'react';
import { FlatList, StyleSheet, ViewStyle } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useAppTheme } from '@/hooks/useAppTheme';
import { WorkoutHistory } from '@/types';
import { HistoryCard } from './HistoryCard';

type HistoryListProps = {
  workoutHistory: WorkoutHistory[];
  style?: ViewStyle;
};

export function HistoryList({ 
  workoutHistory, 
  style 
}: HistoryListProps) {
  const { colors } = useAppTheme();
  
  const renderWorkoutItem = ({ item }: { item: WorkoutHistory }) => (
    <HistoryCard workout={item} />
  );

  const renderEmptyState = () => (
    <ThemedView style={styles.emptyState}>
      <ThemedText type="subtitle" style={styles.emptyText}>
        No workout history found
      </ThemedText>
      <ThemedText type="body" style={styles.emptySubtext}>
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
    textAlign: 'center',
    marginBottom: 8,
  },
  emptySubtext: {
    textAlign: 'center',
    paddingHorizontal: 32,
    opacity: 0.7,
  },
}); 