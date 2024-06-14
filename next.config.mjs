/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    LINE_ACCESS_TOKEN: process.env.LINE_ACCESS_TOKEN,
    LINE_MESSAGING_API: process.env.LINE_MESSAGING_API,
    FB_MESSAGE_URL: process.env.FB_API_HOST + process.env.FB_API_VERSION + '/' + process.env.FB_PAGE_ID +
      process.env.FB_MESSAGING_API
  }
}

export default nextConfig
