import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemedText } from '@/components/ThemedText';
import { useAppTheme } from '@/hooks/useAppTheme';

type HistoryHeaderProps = {
  onToggleFilters: () => void;
  showFilters: boolean;
};

export function HistoryHeader({ onToggleFilters, showFilters }: HistoryHeaderProps) {
  const { colors } = useAppTheme();

  return (
    <View style={styles.header}>
      <ThemedText type="title">Workout History</ThemedText>
      <TouchableOpacity
        style={[styles.filterButton, { backgroundColor: colors.card }]}
        onPress={onToggleFilters}
      >
        <Ionicons 
          name={showFilters ? "filter" : "filter-outline"} 
          size={24} 
          color={colors.text} 
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#444',
  },
  filterButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
}); 