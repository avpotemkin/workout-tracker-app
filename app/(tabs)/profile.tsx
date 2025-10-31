import React, { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { OutlinedButton } from "@/components/OutlinedButton";
import { useAuth } from "@/context/AuthContext";
import { useAppTheme } from "@/hooks/useAppTheme";
import { useThemeColor } from "@/hooks/useThemeColor";
import { spacing, borderRadius } from "@/constants/Theme";

export default function ProfileScreen() {
  const { logout, user } = useAuth();
  const { colors } = useAppTheme();
  const backgroundColor = useThemeColor({}, "background");
  const [isSigningOut, setIsSigningOut] = useState(false);

  const handleLogout = async () => {
    try {
      setIsSigningOut(true);
      await logout();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("Logout failed:", error);
    } finally {
      setIsSigningOut(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor }}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <ThemedView style={styles.container}>
          <View style={styles.header}>
            <ThemedText type="title">Profile</ThemedText>
          </View>

          <View style={styles.section}>
            <View style={[styles.card, { backgroundColor: colors.card }]}>
              <ThemedText type="body" style={styles.cardLabel}>
                Name
              </ThemedText>
              <ThemedText type="defaultSemiBold">
                {user?.displayName ?? "Not available"}
              </ThemedText>
            </View>

            <View style={[styles.card, { backgroundColor: colors.card }]}>
              <ThemedText type="body" style={styles.cardLabel}>
                Email
              </ThemedText>
              <ThemedText type="defaultSemiBold">
                {user?.email ?? "Not available"}
              </ThemedText>
            </View>

            <View style={[styles.card, { backgroundColor: colors.card }]}>
              <ThemedText type="body" style={styles.cardLabel}>
                User ID
              </ThemedText>
              <ThemedText type="defaultSemiBold">
                {user?.uid ?? "Not available"}
              </ThemedText>
            </View>
          </View>

          <View style={styles.section}>
            <OutlinedButton onPress={handleLogout} disabled={isSigningOut}>
              {isSigningOut ? "Signing Out..." : "Sign Out"}
            </OutlinedButton>
          </View>
        </ThemedView>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: spacing.xxl,
  },
  container: {
    flex: 1,
    paddingHorizontal: spacing.md,
  },
  header: {
    paddingVertical: spacing.md,
    marginBottom: spacing.lg,
  },
  section: {
    marginBottom: spacing.lg,
  },
  card: {
    padding: spacing.md,
    borderRadius: borderRadius.md,
    marginBottom: spacing.md,
  },
  cardLabel: {
    opacity: 0.7,
    marginBottom: spacing.sm,
  },
});
