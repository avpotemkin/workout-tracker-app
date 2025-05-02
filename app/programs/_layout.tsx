import { Stack } from "expo-router";
import { PROGRAMS } from "@/mockdata/programs";
import { ThemedText } from "@/components/ThemedText";
import React from "react";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

export default function ProgramsLayout() {
  const router = useRouter();

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Programs",
        }}
      />
      <Stack.Screen
        name="[id]"
        options={({ route }) => {
          const { id } = route.params as { id: string };
          const program = PROGRAMS.find((p) => p.id === id);
          return {
            headerLeft: () => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    router.dismiss();
                  }}
                >
                  <IconSymbol name="chevron.left" color={""} /> Programs
                </TouchableOpacity>
              );
            },
            headerRight: () => <ThemedText>Edit</ThemedText>,
            title: program?.name ?? "Program",
          };
        }}
      />
    </Stack>
  );
}
