/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'custom-gradient-elon': "linear-gradient(90deg, rgba(0, 0, 0, 0.0001) 0%, #888888 28%, #666666 50%, rgba(51, 51, 51, 0.6) 71.88%), url('./src/assets/img/elon.jpeg')",
        'custom-gradient-kanye': "linear-gradient(90deg, rgba(0, 0, 0, 0.0001) 0%, #888888 28%, #666666 50%, rgba(51, 51, 51, 0.6) 71.88%), url('./src/assets/img/kanye.jpeg')",
        'custom-gradient-mark': "linear-gradient(90deg, rgba(0, 0, 0, 0.0001) 0%, #888888 28%, #666666 50%, rgba(51, 51, 51, 0.6) 71.88%), url('./src/assets/img/mark.jpeg')",
        'custom-gradient-cristina': "linear-gradient(90deg, rgba(0, 0, 0, 0.0001) 0%, #888888 28%, #666666 50%, rgba(51, 51, 51, 0.6) 71.88%), url('./src/assets/img/cristina.jpeg')",
        'custom-gradient-malala': "linear-gradient(90deg, rgba(0, 0, 0, 0.0001) 0%, #888888 28%, #666666 50%, rgba(51, 51, 51, 0.6) 71.88%), url('./src/assets/img/malala.jpeg')",
        'custom-gradient-greta': "linear-gradient(90deg, rgba(0, 0, 0, 0.0001) 0%, #888888 28%, #666666 50%, rgba(51, 51, 51, 0.6) 71.88%), url('./src/assets/img/greta.jpeg')",
        'custom-elon': "url('./src/assets/img/elon.jpeg')",
        'custom-kanye': "url('./src/assets/img/kanye.jpeg')",
        'custom-mark': "url('./src/assets/img/mark.jpeg')",
        'custom-cristina': "url('./src/assets/img/cristina.jpeg')",
        'custom-malala': "url('./src/assets/img/malala.jpeg')",
        'custom-greta': "url('./src/assets/img/greta.jpeg')",
      },
      fontFamily: {
        poppins: ["Lato", "sans-serif"],
      },

    },
  },
  plugins: [],
}

