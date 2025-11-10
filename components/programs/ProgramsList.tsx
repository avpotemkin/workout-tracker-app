import React from 'react'
import { FlatList, StyleSheet, ViewStyle } from 'react-native'
import { ThemedText } from '@/components/common/ThemedText'
import { ThemedView } from '@/components/common/ThemedView'
import { Program } from '@/types'
import { ProgramCard } from './ProgramCard'

type ProgramsListProps = {
  programs: Program[]
  selectedProgramId: string | undefined
  style?: ViewStyle
}

export function ProgramsList({
  programs,
  selectedProgramId,
  style,
}: ProgramsListProps) {
  const renderProgramItem = ({ item }: { item: Program }) => (
    <ProgramCard program={item} isSelected={selectedProgramId === item.id} />
  )

  const renderEmptyState = () => (
    <ThemedView style={styles.emptyState}>
      <ThemedText type='subtitle' style={styles.emptyText}>
        No programs found
      </ThemedText>
      <ThemedText type='body' style={styles.emptySubtext}>
        Create your first program to get started
      </ThemedText>
    </ThemedView>
  )

  return (
    <FlatList
      data={programs}
      renderItem={renderProgramItem}
      keyExtractor={(item) => item.id}
      style={[styles.list, style]}
      contentContainerStyle={styles.listContent}
      showsVerticalScrollIndicator={false}
      ListEmptyComponent={renderEmptyState}
    />
  )
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
  listContent: {
    paddingBottom: 32,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 32,
  },
  emptyText: {
    textAlign: 'center',
    marginBottom: 8,
  },
  emptySubtext: {
    textAlign: 'center',
    paddingHorizontal: 32,
    opacity: 0.7,
  },
})

