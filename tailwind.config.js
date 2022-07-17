/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        'segoe': ['Segoe Print', 'sans-serif'],
        'mont': ['Mont', 'sans-serif']
      },
      fontSize: {
        '42': '42px',
        '25': '25px'
      },
      colors: {
        'main-blue': '#CCEDFF',
      },
      maxWidth: {
        '600': '600px',
      }
    },
  },
  plugins: [],
}
