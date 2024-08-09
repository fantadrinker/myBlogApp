// next.config.js
module.exports = {
  images: {
    remotePatterns : [
      {
        protocol: 'https',
        hostname: process.env.S3_IMAGES_HOSTNAME,
      }
    ]
  }
}
