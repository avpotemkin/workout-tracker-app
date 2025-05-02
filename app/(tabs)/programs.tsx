import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import React from "react";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { PROGRAMS } from "@/mockdata/programs";
import { Program } from "@/types";
import { useAppTheme } from "@/hooks/useAppTheme";
import { useThemeColor } from "@/hooks/useThemeColor";

export default function ProgramsScreen() {
  const backgroundColor = useThemeColor({}, "background");
  const { colors } = useAppTheme();
  const router = useRouter();

  const renderProgramItem = ({ item }: { item: Program }) => (
    <TouchableOpacity
      style={[styles.programCard, { backgroundColor: colors.card }]}
      onPress={() => router.push(`/programs/${item.id}`)}
    >
      <ThemedText style={styles.programName}>{item.name}</ThemedText>
      {item.description && (
        <ThemedText style={styles.programDescription}>
          {item.description}
        </ThemedText>
      )}
      <View
        style={[
          styles.exerciseCount,
          { backgroundColor: `${colors.accent}20` },
        ]}
      >
        <ThemedText
          style={[styles.exerciseCountText, { color: colors.accent }]}
        >
          {item.exercises?.length || 0} exercises
        </ThemedText>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor }}>
      <ThemedView style={styles.container}>
        <View style={styles.header}>
          <ThemedText style={styles.title}>Programs</ThemedText>
        </View>

        <FlatList
          data={PROGRAMS}
          keyExtractor={(item) => item.id}
          renderItem={renderProgramItem}
          contentContainerStyle={styles.listContainer}
        />
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    paddingVertical: 16,
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  listContainer: {
    paddingBottom: 32,
  },
  programCard: {
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
  },
  programName: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
  },
  programDescription: {
    fontSize: 14,
    opacity: 0.7,
    marginBottom: 12,
  },
  exerciseCount: {
    alignSelf: "flex-start",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  exerciseCountText: {
    fontSize: 12,
  },
});
