/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*{.html,.js,.ts,.jsx,.tsx}"],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        light: {
          primary: "#3490dc",
          secondary: "#05375e",
          tertiary: "#0a003f",
          bg_primary: "#f8f9fa",
          bg_secondary: "#e2e3e5",
          bg_tertiary: "#dce1ec",
          text: "#282828",
          danger: "#e3342f",
        },
        dark: {
          primary: "#57a0e0",
          secondary: "#18636b",
          tertiary: "#1e43da",
          bg_primary: "#1a202c",
          bg_secondary: "#2d3748",
          bg_tertiary: "#383f50",
          text: "#e2e8f0",
          danger: "#570000",
        },
      },
    },
  },
  plugins: [],
};
