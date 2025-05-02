import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import React from "react";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Program } from "@/types";
import { useAppTheme } from "@/hooks/useAppTheme";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useAppContext } from "@/context/AppContext";
import { Ionicons } from "@expo/vector-icons";

export default function ProgramsScreen() {
  const backgroundColor = useThemeColor({}, "background");
  const tintColor = useThemeColor({}, "tint");
  const { colors } = useAppTheme();
  const router = useRouter();
  const { selectedProgram, programs } = useAppContext();

  const renderProgramItem = ({ item }: { item: Program }) => {
    const isSelected = selectedProgram?.id === item.id;

    return (
      <TouchableOpacity
        style={[
          styles.programCard,
          { backgroundColor: colors.card },
          isSelected && styles.selectedProgramCard,
        ]}
        onPress={() => router.push(`/programs/${item.id}`)}
      >
        <View style={styles.programHeader}>
          <ThemedText style={styles.programName}>{item.name}</ThemedText>
          {isSelected && (
            <View
              style={[styles.selectedBadge, { backgroundColor: colors.accent }]}
            >
              <Ionicons name="checkmark-circle" size={16} color="white" />
              <ThemedText style={styles.selectedText}>Active</ThemedText>
            </View>
          )}
        </View>

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
            {item.workouts.length} {item.workouts.length === 1 ? "workout" : "workouts"}
          </ThemedText>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor }}>
      <ThemedView style={styles.container}>
        <View style={styles.header}>
          <ThemedText style={styles.title}>Programs</ThemedText>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => router.push("/programs/create")}
          >
            <Ionicons name="add" size={24} color={tintColor} />
          </TouchableOpacity>
        </View>

        <FlatList
          data={programs}
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
    position: "relative",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  addButton: {
    position: "absolute",
    right: 0,
    padding: 8,
  },
  listContainer: {
    paddingBottom: 32,
  },
  programCard: {
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
  },
  selectedProgramCard: {
    borderWidth: 2,
    borderColor: "#4CAF50",
  },
  programHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  programName: {
    fontSize: 18,
    fontWeight: "600",
    flex: 1,
  },
  selectedBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
    marginLeft: 8,
  },
  selectedText: {
    color: "white",
    fontSize: 12,
    fontWeight: "600",
    marginLeft: 4,
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
