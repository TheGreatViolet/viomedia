/** @type {import('next').NextConfig} */
const ipaddr = require('ip').address();

const nextConfig = {
  reactStrictMode: true,
  distDir: 'dist',
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.module.rules.push({
      test: /\.node$/,
      loader: "node-loader",
    })

    if (!isServer) {
      config.resolve.fallback = {
        fs: false,
        child_process: false,
      }
    }

    config.plugins.push(new webpack.DefinePlugin({
      'process.platform': JSON.stringify(process.platform)
    }))

    return config
  },

  images: {
    domains: [`${ipaddr}`]
  },

  plugins: [
    'tailwindcss'
  ],

  
}

module.exports = nextConfig
