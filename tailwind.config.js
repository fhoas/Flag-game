/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        slide: {
          "0%": { transform: "translateX(1700px)" },
          "50%": { transform: "translateX(-1000px)" },
          "100%": { transform: "translateX(1700px)" },
        },
      },
      animation: {
        slide: "slide 40s linear infinite",
      },
    },
  },
  plugins: [],
};
