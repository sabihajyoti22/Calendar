/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,vue}",
  ],
  theme: {
    extend: {
      fontFamily: {
        lilto: ['LilitaOne', 'sans-serif'],
      },
      colors: {
        background: '#C4C4F4',
        primary: '#625CF4',
        secondary: '#7A6FCB',
        pink: '#F44D84'
      }
    },
  },
  plugins: [],
}

