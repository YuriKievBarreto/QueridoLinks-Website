/** @type {import('tailwindcss').Config} */

module.exports = {
    content: [
      './public/views/*',
      './css/**/*.{js,ts,jsx,tsx,html,ejs}'
    ],
    theme: {
      extend: {
        colors: {
          'azul-celeste': '#2B7FFF',
          'roxo-profundo': '#3D05ED',
          'azul-eletrico': '#0518ED',
          'azul-aqua': '#05ABED',
          'violeta-vivo': '#8905ED',
        }
      },
    },
    plugins: [],
  }
  