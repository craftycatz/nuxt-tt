/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./*.vue"
  ],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    fontFamily: {
      sans: '"SF Pro Display",-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen,Ubuntu, Cantarell,"Open Sans","Helvetica Neue",sans-serif',
    },
    fontSize: {
      xs: "1.3rem",
      sm: "1.4rem",
      md: "1.6rem",
      lg: "1.8rem",
      xl: ["2.2rem", "1.3"],
      "2xl": "2.4rem",
      "3xl": "2.6rem",
      "4xl": "3.2rem",
      "5xl": "4rem",
      "6xl": ["4.4rem", "1"],
      "7xl": ["4.8rem", "1"],
      "8xl": ["8rem", "1"],
    },
  spacing: {
    0: "0",
    1: "0.4rem",
    2: "0.8rem",
    3: "1.2rem",
    4: "1.6rem",
    5: "2rem",
    6: "2.4rem",
    7: "2.8rem",
    8: "3.2rem",
    9: "3.6rem",
    10: "4rem",
    11: "4.4rem",
    12: "4.8rem",
  },
  colors: {
    white: "#fff",
    "background-dark": "#000212",
    "background-light": "#fffdfd",
    primary: "#0d0575",
    secondary: "#843abc",
    accent: "#9bcc4d",
    neutral: "#25262D",
    "base-100": "#313041",
    info: "#326BF1",
    success: "#2FC184",
    warning: "#D3AA17",
    error: "#F86244",
  }
},
  plugins: [],
}