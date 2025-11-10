import React from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { ThemedText } from '@/components/common/ThemedText'
import { useAppTheme } from '@/hooks/useAppTheme'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { spacing } from '@/constants/Theme'

export function ProgramsHeader() {
  const { colors } = useAppTheme()
  const router = useRouter()

  return (
    <View style={styles.header}>
      <ThemedText type='title'>Programs</ThemedText>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => router.push('/programs/create')}
      >
        <Ionicons name='add' size={24} color={colors.text} />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.md,
    marginBottom: spacing.lg,
    position: 'relative',
  },
  addButton: {
    position: 'absolute',
    right: 0,
    padding: 8,
  },
})

