import type { Config } from 'tailwindcss'
import {
  colorTokens,
  semanticColorTokens,
  brandColorTokens,
  fontTokens,
  breakpointTokens,
} from '@wizehire/theme/tokens'

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
        ...brandColorTokens,
      },
      fontFamily: {
        sans: fontTokens.body,
        serif: fontTokens.headings,
        script: fontTokens.script,
      },
      screens: breakpointTokens,
    },
  },
} satisfies Config
