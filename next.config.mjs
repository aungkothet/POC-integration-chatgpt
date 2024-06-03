/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    LINE_ACCESS_TOKEN: process.env.LINE_ACCESS_TOKEN,
    LINE_MESSAGING_API: process.env.LINE_MESSAGING_API
  },
  experimental: {
    serverActions: true,
  },
}

export default nextConfig
