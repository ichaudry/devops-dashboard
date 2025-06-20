// tailwind.config.js
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primaryBlue: "#1D3B7C",
        accentOrange: "#F68B1E",
        deepNavy: "#0F1C3F",
        softGray: "#F5F7FA",
        charcoal: "#2A2A2A",
        white: "#FFFFFF",
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        plex: ["IBM Plex Sans", "Open Sans", "sans-serif"],
      },
    },
  },
  plugins: [],
};
