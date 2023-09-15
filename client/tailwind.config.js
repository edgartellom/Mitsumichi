/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      sm: "480px",
      md: "792px",
      lg: "976px",
      xl: "1440px",
    },
    extend: {
      animation: {
        wiggle: "wiggle 2s ease-in-out infinite",
        spin: "spin 2s linear infinite",
        moto: "moto 2s ease-in-out infinite",
        colorChange: "colorChange 5s linear infinite",
      },
      keyframes: {
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
        "slide-down": {
          from: {
            opacity: 0,
            transform: "translateY(-3rem)",
          },
          to: {
            opacity: 1,
            transform: "translateY(0)",
          },
        },
      },
      colors: {
        "custom-green": {
          DEFAULT: "rgba(123, 255, 0, 0.8)", // Color principal
          "web-stroke": "rgba(0, 255, 76, 0.45)", // Color para -webkit-text-stroke
          underline: "rgb(0, 255, 76)", // Color para text-decoration-color
        },
      },
    },
  },
  plugins: [],
};
