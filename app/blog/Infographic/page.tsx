"use client";

import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  Calendar,
  Tag,
} from "lucide-react";
import { useState, useEffect } from "react";

export default function InfographicPost() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight - windowHeight;
      const scrolled = window.scrollY;
      const progress = (scrolled / docHeight) * 100;
      setScrollProgress(Math.min(100, Math.max(0, progress)));
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <article className="min-h-screen bg-gray-50 py-20">
      {/* Progress Indicator */}
      <div className="fixed top-0 left-0 w-full h-1 bg-transparent z-50">
        <div
          className="h-full bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* ------- HERO GRADIENT BACKGROUND ------- */}
      <div className="relative w-full h-96 md:h-[28rem]">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-600 via-orange-500 via-red-500 to-rose-600" />
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 flex items-center justify-center px-6">
          <div className="text-white text-center max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
              <p>Crop Indemnity in Kansas</p>
              <p>Between 2020 and 2025</p>
            </h1>
            <p className="text-sm md:text-base mb-2">
              Author: William Mullins ・ Date: March 12, 2026
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto">
          <Link
            href="/blog"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 mt-10 mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Blog
          </Link>

          <header className="mb-12">
            <div className="flex gap-2 mb-4">
              <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-medium">
                Infographic
              </span>
              <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium">
                Agriculture
              </span>
            </div>
            <div className="flex items-center text-gray-600 text-sm border-b border-gray-200 pb-8">
              <span className="flex items-center mr-6">
                <Calendar className="w-4 h-4 mr-2" />
                March 12, 2026
              </span>
              <span className="flex items-center">
                <Tag className="w-4 h-4 mr-2" />
                Data Visualization · Infographic
              </span>
            </div>
          </header>

          <div className="prose prose-lg prose-slate mx-auto text-gray-700">
            {/* Section Divider */}
            <div className="h-px bg-gray-300 my-10" />

            <h3>About</h3>
            <p>
              Will add later
            </p>

            {/* Section Divider */}
            <div className="h-px bg-gray-300 my-10" />

            {/* INFOGRAPHIC IMAGE */}
            <div className="relative w-full mt-4 mb-10">
              <Image
                src="/images/Infographic.svg"
                alt="Eaton and Palisades Fires Infographic"
                width={2481}
                height={3508}
                style={{ width: "100%", height: "auto" }}
                className="rounded-xl shadow-lg"
                unoptimized
              />
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
