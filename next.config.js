// next.config.js

module.exports = {
  basePath: process.env.BASE_PATH,
  output: 'export',
  images: {
    unoptimized: true
  },
  experimental: {
    appDir: true
  }
}