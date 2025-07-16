const config = {
  content: ["./src/app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
       keyframes: {
        slideIn: {
          "0%": { transform: "translateX(-100%)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        "slide-in": "slideIn 0.4s ease-in-out forwards",
        'fade-in': 'fadeIn 0.6s ease-out forwards',
      },
    },
  },
  plugins: ['@tailwindcss/line-clamp'],
  plugins: ["@tailwindcss/postcss",],
};

export default config;
