module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      backgroundImage: {
        'home-image': "url('/src/images/home-background-image.jpg')",
        'explore-image': "url('https://wgno.com/wp-content/uploads/sites/2/2020/04/hypatia-h_d43cebf10258e14c41633c59f595bf83-h_6cae19e7bbd593cbd356f248fec73a8c.jpg?w=2072&h=1166&crop=1')",
      },
    },
  },
  plugins: [],
}

// 'home-image': "url('https://sgl-assets.imgix.net/files/article_hero/top-things-do-yosemite-national-park-via-magazine-shutterstock_758607316.jpg?h=61ce19a1&itok=bX4XJbAO?w=1200h=630&crop=faces,edges')"