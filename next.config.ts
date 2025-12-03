import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // CRITICAL: This is the setting required for GitHub Pages. 
  // It tells Next.js to output static HTML/CSS/JS files into the 'out/' directory.
  output: 'export', 
  
  /* Add any other config options below */
};

export default nextConfig;