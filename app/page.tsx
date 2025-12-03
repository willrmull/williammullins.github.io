import Image from "next/image";
import Link from "next/link";
import { Github, Linkedin, Instagram, Mail } from "lucide-react";

export default function Home() {
  // Define classes using CSS variables
  const textPrimary = "text-[rgb(var(--color-text-primary))]";
  const textSecondary = "text-[rgb(var(--color-text-secondary))]";
  const accentMain = "text-[rgb(var(--color-accent-main))]";
  const bgPrimary = "bg-[rgb(var(--color-bg-primary))]";
  const bgSecondary = "bg-[rgb(var(--color-bg-secondary))]";
  const borderSecondary = "border-[rgb(var(--color-bg-secondary))]";

  return (
    <div className={`divide-y ${borderSecondary}`}>
      {/* Section 1: Hero / Banner */}
      {/* Updated background gradient to use theme variables */}
      <section
        className={`min-h-[80vh] flex items-center bg-gradient-to-br from-slate-50 to-[rgb(var(--color-bg-primary))]`}
      >
        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 animate-fade-in-up">
            {/* Updated title color */}
            <h1
              className={`text-5xl md:text-7xl font-extrabold ${textPrimary} tracking-tight`}
            >
              William Mullins
            </h1>
            {/* Keeping purple as a hardcoded highlight, but could be changed to an accent variable */}
            <p className="text-purple-600 font-bold tracking-widest text-sm uppercase">
              Graduate Student at the University of California Santa Barbara
            </p>

            <div className="flex gap-4">
              {/* Updated icon colors to use primary text color */}
              <a
                href="https://github.com/willrmull"
                className={`p-2 ${textPrimary} hover:text-purple-600 transition-colors border ${borderSecondary} rounded-full hover:border-purple-600`}
              >
                <Github className="w-6 h-6" />
                <span className="sr-only">Github</span>
              </a>
              <a
                href="https://www.linkedin.com/in/william-mullins-12b430207/"
                className={`p-2 ${textPrimary} hover:text-blue-600 transition-colors border ${borderSecondary} rounded-full hover:border-blue-600`}
              >
                <Linkedin className="w-6 h-6" />
                <span className="sr-only">LinkedIn</span>
              </a>
              <a
                href="https://www.instagram.com/wllmull/"
                className={`p-2 ${textPrimary} hover:text-pink-600 transition-colors border ${borderSecondary} rounded-full hover:border-pink-600`}
              >
                <Instagram className="w-6 h-6" />
                <span className="sr-only">Instagram</span>
              </a>
              <a
                href="mailto:willrmullins96@gmail.com"
                className={`p-2 ${textPrimary} hover:text-orange-600 transition-colors border ${borderSecondary} rounded-full hover:border-orange-600`}
              >
                <Mail className="w-6 h-6" />
                <span className="sr-only">Email</span>
              </a>
            </div>
          </div>
          {/* Optional: Add a hero image here if desired, or keep it text-focused like the "Banner" style */}
          <div className="hidden md:block relative h-96 w-full rounded-2xl overflow-hidden shadow-2xl bg-gray-200">
            {/* Placeholder for banner image if you have one, or a stylistic abstract element */}
            <div className="absolute inset-0 bg-gradient-to-tr from-purple-100 to-blue-100 flex items-center justify-center text-slate-300 font-bold text-4xl">
              WM
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: About */}
      {/* Updated background color */}
      <section id="about" className={`py-24 ${bgPrimary}`}>
        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <div className="order-2 md:order-1 relative h-[500px] w-full rounded-lg overflow-hidden shadow-xl">
            {/* Replace src with your actual image path */}
            <img
              src="https://william-mullins.com/images/self.jpeg"
              alt="William Mullins"
              className="object-cover w-full h-full"
            />
          </div>

          <div className="order-1 md:order-2 space-y-6">
            {/* Updated heading color */}
            <h2 className={`text-4xl font-bold ${textPrimary}`}>About</h2>
            {/* Updated body text color */}
            <p className={`text-lg ${textSecondary} leading-relaxed`}>
              William Mullins is a graduate student at the University of
              California Santa Barbara studying Environmental Data Science. His
              key areas of interest are in environmental modeling, forecasting,
              and web development. Outside of academics, William enjoys
              gardening, traveling, and reading.
            </p>

            {/* Updated border color */}
            <div className={`pt-6 border-t ${borderSecondary}`}>
              {/* Updated heading color */}
              <h3 className={`text-xl font-bold ${textPrimary} mb-4`}>
                Education
              </h3>
              <div className="space-y-4">
                <div>
                  {/* Updated sub-heading color */}
                  <h4 className={`font-semibold ${textPrimary}`}>
                    University of California Santa Barbara
                  </h4>
                  {/* Updated paragraph color */}
                  <p className={textSecondary}>
                    Master of Environmental Data Science, Expected June 2026
                  </p>
                </div>
                <div>
                  {/* Updated sub-heading color */}
                  <h4 className={`font-semibold ${textPrimary}`}>
                    University of Kansas
                  </h4>
                  {/* Updated paragraph color */}
                  <p className={textSecondary}>
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
