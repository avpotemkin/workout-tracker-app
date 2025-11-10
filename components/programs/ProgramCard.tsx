import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { ThemedText } from '@/components/common/ThemedText'
import { useAppTheme } from '@/hooks/useAppTheme'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { Program } from '@/types'

interface ProgramCardProps {
  program: Program
  isSelected: boolean
}

export function ProgramCard({ program, isSelected }: ProgramCardProps) {
  const { colors } = useAppTheme()
  const router = useRouter()

  return (
    <TouchableOpacity
      style={[
        styles.programCard,
        { backgroundColor: colors.card },
        isSelected && [
          styles.selectedProgramCard,
          { borderColor: colors.success },
        ],
      ]}
      onPress={() => router.push(`/programs/${program.id}`)}
    >
      <View style={styles.programHeader}>
        <ThemedText type='subtitle'>{program.name}</ThemedText>
        {isSelected && (
          <View
            style={[styles.selectedBadge, { backgroundColor: colors.accent }]}
          >
            <Ionicons
              name='checkmark-circle'
              size={16}
              color={colors.background}
            />
            <ThemedText
              type='caption'
              style={[styles.selectedText, { color: colors.background }]}
            >
              Active
            </ThemedText>
          </View>
        )}
      </View>

      <View
        style={[
          styles.exerciseCount,
          { backgroundColor: `${colors.accent}20` },
        ]}
      >
        <ThemedText type='caption' style={{ color: colors.accent }}>
          {program.workouts.length}{' '}
          {program.workouts.length === 1 ? 'workout' : 'workouts'}
        </ThemedText>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  programCard: {
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
  },
  selectedProgramCard: {
    borderWidth: 2,
  },
  programHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  selectedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
    marginLeft: 8,
  },
  selectedText: {
    marginLeft: 4,
  },
  exerciseCount: {
    alignSelf: 'flex-start',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
})
