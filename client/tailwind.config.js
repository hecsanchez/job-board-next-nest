const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      boxShadow: {
        'md': '0px 3px 6px #00000014',
      },
      fontFamily: {
        sans: ['"Nunito Sans"', ...defaultTheme.fontFamily.sans],
        poppins: ['"Poppins"', ...defaultTheme.fontFamily.sans]
      },
      colors: {
        primary: '#063347',
        secondary: '#C59ED8',
        highlight: '#FF6A69',
        background: '#F8F8F8',
        gray: {
            100: '#F8F8F8',
            200: '#F2F2F2',
            300: '#DDDDDD',
            400: '#D8D8D8',
            500: '#A7A7A7',
            600: '#939393',
            700: '#5F5F5F',
            800: '#6B6B6B',
        },
        dark: '#013145'
      }
    },
  },
  plugins: [],
}
