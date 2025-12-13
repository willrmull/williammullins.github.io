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
    `# Load necessary libraries
import os
import pandas as pd
import numpy as np
import geopandas as gpd
import matplotlib.pyplot as plt
import xarray as xr
import rioxarray as rioxr


# Import the Landsat 8 data
fp = os.path.join('data','landsat8-2025-02-23-palisades-eaton.nc') 
landsat = xr.open_dataset(fp)`,

    `# Read in Landsat satellite imagery from NetCDF file
landsat = xr.open_dataset(os.path.join('data','landsat8-2025-02-23-palisades-eaton.nc'))

# Recover geometry information using CRS from the spatial_ref attribute
landsat.rio.write_crs(landsat.spatial_ref.crs_wkt, inplace=True)

# Display the dataset structure to understand available bands
print(f"Available bands: {list(landsat.data_vars)}")
print(f"CRS: {landsat.rio.crs}")`,

    `#False Color Image'

# Select the three bands and stack them into a single array
false_color = landsat[['swir22', 'nir08', 'red']].to_array(dim='band')

# Fill any missing values with 0 to avoid gaps in the visualization
false_color = false_color.fillna(0)

# Plot the false color composite using robust scaling
fig, ax = plt.subplots(figsize=(12, 10))
false_color.plot.imshow(ax=ax, robust=True)
ax.set_axis_off()
ax.set_title("False Color Composite of Los Angeles Fire Region", fontsize=14)
plt.show()`,

    `palisades, eaton  = (
    gpd.read_file(os.path.join("data", "Palisades_Perimeter_20250121.geojson")),
    gpd.read_file(os.path.join("data", "Eaton_Perimeter_20250121.geojson"))
)

eaton = eaton.to_crs(landsat.rio.crs)
palisades = palisades.to_crs(landsat.rio.crs)`,

    `# Overlay Fire Perimeters on False Color Composite
fig, ax = plt.subplots(1, 1, figsize=(14, 12))
                                      
# Plot False Color Map
landsat[['swir22', 'nir08', 'red']].to_array(dim='band').fillna(0).plot.imshow(
    ax=ax, 
    robust=True
)

                                      
# Overlay Eaton Fire boundary
eaton.boundary.plot(
    ax=ax, 
    color='Black', 
    linewidth= 3.5, 
    label='Eaton Fire'
)

# Overlay Palisades Fire boundary
palisades.boundary.plot(
    ax=ax, 
    color='White', 
    linewidth = 3.5, 
    label='Palisades Fire'
)
                                      
# Add Title
ax.set_title("Wildfire Boundaries on False Color Composite", fontsize=18, fontweight='bold')

# Add Legend
ax.legend(loc='lower left', frameon=True, title="Fire Perimeters")

ax.axis('off')
plt.tight_layout()
plt.show()`,

    `# Read in and reproject census data
eji_data = gpd.read_file(os.path.join("data", "EJI_2024_California.gdb"))

if eji_data.crs != landsat.rio.crs:
    eji_data = eji_data.to_crs(landsat.rio.crs)`,

    `# Find tracts that intersect with fire perimeters
census_palisades, census_eaton = (
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

plt.show()`,
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
              Comparison of the Eaton and Palisades Fires
            </h1>
            <p className="text-sm md:text-base mb-2">
              Author: William Mullins ・ Date: December 12, 2025
            </p>
            <a
              href="https://github.com/willrmull/Eaton-Palisades-Fires"
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
                December 12, 2025
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

            <h3>About</h3>
            <p>
              On January 7, 2025, the Eaton and Palisades fires ignited nearly
              simultaneously in the Los Angeles metropolitan area, devastating
              thousands of acres and displacing countless residents. These fires
              became two of the most destructive wildfires in California
              history, prompting questions about the environmental and
              demographic impacts they may have had.
            </p>
            <p>
              This analysis uses satellite remote sensing and census data to
              accomplish two objectives:
            </p>
            <ul>
              <li>
                To visualize the burn scars using false color imagery that can
                penetrate the smoke and highlight fire damage
              </li>
              <li>
                To examine if elderly populations were disproportionately
                affected by comparing data from within each fire&apos;s
                perimeter
              </li>
            </ul>

            {/* Section Divider */}
            <div className="h-px bg-gray-300 my-10" />

            <h3>Highlights</h3>
            <ul>
              <li>
                Geospatial data wrangling using geopandas for vector operations
                and xarray with rioxarray for raster processing
              </li>
              <li>
                False-color composite visualization combining SWIR, NIR, and Red
                bands to reveal burn scars invisible in natural color imagery
              </li>
              <li>
                Spatial analysis using census tract information and fire
                perimeters to quantify population impacts
              </li>
            </ul>

            {/* Section Divider */}
            <div className="h-px bg-gray-300 my-10" />

            <h3>Datasets</h3>
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div>
                <a
                  href="https://www.atsdr.cdc.gov/place-health/php/eji/eji-data-download.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  CDC/ATSDR Environmental Justice Index (EJI) for California,
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
                  href="https://services.arcgis.com/RmCCgQtiZLDCtblq/arcgis/rest/services/Palisades_and_Eaton_Dissolved_Fire_Perimeters_as_of_20250121/FeatureServer"
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
                href="https://planetarycomputer.microsoft.com/dataset/landsat-c2-l2"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Landsat Collection 2 Level-2 Data
              </a>
              <p className="text-sm mt-2">
                Landsat 8-9 data collected by NASA showing surface reflectance
                and temperature. The data used in this analysis is a NetCDF
                containing a subset of this data which centers on the area
                surrounding the two fires.
              </p>
            </div>

            {/* Section Divider */}
            <div className="h-px bg-gray-300 my-10" />

            <h2>Analysis Setup</h2>
            <h4>Loading Required Packages</h4>
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

            <h2>False Color Image Analysis</h2>
            <p>
              False-color composites are widely used to assess wildfire impacts.
              By combining non-visible spectral bands—such as short-wave
              infrared (SWIR) and near-infrared (NIR)—these images can penetrate
              smoke and reveal burn scars that aren&apos;t apparent in
              natural-color imagery.
            </p>

            <h4>Reading Landsat Satellite Data</h4>
            <p>
              The satellite data, stored in a NetCDF file, is loaded using
              xarray.open_dataset(). The coordinate reference system (CRS) is
              then restored with rioxarray.
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

            <h4>Generating the False Color Composite</h4>
            <p>
              This code builds a false-color composite by selecting three
              spectral bands and assigning them to the RGB channels: SWIR to
              red, NIR to green, and red (visible light) to blue. This
              combination makes burned areas appear bright red-orange, while
              healthy vegetation appears green and urban areas appear gray or
              tan. Those values are then scaled using robust scaling, which
              reduces the impact of outliers, and plotted to give the map below.
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
                alt="False Color Composite of Los Angeles Fire Region"
                fill
                style={{ objectFit: "cover" }}
                className="rounded-xl shadow-lg"
                unoptimized
              />
            </div>

            <h4>Loading Fire Perimeter Data</h4>
            <p>
              The fire perimeter boundaries are read from GeoJSON files and
              reprojected to match the Landsat data&apos;s CRS.
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

            <h4>Overlaying Fire Perimeters on False Color Composite</h4>
            <p>
              The fire perimeters are overlayed on the false color composite to
              better show the range of the fire. From this it can be seen that
              both of the regions have significant scarring, with the color in
              the Palisades region suggesting more severe burning.
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
                alt="Wildfire Boundaries on False Color Composite"
                fill
                style={{ objectFit: "cover" }}
                className="rounded-xl shadow-lg"
                unoptimized
              />
            </div>

            <h2>Age Disparity Analysis</h2>
            <p>
              Beyond visualizing damage, it&apos;s important to understand the
              populations affected by the fires. This section examines whether
              elderly populations, who may experience greater challenges during
              evacuation and recovery, were disproportionately impacted by
              either fire.
            </p>

            <h3>Loading Environmental Justice Index Data</h3>
            <p>
              The CDC&apos;s Environmental Justice Index provides census
              tract–level demographic data, including percentile rankings for
              the population aged 65 and older. This dataset was read in and
              reprojected to match the boundaries CRS.
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

            <h3>Creating Census Tracts from Data</h3>
            <p>
              The census data is then spatially joined with the fire perimeters
              to identify all census tracts overlapping each burned area. The
              resulting dataset includes only those intersecting tracts, along
              with their associated demographic attributes.
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

            <h3>Visualizing Age Demographics by Fire Region</h3>
            <p>
              The final visualization displays the census tracts affected by
              each fire, colored by their EPL_AGE65 percentile value.
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
                alt="Percentile of People over 65 Years Old in Fire Areas"
                fill
                style={{ objectFit: "cover" }}
                className="rounded-xl shadow-lg"
                unoptimized
              />
            </div>

            <h3>Interpretation</h3>
            <p>
              The results reveal a notable demographic disparity between the two
              fire-affected areas. Census tracts within the Palisades fire
              perimeter have a higher proportion of residents aged 65 and older
              than most tracts in California. In contrast, tracts impacted by
              the Eaton fire show a lower proportion of older adults relative to
              the state average. Future studies should examine whether this
              disparity influenced emergency response planning and resource
              allocation.
            </p>

            <h3>References</h3>
            <p className="text-sm text-gray-600">
              Centers for Disease Control and Prevention and Agency for Toxic
              Substances Disease Registry. [2024] Environmental Justice Index.
              Accessed [12/12/2025].
              <a
                href="https://atsdr.cdc.gov/place-health/php/eji/eji-data-download.html"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline ml-1"
              >
                https://atsdr.cdc.gov/place-health/php/eji/eji-data-download.html
              </a>
            </p>
            <p className="text-sm text-gray-600 mt-2">
              Earth Resources Observation and Science (EROS) Center. (2020).
              Landsat 8-9 Operational Land Imager / Thermal Infrared Sensor
              Level-2, Collection 2 [dataset]. U.S. Geological Survey.
              <a
                href="https://doi.org/10.5066/P9OGBGM6"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline ml-1"
              >
                https://doi.org/10.5066/P9OGBGM6
              </a>
            </p>
            <p className="text-sm text-gray-600 mt-2">
              Palisades and Eaton Dissolved Fire Perimeters as of 2025/01/21.
              (2025). ArcGIS REST Services Directory.
              <a
                href="https://services.arcgis.com/RmCCgQtiZLDCtblq/arcgis/rest/services/Palisades_and_Eaton_Dissolved_Fire_Perimeters_as_of_20250121/FeatureServer"
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