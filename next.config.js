/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns:[{hostname: `${process.env.UPLOADTHING_ID}.ufs.sh`}]
  },
}

module.exports = nextConfig
