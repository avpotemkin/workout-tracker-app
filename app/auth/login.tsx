import React from "react";
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

import { ThemedText } from "@/components/ThemedText";
import { useAuth } from "@/context/AuthContext";
import { useAppTheme } from "@/hooks/useAppTheme";
import { useThemeColor } from "@/hooks/useThemeColor";
import { spacing, borderRadius } from "@/constants/Theme";
import dumbbellIcon from "@/assets/images/dumbbell-icon.png";

export default function LoginScreen() {
  const { signInWithGoogle, isAuthenticating } = useAuth();
  const { colors } = useAppTheme();
  const backgroundColor = useThemeColor({}, "background");
  const textColor = useThemeColor({}, "text");

  const handleLogin = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("Login failed:", error);
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      <View style={styles.content}>
        <View style={styles.card}>
          <View style={styles.logoContainer}>
            <Image
              source={dumbbellIcon}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>

          <ThemedText type="title" style={styles.title}>
            Sign In
          </ThemedText>
          <ThemedText type="body" style={styles.subtitle}>
            Use your Google account to continue.
          </ThemedText>

          <TouchableOpacity
            style={[
              styles.googleButton,
              {
                backgroundColor: colors.card,
                borderColor: colors.divider,
                opacity: isAuthenticating ? 0.6 : 1,
              },
            ]}
            onPress={handleLogin}
            disabled={isAuthenticating}
            activeOpacity={0.8}
          >
            <View style={styles.googleButtonContent}>
              <Ionicons
                name="logo-google"
                size={20}
                color={textColor}
                style={styles.googleIcon}
              />
              <ThemedText
                type="defaultSemiBold"
                style={[styles.googleButtonLabel, { color: textColor }]}
              >
                {isAuthenticating ? "Signing in..." : "Continue with Google"}
              </ThemedText>
              {isAuthenticating ? (
                <ActivityIndicator
                  color={colors.accent}
                  size="small"
                  style={styles.loadingIndicator}
                />
              ) : (
                <View style={styles.loadingIndicator} />
              )}
            </View>
          </TouchableOpacity>

          <ThemedText type="caption" style={styles.disclaimer}>
            By continuing you agree to our terms of service and privacy policy.
          </ThemedText>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: spacing.md,
  },
  content: {
    flex: 1,
    justifyContent: "center",
  },
  card: {
    width: "100%",
    paddingVertical: spacing.xl,
    alignItems: "center",
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: spacing.lg,
  },
  logo: {
    width: 150,
    height: 150,
  },
  title: {
    textAlign: "center",
    marginBottom: spacing.sm,
  },
  subtitle: {
    textAlign: "center",
    opacity: 0.8,
    marginBottom: spacing.xl,
  },
  googleButton: {
    width: "100%",
    borderRadius: borderRadius.md,
    borderWidth: 1,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.lg,
  },
  googleButtonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  googleIcon: {
    marginRight: spacing.sm,
  },
  googleButtonLabel: {
    flex: 1,
    textAlign: "center",
  },
  loadingIndicator: {
    minWidth: spacing.lg,
  },
  disclaimer: {
    textAlign: "center",
    opacity: 0.6,
  },
});
