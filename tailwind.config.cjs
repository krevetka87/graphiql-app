/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      width: {
        arrow: '0.625rem' /* 10px */,
      },
      height: {
        arrow: '0.625rem' /* 10px */,
      },
    },
  },
  plugins: [],
};
