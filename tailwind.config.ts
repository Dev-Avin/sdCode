import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class", // Enable dark mode via class
  theme: {
    extend: {
      colors: {
        darkBackground: "#1c2130", // Custom dark background color
      },
    },
  },
  plugins: [],
} satisfies Config;
