/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        base: {
          900: '#0b0f14',
          800: '#0f1620',
          700: '#121a26',
        },
        accent: {
          500: '#6EE7F9',
          600: '#22D3EE',
          700: '#06B6D4',
        }
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif']
      },
      boxShadow: {
        soft: '0 10px 30px -10px rgba(0,0,0,0.5)'
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
}
