
export const colors = {
  background: {
    primary: '#0a0a0f',
    secondary: '#0f0f1e',
    tertiary: '#1a1a2e',
  },
  
  glass: {
    light: 'rgba(255, 255, 255, 0.05)',
    medium: 'rgba(255, 255, 255, 0.08)',
    dark: 'rgba(0, 0, 0, 0.3)',
    border: 'rgba(255, 255, 255, 0.1)',
  },
  
  accent: {
    cyan: '#00d4ff',
    cyanDark: '#00b8d4',
    purple: '#a855f7',
    purpleDark: '#7c3aed',
    blue: '#3b82f6',
    blueDark: '#2563eb',
    pink: '#ec4899',
    green: '#10b981',
  },
  
  text: {
    primary: '#ffffff',
    secondary: 'rgba(255, 255, 255, 0.7)',
    tertiary: 'rgba(255, 255, 255, 0.5)',
    disabled: 'rgba(255, 255, 255, 0.3)',
  },
  
  status: {
    success: '#10b981',
    error: '#ef4444',
    warning: '#f59e0b',
    info: '#3b82f6',
  },
};

export const gradients = {
  primary: ['#a855f7', '#3b82f6'],
  secondary: ['#00d4ff', '#00b8d4'],
  dark: ['#0f0f1e', '#1a1a2e'],
  card: ['rgba(255, 255, 255, 0.05)', 'rgba(255, 255, 255, 0.02)'],
  button: ['#00d4ff', '#a855f7'],
  accent: ['#ec4899', '#a855f7'],
};

export const typography = {
  h1: {
    fontSize: 32,
    fontWeight: '700',
    color: colors.text.primary,
  },
  h2: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.text.primary,
  },
  h3: {
    fontSize: 24,
    fontWeight: '600',
    color: colors.text.primary,
  },
  h4: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text.primary,
  },
  body: {
    fontSize: 16,
    fontWeight: '400',
    color: colors.text.secondary,
  },
  bodyBold: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.primary,
  },
  caption: {
    fontSize: 14,
    fontWeight: '400',
    color: colors.text.tertiary,
  },
  label: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.text.secondary,
  },
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
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  full: 9999,
};

export const shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 4,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 8,
  },
  glow: (color) => ({
    shadowColor: color,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5,
  }),
};

export const glassCard = {
  backgroundColor: colors.glass.light,
  borderRadius: borderRadius.lg,
  borderWidth: 1,
  borderColor: colors.glass.border,
  ...shadows.md,
};

export const glassButton = {
  backgroundColor: colors.glass.medium,
  borderRadius: borderRadius.md,
  borderWidth: 1,
  borderColor: colors.glass.border,
  paddingVertical: spacing.md,
  paddingHorizontal: spacing.lg,
  alignItems: 'center',
  justifyContent: 'center',
};

export const glassInput = {
  backgroundColor: colors.glass.light,
  borderRadius: borderRadius.md,
  borderWidth: 1,
  borderColor: colors.glass.border,
  paddingVertical: spacing.md,
  paddingHorizontal: spacing.md,
  color: colors.text.primary,
  fontSize: 16,
};

export default {
  colors,
  gradients,
  typography,
  spacing,
  borderRadius,
  shadows,
  glassCard,
  glassButton,
  glassInput,
};
