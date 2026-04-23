/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'xs': '480px',
      },
      colors: {
        primary: {
          DEFAULT: '#20252F',
          dark: '#1a1f28',
          light: '#2a3040',
        },
        accent: {
          DEFAULT: '#F6A429',
          hover: '#e09120',
        },
        gray: {
          DEFAULT: '#626264',
          light: '#9b9b9b',
        },
      },
      fontFamily: {
        primary: ['Montserrat', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      fontWeight: {
        primary: '900',
      },
      maxWidth: {
        'container': '1200px',
      },
    },
  },
  plugins: [],
}
