import React from 'react'
import { View, StyleSheet } from 'react-native'
import { ThemedText } from '@/components/common/ThemedText'
import { ThemedView } from '@/components/common/ThemedView'
import { useAppTheme } from '@/hooks/useAppTheme'
import { HistoryStats as HistoryStatsType } from '@/types'

type HistoryStatsProps = {
  stats: HistoryStatsType
}

export function HistoryStats({ stats }: HistoryStatsProps) {
  const { colors } = useAppTheme()

  const formatDuration = (minutes: number): string => {
    const hours = Math.floor(minutes / 60)
    const remainingMinutes = minutes % 60
    if (hours > 0) {
      return `${hours}h ${remainingMinutes}m`
    }
    return `${remainingMinutes}m`
  }

  return (
    <ThemedView style={[styles.container, { backgroundColor: colors.card }]}>
      <ThemedText type='subtitle' style={styles.title}>
        Overview
      </ThemedText>

      <View style={styles.statsGrid}>
        <View style={styles.statItem}>
          <ThemedText type='subtitle' style={{ color: colors.accent }}>
            {stats.totalWorkouts}
          </ThemedText>
          <ThemedText type='caption' style={styles.statLabel}>
            Workouts
          </ThemedText>
        </View>

        <View style={styles.statItem}>
          <ThemedText type='subtitle' style={{ color: colors.accent }}>
            {formatDuration(stats.totalDuration)}
          </ThemedText>
          <ThemedText type='caption' style={styles.statLabel}>
            Total Time
          </ThemedText>
        </View>
      </View>

      {stats.strongestLifts.length > 0 && (
        <View
          style={[styles.strongestLifts, { borderTopColor: colors.divider }]}
        >
          <ThemedText type='label' style={styles.subtitle}>
            Strongest Lifts
          </ThemedText>
          {stats.strongestLifts.slice(0, 3).map((lift, index) => (
            <View key={index} style={styles.liftRow}>
              <ThemedText type='body'>{lift.exerciseName}</ThemedText>
              <ThemedText type='body' style={{ color: colors.accent }}>
                {lift.maxWeight.value}
                {lift.maxWeight.unit}
              </ThemedText>
            </View>
          ))}
        </View>
      )}
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 10,
    marginVertical: 8,
  },
  title: {
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
  statLabel: {
    marginTop: 4,
  },
  strongestLifts: {
    borderTopWidth: 1,
    paddingTop: 12,
  },
  subtitle: {
    marginBottom: 8,
  },
  liftRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
  },
})
