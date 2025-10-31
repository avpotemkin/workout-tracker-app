import type { FirebaseOptions } from "firebase/app";

type EnvKey =
  | "EXPO_PUBLIC_FIREBASE_API_KEY"
  | "EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN"
  | "EXPO_PUBLIC_FIREBASE_PROJECT_ID"
  | "EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET"
  | "EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID"
  | "EXPO_PUBLIC_FIREBASE_APP_ID"
  | "EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID"
  | "EXPO_PUBLIC_GOOGLE_EXPO_CLIENT_ID"
  | "EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID"
  | "EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID"
  | "EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID";

function readEnv(key: EnvKey, { required }: { required: boolean }): string | undefined {
  const value = process.env[key];

  if (required && !value) {
    throw new Error(
      `Missing environment variable "${key}". Update your Expo config (app.config.ts/app.json) or .env to include this value.`
    );
  }

  return value;
}

export const firebaseOptions: FirebaseOptions = {
  apiKey: readEnv("EXPO_PUBLIC_FIREBASE_API_KEY", { required: true })!,
  authDomain: readEnv("EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN", { required: true })!,
  projectId: readEnv("EXPO_PUBLIC_FIREBASE_PROJECT_ID", { required: true })!,
  storageBucket: readEnv("EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET", { required: true })!,
  messagingSenderId: readEnv("EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID", { required: true })!,
  appId: readEnv("EXPO_PUBLIC_FIREBASE_APP_ID", { required: true })!,
  measurementId: readEnv("EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID", { required: false }),
};

export interface GoogleAuthClientIds {
  expoClientId?: string;
  iosClientId?: string;
  androidClientId?: string;
  webClientId?: string;
}

export const googleAuthClientIds: GoogleAuthClientIds = {
  expoClientId: readEnv("EXPO_PUBLIC_GOOGLE_EXPO_CLIENT_ID", { required: false }),
  iosClientId: readEnv("EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID", { required: false }),
  androidClientId: readEnv("EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID", { required: false }),
  webClientId: readEnv("EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID", { required: false }),
};

export function hasGoogleClientIdForPlatform(platform: "ios" | "android" | "web" | "native") {
  if (platform === "web") {
    return Boolean(googleAuthClientIds.webClientId);
  }

  if (platform === "native" || platform === "ios" || platform === "android") {
    return Boolean(
      googleAuthClientIds.expoClientId ||
        (platform !== "native" && platform === "ios" && googleAuthClientIds.iosClientId) ||
        (platform !== "native" && platform === "android" && googleAuthClientIds.androidClientId)
    );
  }

  return false;
}

