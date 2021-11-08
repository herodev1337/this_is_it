/* craco.config.js */
const path = require(`path`);

module.exports = {
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src/'),
      '@Components': path.resolve(__dirname, 'src/components'),
      '@Routes': path.resolve(__dirname, 'src/routes'),
      '@Styles': path.resolve(__dirname, 'src/styles')
    }
  },
};