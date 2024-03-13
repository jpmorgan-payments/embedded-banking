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
        border: 'var(--eb-border)',
        input: 'var(--eb-input)',
        ring: 'var(--eb-ring)',
        background: 'var(--eb-background)',
        foreground: 'var(--eb-foreground)',
        primary: {
          DEFAULT: 'var(--eb-primary)',
          foreground: 'var(--eb-primary-foreground)',
        },
        secondary: {
          DEFAULT: 'var(--eb-secondary)',
          foreground: 'var(--eb-secondary-foreground)',
        },
        destructive: {
          DEFAULT: 'var(--eb-destructive)',
          foreground: 'var(--eb-destructive-foreground)',
        },
        muted: {
          DEFAULT: 'var(--eb-muted)',
          foreground: 'var(--eb-muted-foreground)',
        },
        accent: {
          DEFAULT: 'var(--eb-accent)',
          foreground: 'var(--eb-accent-foreground)',
        },
        popover: {
          DEFAULT: 'var(--eb-popover)',
          foreground: 'var(--eb-popover-foreground)',
        },
        card: {
          DEFAULT: 'var(--eb-card)',
          foreground: 'var(--eb-card-foreground)',
        },
      },
      borderRadius: {
        lg: 'var(--eb-radius)',
        md: 'calc(var(--eb-radius) - 2px)',
        sm: 'calc(var(--eb-radius) - 4px)',
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
      // zIndex: {
      //   overlay: 'var(--'
      // }
    },
  },
  plugins: [require('tailwindcss-animate')],
};
