/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'primary-white': '#FFF8F8',
        'primary-pink': '#FADADD',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        script: ['var(--font-great-vibes)', 'cursive'],
        parisienne: ['var(--font-parisienne)', 'cursive'],
        serif: ['Georgia', 'Times New Roman', 'serif'],
      },
    },
  },
  plugins: [],
} 