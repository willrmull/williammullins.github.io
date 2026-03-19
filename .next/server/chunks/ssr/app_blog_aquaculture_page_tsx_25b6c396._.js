module.exports=[89696,a=>{"use strict";var b=a.i(87924),c=a.i(38246),d=a.i(71987),e=a.i(210),f=a.i(41675),g=a.i(33350),h=a.i(5112),i=a.i(5784),j=a.i(67552),k=a.i(72131);let l=({code:a,index:c,title:d,expandedCode:e,copiedIndex:f,onToggle:g,onCopy:h})=>{let k=e[c]??!1;return(0,b.jsxs)("div",{className:"relative mb-6",children:[(0,b.jsxs)("button",{onClick:()=>g(c),className:"w-full flex items-center justify-between bg-gradient-to-r from-teal-700 to-cyan-700 text-white px-4 py-2 rounded-t-lg text-sm font-medium hover:from-teal-600 hover:to-cyan-600 transition-all",children:[(0,b.jsxs)("span",{className:"flex items-center gap-2",children:[k?(0,b.jsx)(j.ChevronUp,{className:"w-4 h-4"}):(0,b.jsx)(i.ChevronDown,{className:"w-4 h-4"}),d||"View Code"]}),(0,b.jsx)("span",{className:"text-xs opacity-75",children:"R"})]}),k&&(0,b.jsxs)("div",{className:"relative",children:[(0,b.jsx)("pre",{className:"bg-gray-900 text-gray-100 p-4 rounded-b-lg overflow-x-auto text-sm border-l-4 border-teal-500",children:(0,b.jsx)("code",{children:a})}),(0,b.jsx)("button",{onClick:()=>h(a,c),className:"absolute top-2 right-2 text-xs bg-gray-700 text-white px-2 py-1 rounded hover:bg-gray-600 transition",children:f===c?"Copied!":"Copy"})]})]})},m=({headers:a,rows:c,caption:d})=>(0,b.jsxs)("div",{className:"overflow-x-auto my-6",children:[(0,b.jsxs)("table",{className:"min-w-full border border-gray-300 rounded-lg overflow-hidden",children:[(0,b.jsx)("thead",{className:"bg-gradient-to-r from-teal-600 to-cyan-600 text-white",children:(0,b.jsx)("tr",{children:a.map((a,c)=>(0,b.jsx)("th",{className:"px-4 py-3 text-left text-sm font-semibold",children:a},c))})}),(0,b.jsx)("tbody",{className:"bg-white divide-y divide-gray-200",children:c.map((a,c)=>(0,b.jsx)("tr",{className:c%2==0?"bg-gray-50":"bg-white",children:a.map((a,c)=>(0,b.jsx)("td",{className:"px-4 py-3 text-sm text-gray-700",children:"number"==typeof a?a.toLocaleString():a},c))},c))})]}),d&&(0,b.jsx)("p",{className:"text-sm text-gray-500 mt-2 text-center italic",children:d})]});function n(){let[a,i]=(0,k.useState)(0),[j,n]=(0,k.useState)(null),[o,p]=(0,k.useState)({}),[q,r]=(0,k.useState)(!1),s=(0,k.useRef)(null);(0,k.useEffect)(()=>{let a=document.createElement("link");a.rel="stylesheet",a.href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css",a.crossOrigin="anonymous",document.head.appendChild(a);let b=document.createElement("script");b.src="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.js",b.crossOrigin="anonymous",b.onload=()=>{let a=document.createElement("script");a.src="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/contrib/auto-render.min.js",a.crossOrigin="anonymous",a.onload=()=>{r(!0)},document.head.appendChild(a)},document.head.appendChild(b)},[]),(0,k.useEffect)(()=>{},[q]),(0,k.useEffect)(()=>{let a=()=>{let a=window.innerHeight,b=document.documentElement.scrollHeight-a;i(Math.min(100,Math.max(0,window.scrollY/b*100)))};return window.addEventListener("scroll",a),a(),()=>window.removeEventListener("scroll",a)},[]);let t=(a,b)=>{navigator.clipboard.writeText(a),n(b),setTimeout(()=>n(null),1500)},u=a=>{p(b=>({...b,[a]:!b[a]}))},v=[`reqired_packages <- c("terra", "tidyverse", "here", "knitr", "kableExtra")

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
})`,`sst <- rast(c(here("data", "average_annual_sst_2008.tif"),
              here("data", "average_annual_sst_2009.tif"),
              here("data", "average_annual_sst_2010.tif"),
              here("data", "average_annual_sst_2011.tif"),
              here("data", "average_annual_sst_2012.tif")))

# Read in depth file
depth <- rast(here("data", "depth.tif")) %>%
  project(crs(sst), verbose = FALSE) %>%
  suppressMessages()

eez_raster <- vect(here("data", "wc_regions_clean.shp"))`,`mean_sst <- app(sst, fun = mean, na.rm = TRUE)

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
     plg = list(title = "SST (\xb0C)"))`,`# Resample depth using nearest neighbor approach
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
}`,`# Function for identifying and plotting suitable habitats
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
       main = paste0("Potential ", species_name, " Aquaculture Habitat\\nSST: ", temp_min, "–", temp_max, "\xb0C | Depth: ", depth_min, "–", depth_max, " m"),
       xlab = "Longitude",
       ylab = "Latitude",
       axes = TRUE,
       cex.main = 0.8,
       plg = list(x = "topright", title = "Suitability"))
  
  # Return the raster
  return(suitable_habitat)
}`,`# View Areas Habitable by Oysters
oyster_habitat <- find_suitable_habitat(
  temp_min = 11,
  temp_max = 30,
  depth_min = -70,
  depth_max = 0,
  species_name = "Oyster"
)`,`# Identify suitable habitat for blue mussels
mussel_habitat <- find_suitable_habitat(
  temp_min = -1,
  temp_max = 20,
  depth_min = -24,
  depth_max = 0,
  species_name = "Blue Mussel"
)`,`# Returns a data frame of the area suitable for a species by region
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
}`,`# Calculate suitable area for each species

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
  add_header_above(c(" " = 1, "Suitable Area (km\xb2)" = 2))

