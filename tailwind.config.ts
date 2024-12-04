import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#EDEDED",
        lightGreen: "#A4FED3",
        darkGreen: "#3EEE9A",
        red: "#FEA4A4",
        blueButton: "#00ABED",
        black: "#000000",
        white: "#FFFFFF",
        darkBlue: "#222E50",
        foreground: "var(--foreground)",
        lightGray: "#71767B",
      },
    },
  },
  plugins: [],
} satisfies Config;
