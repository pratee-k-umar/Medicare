/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ["mongoose"]
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
  },
  experimental: {
    serverComponentsExternalPackages: ["mongoose"],
    outputFileTracingExcludes: {
      '*': [
        'node_modules/@swc/core-linux-x64-gnu',
        'node_modules/@swc/core-linux-x64-musl',
        'node_modules/@esbuild/linux-x64',
      ],
    },
  },
  outputFileTracing: true,
}

module.exports = nextConfig