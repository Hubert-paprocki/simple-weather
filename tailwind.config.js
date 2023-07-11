/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
      },
      screens: {
        taller: { raw: "(min-height: 923px)" },
        tall: { raw: "(max-height: 922px)" },
        medium: { raw: "(max-height: 723px)" },
        small: { raw: "(max-height: 700px)" },
      },
    },
  },
  plugins: [],
};
