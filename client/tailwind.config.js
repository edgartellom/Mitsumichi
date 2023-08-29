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
      animation: {
        "slide-down": "slide-down 300ms ease-out forwards",
      },
    },
  },
  plugins: [],
};
