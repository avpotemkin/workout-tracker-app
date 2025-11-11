import React, { useState, useEffect } from 'react'
import {
  View,
  Modal,
  Pressable,
  StyleSheet,
  ViewStyle,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
} from 'react-native'
import * as Haptics from 'expo-haptics'
import { ThemedText } from './ThemedText'
import { CustomKeyboard } from './CustomKeyboard'
import { useAppTheme } from '@/hooks/useAppTheme'
import { spacing, borderRadius } from '@/constants/Theme'

interface CustomKeyboardInputProps {
  value: string
  onSubmit: (value: string) => void
  incrementStep: number
  showDecimal: boolean
  placeholder?: string
  style?: ViewStyle
  unit?: string
}

export function CustomKeyboardInput({
  value,
  onSubmit,
  incrementStep,
  showDecimal,
  placeholder = '0',
  style,
  unit,
}: CustomKeyboardInputProps) {
  const { colors } = useAppTheme()
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false)
  const [tempValue, setTempValue] = useState(value)

  // Update tempValue when the prop value changes
  useEffect(() => {
    setTempValue(value)
  }, [value])

  const handlePress = () => {
    if (Platform.OS === 'ios') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    }
    setTempValue(value)
    setIsKeyboardVisible(true)
  }

  const handleDone = () => {
    const parsedValue = parseFloat(tempValue)
    if (!isNaN(parsedValue) && parsedValue >= 0) {
      onSubmit(tempValue)
    } else if (tempValue === '' || tempValue === '.') {
      onSubmit('0')
    }
    setIsKeyboardVisible(false)
  }

  const handleBackdropPress = () => {
    setTempValue(value)
    setIsKeyboardVisible(false)
  }

  const displayValue = tempValue || (isKeyboardVisible ? '0' : placeholder)

  return (
    <>
      <Pressable
        onPress={handlePress}
        style={({ pressed }) => [
          styles.inputDisplay,
          { borderBottomColor: colors.divider },
          pressed && { opacity: 0.7 },
          style,
        ]}
      >
        <ThemedText type="defaultSemiBold">{displayValue}</ThemedText>
        {unit && <ThemedText type="body">{unit}</ThemedText>}
      </Pressable>

      <Modal
        visible={isKeyboardVisible}
        transparent
        animationType="slide"
        onRequestClose={handleBackdropPress}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.modalContainer}
        >
          <TouchableWithoutFeedback onPress={handleBackdropPress}>
            <View style={styles.backdrop} />
          </TouchableWithoutFeedback>

          <View style={styles.keyboardContainer}>
            {/* Display current value */}
            <View
              style={[
                styles.valueDisplay,
                { backgroundColor: colors.card, borderBottomColor: colors.divider },
              ]}
            >
              <ThemedText type="title">
                {tempValue || '0'}
                {unit && (
                  <ThemedText type="subtitle" style={{ opacity: 0.7 }}>
                    {' '}
                    {unit}
                  </ThemedText>
                )}
              </ThemedText>
            </View>

            <CustomKeyboard
              value={tempValue}
              onChange={setTempValue}
              onDone={handleDone}
              incrementStep={incrementStep}
              showDecimal={showDecimal}
            />
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </>
  )
}

const styles = StyleSheet.create({
  inputDisplay: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 30,
    borderBottomWidth: 1,
    paddingVertical: 2,
    gap: 4,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  keyboardContainer: {
    width: '100%',
  },
  valueDisplay: {
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    minHeight: 80,
  },
})

