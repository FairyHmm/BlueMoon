import { createTheme, SegmentedControl, TextInput } from '@mantine/core';

export const theme = createTheme({
  primaryColor: 'blue',
  forceColorScheme: 'dark',

  white: 'var(--color-text)',
  black: 'var(--color-bg-body)',

  colors: {
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

    // 1. Global Base Input Settings
    Input: {
      styles: {
        input: {
          backgroundColor: 'var(--color-bg-input)',
          borderColor: 'var(--color-border)',
          color: 'var(--color-text)',
          borderRadius: 'var(--radius-md)',
          transition: 'border-color 0.15s ease, background-color 0.15s ease',
          '&:focus': {
            borderColor: 'var(--color-primary)',
          },
        },
      },
    },

    InputWrapper: {
      styles: {
        label: {
          color: 'var(--color-text-muted)',
          fontSize: 'var(--font-size-sm)',
          marginBottom: '4px',
          display: 'block',
        },
      },
    },

    /*
      2. MANTINE 9 COMPLIANT: TextInput Custom Variant
      Instead of writing raw nested CSS selectors, we assign clean tokens directly
      to the --input-* design ecosystem when 'unstyled-inline' is invoked.
    */
    TextInput: TextInput.extend({
      vars: (theme, props) => {
        if (props.variant === 'unstyled-inline') {
          return {
            input: {
              '--input-bd': 'none',
              '--input-bg': 'transparent',
              '--input-color': 'var(--color-text)',
              '--input-radius': '0px',
              '--input-height': 'auto',
              '--input-padding': '0 2px',
              borderBottom: '2px solid var(--color-primary)',
              fontFamily: 'inherit',
              fontSize: 'inherit',
              fontWeight: 'inherit',
              transition: 'border-color 0.15s ease',
              '&:focus': {
                outline: 'none',
                borderBottomColor: 'var(--color-primary)',
                filter: 'brightness(1.2)',
              },
            },
          };
        }
        return { input: {} };
      },
    }),

    /*
      3. MANTINE 9 COMPLIANT: SegmentedControl
      We override the semantic core variables instead of targeting hidden class names.
    */
    SegmentedControl: SegmentedControl.extend({
      vars: () => ({
        root: {
          '--sc-bg': 'var(--color-bg-card)',
          '--sc-radius': 'var(--radius-md)',
          '--sc-padding': '4px',
          border: '1px solid var(--color-bg-input)',
        },
        indicator: {
          '--sc-indicator-bg': 'var(--color-primary-bg)',
          boxShadow: 'none',
          borderRadius: 'var(--radius-md)',
        },
      }),
      // Use clean, structural nested modifiers for active/hover states
      styles: {
        control: {
          '&::before': { display: 'none !important' }, // Hides the divider lines cleanly
        },
        label: {
          color: 'var(--color-text-muted)',
          transition: 'color 0.2s ease',
          padding: 'var(--spacing-sm) !important',
          fontWeight: 600,
          '&[data-active]': {
            color: 'var(--color-text) !important',
          },
          '[data-hovered] &': {
            color: 'var(--color-primary) !important',
          },
        },
      },
    }),

    Modal: {
      styles: {
        content: {
          backgroundColor: 'var(--color-bg-card)',
          color: 'var(--color-text)',
          border: '1px solid var(--color-border)',
        },
        header: {
          backgroundColor: 'transparent',
          borderBottom: '1px dashed var(--color-border)',
          paddingBottom: 'var(--spacing-sm)',
          marginBottom: 'var(--spacing-md)',
        },
        title: {
          fontWeight: 800,
          fontSize: 'var(--font-size-sm)',
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
          color: 'var(--color-text-muted)',
        },
        close: {
          color: 'var(--color-text-muted)',
          transition: 'background-color 0.2s ease, color 0.2s ease',
          '&:hover': {
            backgroundColor: 'var(--color-bg-input)',
            color: 'var(--color-text)',
          },
        },
      },
    },

    Select: {
      styles: {
        dropdown: {
          backgroundColor: 'var(--color-bg-input)',
          border: '1px solid var(--color-border)',
        },
        option: {
          color: 'var(--color-text)',
          transition: 'background-color 0.15s ease',
          '&:hover': {
            backgroundColor: 'var(--color-primary-bg)',
          },
          '&[data-combobox-selected]': {
            backgroundColor: 'var(--color-primary-bg)',
          },
        },
      },
    },

    Popover: {
      styles: {
        dropdown: {
          backgroundColor: 'var(--color-bg-input)',
          border: '1px solid var(--color-border)',
        },
      },
    },
  },
});
