/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./features/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        backgroundColor: "var(--background-color)",
        accentColor: "var(--accent-color)",
        textColor: "var(--text-color)",
        focusColor: "var(--focus-color)",
        disabledAccentColor: "var(--disabled-accent-color)",
        approvedColor: "var(--approved-color)",
      },
      fontFamily: {
        poppins: "Poppins",
      },
    },
  },
  plugins: [],
};
