import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        commissioner: ["Commissioner", "sans-serif"],
      },
      keyframes: {
        fall: {
          '0%': { transform: 'translateY(0)', opacity: '1', scale: '1' },
          '90%': { opacity: '1' },
          '100%': { transform: 'translateY(110vh)', opacity: '0', scale: '0.9' },
        },
      },
      animation: {
        fall: 'fall var(--duration, 5s) linear infinite',
      },
    },
  },
  plugins: [],
} satisfies Config;
