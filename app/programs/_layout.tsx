import { Stack } from 'expo-router'
import { ProgramDraftProvider } from '@/context/ProgramDraftContext'

export default function ProgramsLayout() {
  return (
    <ProgramDraftProvider>
      <Stack>
        <Stack.Screen
          name='index'
          options={{
            title: 'Programs',
          }}
        />
        <Stack.Screen
          name='[id]'
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name='create'
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name='edit'
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name='edit-workout'
          options={{
            headerShown: false,
            presentation: 'modal',
          }}
        />
      </Stack>
    </ProgramDraftProvider>
  )
}
