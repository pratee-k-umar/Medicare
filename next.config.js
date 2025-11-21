/** @type {import('next').NextConfig} */
const nextConfig = {
  // Moved from experimental in Next.js v15
  serverExternalPackages: ["mongoose"],
  
  // Moved from experimental in Next.js v15
  outputFileTracingExcludes: {
    '*': [
      'node_modules/@swc/core-linux-x64-gnu',
      'node_modules/@swc/core-linux-x64-musl',
      'node_modules/@esbuild/linux-x64',
    ],
  },
  
  images: {
    domains: ["lh3.googleusercontent.com", "res.cloudinary.com"]
  },
  
  webpack(config) {
    config.experiments = {
      ...config.experiments,
      topLevelAwait: true
    }
    return config
  }
}

module.exports = nextConfig