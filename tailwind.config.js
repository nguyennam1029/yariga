/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        grayf4: "#F4F4F4",
        grayfc: "#FCFCFC",
        grayF7: "#F7F7F7",
        grayE5: "#E5E5E5",
        gray80: "#808191",
        primaryText: "#11142D",
        primary: "#475BE8",
        secondary: "#DADEFA",
      },
      fontFamily: {
        primary: ["Manrope"],
      },
      spacing: {
        c10: "12px",
        2.5: "10px",
      },
      boxShadow: {
        shadowDropdown: "0px 25px 50px 0px rgba(91, 88, 88, 0.15)",
      },
    },
  },
  plugins: [],
};
