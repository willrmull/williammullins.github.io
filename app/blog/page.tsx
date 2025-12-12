import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Image from "next/image"; // Added for image optimization

export default function BlogIndex() {
  return (
    <div className="min-h-screen bg-slate-50 py-20">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">
            Projects & Blog
          </h1>
          <p className="text-gray-600 mb-12 text-lg">
            Some of my standout projects.
          </p>

          <div className="grid gap-8">
            {/* Project 1: The detailed post linked to a separate file */}
            <article className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden border border-gray-100">
              <div className="md:flex">
                <div className="md:w-1/3 bg-gray-200 min-h-[200px] relative">
                  {/* FIX: Replaced <img> with optimized <Image /> component */}
                  <Image
                    src="/images/vineyard.jpg"
                    alt="evapotranspiration"
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div className="p-8 md:w-2/3 flex flex-col justify-center">
                  <div className="uppercase tracking-wide text-sm text-blue-600 font-semibold mb-2">
                    Statistics
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">
                    <Link
                      href="/blog/vineyards"
                      className="hover:text-blue-700 transition-colors"
                    >
                      Forecasting Water Use of Wine Grapes in California
                    </Link>
                  </h2>
                  <p className="text-gray-600 mb-6 line-clamp-2">
                    Using a gamma model so see the imact region has on vineyard
                    water use
                  </p>
                  <Link
                    href="/blog/vineyards"
                    className="inline-flex items-center font-semibold text-purple-600 hover:text-purple-800"
                  >
                    Read Full Post <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </div>
              </div>
            </article>

            {/* Project 2: The detailed post linked to a separate file */}
            <article className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden border border-gray-100">
              <div className="md:flex">
                <div className="p-8 md:w-2/3 flex flex-col justify-center">
                  <div className="uppercase tracking-wide text-sm text-blue-600 font-semibold mb-2">
                    Python
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">
                    <Link
                      href="/blog/fires"
                      className="hover:text-blue-700 transition-colors"
                    >
                      Eaton and Palisades Fires Analysis
                    </Link>
                  </h2>
                  <p className="text-gray-600 mb-6 line-clamp-2">
                    Examining the scars and social dimensions of the Eaton and
                    Palisades wildfires.
                  </p>
                  <Link
                    href="/blog/fires"
                    className="inline-flex items-center font-semibold text-purple-600 hover:text-purple-800"
                  >
                    Read Full Post <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </div>
              </div>
            </article>
            {/* Project 3: The detailed post linked to a separate file */}
            <article className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden border border-gray-100">
              <div className="md:flex">
                <div className="p-8 md:w-2/3 flex flex-col justify-center">
                  <div className="uppercase tracking-wide text-sm text-blue-600 font-semibold mb-2">
                    Geospatial R
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">
                    <Link
                      href="/blog/aquaculture"
                      className="hover:text-blue-700 transition-colors"
                    >
                      Identifying Areas of Potential Aquaculture in the Western
                      US
                    </Link>
                  </h2>
                  <p className="text-gray-600 mb-6 line-clamp-2">
                    Examining areas along the west coast which contain
                    conditions suitable for aquaculture.
                  </p>
                  <Link
                    href="/blog/aquaculture"
                    className="inline-flex items-center font-semibold text-purple-600 hover:text-purple-800"
                  >
                    Read Full Post <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </div>
                <div className="md:w-1/3 bg-gray-200 min-h-[200px] relative">
                  {/* FIX: Replaced <img> with optimized <Image /> component */}
                  <Image
                    src="/images/oyster_farm.jpg"
                    alt="oyster_farm"
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </div>
  );
}
