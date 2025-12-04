"use client";

import Link from "next/link";
import { ArrowLeft, Calendar, Tag, Github } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function FiresAnalysisPost() {
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
    `import os
import pandas as pd
import numpy as np
import geopandas as gpd
import matplotlib.pyplot as plt
import xarray as xr
import rioxarray as rioxr`,

    `landsat = xr.open_dataset(os.path.join('data','landsat8-2025-02-23-palisades-eaton.nc'))

# Recover geometry information using CRS from the spatial_ref attribute
landsat.rio.write_crs(landsat.spatial_ref.crs_wkt, inplace=True)`,

    `#False Color Image
# Plot with Short-wave Infrared, Near-Infrared, and Red 
false = landsat[['swir22', 'nir08', 'red']].to_array(dim='band').fillna(0).plot.imshow(robust=True)
false_plot = rgb.plot.imshow(robust=True)
false_plot.axes.set_axis_off()
false_plot.axes.set_title("False Color Map of Fire Area")
plt.show()`,

    `palisades, eaton  = (
    gpd.read_file(os.path.join("data", "Palisades_Perimeter_20250121.geojson")),
    gpd.read_file(os.path.join("data", "Eaton_Perimeter_20250121.geojson"))
)

eaton = eaton.to_crs(landsat.rio.crs)
palisades = palisades.to_crs(landsat.rio.crs)`,

    `# Plotting Data Together 
fig, ax = plt.subplots(1, 1, figsize=(14, 12))

# Plot False Color Map
landsat[['swir22', 'nir08', 'red']].to_array(dim='band').fillna(0).plot.imshow(ax=ax, robust=True)

# Plot Eaton And Palisades Perimeter
eaton.boundary.plot(ax=ax, 
                    color='Black', 
                    linewidth= 3.5, 
                    label='Eaton Fire')
palisades.boundary.plot(ax=ax, 
                        color='White', 
                        linewidth = 3.5, 
                        label='Palisades Fire')

# Add Title
ax.set_title("Wildfire Boundaries on False Color Composite", fontsize=18, fontweight='bold')

# Add Legend
ax.legend(loc='lower left', frameon=True, title="Fire Perimeters")

ax.axis('off')
plt.tight_layout()
plt.show()`,

    `eji_data = gpd.read_file(os.path.join("data", "EJI_2024_California.gdb"))

if eji_data.crs != landsat.rio.crs:
    eji_data = eji_data.to_crs(landsat.rio.crs)`,

    `census_palisades, census_eaton = (
    gpd.sjoin(eji_data, palisades, how = 'inner'),
    gpd.sjoin(eji_data, eaton, how = 'inner')
)
census_palisades.head(5)`,

    `fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(20, 10))

# UPDATE WITH YOU EJI VARIABLE FROM STEP 1
eji_variable = 'EPL_AGE65'

# Find common min/max for legend range
vmin = min(census_palisades[eji_variable].min(), census_eaton[eji_variable].min())
vmax = max(census_palisades[eji_variable].max(), census_eaton[eji_variable].max())

# Plot census tracts within Palisades perimeter
census_palisades.plot(
    column= eji_variable,
    vmin=vmin, vmax=vmax,
    legend=False,
    ax=ax1,
)
ax1.set_title('Palisades Census Tracts')
ax1.axis('off')

# Plot census tracts within Eaton perimeter
census_eaton.plot(
    column=eji_variable,
    vmin=vmin, vmax=vmax,
    legend=False,
    ax=ax2,
)
ax2.set_title('Eaton Fire Census Tracts')
ax2.axis('off')

# Add overall title
fig.suptitle('Percentile of People over 65 Years Old in Eaton Fire')

# Add shared colorbar at the bottom
sm = plt.cm.ScalarMappable( norm=plt.Normalize(vmin=vmin, vmax=vmax))
cbar_ax = fig.add_axes([0.25, 0.08, 0.5, 0.02])  # [left, bottom, width, height]
cbar = fig.colorbar(sm, cax=cbar_ax, orientation='horizontal')
cbar.set_label('People Over 65 Years Old (Percentile)')

plt.show()`
  ];

  return (
    <article className="min-h-screen bg-gray-50 py-20">
      {/* Progress Indicator */}
      <div className="fixed top-0 left-0 w-full h-1 bg-transparent z-50">
        <div 
          className="h-full bg-gradient-to-r from-orange-500 to-red-500 transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />

      </div>

      {/* ------- HERO IMAGE BACKGROUND ------- */}
      <div className="relative w-full h-96 md:h-[28rem]">
        <Image
          src="/images/fire_banner.png"
          alt="Header image"
          fill
          style={{ objectFit: "cover" }}
          className="brightness-90"
          unoptimized
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex items-center justify-center px-6">
          <div className="text-white text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
              Eaton and Palisades Fires Analysis
            </h1>
            <p className="text-sm md:text-base mb-2">
              Author: William Mullins ・ Date: December 3, 2025
            </p>
            <a
              href="https://github.com/willrmull/eds220-hwk4  "
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
                Remote Sensing
              </span>
              <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium">
                Wildfire
              </span>
            </div>
            <div className="flex items-center text-gray-600 text-sm border-b border-gray-200 pb-8">
              <span className="flex items-center mr-6">
                <Calendar className="w-4 h-4 mr-2" />
                December 3, 2025
              </span>
              <span className="flex items-center">
                <Tag className="w-4 h-4 mr-2" />
                Python · Geospatial
              </span>
            </div>
          </header>

          <div className="prose prose-lg prose-slate mx-auto text-gray-700">
            {/* Section Divider */}
            <div className="h-px bg-gray-300 my-10" />

            <h3>Introduction</h3>
            <p>
              On January 7, 2025, two fires broke out nearly simultaneously in the City of Los Angeles. In this blog post,
              false-color images are made using satellite imagery from the time of the fire
              to analyze their impact on the areas. In addition, the disparity in age across the area affected by the fire is
              analyzed to see if there is a demographic disparity among those impacted.
            </p>

            {/* Section Divider */}
            <div className="h-px bg-gray-300 my-10" />

            <h3>Highlights</h3>
            <ul>
              <li>Geospatial data wrangling</li>
              <li>False color image of fires with boundaries</li>
              <li>Difference in resident age between the fires</li>
            </ul>

            {/* Section Divider */}
            <div className="h-px bg-gray-300 my-10" />

            <h3>Datasets</h3>
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div>
                <a
                  href="https://www.atsdr.cdc.gov/place-health/php/eji/eji-data-download.html "
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  CDC and ATSDR Environmental Justice Index For California in
                  2024
                </a>
                <p className="text-sm mt-2">
                  A geodatabase created by Centers for Disease Control and
                  Prevention and Agency for Toxic Substances Disease Registry
                  concerning environmental justice at the county level in the
                  United States. A subset of this data concerning counties in
                  California in 2024 was used in this analysis.
                </p>
              </div>
              <div>
                <a
                  href="https://services.arcgis.com/RmCCgQtiZLDCtblq/arcgis/rest/services/Palisades_and_Eaton_Dissolved_Fire_Perimeters_as_of_20250121/FeatureServer "
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  Palisades and Eaton Dissolved Fire Perimeters as of 2025/01/21
                </a>
                <p className="text-sm mt-2">
                  GeoJSON files were downloaded containing the perimeter data
                  for the Palisades and Eaton fires.
                </p>
              </div>
            </div>
            <div>
              <a
                href="https://planetarycomputer.microsoft.com/dataset/landsat-c2-l2 "
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Landsat Collection 2 Level-2 Data
              </a>
              <p className="text-sm mt-2">
                Landsat 8-9 data collected by NASA showing surface reflectance and
                temperature. The data used in this analysis is a NetCDF
                containing a subset of this data which centers on the area
                surrounding the two fires.
              </p>
            </div>

            {/* Section Divider */}
            <div className="h-px bg-gray-300 my-10" />

            <h4>Load in Packages</h4>
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

            <h3>False Color Image</h3>
            <p>
              False-color images use short-wave and infrared bands of light to penetrate smoke, enabling the analysis of wildfires using satellite imagery. Using this method, the damage done by the Eaton and Palisades fires can be visualized.
            </p>

            <h4>Read in Landsat Data</h4>
            <p>
              The NetCDF file containing satellite data is read in using xarray.open_dataset and the geometry data is recovered.
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

            <h4>Generating False Color Image</h4>
            <p>
              This code builds a false-color composite by selecting the
              short-wave infrared, near-infrared, and red bands from the data.
              Those values are then scaled using robust scaling, which reduces
              the impact of outliers, and plotted to give the map below.
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
            {/* IMAGE 1 */}
            <div className="relative w-full h-96 mt-4 mb-10">
              <Image
                src="/images/false_color.png"
                alt="False Color Map of Fire Area"
                fill
                style={{ objectFit: "cover" }}
                className="rounded-xl shadow-lg"
                unoptimized
              />
            </div>

            <h4>Fire Perimeter Data</h4>
            <p>
              The fire perimeter is read in and their CRS are reprojected to
              match the Landsat data.
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

            <h4>Fire Perimeter Over False Color Image</h4>
            <p>
              The perimeters are mapped on top of the false-color images to better show the range of the fire. Through this we can see that both regions have significant scarring, as seen by the red and orange coloring. Additionally, the red coloring on the Palisades indicates that the fire in that area was burning hotter at the time the data was collected.
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
            {/* IMAGE 2 */}
            <div className="relative w-full h-96 mt-4 mb-10">
              <Image
                src="/images/false_col_census.png"
                alt="False Color Map With Census"
                fill
                style={{ objectFit: "cover" }}
                className="rounded-xl shadow-lg"
                unoptimized
              />
            </div>

            <h2>Age Disparity Between Fire Areas</h2>
            <p>
              In this next section, the difference in the age of those directly affected by the
              two fires will be examined by displaying the percentile for people over 65 years old
              within each fire's perimeter.
            </p>

            <h3>Read In Data</h3>
            <p>
              The geodatabase is read in and the data is reprojected
              to match the Landsat data from earlier.
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

            <h3>Create Census Raster from Data</h3>
            <p>
              Two rasters are created by spatially joining the perimeter data from the
              fires with the census data within them.
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

            <h3>Plot Environmental Justice Data</h3>
            <p>
              The two rasters are plotted next to each other, and it can be seen that the percentile of
              those over 65 was much higher within the region affected by the Palisades fire.
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
            {/* IMAGE 3 */}
            <div className="relative w-full h-96 mt-4 mb-10">
              <Image
                src="/images/socioeconomic.png"
                alt="Percentile of People over 65 Years Old in Eaton Fire"
                fill
                style={{ objectFit: "cover" }}
                className="rounded-xl shadow-lg"
                unoptimized
              />
            </div>

            <h3>References</h3>
            <p className="text-sm text-gray-600">
              Centers for Disease Control and Prevention and Agency for Toxic
              Substances and Disease Registry. (2024). Environmental Justice Index for California.
              <a
                href="https://www.atsdr.cdc.gov/place-health/php/eji/eji-data-download.html "
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline ml-1"
              >
                https://www.atsdr.cdc.gov/place-health/php/eji/eji-data-download.html 
              </a>
            </p>
            <p className="text-sm text-gray-600 mt-2">
              Earth Resources Observation and Science (EROS) Center. (2020). Landsat 8-9 Operational Land Imager / Thermal Infrared Sensor Level-2, Collection 2 [dataset]. U.S. Geological Survey.
              <a
                href="https://doi.org/10.5066/P9OGBGM6 "
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline ml-1"
              >
                https://doi.org/10.5066/P9OGBGM6 
              </a>
            </p>
            <p className="text-sm text-gray-600 mt-2">
              Palisades and Eaton Dissolved Fire Perimeters as of 2025/01/21. (2025). ArcGIS REST Services Directory.
              <a
                href="https://services.arcgis.com/RmCCgQtiZLDCtblq/arcgis/rest/services/Palisades_and_Eaton_Dissolved_Fire_Perimeters_as_of_20250121/FeatureServer "
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline ml-1"
              >
                https://services.arcgis.com/RmCCgQtiZLDCtblq/arcgis/rest/services/Palisades_and_Eaton_Dissolved_Fire_Perimeters_as_of_20250121/FeatureServer 
              </a>
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}