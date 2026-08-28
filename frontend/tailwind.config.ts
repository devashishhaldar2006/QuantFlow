import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class" as const,
  content: [
    "./src/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          base: '#090D14',
          primary: '#0F1520',
          secondary: '#151C29',
          tertiary: '#1B2332',
          overlay: 'rgba(9, 13, 20, 0.8)',
        },
        border: {
          DEFAULT: 'rgba(226, 232, 240, 0.08)',
          hover: 'rgba(226, 232, 240, 0.15)',
          focus: 'rgba(148, 163, 184, 0.3)',
        },
        text: {
          primary: '#E7EDF7',
          secondary: '#8994A6',
          muted: '#64748B',
          brand: '#64748B',
        },
        semantic: {
          positive: '#10B981',
          negative: '#EF4444',
          warning: '#F59E0B',
          info: '#3B82F6',
        },
        accent: {
          50: '#F0F4FF',
          100: '#E0E7FF',
          300: '#A5B4FC',
          500: '#6366F1',
          600: '#4F46E5',
          700: '#4338CA',
        },
      },
      fontFamily: {
        ui: ['"Geist"', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'sans-serif'],
        mono: ['"Geist Mono"', '"Monaco"', '"Courier New"', 'monospace'],
      },
      fontSize: {
        xs: ['12px', { lineHeight: '1.4', letterSpacing: '0.4px', fontWeight: '500' }],
        sm: ['13px', { lineHeight: '1.5', fontWeight: '400' }],
        base: ['14px', { lineHeight: '1.6', fontWeight: '400' }],
        lg: ['16px', { lineHeight: '1.6', fontWeight: '400' }],
        xl: ['18px', { lineHeight: '1.5', fontWeight: '500' }],
        '2xl': ['22px', { lineHeight: '1.4', fontWeight: '600', letterSpacing: '-0.4px' }],
        '3xl': ['28px', { lineHeight: '1.2', fontWeight: '700', letterSpacing: '-0.6px' }],
      },
      spacing: {
        xs: '4px',
        sm: '8px',
        md: '12px',
        lg: '16px',
        xl: '24px',
        '2xl': '32px',
        '3xl': '48px',
        '4xl': '64px',
      },
      borderRadius: {
        xs: '2px',
        sm: '4px',
        md: '6px',
        lg: '8px',
        full: '9999px',
      },
      boxShadow: {
        xs: '0 1px 2px rgba(0, 0, 0, 0.2)',
        sm: '0 1px 3px rgba(0, 0, 0, 0.25), 0 1px 2px rgba(0, 0, 0, 0.1)',
        md: '0 4px 6px rgba(0, 0, 0, 0.3), 0 2px 4px rgba(0, 0, 0, 0.1)',
        lg: '0 10px 15px rgba(0, 0, 0, 0.35), 0 4px 8px rgba(0, 0, 0, 0.12)',
        xl: '0 20px 25px rgba(0, 0, 0, 0.4), 0 10px 12px rgba(0, 0, 0, 0.15)',
        floating: '0 10px 15px rgba(0, 0, 0, 0.35)',
        modal: '0 25px 50px rgba(0, 0, 0, 0.5)',
      },
      transitionDuration: {
        instant: '0ms',
        fast: '75ms',
        normal: '150ms',
        slow: '250ms',
        slower: '400ms',
      },
      transitionTimingFunction: {
        default: 'cubic-bezier(0.4, 0, 0.2, 1)',
        enter: 'cubic-bezier(0.4, 0, 1, 1)',
        exit: 'cubic-bezier(0, 0, 0.2, 1)',
        bounce: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
    },
  },
  plugins: [],
};

export default config;