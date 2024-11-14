module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        primary: "#AFD8DA",
        secondary: "#29565C",
        accent: "#C21957",
        neutral: "#343434",
        base: "#FEF8F1",
      },
    },
  },
  plugins: [require("daisyui"), require("@tailwindcss/typography")],
};
