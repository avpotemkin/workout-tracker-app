import { Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  initializeApp,
  getApp,
  getApps,
  type FirebaseApp,
} from "firebase/app";
import {
  getAuth,
  initializeAuth,
  getReactNativePersistence,
  GoogleAuthProvider,
  type Auth,
} from "firebase/auth";

import { firebaseOptions } from "./config";

let firebaseApp: FirebaseApp | undefined;
let firebaseAuth: Auth | undefined;
let googleProvider: GoogleAuthProvider | undefined;

export function getFirebaseApp(): FirebaseApp {
  if (firebaseApp) {
    return firebaseApp;
  }

  firebaseApp = getApps().length === 0 ? initializeApp(firebaseOptions) : getApp();

  return firebaseApp;
}

export function getFirebaseAuth(): Auth {
  if (firebaseAuth) {
    return firebaseAuth;
  }

  const app = getFirebaseApp();

  if (Platform.OS === "web") {
    firebaseAuth = getAuth(app);
  } else {
    firebaseAuth = initializeAuth(app, {
      persistence: getReactNativePersistence(AsyncStorage),
    });
  }

  if (typeof firebaseAuth.useDeviceLanguage === "function") {
    firebaseAuth.useDeviceLanguage();
  }

  return firebaseAuth;
}

export function getGoogleAuthProvider(): GoogleAuthProvider {
  if (googleProvider) {
    return googleProvider;
  }

  googleProvider = new GoogleAuthProvider();
  googleProvider.addScope("profile");
  googleProvider.addScope("email");
  googleProvider.setCustomParameters({ prompt: "select_account" });

  return googleProvider;
}

