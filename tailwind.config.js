/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        secondary: {
          50: '#E4EEFF',
          100: '#C2D5EA',
          200: '#A4B8D1',
          300: '#849BB9',
          400: '#6C86A6',
          500: '#537294',
          600: '#466483',
          700: '#37516C',
          800: '#283E56',
          900: '#162A3E',
        },
        primary: {
          50: '#E4F5FA',
          100: '#BBE4F2',
          200: '#93D3E9',
          300: '#74C1DF',
          400: '#65B4D9',
          500: '#5BA7D3',
          600: '#549AC4',
          700: '#4B87B1',
          800: '#45769D',
          900: '#385779',
        },
        neutral: {
          600: '#B4B4B4',
          700: '#464646',
          800: '#1A1A1A',
          900: '#000000',
        },
        main: '#fef4e8',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
