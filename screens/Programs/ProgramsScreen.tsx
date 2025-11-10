import React from 'react'
import { StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ThemedView } from '@/components/common/ThemedView'
import { useThemeColor } from '@/hooks/useThemeColor'
import { spacing } from '@/constants/Theme'
import { useAppContext } from '@/context/AppContext'

import { ProgramsHeader } from '@/components/programs/ProgramsHeader'
import { ProgramsList } from '@/components/programs/ProgramsList'

export function ProgramsScreen() {
  const backgroundColor = useThemeColor({}, 'background')
  const { selectedProgram, programs } = useAppContext()

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor }}>
      <ThemedView style={styles.container}>
        <ProgramsHeader />
        <ProgramsList
          programs={programs}
          selectedProgramId={selectedProgram?.id}
          style={styles.programsList}
        />
      </ThemedView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: spacing.md,
  },
  programsList: {
    flex: 1,
  },
})

