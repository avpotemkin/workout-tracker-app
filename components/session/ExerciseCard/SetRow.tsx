import React from 'react'
import { View, TouchableOpacity, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { ThemedText } from '@/components/common/ThemedText'
import { CustomKeyboardInput } from '@/components/common/CustomKeyboardInput'
import { WorkoutSet } from '@/types'
import { useAppTheme } from '@/hooks/useAppTheme'

type SetRowProps = {
  set: WorkoutSet
  onToggle: () => void
  onUpdateSet: (updates: Partial<WorkoutSet>) => void
}

export function SetRow({ set, onToggle, onUpdateSet }: SetRowProps) {
  const { colors } = useAppTheme()

  const handleWeightSubmit = (value: string) => {
    const newWeightValue = parseFloat(value)
    if (!isNaN(newWeightValue) && newWeightValue >= 0) {
      onUpdateSet({
        weight: { value: newWeightValue, unit: set.weight.unit },
      })
    }
  }

  const handleRepsSubmit = (value: string) => {
    const newReps = parseInt(value)
    if (!isNaN(newReps) && newReps > 0) {
      onUpdateSet({ reps: newReps })
    }
  }

  return (
    <View style={[styles.setRow, { borderBottomColor: colors.divider }]}>
      <View style={styles.setNumberContainer}>
        <ThemedText type='defaultSemiBold'>{set.setNumber}</ThemedText>
      </View>

      <View style={styles.weightContainer}>
        <CustomKeyboardInput
          value={set.weight.value.toString()}
          onSubmit={handleWeightSubmit}
          incrementStep={2.5}
          showDecimal={true}
          unit={set.weight.unit}
        />
      </View>

      <View style={styles.repsContainer}>
        <CustomKeyboardInput
          value={set.reps.toString()}
          onSubmit={handleRepsSubmit}
          incrementStep={1}
          showDecimal={false}
          unit="reps"
        />
      </View>

      <TouchableOpacity
        style={[
          styles.checkButton,
          {
            backgroundColor: set.isCompleted ? colors.accent : colors.input,
          },
        ]}
        onPress={onToggle}
      >
        <Ionicons
          name='checkmark'
          size={20}
          color={set.isCompleted ? colors.background : colors.text}
        />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  setRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
  },
  setNumberContainer: {
    width: 30,
    alignItems: 'center',
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
  input: {
    marginRight: 4,
    minWidth: 30,
    textAlign: 'center',
    borderBottomWidth: 1,
    paddingVertical: 2,
  },
  checkButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
})
