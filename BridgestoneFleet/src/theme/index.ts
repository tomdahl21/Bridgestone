// Official Bridgestone Brand Colors
export const colors = {
  // Primary Brand Colors
  primary: '#C8102E',        // Bridgestone Red (Official)
  primaryDark: '#A00E26',    // Darker red for pressed states
  primaryLight: '#F5F5F5',   // Clean light background
  
  // Corporate Colors
  secondary: '#003366',      // Corporate Blue
  secondaryLight: '#4A90A4', // Light Blue
  tertiary: '#1C1C1C',      // Carbon Black
  
  // Functional colors
  accent: '#FF6900',         // Alert Orange
  success: '#00A651',        // Success Green
  warning: '#FFB300',        // Warning Amber
  error: '#C8102E',          // Use brand red for errors
  
  // Background colors (Bridgestone Clean Style)
  background: '#FFFFFF',     // Pure white background
  surface: '#FFFFFF',        // White surface
  surfaceVariant: '#F8F9FA', // Subtle off-white variant
  surfaceElevated: '#FFFFFF', // Elevated white surface
  
  // Text colors (Bridgestone Typography)
  onSurface: '#1C1C1C',      // Primary text (Carbon Black)
  onSurfaceVariant: '#6C757D', // Secondary text (Professional Grey)
  onBackground: '#1C1C1C',   // Text on background
  onPrimary: '#FFFFFF',      // Text on red brand color
  
  // Border and divider colors (Bridgestone Clean Lines)
  outline: '#DEE2E6',        // Subtle borders
  outlineVariant: '#E9ECEF', // Lighter borders
  divider: '#F1F3F4',       // Minimal dividers
  
  // Disabled colors
  disabled: '#ADB5BD',
  onDisabled: '#6C757D',
  
  // Bridgestone Brand Specific
  brandBlue: '#003366',      // Corporate blue
  brandSilver: '#C0C0C0',   // Automotive silver
  fleetBlue: '#4A90A4',     // Fleet management blue
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
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  pill: 50,
};

export const typography = {
  // Display styles
  displayLarge: {
    fontSize: 57,
    lineHeight: 64,
    fontWeight: '400' as const,
    letterSpacing: -0.25,
  },
  displayMedium: {
    fontSize: 45,
    lineHeight: 52,
    fontWeight: '400' as const,
    letterSpacing: 0,
  },
  displaySmall: {
    fontSize: 36,
    lineHeight: 44,
    fontWeight: '400' as const,
    letterSpacing: 0,
  },
  
  // Headline styles
  headlineLarge: {
    fontSize: 32,
    lineHeight: 40,
    fontWeight: '600' as const,
    letterSpacing: 0,
  },
  headlineMedium: {
    fontSize: 28,
    lineHeight: 36,
    fontWeight: '600' as const,
    letterSpacing: 0,
  },
  headlineSmall: {
    fontSize: 24,
    lineHeight: 32,
    fontWeight: '600' as const,
    letterSpacing: 0,
  },
  
  // Title styles
  titleLarge: {
    fontSize: 22,
    lineHeight: 28,
    fontWeight: '500' as const,
    letterSpacing: 0,
  },
  titleMedium: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '500' as const,
    letterSpacing: 0.15,
  },
  titleSmall: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '500' as const,
    letterSpacing: 0.1,
  },
  
  // Body styles
  bodyLarge: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '400' as const,
    letterSpacing: 0.15,
  },
  bodyMedium: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '400' as const,
    letterSpacing: 0.25,
  },
  bodySmall: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '400' as const,
    letterSpacing: 0.4,
  },
  
  // Label styles
  labelLarge: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '500' as const,
    letterSpacing: 0.1,
  },
  labelMedium: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '500' as const,
    letterSpacing: 0.5,
  },
  labelSmall: {
    fontSize: 11,
    lineHeight: 16,
    fontWeight: '500' as const,
    letterSpacing: 0.5,
  },
};

export const shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,
    elevation: 8,
  },
  xl: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 16,
  },
};

export const theme = {
  colors,
  spacing,
  borderRadius,
  typography,
  shadows,
};