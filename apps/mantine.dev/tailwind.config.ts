import type { Config } from 'tailwindcss'
import {
  colorTokens,
  semanticColorTokens,
  fontTokens,
  breakpointTokens,
} from '@wizehire/theme'

export default {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    '../../node_modules/@wizehire/theme/dist/**/*.js',
    '../../packages/@docs/demos/esm/**/*.{mjs,js}',
  ],
  theme: {
    extend: {
      colors: {
        ...colorTokens,
        ...semanticColorTokens,
        black: semanticColorTokens.black,
        white: semanticColorTokens.white,
        contrastText: semanticColorTokens.textInverse,
        paper: semanticColorTokens.paper,
        success: semanticColorTokens.textSuccess,
        error: semanticColorTokens.textError,
        text: {
          primary: semanticColorTokens.textDefault,
          secondary: semanticColorTokens.textDefault,
          tertiary: semanticColorTokens.textLight,
        },
        button: {
          'bg-contained-primary': semanticColorTokens.livelyLight,
          'bg-contained-primary-hover': semanticColorTokens.periwize,
          'text-contained-primary': semanticColorTokens.mahogany,
          'text-text-primary': semanticColorTokens.mahogany,
          'text-border': semanticColorTokens.livelyLight,
          'text-border-hover': semanticColorTokens.mahogany,
        },
      },
      fontFamily: {
        sans: fontTokens.body,
        serif: fontTokens.headings,
        heading: fontTokens.headings,
        script: fontTokens.script,
      },
      fontSize: {
        '2xs': ['0.625rem', '0.75rem'],
        xs: ['0.75rem', '1rem'],
        sm: ['0.875rem', '1.25rem'],
        base: ['1rem', '1.5rem'],
        lg: ['1.125rem', '1.5rem'],
        xl: ['1.1875rem', '1.5rem'],
        '2xl': ['1.25rem', '1.5rem'],
        '3xl': ['1.5rem', '2rem'],
        '4xl': ['2rem', '2.5rem'],
        '5xl': ['2.25rem', '3rem'],
        '8xl': ['3.25rem', '3.5rem'],
      },
      screens: {
        '2xs': breakpointTokens['2xs'],
        xs: breakpointTokens.xs,
        sm: breakpointTokens.sm,
        md: breakpointTokens.md,
        lg: breakpointTokens.lg,
        xl: breakpointTokens.xl,
        '2xl': breakpointTokens['2xl'],
      },
      borderRadius: {
        DEFAULT: '3px',
        xl: '1em',
      },
      boxShadow: {
        dropdown: '0px 3px 0px rgba(0, 0, 0, 0.04)',
      },
    },
  },
} satisfies Config
