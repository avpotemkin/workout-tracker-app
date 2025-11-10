---
name: 'TypeScript React Native Expo Development Guide'
description: 'A comprehensive development guide for building cross-platform mobile and web applications using TypeScript, React Native, Expo, Tamagui, Supabase, and modern development tools'
category: 'Cross-Platform Framework'
author: 'Agents.md Collection'
authorUrl: 'https://github.com/gakeez/agents_md_collection'
tags:
  [
    'typescript',
    'react-native',
    'expo',
    'tamagui',
    'supabase',
    'cross-platform',
    'mobile-development',
    'monorepo',
  ]
lastUpdated: '2025-06-16'
---

# TypeScript React Native Expo Development Guide

## Project Overview

This comprehensive guide outlines best practices for developing cross-platform mobile and web applications using TypeScript, React Native, Expo, Tamagui for UI, Supabase for backend services, and modern development tools. The guide emphasizes functional programming patterns, cross-platform compatibility, and scalable monorepo architecture with proper state management and internationalization.

## Tech Stack

- **Framework**: React Native with Expo SDK 50+
- **Language**: TypeScript 5.0+
- **UI Library**: Tamagui for cross-platform components
- **Navigation**: Solito (unified navigation for web/mobile)
- **State Management**: Zustand for global state
- **Data Fetching**: TanStack React Query
- **Backend**: Supabase (Auth, Database, Storage)
- **Validation**: Zod for schema validation
- **Payments**: Stripe with subscription model
- **Internationalization**: i18next, react-i18next, expo-localization
- **Monorepo**: Turbo for workspace management
- **Testing**: Jest, React Native Testing Library

## Development Environment Setup

### Installation Requirements

- Node.js 18+
- Expo CLI
- EAS CLI for builds
- iOS Simulator (macOS) / Android Studio
- VS Code with TypeScript extensions

### Installation Steps

```bash
# Install global tools
npm install -g @expo/cli eas-cli

# Create new Expo project with TypeScript
npx create-expo-app --template

# Install core dependencies
npx expo install expo-router expo-constants expo-linking
npm install @tamagui/core @tamagui/config @tamagui/animations-react-native
npm install @supabase/supabase-js
npm install zustand @tanstack/react-query
npm install zod
npm install solito
npm install i18next react-i18next expo-localization

# Development dependencies
npm install -D typescript @types/react @types/react-native
npm install -D turbo
```

## Project Structure

```
expo-app/
├── apps/                           # Applications
│   ├── expo/                      # React Native app
│   │   ├── app/                   # App Router (Expo Router)
│   │   │   ├── (tabs)/
│   │   │   ├── auth/
│   │   │   ├── _layout.tsx
│   │   │   └── index.tsx
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── utils/
│   │   └── app.json
│   └── next/                      # Next.js web app
│       ├── pages/
│       ├── components/
│       └── next.config.js
├── packages/                       # Shared packages
│   ├── ui/                        # Tamagui components
│   │   ├── src/
│   │   │   ├── components/
│   │   │   ├── themes/
│   │   │   └── index.ts
│   │   └── package.json
│   ├── api/                       # Supabase client
│   │   ├── src/
│   │   │   ├── client.ts
│   │   │   ├── auth.ts
│   │   │   └── types.ts
│   │   └── package.json
│   ├── store/                     # Zustand stores
│   │   ├── src/
│   │   │   ├── auth-store.ts
│   │   │   ├── user-store.ts
│   │   │   └── index.ts
│   │   └── package.json
│   └── config/                    # Shared configuration
│       ├── src/
│       │   ├── env.ts
│       │   └── constants.ts
│       └── package.json
├── turbo.json                     # Turbo configuration
├── package.json                   # Root package.json
└── tsconfig.json                  # TypeScript configuration
```

### Component Organization

Components should be organized by feature and responsibility to maintain clear separation of concerns:

```
components/
├── common/                        # Generic reusable components
│   ├── ThemedText.tsx            # Themed text component
│   ├── ThemedView.tsx            # Themed view component
│   ├── OutlinedButton.tsx        # Button component
│   └── index.ts                  # Barrel exports
├── session/                       # Active workout session components
│   ├── SessionHeader.tsx         # Session screen header
│   ├── SessionProgress.tsx       # Progress indicator
│   ├── ExerciseList.tsx          # List of exercises
│   ├── ExerciseCard/             # Exercise card components
│   │   ├── ExerciseCard.tsx      # Main card component
│   │   ├── SetList.tsx           # List of sets
│   │   └── SetRow.tsx            # Individual set row
│   └── index.ts                  # Barrel exports
├── programs/                      # Program building/editing components
│   ├── EditWorkoutModal.tsx      # Modal for editing workouts
│   ├── AddExerciseModal.tsx      # Modal for adding exercises
│   ├── SetsRepsCounter.tsx       # Sets/reps counter control
│   ├── WorkoutSelectionModal.tsx # Workout selection modal
│   ├── WorkoutSplitPicker.tsx    # Workout split picker
│   └── index.ts                  # Barrel exports
├── history/                       # Workout history components
│   ├── HistoryCard.tsx           # History entry card
│   ├── HistoryFilters.tsx        # History filters
│   ├── HistoryHeader.tsx         # History screen header
│   ├── HistoryList.tsx           # History list
│   ├── HistoryStats.tsx          # Statistics display
│   └── index.ts                  # Barrel exports
└── ui/                           # Low-level UI primitives
    ├── IconSymbol.tsx            # Icon symbol component
    └── TabBarBackground.tsx      # Tab bar background
```

