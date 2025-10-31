import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { Platform } from "react-native";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithCredential,
  signInWithPopup,
  signOut,
  type User as FirebaseUser,
} from "firebase/auth";

import { getFirebaseAuth, getGoogleAuthProvider } from "@/services/firebase/app";
import {
  googleAuthClientIds,
  hasGoogleClientIdForPlatform,
} from "@/services/firebase/config";

WebBrowser.maybeCompleteAuthSession();

export interface AuthUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
}

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isAuthenticating: boolean;
  signInWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function mapFirebaseUser(user: FirebaseUser): AuthUser {
  return {
    uid: user.uid,
    email: user.email ?? null,
    displayName: user.displayName ?? null,
    photoURL: user.photoURL ?? null,
  };
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const auth = useMemo(() => getFirebaseAuth(), []);
  const googleProvider = useMemo(() => getGoogleAuthProvider(), []);

  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const isNativePlatform = Platform.OS !== "web";
  const googleConfigured = isNativePlatform
    ? hasGoogleClientIdForPlatform("native")
    : true;

  const [request, , promptAsync] = Google.useAuthRequest({
    expoClientId: googleAuthClientIds.expoClientId,
    iosClientId: googleAuthClientIds.iosClientId,
    androidClientId: googleAuthClientIds.androidClientId,
    webClientId: googleAuthClientIds.webClientId,
    responseType: "id_token",
    scopes: ["openid", "profile", "email"],
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser ? mapFirebaseUser(firebaseUser) : null);
      setIsLoading(false);
    });

    return unsubscribe;
  }, [auth]);

  const signIn = useCallback(async () => {
    if (!googleConfigured) {
      throw new Error(
        "Google authentication is not configured. Please provide client IDs in your Expo environment."
      );
    }

    setIsAuthenticating(true);

    try {
      if (Platform.OS === "web") {
        await signInWithPopup(auth, googleProvider);
        return;
      }

      if (!request) {
        throw new Error("Google authentication request is not ready yet. Please try again.");
      }

      const result = await promptAsync({ useProxy: true });

      if (result.type !== "success") {
        throw new Error(result.type === "dismiss" ? "Google sign-in dismissed" : "Google sign-in cancelled");
      }

      const idToken = result.params?.id_token;
      const accessToken = result.params?.access_token;

      if (!idToken) {
        throw new Error("Google sign-in did not return an ID token.");
      }

      const credential = GoogleAuthProvider.credential(idToken, accessToken);
      await signInWithCredential(auth, credential);
    } catch (error) {
      console.error("Google sign-in failed:", error);
      throw error;
    } finally {
      setIsAuthenticating(false);
    }
  }, [auth, googleConfigured, googleProvider, promptAsync, request]);

  const logout = useCallback(async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error logging out:", error);
      throw error;
    }
  }, [auth]);

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      isLoading,
      isAuthenticating,
      signInWithGoogle: signIn,
      logout,
    }),
    [isAuthenticating, isLoading, logout, signIn, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
