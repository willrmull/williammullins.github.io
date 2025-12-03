import Image from "next/image"; // Now used to replace <img>
// import Link from 'next/link' // Removed: Was defined but never used
import { Github, Linkedin, Instagram, Mail } from "lucide-react";

export default function Home() {
  return (
    <div className="divide-y divide-gray-100">
      {/* Section 1: Hero / Banner */}
      <section className="min-h-[80vh] flex items-center bg-gradient-to-br from-slate-50 to-white">
        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 animate-fade-in-up">
            <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight">
              William Mullins
            </h1>
            <p className="text-purple-600 font-bold tracking-widest text-sm uppercase">
              Graduate Student at the University of California Santa Barbara
            </p>

            <div className="flex gap-4">
              <a
                href="https://github.com/willrmull"
                className="p-2 text-gray-600 hover:text-purple-600 transition-colors border border-gray-200 rounded-full hover:border-purple-600"
              >
                <Github className="w-6 h-6" />
                <span className="sr-only">Github</span>
              </a>
              <a
                href="https://www.linkedin.com/in/william-mullins-12b430207/"
                className="p-2 text-gray-600 hover:text-blue-600 transition-colors border border-gray-200 rounded-full hover:border-blue-600"
              >
                <Linkedin className="w-6 h-6" />
                <span className="sr-only">LinkedIn</span>
              </a>
              <a
                href="https://www.instagram.com/wllmull/"
                className="p-2 text-gray-600 hover:text-pink-600 transition-colors border border-gray-200 rounded-full hover:border-pink-600"
              >
                <Instagram className="w-6 h-6" />
                <span className="sr-only">Instagram</span>
              </a>
              <a
                href="mailto:willrmullins96@gmail.com"
                className="p-2 text-gray-600 hover:text-orange-600 transition-colors border border-gray-200 rounded-full hover:border-orange-600"
              >
                <Mail className="w-6 h-6" />
                <span className="sr-only">Email</span>
              </a>
            </div>
          </div>
          {/* Optional: Add a hero image here if desired, or keep it text-focused like the "Banner" style */}
          <div className="hidden md:block relative h-96 w-full rounded-2xl overflow-hidden shadow-2xl bg-gray-200">
            {/* Placeholder for banner image if you have one, or a stylistic abstract element */}
            <Image
              src="/images/banner.jpeg"
              alt="Banner"
              fill // Use fill since the parent div has fixed dimensions (h-[500px])
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>
      </section>

      {/* Section 2: About */}
      <section id="about" className="py-24 bg-white">
        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <div className="order-2 md:order-1 relative h-[500px] w-full rounded-lg overflow-hidden shadow-xl">
            {/* FIX: Replaced <img> with optimized <Image /> component to resolve warning and use the import */}
            <Image
              src="/images/self.jpeg"
              alt="William Mullins"
              fill // Use fill since the parent div has fixed dimensions (h-[500px])
              style={{ objectFit: "cover" }}
            />
          </div>

          <div className="order-1 md:order-2 space-y-6">
            <h2 className="text-4xl font-bold text-slate-900">About</h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              William Mullins is a graduate student at the University of
              California Santa Barbara studying Environmental Data Science. His
              key areas of interest are in environmental modeling, forecasting,
              and web development. Outside of academics, William enjoys
              gardening, traveling, and reading.
            </p>

            <div className="pt-6 border-t border-gray-100">
              <h3 className="text-xl font-bold text-slate-900 mb-4">
                Education
              </h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-slate-800">
                    University of California Santa Barbara
                  </h4>
                  <p className="text-gray-600">
                    Master of Environmental Data Science, Expected June 2026
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-800">
                    University of Kansas
                  </h4>
                  <p className="text-gray-600">
                    BS in Ecology, Evolution, and Organismal Biology, 2022-2025
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
