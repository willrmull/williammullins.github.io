"use client";

import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  Calendar,
  Tag,
  Github,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";

interface CodeBlockProps {
  code: string;
  index: number;
  title?: string;
  expandedCode: { [key: number]: boolean };
  copiedIndex: number | null;
  onToggle: (index: number) => void;
  onCopy: (text: string, index: number) => void;
}

const CodeBlock = ({
  code,
  index,
  title,
  expandedCode,
  copiedIndex,
  onToggle,
  onCopy,
}: CodeBlockProps) => {
  const isExpanded = expandedCode[index] ?? false;

  return (
    <div className="relative mb-6">
      <button
        onClick={() => onToggle(index)}
        className="w-full flex items-center justify-between bg-gradient-to-r from-teal-700 to-cyan-700 text-white px-4 py-2 rounded-t-lg text-sm font-medium hover:from-teal-600 hover:to-cyan-600 transition-all"
      >
        <span className="flex items-center gap-2">
          {isExpanded ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
          {title || "View Code"}
        </span>
        <span className="text-xs opacity-75">R</span>
      </button>
      {isExpanded && (
        <div className="relative">
          <pre className="bg-gray-900 text-gray-100 p-4 rounded-b-lg overflow-x-auto text-sm border-l-4 border-teal-500">
            <code>{code}</code>
          </pre>
          <button
            onClick={() => onCopy(code, index)}
            className="absolute top-2 right-2 text-xs bg-gray-700 text-white px-2 py-1 rounded hover:bg-gray-600 transition"
          >
            {copiedIndex === index ? "Copied!" : "Copy"}
          </button>
        </div>
      )}
    </div>
  );
};

interface TableProps {
  headers: string[];
  rows: (string | number)[][];
  caption?: string;
}

const DataTable = ({ headers, rows, caption }: TableProps) => (
  <div className="overflow-x-auto my-6">
    <table className="min-w-full border border-gray-300 rounded-lg overflow-hidden">
      <thead className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white">
        <tr>
          {headers.map((header, i) => (
            <th key={i} className="px-4 py-3 text-left text-sm font-semibold">
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {rows.map((row, i) => (
          <tr key={i} className={i % 2 === 0 ? "bg-gray-50" : "bg-white"}>
            {row.map((cell, j) => (
              <td key={j} className="px-4 py-3 text-sm text-gray-700">
                {typeof cell === "number" ? cell.toLocaleString() : cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
    {caption && (
      <p className="text-sm text-gray-500 mt-2 text-center italic">{caption}</p>
    )}
  </div>
);

export default function AquaculturePost() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [expandedCode, setExpandedCode] = useState<{ [key: number]: boolean }>(
    {}
  );
  const [katexLoaded, setKatexLoaded] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  // Load KaTeX CSS and scripts
  useEffect(() => {
    if (typeof window !== "undefined" && (window as any).katex) {
      setKatexLoaded(true);
      return;
    }

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css";
    link.crossOrigin = "anonymous";
    document.head.appendChild(link);

    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.js";
    script.crossOrigin = "anonymous";

    script.onload = () => {
      const autoRenderScript = document.createElement("script");
      autoRenderScript.src =
        "https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/contrib/auto-render.min.js";
      autoRenderScript.crossOrigin = "anonymous";
      autoRenderScript.onload = () => {
        setKatexLoaded(true);
      };
      document.head.appendChild(autoRenderScript);
    };
    document.head.appendChild(script);
  }, []);

  // Render math when KaTeX is loaded
  useEffect(() => {
    if (
      katexLoaded &&
      contentRef.current &&
      typeof window !== "undefined" &&
      (window as any).renderMathInElement
    ) {
      (window as any).renderMathInElement(contentRef.current, {
        delimiters: [
          { left: "$$", right: "$$", display: true },
          { left: "\\[", right: "\\]", display: true },
          { left: "$", right: "$", display: false },
          { left: "\\(", right: "\\)", display: false },
        ],
        throwOnError: false,
        trust: true,
        strict: false,
      });
    }
  }, [katexLoaded]);

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

  const toggleCode = (index: number) => {
    setExpandedCode((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const codeBlocks = [
    // 0: Load Packages
    `reqired_packages <- c("terra", "tidyverse", "here", "knitr", "kableExtra")

for(pkg in reqired_packages){
  if (!require(pkg, character.only = TRUE)){
     stop(paste0("Package &apos;", pkg, "&apos; is not installed"))
  } 
}

# Load required packages
suppressPackageStartupMessages({
  library(tidyverse)
  library(terra)
  library(here)
  library(knitr)
  library(kableExtra)
})`,

    // 1: Data Import
    `sst <- rast(c(here("data", "average_annual_sst_2008.tif"),
              here("data", "average_annual_sst_2009.tif"),
              here("data", "average_annual_sst_2010.tif"),
              here("data", "average_annual_sst_2011.tif"),
              here("data", "average_annual_sst_2012.tif")))

# Read in depth file
depth <- rast(here("data", "depth.tif")) %>%
  project(crs(sst), verbose = FALSE) %>%
  suppressMessages()

eez_raster <- vect(here("data", "wc_regions_clean.shp"))`,

    // 2: Data Processing (Mean SST)
    `mean_sst <- app(sst, fun = mean, na.rm = TRUE)

# Convert from Kelvin to Celsius
mean_sst <- mean_sst - 273.15

# Change Margins on top and bottom
par(oma = c(1, 0, 3, 0))

# Create an informative plot of mean SST
plot(mean_sst,
     main = "Mean Sea Surface Temperature \\n(2008-2012)",
     col = hcl.colors(40, "RdYlBu", rev = TRUE),
     xlab = "Longitude",
     ylab = "Latitude",
     cex.main = 1.0,
     plg = list(title = "SST (°C)"))`,

    // 3: Depth Data Preparation
    `# Resample depth using nearest neighbor approach
depth <- resample(depth, mean_sst, method = "near")

# Crop raster to match SST
depth_cropped <- crop(depth, mean_sst)

# check that the depth and SST match in resolution, extent, and coordinate reference system
compareGeom(depth_cropped, mean_sst, res = TRUE, ext = TRUE, crs = TRUE)

# Verify alignment of datasets
alignment_check <- compareGeom(depth_cropped, mean_sst, res = TRUE, ext = TRUE, crs = TRUE)

if (!alignment_check) {
  stop(
    "Depth and SST rasters are not properly aligned! Check resolution, extent, and CRS of both datasets. ",
    call. = FALSE
  )
} else {
  message("Depth and SST rasters are properly aligned (resolution, extent, and CRS match)")
}`,

    // 4: Suitability Function
    `# Function for identifying and plotting suitable habitats
find_suitable_habitat <- function(temp_min, temp_max, depth_min, depth_max, species_name) {
  
  # Create binary masks for suitable conditions
  sst_suitable <- mean_sst >= temp_min & mean_sst <= temp_max
  depth_suitable <- depth_cropped >= depth_min & depth_cropped <= depth_max
  
  # Combine masks where both conditions are met
  suitable_habitat <- sst_suitable * depth_suitable
  
  # Convert to factor
  suitable_habitat <- as.factor(suitable_habitat)
  levels(suitable_habitat) <- c("Unsuitable", "Suitable")
  
  # Create informative plot
  par(oma = c(1, 1, 1.5, 1))
  
  plot(suitable_habitat,
       col = c("#D3D3D3", "#228B22"),
       type = "classes",
       main = paste0("Potential ", species_name, " Aquaculture Habitat\\nSST: ", temp_min, "–", temp_max, "°C | Depth: ", depth_min, "–", depth_max, " m"),
       xlab = "Longitude",
       ylab = "Latitude",
       axes = TRUE,
       cex.main = 0.8,
       plg = list(x = "topright", title = "Suitability"))
  
  # Return the raster
  return(suitable_habitat)
}`,

    // 5: Oyster Habitat
    `# View Areas Habitable by Oysters
oyster_habitat <- find_suitable_habitat(
  temp_min = 11,
  temp_max = 30,
  depth_min = -70,
  depth_max = 0,
  species_name = "Oyster"
)`,

    // 6: Mussel Habitat
    `# Identify suitable habitat for blue mussels
mussel_habitat <- find_suitable_habitat(
  temp_min = -1,
  temp_max = 20,
  depth_min = -24,
  depth_max = 0,
  species_name = "Blue Mussel"
)`,

    // 7: Total Habitable Areas Function
    `# Returns a data frame of the area suitable for a species by region
total_habitable_areas <- function(temp_min, temp_max, depth_min, depth_max, species_name){
  
  # Create suitability masks
  sst_suitable <- mean_sst >= temp_min & mean_sst <= temp_max
  depth_suitable <- depth_cropped >= depth_min & depth_cropped <= depth_max
  suitable_habitat <- sst_suitable * depth_suitable
  
  # Rasterize EEZ regions
  eez_raster <- rasterize(eez_raster, suitable_habitat, field = "rgn")
  
  # Calculate cell area 
  cell_area <- cellSize(suitable_habitat, unit = "km")
  
  # Get area of suitable cells in dataframe
  area_suitable <- cell_area * suitable_habitat
  
  # Get the total area that is suitable in each EEZ
  total_area_by_eez <- zonal(area_suitable, eez_raster, fun = "sum", na.rm = TRUE)
  
  return(total_area_by_eez)
}`,

    // 8: Calculate Areas
    `# Calculate suitable area for each species

oyster_area <- total_habitable_areas(
  temp_min = 11,
  temp_max = 30,
  depth_min = -70,
  depth_max = 0,
  species_name = "Oyster") %>% 
  rename("Oysters" = area)

mussel_area <- total_habitable_areas(  
  temp_min = -1,
  temp_max = 20,
  depth_min = -24,
  depth_max = 0,
  species_name = "Blue Mussel") %>%
  rename("Blue Mussle" = area)


# Join results and create formatted table
habitat_summary <- inner_join(oyster_area, mussel_area, by = "rgn") %>%
  rename("Region" = rgn) %>%
  mutate(across(where(is.numeric), ~round(.x, 2))) %>%
  kbl(
    caption = "Suitable Area For Oysters and Blue Mussles",
    align = c("l", "r", "r")
  ) %>% 
    kable_styling(
    bootstrap_options = c("striped", "hover", "condensed"),
    full_width = FALSE
  ) %>%
  add_header_above(c(" " = 1, "Suitable Area (km²)" = 2))

habitat_summary`,
  ];

  // Habitat summary data for table
  const habitatSummaryData = {
    headers: ["Region", "Oysters (km²)", "Blue Mussels (km²)"],
    rows: [
      ["Central California", "4940.04	", "1533.94"],
      ["Northern California", "454.30", "748.67"],
      ["Oregon", "1578.972", "1181.82"],
      ["Southern California", "4221.39", "1140.71"],
      ["Washington", "3313.16", "2878.92"],
    ],
  };

  return (
    <article className="min-h-screen bg-gray-50">
      {/* Progress Indicator */}
      <div className="fixed top-0 left-0 w-full h-1 bg-transparent z-50">
        <div
          className="h-full bg-gradient-to-r from-teal-500 via-cyan-500 to-blue-500 transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>
      ;{/* Hero Image Background */}
      <div className="relative w-full h-96 md:h-[28rem]">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 via-teal-500 via-cyan-500 via-sky-500 to-blue-600" />
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 flex items-center justify-center px-6">
          <div className="text-white text-center max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
              Identifying Areas of Potential Aquaculture in the Western US
            </h1>
            <p className="text-sm md:text-base mb-2">
              Author: William Mullins ・ Date: December 10, 2025
            </p>
            <a
              href="https://github.com/willrmull/potential_aquaculture.git"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-white hover:text-gray-300 transition"
            >
              <Github className="w-5 h-5" />
              <span>GitHub</span>
            </a>
          </div>
        </div>
      </div>
      ;
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/blog"
            className="inline-flex items-center text-teal-600 hover:text-teal-800 mt-10 mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Blog
          </Link>

          <header className="mb-12">
            <div className="flex gap-2 mb-4 flex-wrap">
              <span className="px-3 py-1 bg-teal-100 text-teal-700 rounded-full text-sm font-medium">
                Marine Science
              </span>
              <span className="px-3 py-1 bg-cyan-100 text-cyan-700 rounded-full text-sm font-medium">
                Aquaculture
              </span>
              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                Geospatial Analysis
              </span>
            </div>
            <div className="flex items-center text-gray-600 text-sm border-b border-gray-200 pb-8">
              <span className="flex items-center mr-6">
                <Calendar className="w-4 h-4 mr-2" />
                December 10, 2025
              </span>
              <span className="flex items-center">
                <Tag className="w-4 h-4 mr-2" />R · Terra · Raster Analysis
              </span>
            </div>
          </header>

          {/* Content with ref for KaTeX rendering */}
          <div
            ref={contentRef}
            className="prose prose-lg prose-slate mx-auto text-gray-700"
          >
            {/* ================= INTRODUCTION ================= */}
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Introduction
            </h2>

            <p className="text-lg font-semibold text-teal-700 mb-4">
              Does the suitable habitat area for oyster and blue mussel
              aquaculture differ across the western United States coast?
            </p>

            <p>
              Oysters currently constitute the majority of mollusk aquaculture
              across the United States. According to the USDA 2023 Census of
              Aquaculture, mollusks account for 30% of all aquaculture sales in
              California, with oysters comprising approximately 26.6% of that
              figure—indicating that roughly 89% of California&apos;s mollusk
              aquaculture production is derived from oysters. This trend is not
              unique to California; all West Coast states demonstrate a similar
              preference for oysters over other bivalve species.
            </p>

            <p>
              The relative lack of species diversification raises concerns about
              industry resilience. Region-wide stressors such as increasing
              ocean acidification or species-specific pathogens could
              simultaneously impact the majority of mollusk aquaculture
              facilities. This analysis investigates whether the current
              dominance of oysters is driven by environmental suitability by
              comparing suitable habitat areas for oysters versus the native
              blue mussel (<em>Mytilus trossulus</em>). Suitable areas were
              classified by identifying locations where both temperature and
              depth fell within each species&apos; tolerance range.
            </p>

            {/* ================= DATASETS ================= */}
            <h3 className="text-2xl font-semibold text-gray-800 mt-8 mb-3">
              Datasets Used
            </h3>

            <ul className="list-disc pl-6 space-y-2 mb-6">
              <li>
                <strong>
                  <a
                    href="https://coralreefwatch.noaa.gov/product/5km/index_5km_ssta.php"
                    className="text-teal-600 hover:text-teal-800 underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    NOAA Pathfinder Sea Surface Temperature Data
                  </a>
                </strong>
                : Five-year average of sea surface temperature data from
                2008-2012, providing a baseline for temperature analysis along
                the western US coast.
              </li>
              <li>
                <strong>
                  <a
                    href="https://www.gebco.net/data-products/gridded-bathymetry-data#area"
                    className="text-teal-600 hover:text-teal-800 underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    NOAA Bathymetry Data
                  </a>
                </strong>
                : High-resolution ocean depth measurements used to identify
                suitable depths for shellfish cultivation.
              </li>
              <li>
                <strong>
                  <a
                    href="https://www.marineregions.org/eez.php"
                    className="text-teal-600 hover:text-teal-800 underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    West Coast Regional Boundaries
                  </a>
                </strong>
                : Spatial boundaries defining the Exclusive Economic Zones
                (EEZs) for California, Oregon, and Washington, used to calculate
                suitable habitat area by region.
              </li>
            </ul>

            {/* ================= LOADING PACKAGES ================= */}
            <h3 className="text-2xl font-semibold text-gray-800 mt-8 mb-3">
              Loading Packages
            </h3>

            <CodeBlock
              code={codeBlocks[0]}
              index={0}
              title="Load Required Packages"
              expandedCode={expandedCode}
              copiedIndex={copiedIndex}
              onToggle={toggleCode}
              onCopy={copyToClipboard}
            />

            {/* ================= DATA IMPORT ================= */}
            <h3 className="text-2xl font-semibold text-gray-800 mt-8 mb-3">
              Data Import
            </h3>

            <p>
              The following section imports the three datasets used in the
              analysis. We implement validation checks to ensure files exist
              before attempting to load them.
            </p>

            <ul className="list-disc pl-6 space-y-2 mb-6">
              <li>
                The SST data are stored as individual GeoTIFF files, each
                representing the average annual SST for a given year. These
                rasters are stacked into a single multi-layer raster object.
              </li>
              <li>
                The bathymetry raster is then imported and reprojected to match
                the coordinate reference system of the SST stack.
              </li>
              <li>The EEZ boundaries are read as a vector layer.</li>
            </ul>

            <CodeBlock
              code={codeBlocks[1]}
              index={1}
              title="Import Datasets"
              expandedCode={expandedCode}
              copiedIndex={copiedIndex}
              onToggle={toggleCode}
              onCopy={copyToClipboard}
            />

            {/* ================= DATA PROCESSING ================= */}
            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">
              Data Processing
            </h2>

            <p>
              To find the temporal mean SST across the 2008–2012 period, we
              compute the average across the raster stack. Since the original
              values are in Kelvin, we convert them to Celsius by subtracting
              273.15.
            </p>

            <CodeBlock
              code={codeBlocks[2]}
              index={2}
              title="Calculate Mean SST"
              expandedCode={expandedCode}
              copiedIndex={copiedIndex}
              onToggle={toggleCode}
              onCopy={copyToClipboard}
            />

            <div className="flex justify-center">
              <div className="my-6 w-full max-w-5xl">
                <div className="relative h-96 w-full">
                  <Image
                    src="/images/mean_sst.png"
                    alt="Mean Sea Surface Temperature (2008-2012)"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 50vw"
                    className="object-contain rounded"
                    priority
                  />
                </div>
              </div>
            </div>

            <p>
              <strong>Interpretation:</strong> This map reveals the
              characteristic temperature gradient along the US West Coast.
              Southern California exhibits the warmest waters (20-25°C), while
              the Pacific Northwest and areas influenced by coastal upwelling
              show cooler temperatures (10-15°C). This spatial variation in
              temperature has important implications for species-specific
              aquaculture siting, as different shellfish species have distinct
              thermal tolerances.
            </p>

            {/* ================= DEPTH DATA PREPARATION ================= */}
            <h3 className="text-2xl font-semibold text-gray-800 mt-8 mb-3">
              Depth Data Preparation
            </h3>

            <p>
              The depth raster is resampled to match the resolution and extent
              of the SST data using nearest neighbor interpolation. This ensures
              that both datasets align perfectly for subsequent analysis.
            </p>

            <CodeBlock
              code={codeBlocks[3]}
              index={3}
              title="Prepare Depth Data"
              expandedCode={expandedCode}
              copiedIndex={copiedIndex}
              onToggle={toggleCode}
              onCopy={copyToClipboard}
            />

            {/* ================= HABITAT SUITABILITY ANALYSIS ================= */}
            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">
              Habitat Suitability Analysis
            </h2>

            <p>
              To evaluate the potential of locations for marine aquaculture of a
              given species, we use measurements of environmental tolerances.
              Using these thresholds, each pixel in the study area is classified
              as either suitable or unsuitable based on whether it
              simultaneously satisfies both temperature and depth criteria.
            </p>

            <h3 className="text-2xl font-semibold text-gray-800 mt-8 mb-3">
              Suitability Function
            </h3>

            <p>
              The <code>find_suitable_habitat()</code> function implements this
              logic by first generating binary masks for temperature and depth
              suitability. The rasters are then combined, producing a
              categorical raster containing locations where both conditions are
              met.
            </p>

            <CodeBlock
              code={codeBlocks[4]}
              index={4}
              title="Suitability Function"
              expandedCode={expandedCode}
              copiedIndex={copiedIndex}
              onToggle={toggleCode}
              onCopy={copyToClipboard}
            />

            {/* ================= OYSTER HABITAT ================= */}
            <h3 className="text-2xl font-semibold text-gray-800 mt-8 mb-3">
              Map of Potential Oyster Habitats
            </h3>

            <p>
              Oysters prefer slightly warm waters (11-30°C) and are able to be
              cultivated in shallow depths (0-70 meters).
            </p>

            <CodeBlock
              code={codeBlocks[5]}
              index={5}
              title="Oyster Habitat Analysis"
              expandedCode={expandedCode}
              copiedIndex={copiedIndex}
              onToggle={toggleCode}
              onCopy={copyToClipboard}
            />

            <div className="flex justify-center">
              <div className="my-6 w-full max-w-5xl">
                <div className="relative h-96 w-full">
                  <Image
                    src="/images/oysters_area.png"
                    alt="Potential Oyster Aquaculture Habitat"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 50vw"
                    className="object-contain rounded"
                    priority
                  />
                </div>
              </div>
            </div>

            <p>
              <strong>Interpretation:</strong> This map shows that suitable
              areas are concentrated along the coast of Southern and Central
              California, with a large area also being present in Washington.
              Oregon and North California appear to have significantly smaller
              amounts of suitable area.
            </p>

            {/* ================= MUSSEL HABITAT ================= */}
            <h3 className="text-2xl font-semibold text-gray-800 mt-8 mb-3">
              Map of Potential Mussel Habitats
            </h3>

            <p>
              The species of blue mussels native to the West Coast,{" "}
              <em>Mytilus trossulus</em>, are much more cold-adapted in
              comparison to oysters. Although estimates vary, most sources cite
              a temperature range between -1°C and 20°C, with reduced growth and
              survival when temperatures exceed 18°C. Blue mussels are also
              typically found in shallower depths (0-24 meters).
            </p>

            <CodeBlock
              code={codeBlocks[6]}
              index={6}
              title="Blue Mussel Habitat Analysis"
              expandedCode={expandedCode}
              copiedIndex={copiedIndex}
              onToggle={toggleCode}
              onCopy={copyToClipboard}
            />

            <div className="flex justify-center">
              <div className="my-6 w-full max-w-5xl">
                <div className="relative h-96 w-full">
                  <Image
                    src="/images/mussels_area.png"
                    alt="Potential Blue Mussel Aquaculture Habitat"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 50vw"
                    className="object-contain rounded"
                    priority
                  />
                </div>
              </div>
            </div>
            <p>
              <strong>Interpretation:</strong> This map shows that suitable
              areas are primarily found within Washington, with a large cluster
              also being present in the Bay area. Outside of that, mussels
              appear to have a much smaller amount of suitable area in
              comparison to Oysters overall.
            </p>

            {/* ================= REGIONAL ANALYSIS ================= */}
            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">
              Regional Analysis of Suitable Habitat
            </h2>

            <p>
              To quantify aquaculture potential by jurisdiction, we calculate
              the total area of suitable habitat within each state&apos;s
              Exclusive Economic Zone.
            </p>

            <h3 className="text-2xl font-semibold text-gray-800 mt-8 mb-3">
              Calculating Suitable Area by Region
            </h3>

            <p>
              This function builds upon the habitat suitability analysis by
              calculating the total area (in square kilometers) of suitable
              habitat within each region.
            </p>

            <CodeBlock
              code={codeBlocks[7]}
              index={7}
              title="Area Calculation Function"
              expandedCode={expandedCode}
              copiedIndex={copiedIndex}
              onToggle={toggleCode}
              onCopy={copyToClipboard}
            />

            <h3 className="text-2xl font-semibold text-gray-800 mt-8 mb-3">
              Table of Suitable Area by Region
            </h3>

            <CodeBlock
              code={codeBlocks[8]}
              index={8}
              title="Calculate Regional Areas"
              expandedCode={expandedCode}
              copiedIndex={copiedIndex}
              onToggle={toggleCode}
              onCopy={copyToClipboard}
            />

            <DataTable
              headers={habitatSummaryData.headers}
              rows={habitatSummaryData.rows}
              caption="Table 1: Suitable Area For Oysters and Blue Mussels by Region"
            />

            <h3 className="text-2xl font-semibold text-gray-800 mt-8 mb-3">
              Interpretation
            </h3>

            <ol className="list-decimal pl-6 space-y-3 mb-6">
              <li>
                <strong>Washington</strong> has the most suitable habitat for
                blue mussels (2878.92 km²), which is more than a thousand higher
                than the next highest region. This is likely caused by the cold
                waters of the state and large amount of shallow water found in
                regions like the Puget Sound.
              </li>
              <li>
                <strong>Central California</strong> leads in oyster habitat
                suitability (1578.97 km²), likely due to their warmer waters. In
                this region there is a significant disparity between suitable
                oyster habitat and mussel habitat.
              </li>
              <li>
                <strong>Oregon</strong> shows a slight preference for mussels
                over oysters (76.65 km² vs. 1181.82 km²), which could be caused
                by it&apos;s slightly cooler waters or a limited amount of
                shallow areas.
              </li>
              <li>
                <strong>Southern California</strong> shows high suitability for
                oysters (4221.39 km²) with below average suitability for
                mussels.
              </li>
              <li>
                <strong>Northern California</strong> seems to be rather
                unaccommodating for both species, though mussels are somewhat
                favored.
              </li>
            </ol>

            {/* ================= IMPLICATIONS ================= */}
            <h3 className="text-2xl font-semibold text-gray-800 mt-8 mb-3">
              Implications for Aquaculture Development
            </h3>

            <p>
              The results of this analysis suggest that the current dominance of
              oyster aquaculture along the West Coast may not fully reflect the
              environmental potential for species diversification. The
              suitability analysis revealed that opportunities for blue mussel
              cultivation appear to remain largely untapped. Washington emerges
              as the most promising region for mussel diversification, with
              2,879 km² of suitable habitat which makes it the most promising
              region. Northern California also presents a compelling case as
              mussel-suitable habitat (749 km²) exceeds oyster-suitable area
              (454 km²), a pattern not reflected in current farming practices.
            </p>

            <p>
              The regions such as the Central and Southern California
              substantial oyster-suitable areas (4,940 km² and 4,221 km²
              respectively) do support the industry&apos;s continued focus on
              oysters in these regions. But it is worth noting that the majority
              of oyster farming located in the northern half of the state,
              indicatng that these regions may be generally underutilized for
              shellfish production. Oregon also seems to have conditions
              favoring mussels, however the gap is somewhat minimal in
              comparison.
            </p>

            <p>
              From the perspective of resiliance, these findings may be
              significant. The industry&apos;s heavy reliance on a single
              family, and predominantly one species, leaves it vulnerable to
              region-wide stressors as mentioned prior. The results of this
              analysis indicate that regions appear to have the potential to
              diversify their aquaculture practices.
            </p>

            {/* ================= LIMITATIONS ================= */}
            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">
              Limitations
            </h2>

            <p>
              While this analysis provides a solid foundation for further
              research, it has some limitations that should be addressed in
              future research:
            </p>

            <ol className="list-decimal pl-6 space-y-3 mb-6">
              <li>
                <strong>Temporal Resolution</strong>: The data uses annual SST,
                which does not account for seasonal variations in ocean
                conditions. Locations which experience extreme seasonal
                differences are likely to go undetected using this method, which
                could result in false positives being introduced.
              </li>
              <li>
                <strong>Environmental factors not considered</strong>: Important
                variables such as acidity, tidal patterns, wave exposure, and El
                Niño events were not included in the analysis.
              </li>
              <li>
                <strong>Socioeconomic and Regulatory Constraints</strong>:
                Shipping lanes, marine protected areas, and competing ocean uses
                were not incorporated into the suitability model.
              </li>
            </ol>

            {/* ================= FUTURE RESEARCH ================= */}
            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">
              Future Research
            </h2>

            <p>
              In addition to addressing the above limitations, future research
              should investigate the economic viability of establishing mussel
              production in areas identified as suitable. Additionally, climate
              forecasts should be included in the analysis to see if sites are
              likely to remain suitable in the future.
            </p>

            {/* ================= REFERENCES ================= */}
            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">
              References
            </h2>

            <ul className="list-disc pl-6 space-y-2 mb-6">
              <li>
                National Oceanic and Atmospheric Administration. (2023). NOAA
                CoastWatch Pathfinder Sea Surface Temperature Dataset.{" "}
                <a
                  href="https://podaac.jpl.nasa.gov/dataset/AVHRR_PATHFINDER_L3_V52"
                  className="text-teal-600 hover:text-teal-800 underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  https://podaac.jpl.nasa.gov/dataset/AVHRR_PATHFINDER_L3_V52
                </a>
              </li>
              <li>
                National Centers for Environmental Information. (2023). Gridded
                Bathymetry Data.{" "}
                <a
                  href="https://www.ncei.noaa.gov/access/gridded-bathymetry-data"
                  className="text-teal-600 hover:text-teal-800 underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  https://www.ncei.noaa.gov/access/gridded-bathymetry-data
                </a>
              </li>
              <li>
                NOAA Fisheries. (2023). West Coast Regional Boundaries.{" "}
                <a
                  href="https://www.fisheries.noaa.gov/west-coast/marine-protected-areas/west-coast-regional-boundaries"
                  className="text-teal-600 hover:text-teal-800 underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  https://www.fisheries.noaa.gov/west-coast/marine-protected-areas/west-coast-regional-boundaries
                </a>
              </li>
              <li>
                Food and Agriculture Organization. (2022). The State of World
                Fisheries and Aquaculture.{" "}
                <a
                  href="https://www.fao.org/3/ca9229en/ca9229en.pdf"
                  className="text-teal-600 hover:text-teal-800 underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  https://www.fao.org/3/ca9229en/ca9229en.pdf
                </a>
              </li>
              <li>
                United States Department of Agriculture (USDA) National
                Agricultural Statistics Service. 2024. 2023 Census of
                Aquaculture.{" "}
                <a
                  href="https://www.nass.usda.gov/Publications/AgCensus/2022/Online_Resources/Aquaculture/index.php"
                  className="text-teal-600 hover:text-teal-800 underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  https://www.nass.usda.gov/Publications/AgCensus/2022/Online_Resources/Aquaculture/index.php
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </article>
  );
}
