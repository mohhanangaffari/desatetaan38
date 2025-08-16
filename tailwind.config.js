/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        brand:{
          maroon: "#9e2a2b",
          maroonDark: "#7d2122",
          maroonSoft: "#b84647",
        },
        base:{
          white: "#ffffff",
          black: "#000000",
        },
      },
      boxShadow:{
        soft:"0 6px 20px rgba(0,0,0,0.08)",
      },
      borderRadius:{
        x12:"1rem"
      }
    },
  },
  plugins: [],
}
