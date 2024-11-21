/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*{.html,.js,.ts,.jsx,.tsx}"],
  //darkMode: "media", // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: "rgb(var(--color-primary))",
        secondary: "rgb(var(--color-secondary))",
        tertiary: "rgb(var(--color-tertiary))",
        bg_primary: "rgb(var(--color-bg_primary))",
        bg_secondary: "rgb(var(--color-bg_secondary))",
        bg_tertiary: "rgb(var(--color-bg_tertiary))",
        text: "rgb(var(--color-text))",
        danger: "rgb(var(--color-danger))",
      },
    },
  },
  plugins: [],
};
