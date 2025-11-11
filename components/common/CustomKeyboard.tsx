import React from 'react'
import {
  View,
  StyleSheet,
  Pressable,
  Platform,
} from 'react-native'
import * as Haptics from 'expo-haptics'
import { Ionicons } from '@expo/vector-icons'
import { ThemedText } from './ThemedText'
import { useAppTheme } from '@/hooks/useAppTheme'
import { spacing, borderRadius } from '@/constants/Theme'

interface CustomKeyboardProps {
  value: string
  onChange: (value: string) => void
  onDone: () => void
  incrementStep: number
  showDecimal: boolean
}

export function CustomKeyboard({
  value,
  onChange,
  onDone,
  incrementStep,
  showDecimal,
}: CustomKeyboardProps) {
  const { colors } = useAppTheme()

  const triggerHaptic = () => {
    if (Platform.OS === 'ios') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    }
  }

  const handleNumberPress = (num: string) => {
    triggerHaptic()
    onChange(value + num)
  }

  const handleDecimalPress = () => {
    if (!value.includes('.')) {
      triggerHaptic()
      onChange(value + '.')
    }
  }

  const handleBackspace = () => {
    if (value.length > 0) {
      triggerHaptic()
      onChange(value.slice(0, -1))
    }
  }

  const handleIncrement = () => {
    triggerHaptic()
    const currentValue = parseFloat(value) || 0
    const newValue = currentValue + incrementStep
    onChange(newValue.toString())
  }

  const handleDecrement = () => {
    const currentValue = parseFloat(value) || 0
    if (currentValue > 0) {
      triggerHaptic()
      const newValue = Math.max(0, currentValue - incrementStep)
      onChange(newValue.toString())
    }
  }

  const KeyButton = ({
    children,
    onPress,
    style,
  }: {
    children: React.ReactNode
    onPress: () => void
    style?: any
  }) => (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.keyButton,
        { backgroundColor: colors.card },
        pressed && { opacity: 0.7, backgroundColor: colors.accent },
        style,
      ]}
    >
      {children}
    </Pressable>
  )

  const ArrowButton = ({
    onPress,
    icon,
    disabled,
  }: {
    onPress: () => void
    icon: 'chevron-up' | 'chevron-down'
    disabled?: boolean
  }) => (
    <Pressable
      onPress={disabled ? undefined : onPress}
      style={({ pressed }) => [
        styles.arrowButton,
        { backgroundColor: disabled ? colors.input : colors.accent },
        pressed && !disabled && { opacity: 0.7 },
      ]}
      disabled={disabled}
    >
      <Ionicons
        name={icon}
        size={32}
        color={disabled ? colors.text + '40' : colors.background}
      />
    </Pressable>
  )

  const currentValue = parseFloat(value) || 0
  const isAtMinimum = currentValue <= 0

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.keyboardLayout}>
        <View style={styles.leftArrowColumn}>
          <ArrowButton
            onPress={handleDecrement}
            icon="chevron-down"
            disabled={isAtMinimum}
          />
        </View>

        <View style={styles.numberPadColumn}>
          {/* Row 1: 7, 8, 9 */}
          <View style={styles.row}>
            <KeyButton onPress={() => handleNumberPress('7')}>
              <ThemedText type="subtitle">7</ThemedText>
            </KeyButton>
            <KeyButton onPress={() => handleNumberPress('8')}>
              <ThemedText type="subtitle">8</ThemedText>
            </KeyButton>
            <KeyButton onPress={() => handleNumberPress('9')}>
              <ThemedText type="subtitle">9</ThemedText>
            </KeyButton>
          </View>

          {/* Row 2: 4, 5, 6 */}
          <View style={styles.row}>
            <KeyButton onPress={() => handleNumberPress('4')}>
              <ThemedText type="subtitle">4</ThemedText>
            </KeyButton>
            <KeyButton onPress={() => handleNumberPress('5')}>
              <ThemedText type="subtitle">5</ThemedText>
            </KeyButton>
            <KeyButton onPress={() => handleNumberPress('6')}>
              <ThemedText type="subtitle">6</ThemedText>
            </KeyButton>
          </View>

          {/* Row 3: 1, 2, 3 */}
          <View style={styles.row}>
            <KeyButton onPress={() => handleNumberPress('1')}>
              <ThemedText type="subtitle">1</ThemedText>
            </KeyButton>
            <KeyButton onPress={() => handleNumberPress('2')}>
              <ThemedText type="subtitle">2</ThemedText>
            </KeyButton>
            <KeyButton onPress={() => handleNumberPress('3')}>
              <ThemedText type="subtitle">3</ThemedText>
            </KeyButton>
          </View>

          {/* Row 4: ., 0, backspace */}
          <View style={styles.row}>
            {showDecimal ? (
              <KeyButton onPress={handleDecimalPress}>
                <ThemedText type="subtitle">.</ThemedText>
              </KeyButton>
            ) : (
              <View style={styles.keyButton} />
            )}
            <KeyButton onPress={() => handleNumberPress('0')}>
              <ThemedText type="subtitle">0</ThemedText>
            </KeyButton>
            <KeyButton onPress={handleBackspace}>
              <Ionicons name="backspace-outline" size={24} color={colors.text} />
            </KeyButton>
          </View>

          {/* Done Button */}
          <Pressable
            style={({ pressed }) => [
              styles.doneButton,
              { backgroundColor: colors.accent },
              pressed && { opacity: 0.7 },
            ]}
            onPress={() => {
              triggerHaptic()
              onDone()
            }}
          >
            <ThemedText type="subtitle" style={{ color: colors.background }}>
              Done
            </ThemedText>
          </Pressable>
        </View>

        <View style={styles.rightArrowColumn}>
          <ArrowButton onPress={handleIncrement} icon="chevron-up" />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.sm,
    borderTopLeftRadius: borderRadius.lg,
    borderTopRightRadius: borderRadius.lg,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  keyboardLayout: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  leftArrowColumn: {
    justifyContent: 'center',
    marginRight: spacing.sm,
  },
  rightArrowColumn: {
    justifyContent: 'center',
    marginLeft: spacing.sm,
  },
  numberPadColumn: {
    flex: 1,
    maxWidth: 280,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  keyButton: {
    flex: 1,
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: spacing.xs,
    borderRadius: borderRadius.md,
  },
  arrowButton: {
    width: 56,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: borderRadius.md,
  },
  doneButton: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: borderRadius.md,
    marginTop: spacing.xs,
  },
})

