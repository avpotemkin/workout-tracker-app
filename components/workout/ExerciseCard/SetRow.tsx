import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemedText } from '@/components/ThemedText';
import { WorkoutSet } from '@/types';
import { useAppTheme } from '@/hooks/useAppTheme';

type SetRowProps = {
  set: WorkoutSet;
  onToggle: () => void;
  isCurrent: boolean;
};

export function SetRow({ set, onToggle, isCurrent }: SetRowProps) {
  const { colors } = useAppTheme();

  return (
    <View
      style={[
        styles.setRow, 
        isCurrent && styles.currentSetRow
      ]}
    >
      <View style={styles.setNumberContainer}>
        <ThemedText style={styles.setNumber}>{set.setNumber}</ThemedText>
      </View>

      <View style={styles.weightContainer}>
        <ThemedText style={styles.valueText}>{set.weight}</ThemedText>
        <ThemedText style={styles.inputLabel}>kg</ThemedText>
      </View>

      <View style={styles.repsContainer}>
        <ThemedText style={styles.valueText}>{set.reps}</ThemedText>
        <ThemedText style={styles.inputLabel}>reps</ThemedText>
      </View>

      <TouchableOpacity
        style={[
          styles.checkButton,
          set.isCompleted && { backgroundColor: colors.accent },
        ]}
        onPress={onToggle}
      >
        <Ionicons name="checkmark" size={20} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  setRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#444',
  },
  currentSetRow: {
    backgroundColor: '#3a3a3a',
  },
  setNumberContainer: {
    width: 30,
    alignItems: 'center',
  },
  setNumber: {
    fontSize: 16,
    fontWeight: '600',
  },
  weightContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  repsContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  valueText: {
    fontSize: 16,
    fontWeight: '600',
    marginRight: 4,
  },
  inputLabel: {
    fontSize: 14,
  },
  checkButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#555',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
});
