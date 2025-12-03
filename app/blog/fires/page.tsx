import Link from "next/link";
import { ArrowLeft, Calendar, Tag } from "lucide-react";
import Image from "next/image"; // Added for Next.js Image optimization

export default function FirePost() {
  return (
    // 1. Main Background: Changed from 'bg-white' to 'bg-gray-50' for a slightly warmer background.
    <article className="min-h-screen bg-gray-50 py-20">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto">
          {/* 2. Link Color: Changed from 'text-gray-500 hover:text-purple-600' to a blue scheme. */}
          <Link
            href="/blog"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Blog
          </Link>

          <header className="mb-12">
            <div className="flex gap-2 mb-4">
              {/* 3. Tag Colors: Changed to teal and indigo for a different palette. */}
              <span className="px-3 py-1 bg-teal-100 text-teal-700 rounded-full text-sm font-medium">
                Machine Learning
              </span>
              <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium">
                Environmental Science
              </span>
            </div>
            {/* 4. Title Text Color: Changed from 'text-slate-900' to 'text-gray-900'. */}
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
              Forecasting the Biomass of Giant Kelp in Santa Barbara
            </h1>
            {/* 5. Metadata Text Color: Changed from 'text-gray-500' to 'text-gray-600'. */}
            <div className="flex items-center text-gray-600 text-sm border-b border-gray-200 pb-8">
              <span className="flex items-center mr-6">
                <Calendar className="w-4 h-4 mr-2" />
                Capstone Project 2025
              </span>
              <span className="flex items-center">
                <Tag className="w-4 h-4 mr-2" />
                Research
              </span>
            </div>
          </header>

          {/* 6. Prose Body Text and Headings: 
               - prose-slate controls the default text color (gray-700). 
               - The explicit text color is removed for the main paragraph to let the 'prose-slate' settings take over. */}
          <div className="prose prose-lg prose-slate mx-auto text-gray-700">
            {/* Lead paragraph text color changed from text-gray-600 to text-gray-700 */}
            <p className="lead text-xl text-gray-700 mb-8">
              Giant kelp forms the foundation of one of the most productive and
              dynamic ecosystems on Earth. For my undergraduate capstone
              project, I investigated how machine learning can improve our
              ability to forecast kelp biomass in the Santa Barbara Channel.
            </p>

            {/* FIX: Added unoptimized prop to allow static export build */}
            <div className="relative w-full h-96 mb-10">
              <Image
                src="/images/vertical.jpeg"
                alt="Kelp Forest"
                fill // Use fill to cover the parent div
                style={{ objectFit: "cover" }}
                className="rounded-xl shadow-lg"
                unoptimized // Critical fix for output: 'export'
              />
            </div>

            {/* 7. Sub-heading Text Color: Changed from 'text-slate-900' to 'text-indigo-800'. */}
            <h3 className="text-2xl font-bold text-indigo-800 mb-4">
              The Challenge
            </h3>
            <p className="mb-6">
              Environmental modeling is often complex due to the stochastic
              nature of ocean currents, temperature shifts, and nutrient
              availability. Traditional linear models often struggle to capture
              the non-linear relationships between these variables and kelp
              growth.
            </p>

            {/* Sub-heading Text Color: Changed from 'text-slate-900' to 'text-indigo-800'. */}
            <h3 className="text-2xl font-bold text-indigo-800 mb-4">
              Methodology
            </h3>
            <p className="mb-6">
              I utilized a combination of satellite imagery (Landsat) and
              in-situ environmental sensors to create a dataset spanning several
              years. By applying Random Forest regressors and LSTM (Long
              Short-Term Memory) neural networks, I attempted to predict biomass
              fluctuations 3 to 6 months in advance.
            </p>

            {/* Sub-heading Text Color: Changed from 'text-slate-900' to 'text-indigo-800'. */}
            <h3 className="text-2xl font-bold text-indigo-800 mb-4">
              Results & Future Work
            </h3>
            <p className="mb-6">
              The project demonstrated that machine learning models could
              outperform traditional persistence models, particularly during
              extreme weather events like El Niño. I am currently expanding on
              this work in my Masters program at UCSB.
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}
