module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: {
        'home-image': "url('https://sgl-assets.imgix.net/files/article_hero/top-things-do-yosemite-national-park-via-magazine-shutterstock_758607316.jpg?h=61ce19a1&itok=bX4XJbAO?w=1200h=630&crop=faces,edges')",
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ['active'],
      textColor: ['active'],
      animation: ['motion-safe'],
      transform: ['hover', 'active', 'focus', 'motion-safe'],
      scale: ['group-hover'],
      borderColor: ['active'],
    },
  },
  plugins: [],
}
