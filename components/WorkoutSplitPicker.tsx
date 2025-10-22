import { ActionSheetIOS, Platform, Alert } from 'react-native';
import { WORKOUT_SPLITS, WorkoutSplitType } from '@/constants/WorkoutPresets';

interface WorkoutSplitPickerProps {
  onSelect: (split: WorkoutSplitType) => void;
}

export function showWorkoutSplitPicker({ onSelect }: WorkoutSplitPickerProps) {
  const splits = Object.values(WORKOUT_SPLITS);

  if (Platform.OS === 'ios') {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: [...splits, 'Cancel'],
        cancelButtonIndex: splits.length,
      },
      (buttonIndex) => {
        if (buttonIndex < splits.length) {
          onSelect(splits[buttonIndex]);
        }
      }
    );
  } else {
    // For Android, show a simple alert with options
    Alert.alert(
      'Select Workout Split',
      '',
      splits.map((split) => ({
        text: split,
        onPress: () => onSelect(split),
      })).concat([{ text: 'Cancel', style: 'cancel' }])
    );
  }
}

