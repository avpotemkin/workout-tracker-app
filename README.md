# Workout Tracker App

A **React Native** mobile app built with **Expo** to track weightlifting workouts.  
Users can create workout programs, track sets, reps, and weights during their sessions.

## 🚀 Features
- Create and manage workout programs
- Track live workout sessions (sets, reps, weights)
- View exercise history (planned)

## 🛠️ Tech Stack
- [React Native](https://reactnative.dev/)
- [Expo](https://expo.dev/)
- [TypeScript](https://www.typescriptlang.org/)

## 🔐 Authentication Setup

Google authentication is powered by [Firebase Auth](https://firebase.google.com/docs/auth). Before running the app you need to provide the Firebase project credentials and Google OAuth client IDs as Expo environment variables:

```bash
# firebase
EXPO_PUBLIC_FIREBASE_API_KEY="your-api-key"
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN="your-project.firebaseapp.com"
EXPO_PUBLIC_FIREBASE_PROJECT_ID="your-project-id"
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET="your-project.appspot.com"
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="1234567890"
EXPO_PUBLIC_FIREBASE_APP_ID="1:1234567890:web:abcdef"
# optional
EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID="G-XXXXXXXXXX"

# google oauth client ids
EXPO_PUBLIC_GOOGLE_EXPO_CLIENT_ID="your-expo-go-client-id.apps.googleusercontent.com"
EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID="your-ios-client-id.apps.googleusercontent.com"
EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID="your-android-client-id.apps.googleusercontent.com"
EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID="your-web-client-id.apps.googleusercontent.com"
```

You can store them in a `.env` file and load them with `expo start --dotenv`, or expose them via `app.config.ts`/`app.json`. Make sure the Google sign-in method is enabled in the Firebase console (`Authentication → Sign-in method`).

The Expo Go client uses `EXPO_PUBLIC_GOOGLE_EXPO_CLIENT_ID`, whereas standalone builds should use the platform-specific client IDs. The Firebase config values must match the Web app configuration found in your Firebase project settings.
