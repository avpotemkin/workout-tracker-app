import React from "react";
import {
  TouchableOpacity,
  StyleSheet,
  TouchableOpacityProps,
} from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { useAppTheme } from "@/hooks/useAppTheme";
import { spacing } from "@/constants/Theme";

interface OutlinedButtonProps extends TouchableOpacityProps {
  children: React.ReactNode;
  onPress: () => void;
}

export function OutlinedButton({
  children,
  onPress,
  style,
  disabled,
  ...props
}: OutlinedButtonProps) {
  const { colors } = useAppTheme();

  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          borderColor: colors.accent,
          opacity: disabled ? 0.5 : 1,
        },
        style,
      ]}
      onPress={onPress}
      disabled={disabled}
      {...props}
    >
      <ThemedText type="defaultSemiBold" style={{ color: colors.accent }}>
        {children}
      </ThemedText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: "100%",
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: 10,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
