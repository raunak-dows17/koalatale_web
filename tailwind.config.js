/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      textColor: {
        primaryColor: "#3B719F",
        secondaryColor: "#fff",
      },
      backgroundColor: {
        primaryColor: "#3B719F",
        secondaryColor: "#fff",
      },
      borderColor: {
        primaryColor: "#3B719F",
        secondaryColor: "#fff",
      },
    },
  },
  plugins: [],
};
