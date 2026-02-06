import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#FDFBF7',
          100: '#F5F0E8',
          200: '#E8DCCB',
          600: '#800020',
          700: '#600018', 
        },
      },
      borderRadius: {
        'card': '2.5rem',
        'button': '1.25rem',
      },
      fontFamily: {
        serif: ['var(--font-playfair)', 'serif'],
        sans: ['var(--font-inter)', 'sans-serif'],
      },
      boxShadow: {
        'premium': '0 20px 40px -15px rgba(128, 0, 32, 0.1)',
      }
    },
  },
  plugins: [],
};
export default config;