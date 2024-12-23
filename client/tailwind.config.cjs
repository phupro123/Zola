/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        "mono": ["var(--primary-font)"],
      },
      colors: {
        'primary-color': 'var(--primary-color)',
        'second-color': 'var(--second-color)',
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide')
  ]
};
