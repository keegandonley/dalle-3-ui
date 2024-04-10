/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "dalle.static.donley.xyz",
      },
    ],
  },
};

export default nextConfig;
