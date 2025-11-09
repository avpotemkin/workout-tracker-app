import { useColorScheme } from './useColorScheme'
import {
  getThemeColors,
  spacing,
  borderRadius,
  typography,
} from '@/constants/Theme'

/**
 * Hook to access the app theme values based on the current color scheme
 * This combines the color scheme detection with our theme constants
 */
export function useAppTheme() {
  const colorScheme = useColorScheme()

  return {
    colors: getThemeColors(colorScheme || 'dark'),
    spacing,
    borderRadius,
    typography,
  }
}
