import type { Config } from 'tailwindcss'
import plugin from 'tailwindcss/plugin'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const config = {
  content: [
    './components/**/*.{ts,tsx}',
    './hook/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './hook/**/*.{ts,tsx}',
  ],

  prefix: '',
  theme: {
    extend: {
      keyframes: {
        zoom: {
          '0%': { transform: 'scale(0)' },
          '100%': { transform: 'scale(1)' },
        },
        'spin-3': {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        zoom: 'zoom 0.2s ease-in-out',
        spin3s: 'spin-3 3s infinite linear',
      },
      boxShadow: {
        full: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
      },
    },
  },
  darkMode: 'class',
  // corePlugins: {
  //   preflight: false // <== disable this!
  // },
  plugins: [
    plugin(function ({ addUtilities }) {
      const newUtilities = {
        '.text-title': {
          fontFamily: 'var(--font-title) !important',
          fontSize: '40px',
          fontWeight: '700',
        },
        '.text-medium': {},
        '.text-common': {},
        '.desktop': {},
        '.mobile': {},
        '.shadow-gray1': {},
        '.absolute-center': {},
        '.hide-scroll': {},
        '.skeleton-loading': {},
      }

      addUtilities(newUtilities)
    }),
  ],
} satisfies Config

export default config
