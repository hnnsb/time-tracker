import type { Config } from "tailwindcss";

const config: Partial<Config> = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/lib/components/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        light: {
          primary: "#3490dc",
          secondary: "#05375e",
          tertiary: "#0a003f",
          bg_primary: "#f8f9fa",
          bg_secondary: "#e2e3e5",
          bg_tertiary: "#d6d8db",
          text: "#282828",
          danger: "#e3342f",
        },
        dark: {
          primary: "#57a0e0",
          secondary: "#18636b",
          tertiary: "#1e43da",
          bg_primary: "#1a202c",
          bg_secondary: "#2d3748",
          bg_tertiary: "#4a5568",
          text: "#e2e8f0",
          danger: "#570000",
        },
      },
    },
  },
  plugins: [],
};
export default config;
