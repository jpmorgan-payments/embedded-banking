/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: 'eb-',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        border: 'var(--eb-border-color)',
        input: 'var(--eb-input-color)',
        ring: 'var(--eb-ring-color)',
        background: 'var(--eb-background-color)',
        foreground: 'var(--eb-foreground-color)',
        primary: {
          DEFAULT: 'var(--eb-primary-color)',
          foreground: 'var(--eb-primary-foreground-color)',
        },
        secondary: {
          DEFAULT: 'var(--eb-secondary-color)',
          foreground: 'var(--eb-secondary-foreground-color)',
        },
        destructive: {
          DEFAULT: 'var(--eb-destructive-color)',
          foreground: 'var(--eb-destructive-foreground-color)',
        },
        muted: {
          DEFAULT: 'var(--eb-muted-color)',
          foreground: 'var(--eb-muted-foreground-color)',
        },
        accent: {
          DEFAULT: 'var(--eb-accent-color)',
          foreground: 'var(--eb-accent-foreground-color)',
        },
        popover: {
          DEFAULT: 'var(--eb-popover-color)',
          foreground: 'var(--eb-popover-foreground-color)',
        },
        card: {
          DEFAULT: 'var(--eb-card-color)',
          foreground: 'var(--eb-card-foreground-color)',
        },
      },
      borderRadius: {
        lg: 'var(--eb-radius-color)',
        md: 'calc(var(--eb-radius-color) - 2px)',
        sm: 'calc(var(--eb-radius-color) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      zIndex: {
        overlay: 'var(--eb-z-index-overlay)',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
