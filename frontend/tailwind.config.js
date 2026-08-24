/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        artiva: {
          dark: '#0B0F17',
          card: '#131924',
          border: '#1E293B',
          accent: '#38BDF8',
          purple: '#818CF8',
          gold: '#F59E0B'
        }
      }
    },
  },
  plugins: [],
}
