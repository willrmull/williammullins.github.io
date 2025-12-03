/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export", // turns `next build` into a static export
  images: { unoptimized: true },
  basePath: "", // keep empty for username.github.io/repo-name
  assetPrefix: "", // ditto
};

module.exports = nextConfig;