**Organization Principles:**

- **common/**: Shared, generic components used across multiple features
- **session/**: Components specific to active workout session execution
- **programs/**: Components for creating and editing workout programs
- **history/**: Components for displaying workout history and statistics
- **ui/**: Lowest-level UI primitives and platform-specific implementations
- Each feature folder includes an `index.ts` for clean barrel exports

## Screen Component Architecture Pattern

All main feature screens should follow a consistent modular pattern that separates routing concerns from screen logic and breaks down the UI into composable components.

### Architecture Layers

1. **Router File** (`app/(tabs)/feature.tsx`) - Minimal wrapper that imports and renders the screen component
2. **Screen Component** (`screens/Feature/FeatureScreen.tsx`) - Main orchestration component that handles state, data fetching, and composition
3. **Feature Components** (`components/feature/`) - Reusable UI components specific to the feature

### Pattern Structure

```
app/(tabs)/
├── history.tsx              # Router file (6-7 lines)
└── programs.tsx             # Router file (6-7 lines)

screens/
├── History/
│   └── HistoryScreen.tsx    # Main screen logic
└── Programs/
    └── ProgramsScreen.tsx   # Main screen logic

components/
├── history/
│   ├── HistoryHeader.tsx    # Header component
│   ├── HistoryList.tsx      # List component
│   ├── HistoryCard.tsx      # Card component
│   ├── HistoryStats.tsx     # Stats component
│   └── index.ts             # Barrel exports
└── programs/
    ├── ProgramsHeader.tsx   # Header component
    ├── ProgramsList.tsx     # List component
    ├── ProgramCard.tsx      # Card component
    └── index.ts             # Barrel exports
```

### Implementation Example

#### 1. Router File (Minimal)

```typescript
// app/(tabs)/programs.tsx
import React from 'react'
import { ProgramsScreen } from '@/screens/Programs/ProgramsScreen'

export default function ProgramsTab() {
  return <ProgramsScreen />
}
```

**Key Points:**

- Should be 6-7 lines maximum
- Only imports and renders the screen component
- No logic, styling, or state management
- Uses named export for the screen component

#### 2. Screen Component (Orchestration)

```typescript
// screens/Programs/ProgramsScreen.tsx
import React from 'react'
import { StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ThemedView } from '@/components/common/ThemedView'
import { useThemeColor } from '@/hooks/useThemeColor'
import { spacing } from '@/constants/Theme'
import { useAppContext } from '@/context/AppContext'

import { ProgramsHeader } from '@/components/programs/ProgramsHeader'
import { ProgramsList } from '@/components/programs/ProgramsList'

export function ProgramsScreen() {
  const backgroundColor = useThemeColor({}, 'background')
  const { selectedProgram, programs } = useAppContext()

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor }}>
      <ThemedView style={styles.container}>
        <ProgramsHeader />
        <ProgramsList
          programs={programs}
          selectedProgramId={selectedProgram?.id}
          style={styles.programsList}
        />
      </ThemedView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: spacing.md,
  },
  programsList: {
    flex: 1,
  },
})
```

**Key Points:**

- Handles data fetching and state management
- Composes feature-specific components
- Manages screen-level layout and styling
- Handles loading and error states
- Uses SafeAreaView for proper screen boundaries

#### 3. Header Component

```typescript
// components/programs/ProgramsHeader.tsx
import React from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { ThemedText } from '@/components/common/ThemedText'
import { useAppTheme } from '@/hooks/useAppTheme'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { spacing } from '@/constants/Theme'

export function ProgramsHeader() {
  const { colors } = useAppTheme()
  const router = useRouter()

  return (
    <View style={styles.header}>
      <ThemedText type='title'>Programs</ThemedText>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => router.push('/programs/create')}
      >
        <Ionicons name='add' size={24} color={colors.text} />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.md,
    marginBottom: spacing.lg,
    position: 'relative',
  },
  addButton: {
    position: 'absolute',
    right: 0,
    padding: 8,
  },
})
```

**Key Points:**

- Self-contained with its own logic and styling
- Handles its own navigation/actions
- Follows spacing constants
- Uses theme colors

#### 4. List Component

```typescript
// components/programs/ProgramsList.tsx
import React from 'react'
import { FlatList, StyleSheet, ViewStyle } from 'react-native'
import { ThemedText } from '@/components/common/ThemedText'
import { ThemedView } from '@/components/common/ThemedView'
import { Program } from '@/types'
import { ProgramCard } from './ProgramCard'

type ProgramsListProps = {
  programs: Program[]
  selectedProgramId: string | undefined
  style?: ViewStyle
}

export function ProgramsList({
  programs,
  selectedProgramId,
  style,
}: ProgramsListProps) {
  const renderProgramItem = ({ item }: { item: Program }) => (
    <ProgramCard program={item} isSelected={selectedProgramId === item.id} />
  )

  const renderEmptyState = () => (
    <ThemedView style={styles.emptyState}>
      <ThemedText type='subtitle' style={styles.emptyText}>
        No programs found
      </ThemedText>
      <ThemedText type='body' style={styles.emptySubtext}>
        Create your first program to get started
      </ThemedText>
    </ThemedView>
  )

  return (
    <FlatList
      data={programs}
      renderItem={renderProgramItem}
      keyExtractor={(item) => item.id}
      style={[styles.list, style]}
      contentContainerStyle={styles.listContent}
      showsVerticalScrollIndicator={false}
      ListEmptyComponent={renderEmptyState}
    />
  )
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
  listContent: {
    paddingBottom: 32,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 32,
  },
  emptyText: {
    textAlign: 'center',
    marginBottom: 8,
  },
  emptySubtext: {
    textAlign: 'center',
    paddingHorizontal: 32,
    opacity: 0.7,
  },
})
```

**Key Points:**

- Accepts data via props
- Renders child components (ProgramCard)
- Handles empty states
- Manages list-specific styling

#### 5. Card Component

```typescript
// components/programs/ProgramCard.tsx
import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { ThemedText } from '@/components/common/ThemedText'
import { useAppTheme } from '@/hooks/useAppTheme'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { Program } from '@/types'

interface ProgramCardProps {
  program: Program
  isSelected: boolean
}

export function ProgramCard({ program, isSelected }: ProgramCardProps) {
  const { colors } = useAppTheme()
  const router = useRouter()

  return (
    <TouchableOpacity
      style={[
        styles.programCard,
        { backgroundColor: colors.card },
        isSelected && [
          styles.selectedProgramCard,
          { borderColor: colors.success },
        ],
      ]}
      onPress={() => router.push(`/programs/${program.id}`)}
    >
      <View style={styles.programHeader}>
        <ThemedText type='subtitle'>{program.name}</ThemedText>
        {isSelected && (
          <View
            style={[styles.selectedBadge, { backgroundColor: colors.accent }]}
          >
            <Ionicons
              name='checkmark-circle'
              size={16}
              color={colors.background}
            />
            <ThemedText
              type='caption'
              style={[styles.selectedText, { color: colors.background }]}
            >
              Active
            </ThemedText>
          </View>
        )}
      </View>

      <View
        style={[
          styles.exerciseCount,
          { backgroundColor: `${colors.accent}20` },
        ]}
      >
        <ThemedText type='caption' style={{ color: colors.accent }}>
          {program.workouts.length}{' '}
          {program.workouts.length === 1 ? 'workout' : 'workouts'}
        </ThemedText>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  programCard: {
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
  },
  selectedProgramCard: {
    borderWidth: 2,
  },
  programHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  selectedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
    marginLeft: 8,
  },
  selectedText: {
    marginLeft: 4,
  },
  exerciseCount: {
    alignSelf: 'flex-start',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
})
```

**Key Points:**

- Accepts specific props with TypeScript interfaces
- Self-contained with own logic and styling
- Handles item-level interactions
- Reusable across different contexts

#### 6. Barrel Export

```typescript
// components/programs/index.ts
export { ProgramsHeader } from './ProgramsHeader'
export { ProgramCard } from './ProgramCard'
export { ProgramsList } from './ProgramsList'
export { EditWorkoutModal } from './EditWorkoutModal'
export { AddExerciseModal } from './AddExerciseModal'
// ... other exports
```

### Benefits of This Pattern

1. **Separation of Concerns**: Routing, logic, and UI are cleanly separated
2. **Reusability**: Components can be reused in different contexts
3. **Testability**: Each component can be tested in isolation
4. **Maintainability**: Changes to one component don't affect others
5. **Readability**: Clear structure makes it easy to understand the screen
6. **Consistency**: All screens follow the same pattern

### When to Apply This Pattern

- **Always** for main tab screens (Programs, History, Profile, etc.)
- **Consider** for complex subscreens with multiple components
- **Skip** for simple screens with minimal UI (single form, basic settings)

### Anti-Patterns to Avoid

- ❌ Putting all logic in the router file
- ❌ Creating massive screen components with inline render functions
- ❌ Mixing component logic across multiple files without clear boundaries
- ❌ Duplicating components instead of making them reusable
- ❌ Skipping barrel exports for feature components

## Core Development Principles

### Code Style and Structure

```typescript
// Use functional and declarative programming patterns
// Prefer interfaces over types for object shapes
interface UserProfile {
  id: string
  email: string
  name: string
  avatarUrl?: string
  createdAt: Date
  updatedAt: Date
}

// Use descriptive variable names with auxiliary verbs
interface AuthState {
  isLoading: boolean
  hasError: boolean
  isAuthenticated: boolean
  user: UserProfile | null
}

// Use function keyword for pure functions
function formatUserDisplayName(user: UserProfile): string {
  return user.name || user.email.split('@')[0]
}

// Favor named exports
export { UserProfile, AuthState, formatUserDisplayName }
```

### TypeScript and Zod Integration

```typescript
// packages/api/src/types.ts
import { z } from 'zod'

// Zod schemas for validation and type inference
export const UserProfileSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  name: z.string().min(1).max(100),
  avatarUrl: z.string().url().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export const CreateUserSchema = z.object({
  email: z.string().email(),
  name: z.string().min(2).max(100),
  password: z.string().min(8),
})

export const UpdateUserSchema = CreateUserSchema.partial().omit({
  password: true,
})

// Type inference from Zod schemas
export type UserProfile = z.infer<typeof UserProfileSchema>
export type CreateUserRequest = z.infer<typeof CreateUserSchema>
export type UpdateUserRequest = z.infer<typeof UpdateUserSchema>

// Avoid enums; use literal types instead
export const UserRole = {
  ADMIN: 'admin',
  USER: 'user',
  MODERATOR: 'moderator',
} as const

export type UserRoleType = (typeof UserRole)[keyof typeof UserRole]
```

### Tamagui UI Components

```typescript
// packages/ui/src/components/Button.tsx
import { Button as TamaguiButton, ButtonProps, styled } from "@tamagui/core";
import { forwardRef } from "react";

interface CustomButtonProps extends ButtonProps {
  variant?: "primary" | "secondary" | "outline";
  size?: "small" | "medium" | "large";
  isLoading?: boolean;
}

const StyledButton = styled(TamaguiButton, {
  borderRadius: "$4",
  fontWeight: "600",

  variants: {
    variant: {
      primary: {
        backgroundColor: "$blue10",
        color: "$white",
        hoverStyle: { backgroundColor: "$blue11" },
      },
      secondary: {
        backgroundColor: "$gray4",
        color: "$gray12",
        hoverStyle: { backgroundColor: "$gray5" },
      },
      outline: {
        backgroundColor: "transparent",
        borderWidth: 1,
        borderColor: "$blue10",
        color: "$blue10",
        hoverStyle: { backgroundColor: "$blue2" },
      },
    },
    size: {
      small: {
        height: "$3",
        paddingHorizontal: "$3",
        fontSize: "$3",
      },
      medium: {
        height: "$4",
        paddingHorizontal: "$4",
        fontSize: "$4",
      },
      large: {
        height: "$5",
        paddingHorizontal: "$5",
        fontSize: "$5",
      },
    },
  },

  defaultVariants: {
    variant: "primary",
    size: "medium",
  },
});

export const Button = forwardRef<typeof TamaguiButton, CustomButtonProps>(
  ({ children, isLoading, disabled, ...props }, ref) => {
    return (
      <StyledButton
        ref={ref}
        disabled={disabled || isLoading}
        opacity={isLoading ? 0.7 : 1}
        {...props}
      >
        {isLoading ? "Loading..." : children}
      </StyledButton>
    );
  }
);

Button.displayName = "Button";
```

### Cross-Platform Screen Component

```typescript
// packages/ui/src/components/Screen.tsx
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, YStack, YStackProps } from "@tamagui/core";
import { ReactNode } from "react";

interface ScreenProps extends YStackProps {
  children: ReactNode;
  scrollable?: boolean;
  safeArea?: boolean;
}

export function Screen({
  children,
  scrollable = false,
  safeArea = true,
  ...props
}: ScreenProps) {
  const content = (
    <YStack flex={1} backgroundColor="$background" {...props}>
      {scrollable ? (
        <ScrollView showsVerticalScrollIndicator={false}>
          <YStack padding="$4">{children}</YStack>
        </ScrollView>
      ) : (
        <YStack flex={1} padding="$4">
          {children}
        </YStack>
      )}
    </YStack>
  );

  if (safeArea) {
    return <SafeAreaView style={{ flex: 1 }}>{content}</SafeAreaView>;
  }

  return content;
}
```

## State Management and Data Fetching

### Zustand Store Implementation

```typescript
// packages/store/src/auth-store.ts
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { UserProfile } from '@repo/api'

interface AuthState {
  user: UserProfile | null
  isLoading: boolean
  hasError: boolean
  isAuthenticated: boolean
}

interface AuthActions {
  setUser: (user: UserProfile | null) => void
  setLoading: (loading: boolean) => void
  setError: (error: boolean) => void
  signOut: () => void
  reset: () => void
}

type AuthStore = AuthState & AuthActions

const initialState: AuthState = {
  user: null,
  isLoading: false,
  hasError: false,
  isAuthenticated: false,
}

export const useAuthStore = create<AuthStore>()(
  devtools(
    persist(
      (set, get) => ({
        ...initialState,

        setUser: (user) =>
          set(
            { user, isAuthenticated: !!user, hasError: false },
            false,
            'auth/setUser'
          ),

        setLoading: (isLoading) => set({ isLoading }, false, 'auth/setLoading'),

        setError: (hasError) =>
          set({ hasError, isLoading: false }, false, 'auth/setError'),

        signOut: () => set({ ...initialState }, false, 'auth/signOut'),

        reset: () => set({ ...initialState }, false, 'auth/reset'),
      }),
      {
        name: 'auth-store',
        partialize: (state) => ({
          user: state.user,
          isAuthenticated: state.isAuthenticated,
        }),
      }
    ),
    { name: 'AuthStore' }
  )
)

// Selectors for optimized re-renders
export const useUser = () => useAuthStore((state) => state.user)
export const useIsAuthenticated = () =>
  useAuthStore((state) => state.isAuthenticated)
export const useAuthLoading = () => useAuthStore((state) => state.isLoading)
```

### TanStack React Query Integration

```typescript
// packages/api/src/hooks/use-user-queries.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '../client'
import { UserProfile, UpdateUserRequest, UpdateUserSchema } from '../types'
import { useAuthStore } from '@repo/store'

// Query keys factory
export const userKeys = {
  all: ['users'] as const,
  profile: (id: string) => [...userKeys.all, 'profile', id] as const,
  profiles: () => [...userKeys.all, 'profiles'] as const,
}

// Get current user profile
export function useUserProfile() {
  const user = useAuthStore((state) => state.user)

  return useQuery({
    queryKey: userKeys.profile(user?.id || ''),
    queryFn: async () => {
      if (!user?.id) throw new Error('No user ID')

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

      if (error) throw error
      return data as UserProfile
    },
    enabled: !!user?.id,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

// Update user profile
export function useUpdateUserProfile() {
  const queryClient = useQueryClient()
  const setUser = useAuthStore((state) => state.setUser)

  return useMutation({
    mutationFn: async (data: UpdateUserRequest) => {
      // Validate data with Zod
      const validatedData = UpdateUserSchema.parse(data)

      const { data: updatedUser, error } = await supabase
        .from('profiles')
        .update(validatedData)
        .eq('id', data.id)
        .select()
        .single()

      if (error) throw error
      return updatedUser as UserProfile
    },
    onSuccess: (updatedUser) => {
      // Update cache
      queryClient.setQueryData(userKeys.profile(updatedUser.id), updatedUser)

      // Update auth store
      setUser(updatedUser)
    },
    onError: (error) => {
      console.error('Failed to update profile:', error)
    },
  })
}
```

### Supabase Integration

```typescript
// packages/api/src/auth.ts
import { supabase } from './client'
import { CreateUserRequest, CreateUserSchema } from './types'
import { useAuthStore } from '@repo/store'

export class AuthService {
  static async signUp(data: CreateUserRequest) {
    // Validate input
    const validatedData = CreateUserSchema.parse(data)

    const { data: authData, error } = await supabase.auth.signUp({
      email: validatedData.email,
      password: validatedData.password,
      options: {
        data: {
          name: validatedData.name,
        },
      },
    })

    if (error) throw error
    return authData
  }

  static async signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) throw error
    return data
  }

  static async signOut() {
    const { error } = await supabase.auth.signOut()
    if (error) throw error

    // Clear auth store
    useAuthStore.getState().signOut()
  }

  static async resetPassword(email: string) {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/reset-password`,
    })

    if (error) throw error
  }
}

// Auth state listener
export function setupAuthListener() {
  const { setUser, setLoading } = useAuthStore.getState()

  supabase.auth.onAuthStateChange(async (event, session) => {
    setLoading(true)

    try {
      if (session?.user) {
        // Fetch user profile
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single()

        if (profile) {
          setUser(profile)
        }
      } else {
        setUser(null)
      }
    } catch (error) {
      console.error('Auth state change error:', error)
      setUser(null)
    } finally {
      setLoading(false)
    }
  })
}
```

## Navigation and Routing

### Solito Cross-Platform Navigation

```typescript
// packages/ui/src/navigation/link.tsx
import { Link as SolitoLink } from "solito/link";
import { Text, TextProps } from "@tamagui/core";
import { ReactNode } from "react";

interface LinkProps extends TextProps {
  href: string;
  children: ReactNode;
  replace?: boolean;
}

export function Link({ href, children, replace, ...textProps }: LinkProps) {
  return (
    <SolitoLink href={href} replace={replace}>
      <Text
        color="$blue10"
        textDecorationLine="underline"
        hoverStyle={{ color: "$blue11" }}
        {...textProps}
      >
        {children}
      </Text>
    </SolitoLink>
  );
}

// Usage in screens
export function HomeScreen() {
  return (
    <Screen>
      <YStack space="$4">
        <Text fontSize="$6" fontWeight="bold">
          Welcome
        </Text>
        <Link href="/profile">Go to Profile</Link>
        <Link href="/settings">Settings</Link>
      </YStack>
    </Screen>
  );
}
```

### Internationalization Setup

```typescript
// packages/config/src/i18n.ts
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import * as Localization from 'expo-localization'

// Translation resources
const resources = {
  en: {
    translation: {
      welcome: 'Welcome',
      login: 'Sign In',
      logout: 'Sign Out',
      email: 'Email',
      password: 'Password',
      profile: 'Profile',
      settings: 'Settings',
      errors: {
        required: 'This field is required',
        invalidEmail: 'Please enter a valid email',
        passwordTooShort: 'Password must be at least 8 characters',
      },
    },
  },
  es: {
    translation: {
      welcome: 'Bienvenido',
      login: 'Iniciar Sesión',
      logout: 'Cerrar Sesión',
      email: 'Correo Electrónico',
      password: 'Contraseña',
      profile: 'Perfil',
      settings: 'Configuración',
      errors: {
        required: 'Este campo es obligatorio',
        invalidEmail: 'Por favor ingrese un email válido',
        passwordTooShort: 'La contraseña debe tener al menos 8 caracteres',
      },
    },
  },
}

i18n.use(initReactI18next).init({
  resources,
  lng: Localization.locale.split('-')[0], // Get language code
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
})

export default i18n

// Hook for translations
export { useTranslation } from 'react-i18next'
```

### Stripe Integration

```typescript
// packages/api/src/stripe.ts
import { supabase } from './client'

export interface SubscriptionPlan {
  id: string
  name: string
  price: number
  interval: 'month' | 'year'
  features: string[]
  stripePriceId: string
}

export const subscriptionPlans: SubscriptionPlan[] = [
  {
    id: 'basic',
    name: 'Basic',
    price: 9.99,
    interval: 'month',
    features: ['Feature 1', 'Feature 2'],
    stripePriceId: 'price_basic_monthly',
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 19.99,
    interval: 'month',
    features: ['All Basic features', 'Feature 3', 'Feature 4'],
    stripePriceId: 'price_pro_monthly',
  },
]

export class StripeService {
  static async createCheckoutSession(priceId: string, userId: string) {
    const { data, error } = await supabase.functions.invoke(
      'create-checkout-session',
      {
        body: { priceId, userId },
      }
    )

    if (error) throw error
    return data
  }

  static async createPortalSession(customerId: string) {
    const { data, error } = await supabase.functions.invoke(
      'create-portal-session',
      {
        body: { customerId },
      }
    )

    if (error) throw error
    return data
  }

  static async getSubscriptionStatus(userId: string) {
    const { data, error } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('user_id', userId)
      .eq('status', 'active')
      .single()

    if (error && error.code !== 'PGRST116') throw error
    return data
  }
}

// Subscription hook
export function useSubscription() {
  const user = useUser()

  return useQuery({
    queryKey: ['subscription', user?.id],
    queryFn: () => StripeService.getSubscriptionStatus(user!.id),
    enabled: !!user?.id,
  })
}
```

## Monorepo Configuration

### Turbo Configuration

```json
// turbo.json
{
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": [".next/**", "!.next/cache/**", "dist/**"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    },
    "lint": {
      "outputs": []
    },
    "type-check": {
      "dependsOn": ["^build"],
      "outputs": []
    },
    "test": {
      "outputs": ["coverage/**"]
    },
    "clean": {
      "cache": false
    }
  }
}
```

### Package.json Workspace Setup

```json
// package.json (root)
{
  "name": "expo-monorepo",
  "private": true,
  "workspaces": ["apps/*", "packages/*"],
  "scripts": {
    "build": "turbo run build",
    "dev": "turbo run dev",
    "lint": "turbo run lint",
    "type-check": "turbo run type-check",
    "test": "turbo run test",
    "clean": "turbo run clean",
    "gen": "turbo gen"
  },
  "devDependencies": {
    "turbo": "latest",
    "@turbo/gen": "latest",
    "typescript": "^5.0.0"
  }
}
```

## Error Handling and Performance

### Error Boundary Implementation

```typescript
// packages/ui/src/components/ErrorBoundary.tsx
import React, { Component, ReactNode } from "react";
import { YStack, Text, Button } from "@tamagui/core";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
    // Log to error reporting service
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <YStack
          flex={1}
          justifyContent="center"
          alignItems="center"
          padding="$4"
        >
          <Text fontSize="$6" fontWeight="bold" marginBottom="$4">
            Something went wrong
          </Text>
          <Text textAlign="center" marginBottom="$4" color="$gray11">
            We're sorry, but something unexpected happened.
          </Text>
          <Button
            onPress={() => this.setState({ hasError: false, error: undefined })}
          >
            Try Again
          </Button>
        </YStack>
      );
    }

    return this.props.children;
  }
}
```

### Performance Optimization Utilities

```typescript
// packages/ui/src/hooks/use-debounce.ts
import { useEffect, useState } from 'react'

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}

// packages/ui/src/hooks/use-intersection-observer.ts
import { useEffect, useRef, useState } from 'react'

export function useIntersectionObserver(
  options: IntersectionObserverInit = {}
) {
  const [isIntersecting, setIsIntersecting] = useState(false)
  const ref = useRef<any>(null)

  useEffect(() => {
    if (!ref.current) return

    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting)
    }, options)

    observer.observe(ref.current)

    return () => observer.disconnect()
  }, [options])

  return { ref, isIntersecting }
}
```

## Best Practices Summary

### Code Quality and Structure

- **Use functional and declarative programming** patterns; avoid classes
- **Prefer iteration and modularization** over code duplication
- **Use descriptive variable names** with auxiliary verbs (isLoading, hasError)
- **Structure files** with exported components, subcomponents, helpers, static content, and types
- **Favor named exports** for components and functions
- **Use lowercase with dashes** for directory names
- **Always use ThemedText component for text rendering**; components should never define their own text styles (fontSize, fontWeight, etc.) in StyleSheet - instead use ThemedText types and only apply layout-specific styles (margins, padding, alignment, colors)
  - Available types in size order: `largeTitle` (32px), `title` (24px), `subtitle` (20px), `default` (16px), `defaultSemiBold` (16px bold), `label` (16px medium), `body` (14px), `caption` (12px), `link` (16px with link color)

### Style Consistency and Header Standards

- **Use spacing constants from `constants/Theme.ts`** for all padding, margins, and spacing values. Never use hardcoded numeric values (e.g., `16`, `20`, `24`) directly in StyleSheet definitions.
  - Available spacing values: `xs: 4`, `sm: 8`, `md: 16`, `lg: 24`, `xl: 32`, `xxl: 48`
  - Import spacing for StyleSheet: `import { spacing } from "@/constants/Theme"`
  - Use `useAppTheme()` hook for dynamic color values in inline styles

- **Main Screen Headers (Tab Screens)** - All main tab screens must follow this consistent pattern:

  ```typescript
  // Container
  container: {
    flex: 1,
    paddingHorizontal: spacing.md, // 16px
  },

  // Header
  header: {
    paddingVertical: spacing.md,   // 16px
    marginBottom: spacing.lg,      // 24px
  },
  ```

  - Use `ThemedText type="title"` for header text
  - Headers must be left-aligned (never centered)
  - All main screens (Home, Workout, Programs, History) must have identical header spacing

- **Subscreen Headers (Edit/Create/Details)** - Secondary screens follow a slightly different pattern:

  ```typescript
  // Container
  container: {
    flex: 1,
    paddingHorizontal: spacing.md, // 16px
  },

  // Header
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: spacing.md,   // 16px
    marginBottom: spacing.md,      // 16px (smaller than main screens)
  },
  ```

  - Use `ThemedText type="subtitle"` for header text
  - Headers should have space-between layout for back/cancel buttons

- **Modal Headers** - Bottom sheet modals use consistent header spacing:

  ```typescript
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: spacing.md, // 16px
    paddingTop: spacing.sm,        // 8px
    paddingBottom: spacing.md,      // 16px
  },
  ```

  - Use `ThemedText type="subtitle"` for modal titles
  - Headers should accommodate close/cancel buttons on the right

### Bottom Sheet Modals with @gorhom/bottom-sheet

When creating scrollable bottom sheet modals using `@gorhom/bottom-sheet`, follow these critical patterns:

**Structure Pattern:**

- **NEVER wrap content in `BottomSheetView`** - This breaks gesture handling and prevents proper scrolling
- **Use `BottomSheetScrollView` as direct child** of `BottomSheetModal` - This ensures proper gesture detection
- **Put header INSIDE the ScrollView** - Headers should be the first child of `BottomSheetScrollView` to enable sticky headers

**Required Props:**

```typescript
<BottomSheetModal
  ref={ref}
  backdropComponent={renderBackdrop}
  backgroundStyle={{ backgroundColor: colors.background }}
  snapPoints={["90%"]} // Use 90% to avoid full screen overlap
  topInset={insets.top} // Respect status bar/notch
  index={0} // Start at first snap point
>
  <BottomSheetScrollView
    contentContainerStyle={[
      styles.scrollContent,
      { paddingBottom: Math.max(insets.bottom, spacing.lg) },
    ]}
    stickyHeaderIndices={[0]} // Make first child (header) sticky
    showsVerticalScrollIndicator={false}
  >
    <View style={[styles.header, { backgroundColor: colors.background }]}>
      {/* Header content */}
    </View>
    {/* Rest of scrollable content */}
  </BottomSheetScrollView>
