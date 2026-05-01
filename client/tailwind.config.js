/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      // VanWood custom color palette
      colors: {
        primary: {
          DEFAULT: "#6B3A2A",
          light: "#8B5A4A",
          dark: "#3D1F0D",
        },
        beige: {
          DEFAULT: "#F5ECD7",
          light: "#FBF7EE",
        },
        cream: "#FFFBF2",
        darkwood: "#3D1F0D",
        gold: {
          DEFAULT: "#C9A84C",
          light: "#D4B96A",
          dark: "#A88B3A",
        },
      },
      // Custom fonts
      fontFamily: {
        heading: ['"Playfair Display"', "Georgia", "serif"],
        body: ['"Outfit"', "system-ui", "sans-serif"],
      },
      // Custom animations
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideDown: {
          "0%": { opacity: "0", transform: "translateY(-10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        slideInLeft: {
          "0%": { transform: "translateX(-100%)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        slideInRight: {
          "0%": { transform: "translateX(100%)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        scaleIn: {
          "0%": { transform: "scale(0.9)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        slideOut: {
          "0%": { transform: "translateX(0)", opacity: "1", maxHeight: "200px" },
          "100%": { transform: "translateX(-30px)", opacity: "0", maxHeight: "0" },
        },
        pulse: {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.05)" },
        },
      },
      animation: {
        fadeUp: "fadeUp 0.8s ease-out forwards",
        "fadeUp-delay-1": "fadeUp 0.8s ease-out 0.2s forwards",
        "fadeUp-delay-2": "fadeUp 0.8s ease-out 0.4s forwards",
        "fadeUp-delay-3": "fadeUp 0.8s ease-out 0.6s forwards",
        fadeIn: "fadeIn 0.6s ease-out forwards",
        slideDown: "slideDown 0.3s ease-out forwards",
        float: "float 3s ease-in-out infinite",
        shimmer: "shimmer 1.5s infinite linear",
        slideInLeft: "slideInLeft 0.3s ease-out forwards",
        slideInRight: "slideInRight 0.3s ease-out forwards",
        scaleIn: "scaleIn 0.3s ease-out forwards",
        slideOut: "slideOut 0.3s ease-out forwards",
        pulse: "pulse 2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
