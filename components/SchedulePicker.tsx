import { ActionSheetIOS, Platform, Alert } from 'react-native';

export const SCHEDULE_OPTIONS = [
  '1x/week',
  '2x/week',
  '3x/week',
  '4x/week',
  '5x/week',
  '6x/week',
  'Every Other Day',
  'Every 2 Days',
] as const;

export type ScheduleType = typeof SCHEDULE_OPTIONS[number];

interface SchedulePickerProps {
  onSelect: (schedule: ScheduleType) => void;
}

export function showSchedulePicker({ onSelect }: SchedulePickerProps) {
  const schedules = [...SCHEDULE_OPTIONS];

  if (Platform.OS === 'ios') {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: [...schedules, 'Cancel'],
        cancelButtonIndex: schedules.length,
      },
      (buttonIndex) => {
        if (buttonIndex < schedules.length) {
          onSelect(schedules[buttonIndex]);
        }
      }
    );
  } else {
    // For Android, show a simple alert with options
    Alert.alert(
      'Select Schedule',
      '',
      schedules.map((schedule) => ({
        text: schedule,
        onPress: () => onSelect(schedule),
      })).concat([{ text: 'Cancel', style: 'cancel' }])
    );
  }
}

