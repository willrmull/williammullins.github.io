import "./globals.css";
import type { Metadata } from "next";
import { IBM_Plex_Sans } from "next/font/google";
import Link from "next/link";
// The following line imported icons that were not used in this file:
// import { Github, Linkedin, Instagram, Mail } from "lucide-react";
// ^ Removed to fix the linting errors.

const inter = IBM_Plex_Sans({ subsets: ["latin"], weight: ["300", "400"] });

export const metadata: Metadata = {
  title: "William Mullins",
  description: "Graduate Student at UCSB",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} flex flex-col min-h-screen bg-white text-gray-800`}
      >
        {/* Navigation */}
        <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm border-b border-gray-100 py-4">
          <div className="container mx-auto px-6 flex justify-between items-center">
            <div className="flex items-center gap-3">
              {/* Replicating the logo/name feel */}
              <div className="w-10 h-10 bg-slate-900 text-white flex items-center justify-center font-bold rounded-lg">
                WM
              </div>
              <span className="font-bold text-lg tracking-tight">
                William Mullins
              </span>
            </div>

            <div className="flex items-center gap-6 text-sm font-medium text-gray-600">
              <Link href="/" className="hover:text-blue-600 transition-colors">
                About
              </Link>
              <Link
                href="/blog"
                className="hover:text-blue-600 transition-colors"
              >
                Blog
              </Link>
              <a
                href="https://github.com/willrmull"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-600 transition-colors"
              >
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/william-mullins-12b430207/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-600 transition-colors"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-grow">{children}</main>

        {/* Footer */}
        <footer className="bg-slate-50 border-t border-gray-200 py-12 mt-auto">
          <div className="container mx-auto px-6 text-center">
            <p className="text-gray-600 mb-2">
              Get in touch with me at{" "}
              <a
                href="mailto:willrmullins96@gmail.com"
                className="font-bold text-gray-900 hover:underline"
              >
                willrmullins96@gmail.com
              </a>
            </p>
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} William Mullins. All rights reserved.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
