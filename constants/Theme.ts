/**
 * App theme constants that can be used across the application
 * This extends the base Colors.ts with additional theme values
 */
import { Colors } from './Colors';

const baseColors = {
  accent: '#FF4500',
  success: '#4CAF50',
  warning: '#FFC107',
  error: '#F44336',
  info: '#2196F3',
  
  card: {
    light: '#F5F5F5',
    dark: '#333333',
  },
  cardBorder: {
    light: '#E0E0E0',
    dark: '#444444',
  },
  input: {
    light: '#F0F0F0',
    dark: '#444444',
  },
  divider: {
    light: '#E0E0E0',
    dark: '#444444',
  },
  highlight: {
    light: '#E3F2FD',
    dark: '#3A3A3A',
  },
};

export const getThemeColors = (colorScheme: 'light' | 'dark' = 'dark') => {
  return {
    ...Colors[colorScheme],
    accent: baseColors.accent,
    success: baseColors.success,
    warning: baseColors.warning,
    error: baseColors.error,
    info: baseColors.info,
    card: baseColors.card[colorScheme],
    cardBorder: baseColors.cardBorder[colorScheme],
    input: baseColors.input[colorScheme],
    divider: baseColors.divider[colorScheme],
    highlight: baseColors.highlight[colorScheme],
  };
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const borderRadius = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  round: 9999,
};

export const typography = {
  fontSizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
    xxxl: 32,
  },
  fontWeights: {
    regular: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
};

export const useTheme = (colorScheme: 'light' | 'dark' = 'dark') => {
  return {
    colors: getThemeColors(colorScheme),
    spacing,
    borderRadius,
    typography,
  };
};
