/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        slide: {
          "0%": { transform: "translateX(1500px)" },
          "50%": { transform: "translateX(-1400px)" },
          "100%": { transform: "translateX(1400px)" },
        },
      },
      animation: {
        slide: "slide 40s linear infinite",
      },
    },
  },
  plugins: [],
};
