/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: "rgb(var(--canvas) / <alpha-value>)",
        ink: "rgb(var(--ink) / <alpha-value>)",
        muted: "rgb(var(--muted) / <alpha-value>)",
        line: "rgb(var(--line) / <alpha-value>)",
        surface: "rgb(var(--surface) / <alpha-value>)",
        accent: "rgb(var(--accent) / <alpha-value>)",
      },
      fontFamily: {
        display: ["AgrandirGrandHeavy", "sans-serif"],
        body: ["AgrandirRegular", "sans-serif"],
      },
      letterSpacing: {
        brand: "0.08em",
        section: "0.18em",
      },
      maxWidth: {
        content: "72rem",
      },
    },
  },
  plugins: [],
};
