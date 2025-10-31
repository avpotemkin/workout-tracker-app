import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { useAppTheme } from "@/hooks/useAppTheme";
import { Ionicons } from "@expo/vector-icons";
import { spacing } from "@/constants/Theme";

interface SetsRepsCounterProps {
  sets: number;
  reps: number;
  onSetsChange: (sets: number) => void;
  onRepsChange: (reps: number) => void;
}

export function SetsRepsCounter({
  sets,
  reps,
  onSetsChange,
  onRepsChange,
}: SetsRepsCounterProps) {
  const { colors } = useAppTheme();

  const handleSetsIncrement = () => {
    onSetsChange(sets + 1);
  };

  const handleSetsDecrement = () => {
    if (sets > 1) {
      onSetsChange(sets - 1);
    }
  };

  const handleRepsIncrement = () => {
    onRepsChange(reps + 1);
  };

  const handleRepsDecrement = () => {
    if (reps > 1) {
      onRepsChange(reps - 1);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.counterGroup}>
        <View style={styles.counterContent}>
          <TouchableOpacity
            onPress={handleSetsIncrement}
            style={[styles.button, { backgroundColor: colors.card }]}
          >
            <Ionicons name="chevron-up" size={14} color={colors.text} />
          </TouchableOpacity>
          <View
            style={[styles.valueContainer, { backgroundColor: colors.card }]}
          >
            <ThemedText type="defaultSemiBold">{sets}</ThemedText>
          </View>
          <TouchableOpacity
            onPress={handleSetsDecrement}
            style={[styles.button, { backgroundColor: colors.card }]}
            disabled={sets <= 1}
          >
            <Ionicons
              name="chevron-down"
              size={14}
              color={sets <= 1 ? colors.divider : colors.text}
            />
          </TouchableOpacity>
        </View>
        <ThemedText type="caption" style={styles.label}>
          Sets
        </ThemedText>
      </View>

      <View style={styles.counterGroup}>
        <View style={styles.counterContent}>
          <TouchableOpacity
            onPress={handleRepsIncrement}
            style={[styles.button, { backgroundColor: colors.card }]}
          >
            <Ionicons name="chevron-up" size={14} color={colors.text} />
          </TouchableOpacity>
          <View
            style={[styles.valueContainer, { backgroundColor: colors.card }]}
          >
            <ThemedText type="defaultSemiBold">{reps}</ThemedText>
          </View>
          <TouchableOpacity
            onPress={handleRepsDecrement}
            style={[styles.button, { backgroundColor: colors.card }]}
            disabled={reps <= 1}
          >
            <Ionicons
              name="chevron-down"
              size={14}
              color={reps <= 1 ? colors.divider : colors.text}
            />
          </TouchableOpacity>
        </View>
        <ThemedText type="caption" style={styles.label}>
          Reps
        </ThemedText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  counterGroup: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
  },
  counterContent: {
    flexDirection: "column",
    alignItems: "center",
    gap: 2,
  },
  button: {
    width: 24,
    height: 20,
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  valueContainer: {
    minWidth: 28,
    height: 24,
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: spacing.xs,
  },
  label: {
    opacity: 0.7,
  },
});
