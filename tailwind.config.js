/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
    "./node_modules/flowbite/**/*.js,ts,jsx,tsx"
  ],
  theme: {
    extend: {
      colors:{
        "red-primary":"#7A0A03",
        "gold-primary":"#F6DE8D",
      }
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}
