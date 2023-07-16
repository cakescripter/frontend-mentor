/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./*.html'],
  theme: {
    extend: {
      colors: {
        brightOrange: 'hsl(31, 77%, 52%)',
        darkCyan: 'hsl(184, 100%, 22%)',
        veryDarkCyan: 'hsl(179, 100%, 13%)',
        transparentWhite: 'hsla(0, 0%, 100%, 0.75)',
        lightGray: 'hsl(0, 0%, 95%)',
      },
      fontFamily: {
        sans: ['Lexend Deca', 'sans-serif'],
        bigShoulders: ['Big Shoulders Display'],
      },
    },
  },
  plugins: [],
}

