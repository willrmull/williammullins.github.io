"use client";

import Link from "next/link";
import { ArrowLeft, Calendar, Tag, Github } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function AquacultureAnalysisPost() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

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

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 1500);
  };

  const codeBlocks = [
    `
  library(tidyverse)
  library(terra)
  library(here)
  library(knitr)
  library(kableExtra)`,

    `# Read in sea surface temperature data
sst <- rast(c(
  here("data", "average_annual_sst_2008.tif"),
  here("data", "average_annual_sst_2009.tif"),
  here("data", "average_annual_sst_2010.tif"),
  here("data", "average_annual_sst_2011.tif"),
  here("data", "average_annual_sst_2012.tif")
))

# Read in depth file
depth <- rast(here("data", "depth.tif")) %>% project(crs(sst))`,

    `eez_raster <- vect(here::here("data", "wc_regions_clean.shp"))
mean_sst <- app(sst, fun = mean, na.rm = TRUE)

# Convert From Kelvin to Celsius
mean_sst <- mean_sst - 273.15
plot(mean_sst)`,

    `# Resample depth using nearest neighbor approach
depth <- resample(depth, mean_sst, method = "near")

# Crop raster to match SST
depth_cropped <- crop(depth, mean_sst)

# Check that the depth and SST match in resolution, extent, and coordinate reference system
compareGeom(depth_cropped, mean_sst, res = TRUE, ext = TRUE, crs = TRUE)`,

    `habitable_areas <- function(temp_min, temp_max, depth_min, depth_max, species_name) {
  # Create mask of SST and depth values in range
  sst_suitable <- mean_sst >= temp_min & mean_sst <= temp_max
  depth_suitable <- depth_cropped >= depth_min & depth_cropped <= depth_max
  
  # Create mask where both conditions are met
  suitable_habitat <- sst_suitable * depth_suitable
  
  # Plot of suitable habitats
  habitat_plot <- plot(suitable_habitat, 
                      col = c("gray90", "maroon"), 
                      type = "classes", 
                      levels = c("Unsuitable", "Suitable"),
                      main = paste("Potential", species_name, "Habitat\\n(SST:", temp_min, "-", temp_max, "C, Depth:", depth_min, "-", depth_max, "m)"),
                      xlab = "Longitude", 
                      ylab = "Latitude", 
                      axes = TRUE,
                      plg = list(x = "topright", title = "Classification") # Legend position
  )
  
  # Return the plot
  return(habitat_plot)
}`,

    `# View Areas Habitable by Oysters
oysters <- habitable_areas(11, 30, 0, 70, "Oyster")`,

    `# View Areas Habitable by Blue Mussels
mussels <- habitable_areas(5, 20, 0, 60, "Blue Mussel")`,

    `# Returns a data frame of the area suitable for a species by region
habitable_areas_table <- function(temp_min, temp_max, depth_min, depth_max, species_name) {
  sst_suitable <- mean_sst >= temp_min & mean_sst <= temp_max
  depth_suitable <- depth_cropped >= depth_min & depth_cropped <= depth_max
  suitable_habitat <- sst_suitable * depth_suitable
  
  eez_raster <- rasterize(eez_raster, suitable_habitat, field = "rgn")
  
  # Get the cell size of cells in dataframe
  cell_area <- cellSize(suitable_habitat, unit = "km")
  
  # Get area of suitable cells in dataframe
  area_suitable <- cell_area * suitable_habitat
  
  # Get the total amount of area that is suitable in each EEZ
  total_area_by_eez <- zonal(area_suitable, eez_raster, fun = "sum", na.rm = TRUE)
  return(total_area_by_eez)
}

oyster_data <- habitable_areas_table(11, 30, 0, 70, "Oyster") %>% rename("Oysters" = area)
mussel_data <- habitable_areas_table(5, 20, 0, 60, "Blue Mussel") %>% rename("Blue Mussel" = area)

inner_join(oyster_data, mussel_data, by = "rgn") %>%
  rename("Region" = rgn) %>%
  kbl(caption = "Suitable Area For Oysters and Blue Mussels") %>%
  kable_styling(bootstrap_options = c("striped", "hover", "condensed"))`,
  ];

  return (
    <article className="min-h-screen bg-gray-50 py-20">
      {/* Progress Indicator */}
      <div className="fixed top-0 left-0 w-full h-1 bg-transparent z-50">
        <div
          className="h-full bg-gradient-to-r from-blue-500 to-teal-500 transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* ------- HERO IMAGE BACKGROUND ------- */}
      <div className="relative w-full h-96 md:h-[28rem] bg-gradient-to-r from-blue-500 to-teal-500 flex items-center justify-center px-6">
        <div className="text-white text-center max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 drop-shadow-md">
            Identifying Areas of Potential Aquaculture in the Western US
          </h1>
          <p className="text-sm md:text-base mb-4 drop-shadow">
            Author: William Mullins ・ Date: December 7, 2025
          </p>
          <a
            href="https://github.com/willrmull/potential_aquaculture"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-white hover:text-gray-200 transition"
          >
            <Github className="w-5 h-5" />
            <span>GitHub Repository</span>
          </a>
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
              <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                Spatial Analysis
              </span>
            </div>
            <div className="flex items-center text-gray-600 text-sm border-b border-gray-200 pb-8">
              <span className="flex items-center mr-6">
                <Calendar className="w-4 h-4 mr-2" />
                December 7, 2025
              </span>
              <span className="flex items-center">
                <Tag className="w-4 h-4 mr-2" />R · Geospatial · Environmental
                Science
              </span>
            </div>
          </header>

          <div className="prose prose-lg prose-slate mx-auto text-gray-700">
            {/* Section Divider */}
            <div className="h-px bg-gray-300 my-10" />

            <h3>Introduction</h3>
            <p>
              In this analysis, we identified areas along the west coast of the
              United States which contained suitable depth and sea surface
              temperature (SST) for aquaculture, specifically on two species:
              oysters and blue mussels.
            </p>

            {/* Section Divider */}
            <div className="h-px bg-gray-300 my-10" />

            <h3>Datasets Used</h3>
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div>
                <a
                  href="https://podaac.jpl.nasa.gov/dataset/AVHRR_PATHFINDER_L3_V52"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  NOAA Pathfinder Sea Surface Temperature Data
                </a>
                <p className="text-sm mt-2">
                  Five-year average of sea surface temperature data from
                  2008-2012, providing a comprehensive baseline for temperature
                  analysis along the western US coast.
                </p>
              </div>
              <div>
                <a
                  href="https://www.ncei.noaa.gov/access/gridded-bathymetry-data"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  NOAA Bathymetry Data
                </a>
                <p className="text-sm mt-2">
                  High-resolution ocean depth measurements used to identify
                  suitable depths for shellfish cultivation.
                </p>
              </div>
            </div>
            <div>
              <a
                href="https://www.fisheries.noaa.gov/west-coast/marine-protected-areas/west-coast-regional-boundaries"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                West Coast Regional Boundaries
              </a>
              <p className="text-sm mt-2">
                Spatial boundaries defining the Exclusive Economic Zones (EEZs)
                for California, Oregon, and Washington, used to calculate
                suitable habitat area by region.
              </p>
            </div>

            {/* Section Divider */}
            <div className="h-px bg-gray-300 my-10" />

            <h4>Loading Required Packages</h4>
            <p>
              First, we load the necessary R packages for spatial analysis, data
              manipulation, and visualization. The script checks if each
              required package is installed before loading them.
            </p>
            <div className="relative mb-8">
              <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto border-l-4 border-blue-500">
                <code>{codeBlocks[0]}</code>
              </pre>
              <button
                onClick={() => copyToClipboard(codeBlocks[0], 0)}
                className="absolute top-2 right-2 text-xs bg-white px-2 py-1 rounded shadow hover:bg-gray-50"
              >
                {copiedIndex === 0 ? "Copied!" : "Copy"}
              </button>
            </div>

            <h3>Sea Surface Temperature Analysis</h3>
            <p>
              Sea surface temperature is a critical factor for shellfish
              survival and growth.
            </p>

            <h4>Reading and Processing SST Data</h4>
            <p>
              The SST data is read from multiple GeoTIFF files and combined into
              a single raster stack. The depth data is then reprojected to match
              the CRS of the SST data.
            </p>
            <div className="relative mb-6">
              <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto border-l-4 border-blue-500">
                <code>{codeBlocks[1]}</code>
              </pre>
              <button
                onClick={() => copyToClipboard(codeBlocks[1], 1)}
                className="absolute top-2 right-2 text-xs bg-white px-2 py-1 rounded shadow hover:bg-gray-50"
              >
                {copiedIndex === 1 ? "Copied!" : "Copy"}
              </button>
            </div>

            <h4>Calculating Mean SST and Converting Units</h4>
            <p>
              We calculate the mean SST across all years and convert the
              temperature from Kelvin to Celsius for easier interpretation. The
              resulting raster shows the average annual sea surface temperature
              along the western US coast.
            </p>
            <div className="relative mb-6">
              <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto border-l-4 border-blue-500">
                <code>{codeBlocks[2]}</code>
              </pre>
              <button
                onClick={() => copyToClipboard(codeBlocks[2], 2)}
                className="absolute top-2 right-2 text-xs bg-white px-2 py-1 rounded shadow hover:bg-gray-50"
              >
                {copiedIndex === 2 ? "Copied!" : "Copy"}
              </button>
            </div>
            {/* IMAGE 1 - Mean SST Plot */}
            <div className="relative w-full h-80 mt-4 mb-10">
              <Image
                src="/images/mean_sst_plot.png"
                alt="Mean Sea Surface Temperature Plot"
                fill
                style={{ objectFit: "contain" }}
                className="rounded-xl shadow-lg border border-gray-200"
                unoptimized
              />
            </div>

            <h3>Depth Data Preparation</h3>
            <h4>Processing Depth Raster</h4>
            <p>
              The depth raster is resampled to match the resolution and extent
              of the SST data using nearest neighbor interpolation. This ensures
              that both datasets align perfectly for subsequent analysis.
            </p>
            <div className="relative mb-6">
              <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto border-l-4 border-blue-500">
                <code>{codeBlocks[3]}</code>
              </pre>
              <button
                onClick={() => copyToClipboard(codeBlocks[3], 3)}
                className="absolute top-2 right-2 text-xs bg-white px-2 py-1 rounded shadow hover:bg-gray-50"
              >
                {copiedIndex === 3 ? "Copied!" : "Copy"}
              </button>
            </div>

            <h3>Habitat Suitability Analysis</h3>
            <p>
              To identify areas suitable for aquaculture, we defined temperature
              and depth ranges for each species based on their biological
              requirements. The analysis creates binary masks where 1 represents
              suitable habitat and 0 represents unsuitable areas.
            </p>

            <h4>Suitability Function</h4>
            <p>
              This function creates masks for both temperature and depth
              conditions, then combines them to identify areas where both
              criteria are met. It also generates a visualization showing
              suitable versus unsuitable areas.
            </p>
            <div className="relative mb-6">
              <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto border-l-4 border-blue-500">
                <code>{codeBlocks[4]}</code>
              </pre>
              <button
                onClick={() => copyToClipboard(codeBlocks[4], 4)}
                className="absolute top-2 right-2 text-xs bg-white px-2 py-1 rounded shadow hover:bg-gray-50"
              >
                {copiedIndex === 4 ? "Copied!" : "Copy"}
              </button>
            </div>

            <h4>Potential Oyster Habitat</h4>
            <p>
              Oysters prefer slighly warm waters (11-30°C) and are able to be
              cultivated in shallow depths (0-70 meters).
            </p>
            <div className="relative mb-6">
              <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto border-l-4 border-blue-500">
                <code>{codeBlocks[5]}</code>
              </pre>
              <button
                onClick={() => copyToClipboard(codeBlocks[5], 5)}
                className="absolute top-2 right-2 text-xs bg-white px-2 py-1 rounded shadow hover:bg-gray-50"
              >
                {copiedIndex === 5 ? "Copied!" : "Copy"}
              </button>
            </div>
            {/* IMAGE 2 - Oyster Habitat */}
            <div className="relative w-full h-80 mt-4 mb-10">
              <Image
                src="/images/oyster_habitat.png"
                alt="Potential Oyster Habitat Map"
                fill
                style={{ objectFit: "contain" }}
                className="rounded-xl shadow-lg border border-gray-200"
                unoptimized
              />
            </div>

            <h4>Potential Blue Mussel Habitat</h4>
            <p>
              Blue mussels prefer slightly cooler waters (5-20°C) and shallower
              depths (0-60 meters) compared to oysters.
            </p>
            <div className="relative mb-6">
              <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto border-l-4 border-blue-500">
                <code>{codeBlocks[6]}</code>
              </pre>
              <button
                onClick={() => copyToClipboard(codeBlocks[6], 6)}
                className="absolute top-2 right-2 text-xs bg-white px-2 py-1 rounded shadow hover:bg-gray-50"
              >
                {copiedIndex === 6 ? "Copied!" : "Copy"}
              </button>
            </div>
            {/* IMAGE 3 - Mussel Habitat */}
            <div className="relative w-full h-80 mt-4 mb-10">
              <Image
                src="/images/mussel_habitat.png"
                alt="Potential Blue Mussel Habitat Map"
                fill
                style={{ objectFit: "contain" }}
                className="rounded-xl shadow-lg border border-gray-200"
                unoptimized
              />
            </div>

            <h2>Regional Analysis of Suitable Habitat</h2>
            <p>
              To understand the regional distribution of suitable areas across
              different, we calculated the total area of suitable areas within
              each Exclusive Economic Zone (EEZ) on the west coast.
            </p>

            <h3>Calculating Suitable Area by Region</h3>
            <p>
              This function builds upon habitat suitability function by
              calculating the total area (in square kilometers) of suitable
              habitat within each region. In the table below.
            </p>
            <div className="relative mb-6">
              <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto border-l-4 border-blue-500">
                <code>{codeBlocks[7]}</code>
              </pre>
              <button
                onClick={() => copyToClipboard(codeBlocks[7], 7)}
                className="absolute top-2 right-2 text-xs bg-white px-2 py-1 rounded shadow hover:bg-gray-50"
              >
                {copiedIndex === 7 ? "Copied!" : "Copy"}
              </button>
            </div>

            {/* Table of Results */}
            <div className="overflow-x-auto mb-8">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Region
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Oysters (sq km)
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Blue Mussel (sq km)
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap">
                      Central California
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">103.50</td>
                    <td className="px-6 py-4 whitespace-nowrap">120.89</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap">
                      Northern California
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">32.67</td>
                    <td className="px-6 py-4 whitespace-nowrap">49.51</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap">Oregon</td>
                    <td className="px-6 py-4 whitespace-nowrap">30.11</td>
                    <td className="px-6 py-4 whitespace-nowrap">76.65</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap">
                      Southern California
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">160.53</td>
                    <td className="px-6 py-4 whitespace-nowrap">142.52</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap">Washington</td>
                    <td className="px-6 py-4 whitespace-nowrap">131.35</td>
                    <td className="px-6 py-4 whitespace-nowrap">290.06</td>
                  </tr>
                </tbody>
              </table>
              <p className="mt-2 text-sm text-gray-500 text-center">
                Table 1: Suitable Area For Oysters and Blue Mussels by Region
                (in square kilometers)
              </p>
            </div>

            <h3>Key Findings</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                Blue mussels generally have more suitable habitat across all
                regions except Southern California, where oysters have a slight
                advantage.
              </li>
            </ul>

            <h3>Implications for Aquaculture Development</h3>
            <p>
              Although the West Coast appears to have a larger area suited to
              blue mussels, oyster farming still dominates every region. That
              mismatch may indicate that there is untapped potential for
              shellfish farming on the west coast.
            </p>

            <h3>Limitations and Future Research</h3>
            <p>
              While this analysis provides a solid foundation, it has some
              limitations that should be addressed in future research:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                The analysis uses average annual SST, which doesn&apos;t account
                for seasonal variations that affects shellfish growth cycles.
              </li>
              <li>
                Other environmental factors such as tidal patterns, wave
                exposure, and El Nino events where not considered in the
                analysis.
              </li>
              <li>
                Socioeconomic and regulatory constraints are not incorporated
                into the suitability model.
              </li>
              <li>
                Future research could add climate change projections to assess
                long-term viability of aquaculture sites.
              </li>
            </ul>

            <h3>References</h3>
            <p className="text-sm text-gray-600">
              National Oceanic and Atmospheric Administration. (2023). NOAA
              CoastWatch Pathfinder Sea Surface Temperature Dataset.
              <a
                href="https://podaac.jpl.nasa.gov/dataset/AVHRR_PATHFINDER_L3_V52"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline ml-1"
              >
                https://podaac.jpl.nasa.gov/dataset/AVHRR_PATHFINDER_L3_V52
              </a>
            </p>
            <p className="text-sm text-gray-600 mt-2">
              National Centers for Environmental Information. (2023). Gridded
              Bathymetry Data.
              <a
                href="https://www.ncei.noaa.gov/access/gridded-bathymetry-data"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline ml-1"
              >
                https://www.ncei.noaa.gov/access/gridded-bathymetry-data
              </a>
            </p>
            <p className="text-sm text-gray-600 mt-2">
              NOAA Fisheries. (2023). West Coast Regional Boundaries.
              <a
                href="https://www.fisheries.noaa.gov/west-coast/marine-protected-areas/west-coast-regional-boundaries"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline ml-1"
              >
                https://www.fisheries.noaa.gov/west-coast/marine-protected-areas/west-coast-regional-boundaries
              </a>
            </p>
            <p className="text-sm text-gray-600 mt-2">
              Food and Agriculture Organization. (2022). The State of World
              Fisheries and Aquaculture.
              <a
                href="https://www.fao.org/3/ca9229en/ca9229en.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline ml-1"
              >
                https://www.fao.org/3/ca9229en/ca9229en.pdf
              </a>
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}
