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

  // Get unique programs
  const programs = [...new Set(workoutHistory.map(w => w.programName))];

  // Filter periods
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

    // Filter by program
    if (selectedProgram) {
      filtered = filtered.filter(w => w.programName === selectedProgram);
    }

    // Filter by period
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
        <ThemedText style={styles.title}>Filters</ThemedText>
        {hasActiveFilters && (
          <TouchableOpacity onPress={clearFilters}>
            <ThemedText style={styles.clearButton}>Clear All</ThemedText>
          </TouchableOpacity>
        )}
      </View>

      {/* Program Filter */}
      <View style={styles.filterSection}>
        <ThemedText style={styles.sectionTitle}>Program</ThemedText>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.filterRow}>
            {programs.map(program => (
              <TouchableOpacity
                key={program}
                style={[
                  styles.filterChip,
                  selectedProgram === program && styles.selectedChip,
                ]}
                onPress={() => setSelectedProgram(
                  selectedProgram === program ? null : program
                )}
              >
                <ThemedText
                  style={[
                    styles.chipText,
                    selectedProgram === program && styles.selectedChipText,
                  ]}
                >
                  {program}
                </ThemedText>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>

      {/* Period Filter */}
      <View style={styles.filterSection}>
        <ThemedText style={styles.sectionTitle}>Period</ThemedText>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.filterRow}>
            {periods.map(period => (
              <TouchableOpacity
                key={period.key}
                style={[
                  styles.filterChip,
                  selectedPeriod === period.key && styles.selectedChip,
                ]}
                onPress={() => setSelectedPeriod(period.key)}
              >
                <ThemedText
                  style={[
                    styles.chipText,
                    selectedPeriod === period.key && styles.selectedChipText,
                  ]}
                >
                  {period.label}
                </ThemedText>
              </TouchableOpacity>
            ))}
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
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
  clearButton: {
    color: '#4A90E2',
    fontSize: 14,
  },
  filterSection: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
  },
  filterRow: {
    flexDirection: 'row',
    gap: 8,
  },
  filterChip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#333',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#555',
  },
  selectedChip: {
    backgroundColor: '#4A90E2',
    borderColor: '#4A90E2',
  },
  chipText: {
    fontSize: 12,
    color: '#fff',
  },
  selectedChipText: {
    color: '#fff',
    fontWeight: '600',
  },
}); 