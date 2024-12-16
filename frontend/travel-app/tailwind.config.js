/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primary:"#05B6D3",
        secondary:"#EF863E"
      }
    },
    fontFamily:{
      display:["Poppins", "sans-serif"]
    },
    backgroundImage:{
      "login-bg-img":"url('./src/assets/images/travel.2.jpg')",
      "signup-bg-img":"url('./src/assets/images/travel.1.jpg')",
    }
  },
  plugins: [],
}

