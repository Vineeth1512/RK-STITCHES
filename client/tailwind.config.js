/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#fcf8f5',
          100: '#f8eee6',
          200: '#efdacb',
          300: '#e3be9f',
          400: '#d29a6e',
          500: '#c27945',
          600: '#af6035',
          700: '#8e492b',
          800: '#733b28',
          900: '#5e3223',
          950: '#34180f',
        },
        gold: {
          50: '#fffbf0',
          100: '#fef5d6',
          200: '#fde5a8',
          300: '#fbce70',
          400: '#f8b23a',
          500: '#d99114',
          600: '#b8700d',
          700: '#924f0e',
          800: '#783e13',
          900: '#643414',
        },
        royal: {
          800: '#1b2a47',
          900: '#0e172a',
          950: '#070c18'
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'slide-up': 'slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'pulse-subtle': 'pulseSubtle 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        }
      }
    },
  },
  plugins: [],
}
