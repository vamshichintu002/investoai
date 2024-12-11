/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          50: '#f0f4ff',
          100: '#dbe4ff',
          200: '#bac8ff',
          300: '#91a7ff',
          400: '#748ffc',
          500: '#4c6ef5',
          600: '#3b5bdb',
          700: '#364fc7',
          800: '#2f44ad',
          900: '#2b3a8e',
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        dark: {
          DEFAULT: '#0A0B14',
          'card': '#1A1B25',
          'border': '#2A2B35',
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 0.25rem)",
        sm: "calc(var(--radius) - 0.5rem)",
      },
      keyframes: {
        orbit: {
          '0%': {
            transform: 'translate(-50%, -50%) rotate(var(--initial-rotation)) translateX(var(--orbit-radius)) rotate(calc(-1 * var(--initial-rotation)))',
          },
          '100%': {
            transform: 'translate(-50%, -50%) rotate(calc(360deg + var(--initial-rotation))) translateX(var(--orbit-radius)) rotate(calc(-360deg - var(--initial-rotation)))',
          },
        },
        'border-beam': {
          '100%': {
            'offset-distance': '100%',
          },
        },
      },
      animation: {
        'orbit': 'orbit var(--orbit-duration) linear infinite',
        'border-beam': 'border-beam calc(var(--duration)*1s) infinite linear',
      },
    },
  },
  plugins: [],
};