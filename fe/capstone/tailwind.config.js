/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js}",
    './public/index.hml'
  ],
  theme: {
    extend: {
      width: {
        '1100': '1100px'
      },
      backgroundColor: {
        primary: '#040031'
      },
      maxWidth:{
        '600': '600px'
      }
    },
  },
  plugins: [],
}