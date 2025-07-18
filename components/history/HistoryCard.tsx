import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemedText } from '@/components/ThemedText';
import { useAppTheme } from '@/hooks/useAppTheme';
import { WorkoutHistory } from '@/types';

type HistoryCardProps = {
  workout: WorkoutHistory;
  onPress?: () => void;
};

export function HistoryCard({ workout, onPress }: HistoryCardProps) {
  const { colors } = useAppTheme();

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
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
    <TouchableOpacity 
      style={[styles.card, { backgroundColor: colors.card }]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.cardHeader}>
        <View style={styles.programInfo}>
          <ThemedText style={styles.programName}>{workout.programName}</ThemedText>
          <ThemedText style={styles.dayName}>{workout.dayName}</ThemedText>
        </View>
        <View style={styles.dateContainer}>
          <ThemedText style={styles.date}>{formatDate(workout.startedAt)}</ThemedText>
          <Ionicons name="chevron-forward" size={20} color={colors.text} />
        </View>
      </View>

      <View style={styles.statsRow}>
        <View style={styles.statItem}>
          <Ionicons name="time-outline" size={16} color={colors.text} />
          <ThemedText style={styles.statText}>{formatDuration(workout.duration)}</ThemedText>
        </View>
        
        <View style={styles.statItem}>
          <Ionicons name="fitness-outline" size={16} color={colors.text} />
          <ThemedText style={styles.statText}>{workout.totalSets} sets</ThemedText>
        </View>
        
        <View style={styles.statItem}>
          <Ionicons name="barbell-outline" size={16} color={colors.text} />
          <ThemedText style={styles.statText}>{workout.totalVolume}kg</ThemedText>
        </View>
      </View>

      <View style={styles.exercisesList}>
        <ThemedText style={styles.exercisesText}>
          {workout.exercises.map(ex => ex.name).join(', ')}
        </ThemedText>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  programInfo: {
    flex: 1,
  },
  programName: {
    fontSize: 16,
    fontWeight: '600',
  },
  dayName: {
    fontSize: 14,
    color: '#888',
    marginTop: 2,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  date: {
    fontSize: 12,
    color: '#888',
    marginRight: 4,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  statText: {
    fontSize: 12,
    marginLeft: 4,
  },
  exercisesList: {
    borderTopWidth: 1,
    borderTopColor: '#444',
    paddingTop: 8,
  },
  exercisesText: {
    fontSize: 12,
    color: '#999',
    lineHeight: 16,
  },
}); 