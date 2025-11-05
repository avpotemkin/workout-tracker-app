import React, { useState } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  TextInput,
  ScrollView,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemedText } from "@/components/common/ThemedText";
import { useAuth } from "@/context/AuthContext";
import { useAppTheme } from "@/hooks/useAppTheme";
import { useThemeColor } from "@/hooks/useThemeColor";
import { spacing, borderRadius } from "@/constants/Theme";
import { Ionicons } from "@expo/vector-icons";

export default function LoginScreen() {
  const { login } = useAuth();
  const { colors } = useAppTheme();
  const backgroundColor = useThemeColor({}, "background");
  const textColor = useThemeColor({}, "text");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    try {
      await login();
    } catch {
      return;
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.card}>
          <View style={styles.logoContainer}>
            <Image
              source={require("@/assets/images/dumbbell-icon.png")}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>

          <ThemedText type="title" style={styles.title}>
            Sign In
          </ThemedText>

          <View style={styles.inputContainer}>
            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: colors.input,
                  color: textColor,
                  borderColor: colors.divider,
                },
              ]}
              placeholder="Email or username"
              placeholderTextColor={`${textColor}80`}
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
              autoComplete="email"
            />
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: colors.input,
                  color: textColor,
                  borderColor: colors.divider,
                },
              ]}
              placeholder="Password"
              placeholderTextColor={`${textColor}80`}
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              autoCapitalize="none"
              autoComplete="password"
            />
            <TouchableOpacity
              style={styles.eyeIcon}
              onPress={() => setShowPassword(!showPassword)}
            >
              <Ionicons
                name={showPassword ? "eye-off-outline" : "eye-outline"}
                size={20}
                color={textColor}
                style={{ opacity: 0.6 }}
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.forgotPasswordContainer}>
            <ThemedText type="body" style={styles.forgotPasswordText}>
              Forgot{" "}
              <ThemedText
                type="body"
                style={{ color: colors.accent }}
              >
                password
              </ThemedText>{" "}
              or{" "}
              <ThemedText
                type="body"
                style={{ color: colors.accent }}
              >
                username
              </ThemedText>
              ?
            </ThemedText>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, { backgroundColor: colors.accent }]}
            onPress={handleLogin}
          >
            <ThemedText
              type="label"
              style={{ color: colors.background }}
            >
              Continue
            </ThemedText>
          </TouchableOpacity>

          <TouchableOpacity style={styles.supportContainer}>
            <ThemedText type="body" style={styles.supportText}>
              Still can&apos;t sign in?{" "}
              <ThemedText
                type="body"
                style={{ color: colors.accent }}
              >
                Email us
              </ThemedText>
            </ThemedText>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: spacing.md,
  },
  card: {
    width: "100%",
    padding: spacing.xl,
  },
  logoContainer: {
    alignItems: "center",
  },
  logo: {
    width: 150,
    height: 150,
  },
  title: {
    textAlign: "center",
    marginBottom: spacing.xl,
  },
  inputContainer: {
    marginBottom: spacing.md,
    position: "relative",
  },
  input: {
    width: "100%",
    height: 48,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.md,
    borderWidth: 1,
  },
  eyeIcon: {
    position: "absolute",
    right: spacing.md,
    top: 14,
    padding: spacing.xs,
  },
  forgotPasswordContainer: {
    marginBottom: spacing.lg,
  },
  forgotPasswordText: {
    opacity: 0.7,
  },
  button: {
    width: "100%",
    height: 48,
    borderRadius: borderRadius.md,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.lg,
  },
  supportContainer: {
    alignItems: "center",
  },
  supportText: {
    opacity: 0.7,
    textAlign: "center",
  },
});
