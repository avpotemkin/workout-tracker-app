import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import React, { useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { Program } from "@/types";
import { SafeAreaView } from "react-native-safe-area-context";
import { useThemeColor } from "@/hooks/useThemeColor";

export default function ProgramsScreen() {
  const backgroundColor = useThemeColor({}, "background");

  const [programs] = useState<Program[]>([
    { id: "1", name: "Full Body" },
    { id: "2", name: "5×5" },
    { id: "3", name: "Push, Pull, Legs" },
  ]);

  const renderProgramItem = ({ item }: { item: Program }) => (
    <View style={styles.programCard}>
      <ThemedText style={styles.programName}>{item.name}</ThemedText>
    </View>
  );

  const Header = () => {
    return (
      <View style={styles.header}>
        <ThemedText style={styles.title}>Programs</ThemedText>
      </View>
    );
  };

  const ProgramList = () => {
    return (
      <FlatList
        data={programs}
        keyExtractor={(item) => item.id}
        renderItem={renderProgramItem}
        contentContainerStyle={{ paddingBottom: 32 }}
      />
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor }}>
      <ThemedView style={styles.container}>
        <Header />
        <ProgramList />
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
    paddingVertical: 10,
    marginBottom: 24,
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
  },
  programCard: {
    backgroundColor: "grey",
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
  },
  programName: {
    fontSize: 16,
    fontWeight: "600",
    color: "white",
  },
});
