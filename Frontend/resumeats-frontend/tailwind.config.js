/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#f8fafc", // light gray-blue, adjust as needed
        foreground: "#1e293b", // dark slate, adjust as needed
      },
    },
  },
  plugins: [],
}