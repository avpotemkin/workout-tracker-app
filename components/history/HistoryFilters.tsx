import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useAppTheme } from '@/hooks/useAppTheme';
import { WorkoutHistory } from '@/types';

type HistoryFiltersProps = {
  workoutHistory: WorkoutHistory[];
  onFilterChange: (filteredData: WorkoutHistory[]) => void;
};

export function HistoryFilters({ workoutHistory, onFilterChange }: HistoryFiltersProps) {
  const { colors } = useAppTheme();
  const [selectedProgram, setSelectedProgram] = useState<string | null>(null);
  const [selectedPeriod, setSelectedPeriod] = useState<string>('all');

  const programs = [...new Set(workoutHistory.map(w => w.programName))];

  const periods = [
    { key: 'all', label: 'All Time' },
    { key: 'week', label: 'This Week' },
    { key: 'month', label: 'This Month' },
    { key: '3months', label: 'Last 3 Months' },
  ];

  useEffect(() => {
    applyFilters();
  }, [selectedProgram, selectedPeriod]);

  const applyFilters = () => {
    let filtered = [...workoutHistory];

    if (selectedProgram) {
      filtered = filtered.filter(w => w.programName === selectedProgram);
    }

    if (selectedPeriod !== 'all') {
      const now = new Date();
      const startDate = new Date();

      switch (selectedPeriod) {
        case 'week':
          startDate.setDate(now.getDate() - 7);
          break;
        case 'month':
          startDate.setMonth(now.getMonth() - 1);
          break;
        case '3months':
          startDate.setMonth(now.getMonth() - 3);
          break;
      }

      filtered = filtered.filter(w => w.startedAt >= startDate);
    }

    onFilterChange(filtered);
  };

  const clearFilters = () => {
    setSelectedProgram(null);
    setSelectedPeriod('all');
  };

  const hasActiveFilters = selectedProgram || selectedPeriod !== 'all';

  return (
    <ThemedView style={[styles.container, { backgroundColor: colors.card }]}>
      <View style={styles.header}>
        <ThemedText type="defaultSemiBold">Filters</ThemedText>
        {hasActiveFilters && (
          <TouchableOpacity onPress={clearFilters}>
            <ThemedText type="body" style={[styles.clearButton, { color: colors.info }]}>Clear All</ThemedText>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.filterSection}>
        <ThemedText type="body" style={styles.sectionTitle}>Program</ThemedText>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.filterRow}>
            {programs.map(program => {
              const isSelected = selectedProgram === program;
              return (
                <TouchableOpacity
                  key={program}
                  style={[
                    styles.filterChip,
                    {
                      backgroundColor: isSelected ? colors.info : colors.input,
                      borderColor: isSelected ? colors.info : colors.cardBorder,
                    },
                  ]}
                  onPress={() => setSelectedProgram(
                    selectedProgram === program ? null : program
                  )}
                >
                  <ThemedText
                    type="caption"
                    style={[
                      styles.chipText,
                      { color: colors.text },
                    ]}
                  >
                    {program}
                  </ThemedText>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
      </View>

      <View style={styles.filterSection}>
        <ThemedText type="body" style={styles.sectionTitle}>Period</ThemedText>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.filterRow}>
            {periods.map(period => {
              const isSelected = selectedPeriod === period.key;
              return (
                <TouchableOpacity
                  key={period.key}
                  style={[
                    styles.filterChip,
                    {
                      backgroundColor: isSelected ? colors.info : colors.input,
                      borderColor: isSelected ? colors.info : colors.cardBorder,
                    },
                  ]}
                  onPress={() => setSelectedPeriod(period.key)}
                >
                  <ThemedText
                    type="caption"
                    style={[
                      styles.chipText,
                      { color: colors.text },
                    ]}
                  >
                    {period.label}
                  </ThemedText>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 10,
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  clearButton: {},
  filterSection: {
    marginBottom: 16,
  },
  sectionTitle: {
    marginBottom: 8,
  },
  filterRow: {
    flexDirection: 'row',
    gap: 8,
  },
  filterChip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    borderWidth: 1,
  },
  chipText: {},
}); 