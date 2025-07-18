import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useAppTheme } from '@/hooks/useAppTheme';
import { HistoryStats as HistoryStatsType } from '@/types';

type HistoryStatsProps = {
  stats: HistoryStatsType;
};

export function HistoryStats({ stats }: HistoryStatsProps) {
  const { colors } = useAppTheme();

  const formatDuration = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    if (hours > 0) {
      return `${hours}h ${remainingMinutes}m`;
    }
    return `${remainingMinutes}m`;
  };

  const formatVolume = (volume: number): string => {
    if (volume >= 1000) {
      return `${(volume / 1000).toFixed(1)}k`;
    }
    return volume.toString();
  };

  return (
    <ThemedView style={[styles.container, { backgroundColor: colors.card }]}>
      <ThemedText style={styles.title}>Overview</ThemedText>
      
      <View style={styles.statsGrid}>
        <View style={styles.statItem}>
          <ThemedText style={styles.statValue}>{stats.totalWorkouts}</ThemedText>
          <ThemedText style={styles.statLabel}>Workouts</ThemedText>
        </View>
        
        <View style={styles.statItem}>
          <ThemedText style={styles.statValue}>{formatDuration(stats.totalDuration)}</ThemedText>
          <ThemedText style={styles.statLabel}>Total Time</ThemedText>
        </View>
        
        <View style={styles.statItem}>
          <ThemedText style={styles.statValue}>{formatVolume(stats.totalVolume)}</ThemedText>
          <ThemedText style={styles.statLabel}>Total Volume</ThemedText>
        </View>
        
        <View style={styles.statItem}>
          <ThemedText style={styles.statValue}>{formatDuration(stats.averageWorkoutDuration)}</ThemedText>
          <ThemedText style={styles.statLabel}>Avg Duration</ThemedText>
        </View>
      </View>

      {stats.strongestLifts.length > 0 && (
        <View style={styles.strongestLifts}>
          <ThemedText style={styles.subtitle}>Strongest Lifts</ThemedText>
          {stats.strongestLifts.slice(0, 3).map((lift, index) => (
            <View key={index} style={styles.liftRow}>
              <ThemedText style={styles.exerciseName}>{lift.exercise}</ThemedText>
              <ThemedText style={styles.liftWeight}>{lift.maxWeight}kg</ThemedText>
            </View>
          ))}
        </View>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 10,
    marginVertical: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4A90E2',
  },
  statLabel: {
    fontSize: 12,
    marginTop: 4,
  },
  strongestLifts: {
    borderTopWidth: 1,
    borderTopColor: '#444',
    paddingTop: 12,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  liftRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
  },
  exerciseName: {
    fontSize: 14,
  },
  liftWeight: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4A90E2',
  },
}); 