import React from "react";
import { View, StyleSheet } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { useAppTheme } from "@/hooks/useAppTheme";

export function HistoryHeader() {
  const { spacing } = useAppTheme();
  
  return (
    <View style={[styles.header, { paddingVertical: spacing.md, marginBottom: spacing.lg }]}>
      <ThemedText type="title">Workout History</ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
