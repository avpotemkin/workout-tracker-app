import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { useAppTheme } from '@/hooks/useAppTheme';

type WorkoutProgressProps = {
  completed: number;
  total: number;
  percentage: number;
  style?: ViewStyle;
};

export function WorkoutProgress({ 
  completed, 
  total, 
  percentage, 
  style 
}: WorkoutProgressProps) {
  const { colors } = useAppTheme();

  return (
    <View style={[styles.progressContainer, style]}>
      <View style={styles.progressBarBackground}>
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
      <ThemedText style={styles.progressText}>
        {completed} of {total} sets completed ({percentage}%)
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  progressContainer: {
    marginBottom: 16,
  },
  progressBarBackground: {
    height: 8,
    backgroundColor: '#333',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
  },
  progressText: {
    marginTop: 8,
    textAlign: 'center',
    fontSize: 14,
  },
});
