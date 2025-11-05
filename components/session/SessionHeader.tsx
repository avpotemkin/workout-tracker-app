import React from "react";
import { View, TouchableOpacity, StyleSheet, ViewStyle } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ThemedText } from "@/components/common/ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";
import { spacing } from "@/constants/Theme";

type SessionHeaderProps = {
  onBackPress: () => void;
  title: string;
  style?: ViewStyle;
};

export function SessionHeader({
  onBackPress,
  title,
  style,
}: SessionHeaderProps) {
  const textColor = useThemeColor({}, "text");

  return (
    <View style={[styles.header, style]}>
      <TouchableOpacity style={styles.backButton} onPress={onBackPress}>
        <Ionicons name="arrow-back" size={24} color={textColor} />
      </TouchableOpacity>

      <ThemedText type="subtitle" style={styles.workoutTitle}>
        {title}
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: spacing.md,
    marginBottom: spacing.md,
  },
  backButton: {
    marginRight: spacing.md,
  },
  workoutTitle: {
    flex: 1,
    textAlign: "center",
    marginRight: spacing.xl,
  },
});