</BottomSheetModal>
```

**Header Patterns:**

1. **Centered Header (no buttons):**

   ```typescript
   header: {
     flexDirection: "row",
     justifyContent: "center",
     alignItems: "center",
     paddingHorizontal: spacing.md,
     paddingTop: spacing.sm,
     paddingBottom: spacing.md,
   },
   ```

2. **Centered Header with Right Button (e.g., "Done"):**
   ```typescript
   header: {
     flexDirection: "row",
     justifyContent: "space-between",
     alignItems: "center",
     paddingHorizontal: spacing.md,
     paddingTop: spacing.sm,
     paddingBottom: spacing.md,
   },
   // In JSX:
   <View style={[styles.header, { backgroundColor: colors.background }]}>
     <View style={styles.headerLeft} />  {/* Spacer for centering */}
     <ThemedText type="subtitle">Title</ThemedText>
     <TouchableOpacity onPress={handleDone}>
       <ThemedText type="label" style={{ color: colors.accent }}>
         Done
       </ThemedText>
     </TouchableOpacity>
   </View>
   ```

**Key Points:**

- Always set `stickyHeaderIndices={[0]}` to make the header sticky
- Always add `backgroundColor: colors.background` to the header View so it's opaque when sticky
- Use `topInset={insets.top}` to prevent modal from overlapping status bar/notch
- Use `snapPoints={["90%"]}` for optimal height without full screen coverage
- Never use `BottomSheetView` wrapper - it interferes with gesture handling
- Remove the empty `<View style={{ paddingBottom: insets.bottom }}></View>` hack - use proper `paddingBottom` in `contentContainerStyle` instead

- **Color Usage** - Always use theme colors from `useAppTheme()` hook:
  - Never use hardcoded color literals (`"#444"`, `"white"`, `rgba(...)`)
  - Use `colors.text`, `colors.background`, `colors.card`, `colors.accent`, `colors.divider`, `colors.error`, `colors.success`, `colors.info` for semantic colors
  - Apply colors inline for dynamic values: `style={{ backgroundColor: colors.card }}`
  - Use `colors.divider` for borders instead of hardcoded grays

- **Container Padding** - All screen containers use consistent horizontal padding:
  - Main screens: `paddingHorizontal: spacing.md` (16px)
  - Subscreens: `paddingHorizontal: spacing.md` (16px)
  - Avoid adding additional `paddingHorizontal` to headers if container already has it (prevents double padding)

### TypeScript and Validation

- **Use TypeScript for all code**; prefer interfaces over types for object shapes
- **Utilize Zod** for schema validation and type inference
- **Avoid enums**; use literal types or maps instead
- **Implement functional components** with TypeScript interfaces for props

### Cross-Platform Development

- **Use Tamagui** for cross-platform UI components and styling
- **Implement responsive design** with mobile-first approach
- **Use Solito** for navigation in both web and mobile applications
- **Handle platform-specific code** using .native.tsx files when necessary

### State Management and Performance

- **Use Zustand** for state management with proper selectors
- **Use TanStack React Query** for data fetching, caching, and synchronization
- **Minimize useEffect and setState**; favor derived state and memoization
- **Optimize for both web and mobile** performance with lazy loading and code splitting

### Backend Integration

- **Use Supabase** for backend services, authentication, and database interactions
- **Follow Supabase guidelines** for security and performance
- **Use Zod schemas** to validate data exchanged with the backend
- **Implement proper error handling** and user-friendly error messages

### User Data and State Persistence

- **Store user preferences in backend** - User-specific state like current program selection should be persisted in the backend database
- **Fetch user data on app startup** - When the app loads, fetch user data to restore the user's previous state (e.g., selected program)
- **Lazy initialization** - Create user data entries lazily on first access if they don't exist
- **Graceful fallbacks** - If user data fetch fails or stored references are invalid, fall back to sensible defaults (e.g., first available program)
- **Automatic persistence** - When users change preferences (e.g., select a different program), automatically persist changes to the backend without disrupting the user experience
- **Silent error handling** - Background persistence failures should not disrupt the user experience; handle errors silently where appropriate

### Logging and Debugging

- **No console logs in frontend** - Avoid using `console.log`, `console.warn`, or `console.error` in frontend code
- **Backend logging** - Use `console.error` in backend code only for error handling in try-catch blocks
- **Error handling** - Use proper error boundaries and error states instead of console logging for user-facing errors
- **Development tools** - Use React DevTools, network inspectors, and other development tools instead of console logs for debugging

### Internationalization and Accessibility

- **Use i18next and react-i18next** for web applications
- **Use expo-localization** for React Native apps
- **Ensure all user-facing text** is internationalized and supports localization
- **Implement proper accessibility** features for cross-platform compatibility

This comprehensive guide provides a solid foundation for building scalable, maintainable cross-platform applications using TypeScript, React Native, Expo, and modern development tools with proper state management, backend integration, and performance optimization.
