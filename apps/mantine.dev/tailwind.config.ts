import type { Config } from 'tailwindcss'

// Generate color scale references to CSS variables
const colorScales = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'];
const grayScales = ['0', '50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950', '1000'];

function generateColorVars(colorName: string, scales: string[]) {
  return scales.reduce((acc, scale) => {
    acc[scale] = `var(--color-${colorName}-${scale})`;
    return acc;
  }, {} as Record<string, string>);
}

export default {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    '../../node_modules/@wizehire/theme/dist/**/*.js',
    '../../packages/@docs/demos/esm/**/*.{mjs,js}',
  ],
  theme: {
    extend: {
      colors: {
        blue: generateColorVars('blue', colorScales),
        gray: generateColorVars('gray', grayScales),
        green: generateColorVars('green', colorScales),
        lime: generateColorVars('lime', colorScales),
        orange: generateColorVars('orange', colorScales),
        red: generateColorVars('red', colorScales),
        yellow: generateColorVars('yellow', colorScales),
        purple: generateColorVars('purple', colorScales),
        pink: generateColorVars('pink', colorScales),
        teal: generateColorVars('teal', colorScales),
        // Semantic colors
        textDefault: 'var(--color-textDefault)',
        textSubdued: 'var(--color-textSubdued)',
        backgroundDefault: 'var(--color-backgroundDefault)',
        backgroundSubdued: 'var(--color-backgroundSubdued)',
        borderDefault: 'var(--color-borderDefault)',
        // Brand colors
        brandPrimary: 'var(--color-brandPrimary)',
        brandSecondary: 'var(--color-brandSecondary)',
      },
      fontFamily: {
        sans: 'var(--font-body)',
        serif: 'var(--font-headings)',
        script: 'var(--font-script)',
      },
      screens: {
        '2xs': 'var(--breakpoint-2xs)',
        xs: 'var(--breakpoint-xs)',
        sm: 'var(--breakpoint-sm)',
        md: 'var(--breakpoint-md)',
        lg: 'var(--breakpoint-lg)',
        xl: 'var(--breakpoint-xl)',
        '2xl': 'var(--breakpoint-2xl)',
      },
    },
  },
} satisfies Config
