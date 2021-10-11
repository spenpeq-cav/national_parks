module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: {
        'home-image': "url('https://sgl-assets.imgix.net/files/article_hero/top-things-do-yosemite-national-park-via-magazine-shutterstock_758607316.jpg?h=61ce19a1&itok=bX4XJbAO?w=1200h=630&crop=faces,edges')",
        'explore-image': "url('https://wgno.com/wp-content/uploads/sites/2/2020/04/hypatia-h_d43cebf10258e14c41633c59f595bf83-h_6cae19e7bbd593cbd356f248fec73a8c.jpg?w=2072&h=1166&crop=1')",
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
