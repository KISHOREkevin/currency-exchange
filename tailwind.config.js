/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primary:"#CDFADB",
        secondary:"#F6FDC3",
        tertiary:"#FFCF96",
        final:"#FF8080"
      }
    },
  },
  plugins: [],
}

