/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1f2937', // This is Tailwind's -gray-800
        secondary: '#f59e0b', // -amber-500
        accent: '#10b981' // -emerald-500
      },
    },
  },
  plugins: [],
}