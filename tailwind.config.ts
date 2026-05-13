import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#f2f0eb",
        surface: "#f2f0eb",
        "on-surface": "#0f0f0e",
        primary: "#0f0f0e",
        "on-primary": "#f2f0eb",
        outline: "rgba(15,15,14,0.25)",
        "outline-variant": "rgba(15,15,14,0.12)",
        secondary: "#6b6b65",
        faint: "#b8b5ae",
      },
      borderRadius: {
        DEFAULT: "0px",
        sm: "0px",
        md: "0px",
        lg: "0px",
        xl: "0px",
        full: "9999px",
      },
      fontFamily: {
        display: ["DM Serif Display", "Georgia", "serif"],
        body: ["DM Sans", "system-ui", "sans-serif"],
        headline: ["DM Serif Display", "Georgia", "serif"],
      },
    },
  },
  plugins: [],
};

export default config;
