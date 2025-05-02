import React from 'react';
import { View, TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemedText } from '@/components/ThemedText';
import { useThemeColor } from '@/hooks/useThemeColor';

type WorkoutHeaderProps = {
  onBackPress: () => void;
  title: string;
  style?: ViewStyle;
};

export function WorkoutHeader({ onBackPress, title, style }: WorkoutHeaderProps) {
  const textColor = useThemeColor({}, 'text');

  return (
    <View style={[styles.header, style]}>
      <TouchableOpacity style={styles.backButton} onPress={onBackPress}>
        <Ionicons name="arrow-back" size={24} color={textColor} />
      </TouchableOpacity>

      <ThemedText style={styles.workoutTitle}>{title}</ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
  },
  backButton: {
    marginRight: 16,
  },
  workoutTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
    marginRight: 40,
  },
});