habitat_summary`];return(0,b.jsxs)("article",{className:"min-h-screen bg-gray-50",children:[(0,b.jsx)("div",{className:"fixed top-0 left-0 w-full h-1 bg-transparent z-50",children:(0,b.jsx)("div",{className:"h-full bg-gradient-to-r from-teal-500 via-cyan-500 to-blue-500 transition-all duration-150",style:{width:`${a}%`}})}),";",(0,b.jsxs)("div",{className:"relative w-full h-96 md:h-[28rem]",children:[(0,b.jsx)("div",{className:"absolute inset-0 bg-gradient-to-r from-emerald-600 via-teal-500 via-cyan-500 via-sky-500 to-blue-600"}),(0,b.jsx)("div",{className:"absolute inset-0 bg-black/30"}),(0,b.jsx)("div",{className:"absolute inset-0 flex items-center justify-center px-6",children:(0,b.jsxs)("div",{className:"text-white text-center max-w-4xl",children:[(0,b.jsx)("h1",{className:"text-4xl md:text-5xl font-extrabold tracking-tight mb-4",children:"Identifying Areas of Potential Aquaculture in the Western US"}),(0,b.jsx)("p",{className:"text-sm md:text-base mb-2",children:"Author: William Mullins ・ Date: December 10, 2025"}),(0,b.jsxs)("a",{href:"https://github.com/willrmull/potential_aquaculture.git",target:"_blank",rel:"noopener noreferrer",className:"inline-flex items-center gap-2 text-white hover:text-gray-300 transition",children:[(0,b.jsx)(h.Github,{className:"w-5 h-5"}),(0,b.jsx)("span",{children:"GitHub"})]})]})})]}),";",(0,b.jsx)("div",{className:"container mx-auto px-6",children:(0,b.jsxs)("div",{className:"max-w-4xl mx-auto",children:[(0,b.jsxs)(c.default,{href:"/blog",className:"inline-flex items-center text-teal-600 hover:text-teal-800 mt-10 mb-8 transition-colors",children:[(0,b.jsx)(e.ArrowLeft,{className:"w-4 h-4 mr-2"})," Back to Blog"]}),(0,b.jsxs)("header",{className:"mb-12",children:[(0,b.jsxs)("div",{className:"flex gap-2 mb-4 flex-wrap",children:[(0,b.jsx)("span",{className:"px-3 py-1 bg-teal-100 text-teal-700 rounded-full text-sm font-medium",children:"Marine Science"}),(0,b.jsx)("span",{className:"px-3 py-1 bg-cyan-100 text-cyan-700 rounded-full text-sm font-medium",children:"Aquaculture"}),(0,b.jsx)("span",{className:"px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium",children:"Geospatial Analysis"})]}),(0,b.jsxs)("div",{className:"flex items-center text-gray-600 text-sm border-b border-gray-200 pb-8",children:[(0,b.jsxs)("span",{className:"flex items-center mr-6",children:[(0,b.jsx)(f.Calendar,{className:"w-4 h-4 mr-2"}),"December 10, 2025"]}),(0,b.jsxs)("span",{className:"flex items-center",children:[(0,b.jsx)(g.Tag,{className:"w-4 h-4 mr-2"}),"R · Terra · Raster Analysis"]})]})]}),(0,b.jsxs)("div",{ref:s,className:"prose prose-lg prose-slate mx-auto text-gray-700",children:[(0,b.jsx)("h2",{className:"text-3xl font-bold text-gray-900 mb-4",children:"Introduction"}),(0,b.jsx)("p",{className:"text-lg font-semibold text-teal-700 mb-4",children:"Does the suitable habitat area for oyster and blue mussel aquaculture differ across the western United States coast?"}),(0,b.jsx)("p",{children:"Oysters currently dominate mollusk aquaculture across the West Coast. According to the USDA 2023 Census of Aquaculture, mollusks account for 30% of all aquaculture sales in California, with oysters alone representing 26.6 percentage points—indicating that roughly 89% of California's mollusk aquaculture production is derived from oysters. Oregon and Washington show similar patterns of oyster dominance within their shellfish industries (USDA, 2024)."}),(0,b.jsx)("p",{children:"The relative lack of species diversification raises concerns about industry resilience. Region-wide stressors such as increasing ocean acidification or species-specific pathogens like Vibrio infections could simultaneously impact the majority of mollusk aquaculture facilities. The native blue mussel (Mytilus trossulus) represents a potential diversification candidate due to its different thermal tolerance nd established presence along the Pacific Coast."}),(0,b.jsx)("p",{children:"This analysis investigates whether the current dominance of oysters is driven by environmental suitability by comparing suitable habitat areas for oysters versus blue mussels within the Exclusive Economic Zones of California, Oregon, and Washington. Suitable areas were classified by identifying locations where both sea surface temperature and depth fell within each species' tolerance range."}),(0,b.jsx)("h3",{className:"text-2xl font-semibold text-gray-800 mt-8 mb-3",children:"Datasets Used"}),(0,b.jsxs)("ul",{className:"list-disc pl-6 space-y-2 mb-6",children:[(0,b.jsxs)("li",{children:[(0,b.jsx)("strong",{children:(0,b.jsx)("a",{href:"https://coralreefwatch.noaa.gov/product/5km/index_5km_ssta.php",className:"text-teal-600 hover:text-teal-800 underline",target:"_blank",rel:"noopener noreferrer",children:"NOAA Pathfinder Sea Surface Temperature Data"})}),": Five-year average of sea surface temperature data from 2008-2012, providing a baseline for temperature analysis along the western US coast."]}),(0,b.jsxs)("li",{children:[(0,b.jsx)("strong",{children:(0,b.jsx)("a",{href:"https://www.gebco.net/data-products/gridded-bathymetry-data#area",className:"text-teal-600 hover:text-teal-800 underline",target:"_blank",rel:"noopener noreferrer",children:"NOAA Bathymetry Data"})}),": High-resolution ocean depth measurements used to identify suitable depths for shellfish cultivation."]}),(0,b.jsxs)("li",{children:[(0,b.jsx)("strong",{children:(0,b.jsx)("a",{href:"https://www.marineregions.org/eez.php",className:"text-teal-600 hover:text-teal-800 underline",target:"_blank",rel:"noopener noreferrer",children:"West Coast Regional Boundaries"})}),": Spatial boundaries defining the Exclusive Economic Zones (EEZs) for California, Oregon, and Washington, used to calculate suitable habitat area by region."]})]}),(0,b.jsx)("h3",{className:"text-2xl font-semibold text-gray-800 mt-8 mb-3",children:"Loading Packages"}),(0,b.jsx)(l,{code:v[0],index:0,title:"Load Required Packages",expandedCode:o,copiedIndex:j,onToggle:u,onCopy:t}),(0,b.jsx)("h3",{className:"text-2xl font-semibold text-gray-800 mt-8 mb-3",children:"Data Import"}),(0,b.jsx)("p",{children:"The following section imports the three datasets used in the analysis. We implement validation checks to ensure files exist before attempting to load them."}),(0,b.jsxs)("ul",{className:"list-disc pl-6 space-y-2 mb-6",children:[(0,b.jsx)("li",{children:"The SST data are stored as individual GeoTIFF files, each representing the average annual SST for a given year. These rasters are stacked into a single multi-layer raster object."}),(0,b.jsx)("li",{children:"The bathymetry raster is then imported and reprojected to match the coordinate reference system of the SST stack."}),(0,b.jsx)("li",{children:"The EEZ boundaries are read as a vector layer."})]}),(0,b.jsx)(l,{code:v[1],index:1,title:"Import Datasets",expandedCode:o,copiedIndex:j,onToggle:u,onCopy:t}),(0,b.jsx)("h2",{className:"text-3xl font-bold text-gray-900 mt-12 mb-4",children:"Data Processing"}),(0,b.jsx)("p",{children:"To find the temporal mean SST across the 2008–2012 period, we compute the average across the raster stack. Since the original values are in Kelvin, we convert them to Celsius by subtracting 273.15."}),(0,b.jsx)(l,{code:v[2],index:2,title:"Calculate Mean SST",expandedCode:o,copiedIndex:j,onToggle:u,onCopy:t}),(0,b.jsx)("div",{className:"flex justify-center",children:(0,b.jsx)("div",{className:"my-6 w-full max-w-5xl",children:(0,b.jsx)("div",{className:"relative h-96 w-full",children:(0,b.jsx)(d.default,{src:"/images/mean_sst.png",alt:"Mean Sea Surface Temperature (2008-2012)",fill:!0,sizes:"(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 50vw",className:"object-contain rounded",priority:!0})})})}),(0,b.jsxs)("p",{children:[(0,b.jsx)("strong",{children:"Interpretation:"})," This map reveals the characteristic temperature gradient along the US West Coast. Southern California exhibits the warmest waters (20-25°C), while the Pacific Northwest and areas influenced by coastal upwelling show cooler temperatures (10-15°C). This spatial variation in temperature has important implications for species-specific aquaculture siting, as different shellfish species have distinct thermal tolerances."]}),(0,b.jsx)("h3",{className:"text-2xl font-semibold text-gray-800 mt-8 mb-3",children:"Depth Data Preparation"}),(0,b.jsx)("p",{children:"The depth raster is resampled to match the resolution and extent of the SST data using nearest neighbor interpolation. This ensures that both datasets align perfectly for subsequent analysis."}),(0,b.jsx)(l,{code:v[3],index:3,title:"Prepare Depth Data",expandedCode:o,copiedIndex:j,onToggle:u,onCopy:t}),(0,b.jsx)("h2",{className:"text-3xl font-bold text-gray-900 mt-12 mb-4",children:"Habitat Suitability Analysis"}),(0,b.jsx)("p",{children:"To evaluate the potential of locations for marine aquaculture of a given species, we use measurements of environmental tolerances. Using these thresholds, each pixel in the study area is classified as either suitable or unsuitable based on whether it simultaneously satisfies both temperature and depth criteria."}),(0,b.jsx)("h3",{className:"text-2xl font-semibold text-gray-800 mt-8 mb-3",children:"Suitability Function"}),(0,b.jsxs)("p",{children:["The ",(0,b.jsx)("code",{children:"find_suitable_habitat()"})," function implements this logic by first generating binary masks for temperature and depth suitability. The rasters are then combined, producing a categorical raster containing locations where both conditions are met."]}),(0,b.jsx)(l,{code:v[4],index:4,title:"Suitability Function",expandedCode:o,copiedIndex:j,onToggle:u,onCopy:t}),(0,b.jsx)("h3",{className:"text-2xl font-semibold text-gray-800 mt-8 mb-3",children:"Map of Potential Oyster Habitats"}),(0,b.jsx)("p",{children:"Oysters prefer slightly warm waters (11-30°C) and are able to be cultivated in shallow depths (0-70 meters)."}),(0,b.jsx)(l,{code:v[5],index:5,title:"Oyster Habitat Analysis",expandedCode:o,copiedIndex:j,onToggle:u,onCopy:t}),(0,b.jsx)("div",{className:"flex justify-center",children:(0,b.jsx)("div",{className:"my-6 w-full max-w-5xl",children:(0,b.jsx)("div",{className:"relative h-96 w-full",children:(0,b.jsx)(d.default,{src:"/images/oysters_area.png",alt:"Potential Oyster Aquaculture Habitat",fill:!0,sizes:"(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 50vw",className:"object-contain rounded",priority:!0})})})}),(0,b.jsxs)("p",{children:[(0,b.jsx)("strong",{children:"Interpretation:"})," This map shows that suitable oyster habitat is concentrated along the coast of Southern and Central California, with a substantial area also present in Washington. The warmer waters of Southern California are particularly favorable, while Washington's extensive shallow coastal areas likely contribute to its suitability. Oregon and Northern California appear to have significantly smaller amounts of suitable area, likely due to cooler water temperatures from coastal upwelling."]}),(0,b.jsx)("h3",{className:"text-2xl font-semibold text-gray-800 mt-8 mb-3",children:"Map of Potential Mussel Habitats"}),(0,b.jsxs)("p",{children:["The species of blue mussels native to the West Coast,"," ",(0,b.jsx)("em",{children:"Mytilus trossulus"}),", is cold-adapted (-1 to 20°C) and restricted to shallower depths (0-24m), which significantly limits suitable area compared to oysters. Washington's cooler waters and extensive shallow coastal zones in areas like Puget Sound likley make it the most favorable region."]}),(0,b.jsx)(l,{code:v[6],index:6,title:"Blue Mussel Habitat Analysis",expandedCode:o,copiedIndex:j,onToggle:u,onCopy:t}),(0,b.jsx)("div",{className:"flex justify-center",children:(0,b.jsx)("div",{className:"my-6 w-full max-w-5xl",children:(0,b.jsx)("div",{className:"relative h-96 w-full",children:(0,b.jsx)(d.default,{src:"/images/mussels_area.png",alt:"Potential Blue Mussel Aquaculture Habitat",fill:!0,sizes:"(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 50vw",className:"object-contain rounded",priority:!0})})})}),(0,b.jsxs)("p",{children:[(0,b.jsx)("strong",{children:"Interpretation:"})," This map shows that suitable blue mussel habitat is primarily found within Washington, with a secondary cluster present in the San Francisco Bay area of Central California. Their preference for cooler and shallower waters is likely the cause of their smaller suitable area size in the south and central coast. Washington's cooler waters and extensive shallow coastal zones in areas like Puget Sound likley make it the most favorable region."]}),(0,b.jsx)("h2",{className:"text-3xl font-bold text-gray-900 mt-12 mb-4",children:"Regional Analysis of Suitable Habitat"}),(0,b.jsx)("p",{children:"To quantify aquaculture potential by jurisdiction, we calculate the total area of suitable habitat within each state's Exclusive Economic Zone."}),(0,b.jsx)("h3",{className:"text-2xl font-semibold text-gray-800 mt-8 mb-3",children:"Calculating Suitable Area by Region"}),(0,b.jsx)("p",{children:"This function builds upon the habitat suitability analysis by calculating the total area (in square kilometers) of suitable habitat within each region."}),(0,b.jsx)(l,{code:v[7],index:7,title:"Area Calculation Function",expandedCode:o,copiedIndex:j,onToggle:u,onCopy:t}),(0,b.jsx)("h3",{className:"text-2xl font-semibold text-gray-800 mt-8 mb-3",children:"Table of Suitable Area by Region"}),(0,b.jsx)(l,{code:v[8],index:8,title:"Calculate Regional Areas",expandedCode:o,copiedIndex:j,onToggle:u,onCopy:t}),(0,b.jsx)(m,{headers:["Region","Oysters (km²)","Blue Mussels (km²)"],rows:[["Central California","4940.04	","1533.94"],["Northern California","454.30","748.67"],["Oregon","1578.972","1181.82"],["Southern California","4221.39","1140.71"],["Washington","3313.16","2878.92"]],caption:"Table 1: Suitable Area For Oysters and Blue Mussels by Region"}),(0,b.jsx)("h3",{className:"text-2xl font-semibold text-gray-800 mt-8 mb-3",children:"Interpretation"}),(0,b.jsxs)("ol",{className:"list-decimal pl-6 space-y-3 mb-6",children:[(0,b.jsxs)("li",{children:[(0,b.jsx)("strong",{children:"Washington"})," has the most suitable habitat for blue mussels (2,878.92 km²), which is almost double the amount of the next highest region. This is likely due to the cold waters of the state and extensive shallow areas found in regions like Puget Sound."]}),(0,b.jsxs)("li",{children:[(0,b.jsx)("strong",{children:"Central California"})," leads in oyster habitat suitability (4,940.04 km²), likely due to its warmer waters. This region shows a significant disparity between suitable oyster and mussel habitat (4,940 km² vs. 1,534 km²)."]}),(0,b.jsxs)("li",{children:[(0,b.jsx)("strong",{children:"Oregon"})," shows a slight preference for oysters over mussels (1,578.97 km² vs. 1,181.82 km²), though conditions are relatively balanced for both species."]}),(0,b.jsxs)("li",{children:[(0,b.jsx)("strong",{children:"Southern California"})," shows high suitability for oysters (4,221.39 km²) with below-average suitability for mussels (1,140.71 km²), consistent with its warmer waters exceeding the mussel temperature tolerance."]}),(0,b.jsxs)("li",{children:[(0,b.jsx)("strong",{children:"Northern California"})," is the only region where mussel-suitable habitat (748.67 km²) exceeds oyster-suitable area (454.30 km²), likely due to cooler waters from coastal upwelling."]})]}),(0,b.jsx)("h3",{className:"text-2xl font-semibold text-gray-800 mt-8 mb-3",children:"Implications for Aquaculture Development"}),(0,b.jsx)("p",{children:"The results of this analysis suggest that the current dominance of oyster aquaculture along the West Coast may not fully reflect the environmental potential for species diversification. The suitability analysis revealed that opportunities for blue mussel cultivation appear to remain largely untapped. Washington emerges as the most promising region for mussel diversification, with 2,879 km² of suitable habitat—more than double that of any other region. Northern California also presents a compelling case, as mussel-suitable habitat (749 km²) exceeds oyster-suitable area (454 km²), a pattern not reflected in current farming practices."}),(0,b.jsx)("p",{children:"Central and Southern California's substantial oyster-suitable areas (4,940 km² and 4,221 km² respectively) support the industry's continued focus on oysters in these regions. However, it is worth noting that the majority of oyster farming is located in the northern half of the state, indicating that these southern regions may be generally underutilized for shellfish production. Oregon shows relatively balanced conditions for both species, with a slight advantage for oysters (1,579 km² vs. 1,182 km² for mussels)."}),(0,b.jsx)("p",{children:"These findings are significant when viewed through the lens of industry resilience. As noted in the introduction, approximately 89% of California's mollusk aquaculture production derives from oysters. This concentration leaves the industry vulnerable to the region-wide stressors identified earlier: increasing ocean acidification and species-specific pathogens. This analysis demonstrates that environmental conditions along the West Coast could support greater species diversification, particularly through expanded blue mussel cultivation in Washington and Northern California."}),(0,b.jsx)("h2",{className:"text-3xl font-bold text-gray-900 mt-12 mb-4",children:"Limitations"}),(0,b.jsx)("p",{children:"While this analysis provides a solid foundation for further research, it has some limitations that should be addressed in future research:"}),(0,b.jsxs)("ol",{className:"list-decimal pl-6 space-y-3 mb-6",children:[(0,b.jsxs)("li",{children:[(0,b.jsx)("strong",{children:"Temporal Resolution"}),": The data uses annual SST, which does not account for seasonal variations in ocean conditions. Locations which experience extreme seasonal differences are likely to go undetected using this method, which could result in false positives being introduced."]}),(0,b.jsxs)("li",{children:[(0,b.jsx)("strong",{children:"Environmental factors not considered"}),": Important variables such as acidity, tidal patterns, wave exposure, and El Niño events were not included in the analysis."]}),(0,b.jsxs)("li",{children:[(0,b.jsx)("strong",{children:"Socioeconomic and Regulatory Constraints"}),": Shipping lanes, marine protected areas, and competing ocean uses were not incorporated into the suitability model."]})]}),(0,b.jsx)("h2",{className:"text-3xl font-bold text-gray-900 mt-12 mb-4",children:"Future Research"}),(0,b.jsx)("p",{children:"In addition to addressing the above limitations, future research should investigate the economic viability of establishing mussel production in areas identified as suitable. Additionally, climate forecasts should be included in the analysis to see if sites are likely to remain suitable in the future."}),(0,b.jsx)("h2",{className:"text-3xl font-bold text-gray-900 mt-12 mb-4",children:"References"}),(0,b.jsxs)("ul",{className:"list-disc pl-6 space-y-2 mb-6",children:[(0,b.jsxs)("li",{children:["National Oceanic and Atmospheric Administration. (2023). NOAA CoastWatch Pathfinder Sea Surface Temperature Dataset."," ",(0,b.jsx)("a",{href:"https://podaac.jpl.nasa.gov/dataset/AVHRR_PATHFINDER_L3_V52",className:"text-teal-600 hover:text-teal-800 underline",target:"_blank",rel:"noopener noreferrer",children:"https://podaac.jpl.nasa.gov/dataset/AVHRR_PATHFINDER_L3_V52"})]}),(0,b.jsxs)("li",{children:["National Centers for Environmental Information. (2023). Gridded Bathymetry Data."," ",(0,b.jsx)("a",{href:"https://www.ncei.noaa.gov/access/gridded-bathymetry-data",className:"text-teal-600 hover:text-teal-800 underline",target:"_blank",rel:"noopener noreferrer",children:"https://www.ncei.noaa.gov/access/gridded-bathymetry-data"})]}),(0,b.jsxs)("li",{children:["NOAA Fisheries. (2023). West Coast Regional Boundaries."," ",(0,b.jsx)("a",{href:"https://www.fisheries.noaa.gov/west-coast/marine-protected-areas/west-coast-regional-boundaries",className:"text-teal-600 hover:text-teal-800 underline",target:"_blank",rel:"noopener noreferrer",children:"https://www.fisheries.noaa.gov/west-coast/marine-protected-areas/west-coast-regional-boundaries"})]}),(0,b.jsxs)("li",{children:["Food and Agriculture Organization. (2022). The State of World Fisheries and Aquaculture."," ",(0,b.jsx)("a",{href:"https://www.fao.org/3/ca9229en/ca9229en.pdf",className:"text-teal-600 hover:text-teal-800 underline",target:"_blank",rel:"noopener noreferrer",children:"https://www.fao.org/3/ca9229en/ca9229en.pdf"})]}),(0,b.jsxs)("li",{children:["United States Department of Agriculture (USDA) National Agricultural Statistics Service. 2024. 2023 Census of Aquaculture."," ",(0,b.jsxs)("a",{href:"https://www.nass.usda.gov/Publications/AgCensus/2022/Online_Resources/Aquaculture/index.php",className:"text-teal-600 hover:text-teal-800 underline",target:"_blank",rel:"noopener noreferrer",children:[" ","https://www.nass.usda.gov/Publications/AgCensus/2022/Online_Resources/Aquaculture/index.php"]})]})]})]})]})})]})}a.s(["default",()=>n])}];

//# sourceMappingURL=app_blog_aquaculture_page_tsx_25b6c396._.js.map