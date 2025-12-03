/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export", // keep your static-export setting
  images: {
    unoptimized: true, // <-- required for export + <Image />
  },
};

module.exports = nextConfig;
