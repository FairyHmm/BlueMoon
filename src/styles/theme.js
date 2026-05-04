import { createTheme } from '@mantine/core';

export const theme = createTheme({
  primaryColor: 'blue',
  // Use "dark" color scheme logic
  forceColorScheme: 'dark',

  // Mapping your OKLCH variables to Mantine's internal tokens
  white: 'var(--color-text)',
  black: 'var(--color-bg-body)',

  colors: {
    // Overriding 'blue' so that primary buttons use your OKLCH brand color
    blue: [
      'var(--color-primary-bg)', 'var(--color-primary-bg)', 'var(--color-primary-bg)',
      'var(--color-primary)', 'var(--color-primary)', 'var(--color-primary)',
      'var(--color-primary)', 'var(--color-primary-hover)', 'var(--color-primary-hover)', 'var(--color-primary-hover)'
    ],
  },

  other: {
    spacing: {
      xs: 'var(--spacing-xs)',
      sm: 'var(--spacing-sm)',
      md: 'var(--spacing-md)',
      lg: 'var(--spacing-lg)',
      xl: 'var(--spacing-xl)',
    }
  },

  components: {
    AppShell: {
      styles: {
        main: { backgroundColor: 'var(--color-bg-body)' },
        header: {
          backgroundColor: 'var(--color-bg-body)',
          borderBottom: '1px solid var(--color-bg-card)'
        },
        navbar: {
          backgroundColor: 'var(--color-bg-body)',
          borderRight: '1px solid var(--color-bg-card)'
        },
      },
    },
    TextInput: {
      styles: {
        input: {
          backgroundColor: 'var(--color-bg-card)',
          borderColor: 'var(--color-border)',
          color: 'var(--color-text)',
        },
      },
    },
  },
});
