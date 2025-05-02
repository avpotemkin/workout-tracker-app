import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import React from "react";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useRouter } from "expo-router";
import { PROGRAMS } from "@/mockdata/programs";
import { Program } from "@/types";

export default function ProgramsScreen() {
  const backgroundColor = useThemeColor({}, "background");
  const router = useRouter();

  const renderProgramItem = ({ item }: { item: Program }) => (
    <TouchableOpacity 
      style={styles.programCard} 
      onPress={() => router.push(`/programs/${item.id}`)}
    >
      <ThemedText style={styles.programName}>{item.name}</ThemedText>
    </TouchableOpacity>
  );

  const Header = () => (
    <View style={styles.header}>
      <ThemedText style={styles.title}>Programs</ThemedText>
    </View>
  );

  const ProgramList = () => (
    <FlatList
      data={PROGRAMS}
      keyExtractor={(item) => item.id}
      renderItem={renderProgramItem}
      contentContainerStyle={{ paddingBottom: 32 }}
    />
  );

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
