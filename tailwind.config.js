/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
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
