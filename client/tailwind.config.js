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

        spin: {
          "0%": { transform: "rotate(0)" },
          "100%": { transform: "rotate(360deg)" },
        },

        moto: {
          "0%": {},
          "2%": {
            transform: "skew(-6deg, -6deg) rotate(6deg)",
          },
          "28%": {
            transform: "translate(50px, 0) skew(-6deg, -6deg) rotate(6deg)",
          },
          "29%": {
            transform: "rotate(-6deg) skew(6deg, 6deg) translate(30px, 0)",
          },
          "70%": {
            transform: "translate(-40px, 0) rotate(-6deg) skew(6deg, 6deg)",
          },
          "71%": {
            transform: "rotate(6deg) skew(-6deg, -6deg) translate(-20px, 0)",
          },
          "96%": {
            transform: "skew(-6deg, -6deg) rotate(6deg) translate(0,0)",
          },
          "100%": {},
        },

        colorChange: {
          from: {
            fill: "black",
          },
          to: {
            fill: "gray",
          },
        },
      },
    },
  },
  plugins: [],
};
