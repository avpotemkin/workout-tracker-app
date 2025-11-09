import React, { useState } from 'react'
import { View, TouchableOpacity, StyleSheet, TextInput } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { ThemedText } from '@/components/common/ThemedText'
import { WorkoutSet } from '@/types'
import { useAppTheme } from '@/hooks/useAppTheme'

type SetRowProps = {
  set: WorkoutSet
  onToggle: () => void
  onUpdateSet: (updates: Partial<WorkoutSet>) => void
}

export function SetRow({ set, onToggle, onUpdateSet }: SetRowProps) {
  const { colors } = useAppTheme()
  const [isEditingWeight, setIsEditingWeight] = useState(false)
  const [isEditingReps, setIsEditingReps] = useState(false)
  const [tempWeight, setTempWeight] = useState(set.weight.value.toString())
  const [tempReps, setTempReps] = useState(set.reps.toString())

  const handleWeightSubmit = () => {
    const newWeightValue = parseFloat(tempWeight)
    if (!isNaN(newWeightValue) && newWeightValue > 0) {
      onUpdateSet({
        weight: { value: newWeightValue, unit: set.weight.unit },
      })
    } else {
      setTempWeight(set.weight.value.toString())
    }
    setIsEditingWeight(false)
  }

  const handleRepsSubmit = () => {
    const newReps = parseInt(tempReps)
    if (!isNaN(newReps) && newReps > 0) {
      onUpdateSet({ reps: newReps })
    } else {
      setTempReps(set.reps.toString())
    }
    setIsEditingReps(false)
  }

  const handleWeightBlur = () => {
    handleWeightSubmit()
  }

  const handleRepsBlur = () => {
    handleRepsSubmit()
  }

  return (
    <View style={[styles.setRow, { borderBottomColor: colors.divider }]}>
      <View style={styles.setNumberContainer}>
        <ThemedText type='defaultSemiBold'>{set.setNumber}</ThemedText>
      </View>

      <TouchableOpacity
        style={styles.weightContainer}
        onPress={() => setIsEditingWeight(true)}
      >
        {isEditingWeight ? (
          <TextInput
            style={[
              styles.input,
              { color: colors.text, borderBottomColor: colors.divider },
            ]}
            value={tempWeight}
            onChangeText={setTempWeight}
            onBlur={handleWeightBlur}
            onSubmitEditing={handleWeightSubmit}
            keyboardType='numeric'
            autoFocus
            selectTextOnFocus
          />
        ) : (
          <ThemedText type='defaultSemiBold'>{set.weight.value}</ThemedText>
        )}
        <ThemedText type='body'>{set.weight.unit}</ThemedText>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.repsContainer}
        onPress={() => setIsEditingReps(true)}
      >
        {isEditingReps ? (
          <TextInput
            style={[
              styles.input,
              { color: colors.text, borderBottomColor: colors.divider },
            ]}
            value={tempReps}
            onChangeText={setTempReps}
            onBlur={handleRepsBlur}
            onSubmitEditing={handleRepsSubmit}
            keyboardType='numeric'
            autoFocus
            selectTextOnFocus
          />
        ) : (
          <ThemedText type='defaultSemiBold'>{set.reps}</ThemedText>
        )}
        <ThemedText type='body'>reps</ThemedText>
      </TouchableOpacity>

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
