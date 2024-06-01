/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    LINE_ACCESS_TOKEN: process.env.LINE_ACCESS_TOKEN,
  },
}

export default nextConfig
