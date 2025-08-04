/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      './app/**/*.{ts,tsx}',
      './pages/**/*.{ts,tsx}',
      './components/**/*.{ts,tsx}',
      './src/**/*.{ts,tsx}', // include this if your code is inside /src
    ],
    theme: {
      extend: {},
    },
    plugins: [],
  }
  