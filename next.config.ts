/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: { unoptimized: true },

  // ✅ CRITICAL: Set this to your exact repo name
  basePath: "/williammullins.github.io", // Replace with your actual repo name!

  // Remove assetPrefix or keep it empty (it's optional)
  assetPrefix: undefined,

  // Add pnpm support (you're using pnpm)
  experimental: {
    pnpm: true,
  },
};

module.exports = nextConfig;
