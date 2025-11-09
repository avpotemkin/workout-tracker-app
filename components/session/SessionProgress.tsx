import React from 'react'
import { View, StyleSheet, ViewStyle } from 'react-native'
import { ThemedText } from '@/components/common/ThemedText'
import { useAppTheme } from '@/hooks/useAppTheme'

type SessionProgressProps = {
  completed: number
  total: number
  percentage: number
  style?: ViewStyle
}

export function SessionProgress({
  completed,
  total,
  percentage,
  style,
}: SessionProgressProps) {
  const { colors } = useAppTheme()

  return (
    <View style={[styles.progressContainer, style]}>
      <View
        style={[styles.progressBarBackground, { backgroundColor: colors.card }]}
      >
        <View
          style={[
            styles.progressBarFill,
            {
              width: `${percentage}%`,
              backgroundColor: colors.accent,
            },
          ]}
        />
      </View>
      <ThemedText type='body' style={styles.progressText}>
        {completed} of {total} sets completed ({percentage}%)
      </ThemedText>
    </View>
  )
}

const styles = StyleSheet.create({
  progressContainer: {
    marginBottom: 16,
  },
  progressBarBackground: {
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
  },
  progressText: {
    marginTop: 8,
    textAlign: 'center',
  },
})
