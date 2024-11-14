/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "quixotic-magpie-672.convex.cloud",
        pathname: "/**", // Tillåter alla vägar på denna domän
      },
    ],
  },
};

export default nextConfig;
