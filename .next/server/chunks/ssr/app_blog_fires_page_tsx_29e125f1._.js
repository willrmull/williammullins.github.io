module.exports=[77198,a=>{"use strict";var b=a.i(87924),c=a.i(38246),d=a.i(210),e=a.i(41675),f=a.i(33350),g=a.i(5112),h=a.i(5784),i=a.i(67552),j=a.i(71987),k=a.i(72131);let l=({code:a,index:c,title:d,expandedCode:e,copiedIndex:f,onToggle:g,onCopy:j})=>{let k=e[c]??!1;return(0,b.jsxs)("div",{className:"relative mb-6",children:[(0,b.jsxs)("button",{onClick:()=>g(c),className:"w-full flex items-center justify-between bg-gradient-to-r from-orange-600 to-red-600 text-white px-4 py-2 rounded-t-lg text-sm font-medium hover:from-orange-500 hover:to-red-500 transition-all",children:[(0,b.jsxs)("span",{className:"flex items-center gap-2",children:[k?(0,b.jsx)(i.ChevronUp,{className:"w-4 h-4"}):(0,b.jsx)(h.ChevronDown,{className:"w-4 h-4"}),d||"View Code"]}),(0,b.jsx)("span",{className:"text-xs opacity-75",children:"Python"})]}),k&&(0,b.jsxs)("div",{className:"relative",children:[(0,b.jsx)("pre",{className:"bg-gray-900 text-gray-100 p-4 rounded-b-lg overflow-x-auto text-sm border-l-4 border-orange-500",children:(0,b.jsx)("code",{children:a})}),(0,b.jsx)("button",{onClick:()=>j(a,c),className:"absolute top-2 right-2 text-xs bg-gray-700 text-white px-2 py-1 rounded hover:bg-gray-600 transition",children:f===c?"Copied!":"Copy"})]})]})};function m(){let[a,h]=(0,k.useState)(0),[i,m]=(0,k.useState)(null),[n,o]=(0,k.useState)({});(0,k.useEffect)(()=>{let a=()=>{let a=window.innerHeight,b=document.documentElement.scrollHeight-a;h(Math.min(100,Math.max(0,window.scrollY/b*100)))};return window.addEventListener("scroll",a),a(),()=>window.removeEventListener("scroll",a)},[]);let p=(a,b)=>{navigator.clipboard.writeText(a),m(b),setTimeout(()=>m(null),1500)},q=a=>{o(b=>({...b,[a]:!b[a]}))},r=[`# Load necessary libraries
import os
import pandas as pd
import numpy as np
import geopandas as gpd
import matplotlib.pyplot as plt
import xarray as xr
import rioxarray as rioxr


# Import the Landsat 8 data
fp = os.path.join('data','landsat8-2025-02-23-palisades-eaton.nc') 
landsat = xr.open_dataset(fp)`,`# Read in Landsat satellite imagery from NetCDF file
landsat = xr.open_dataset(os.path.join('data','landsat8-2025-02-23-palisades-eaton.nc'))

# Recover geometry information using CRS from the spatial_ref attribute
landsat.rio.write_crs(landsat.spatial_ref.crs_wkt, inplace=True)

# Display the dataset structure to understand available bands
print(f"Available bands: {list(landsat.data_vars)}")
print(f"CRS: {landsat.rio.crs}")`,`#False Color Image'

# Select the three bands and stack them into a single array
false_color = landsat[['swir22', 'nir08', 'red']].to_array(dim='band')

# Fill any missing values with 0 to avoid gaps in the visualization
false_color = false_color.fillna(0)

# Plot the false color composite using robust scaling
fig, ax = plt.subplots(figsize=(12, 10))
false_color.plot.imshow(ax=ax, robust=True)
ax.set_axis_off()
ax.set_title("False Color Composite of Los Angeles Fire Region", fontsize=14)
plt.show()`,`palisades, eaton  = (
    gpd.read_file(os.path.join("data", "Palisades_Perimeter_20250121.geojson")),
    gpd.read_file(os.path.join("data", "Eaton_Perimeter_20250121.geojson"))
)

eaton = eaton.to_crs(landsat.rio.crs)
palisades = palisades.to_crs(landsat.rio.crs)`,`# Overlay Fire Perimeters on False Color Composite
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
plt.show()`,`# Read in and reproject census data
eji_data = gpd.read_file(os.path.join("data", "EJI_2024_California.gdb"))

if eji_data.crs != landsat.rio.crs:
    eji_data = eji_data.to_crs(landsat.rio.crs)`,`# Find tracts that intersect with fire perimeters
census_palisades, census_eaton = (
    gpd.sjoin(eji_data, palisades, how = 'inner'),
    gpd.sjoin(eji_data, eaton, how = 'inner')
)
census_palisades.head(5)`,`fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(20, 10))

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

plt.show()`];return(0,b.jsxs)("article",{className:"min-h-screen bg-gray-50 py-20",children:[(0,b.jsx)("div",{className:"fixed top-0 left-0 w-full h-1 bg-transparent z-50",children:(0,b.jsx)("div",{className:"h-full bg-gradient-to-r from-orange-500 to-red-500 transition-all duration-150",style:{width:`${a}%`}})}),(0,b.jsxs)("div",{className:"relative w-full h-96 md:h-[28rem]",children:[(0,b.jsx)(j.default,{src:"/images/fire_banner.png",alt:"Header image",fill:!0,style:{objectFit:"cover"},className:"brightness-90",unoptimized:!0}),(0,b.jsx)("div",{className:"absolute inset-0 bg-black/40"}),(0,b.jsx)("div",{className:"absolute inset-0 flex items-center justify-center px-6",children:(0,b.jsxs)("div",{className:"text-white text-center",children:[(0,b.jsx)("h1",{className:"text-4xl md:text-5xl font-extrabold tracking-tight mb-4",children:"Comparison of the Eaton and Palisades Fires"}),(0,b.jsx)("p",{className:"text-sm md:text-base mb-2",children:"Author: William Mullins ・ Date: December 12, 2025"}),(0,b.jsxs)("a",{href:"https://github.com/willrmull/Eaton-Palisades-Fires",target:"_blank",rel:"noopener noreferrer",className:"inline-flex items-center gap-2 text-white hover:text-gray-300 transition",children:[(0,b.jsx)(g.Github,{className:"w-5 h-5"}),(0,b.jsx)("span",{children:"View Additional Content on Github"})]})]})})]}),(0,b.jsx)("div",{className:"container mx-auto px-6",children:(0,b.jsxs)("div",{className:"max-w-3xl mx-auto",children:[(0,b.jsxs)(c.default,{href:"/blog",className:"inline-flex items-center text-blue-600 hover:text-blue-800 mt-10 mb-8 transition-colors",children:[(0,b.jsx)(d.ArrowLeft,{className:"w-4 h-4 mr-2"})," Back to Blog"]}),(0,b.jsxs)("header",{className:"mb-12",children:[(0,b.jsxs)("div",{className:"flex gap-2 mb-4",children:[(0,b.jsx)("span",{className:"px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-medium",children:"Remote Sensing"}),(0,b.jsx)("span",{className:"px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium",children:"Wildfire"})]}),(0,b.jsxs)("div",{className:"flex items-center text-gray-600 text-sm border-b border-gray-200 pb-8",children:[(0,b.jsxs)("span",{className:"flex items-center mr-6",children:[(0,b.jsx)(e.Calendar,{className:"w-4 h-4 mr-2"}),"December 12, 2025"]}),(0,b.jsxs)("span",{className:"flex items-center",children:[(0,b.jsx)(f.Tag,{className:"w-4 h-4 mr-2"}),"Python · Geospatial"]})]})]}),(0,b.jsxs)("div",{className:"prose prose-lg prose-slate mx-auto text-gray-700",children:[(0,b.jsx)("div",{className:"h-px bg-gray-300 my-10"}),(0,b.jsx)("h3",{children:"About"}),(0,b.jsx)("p",{children:"On January 7, 2025, the Eaton and Palisades fires ignited nearly simultaneously in the Los Angeles metropolitan area, devastating thousands of acres and displacing countless residents. These fires became two of the most destructive wildfires in California history, prompting questions about the environmental and demographic impacts they may have had."}),(0,b.jsx)("p",{children:"This analysis uses satellite remote sensing and census data to accomplish two objectives:"}),(0,b.jsxs)("ul",{children:[(0,b.jsx)("li",{children:"To visualize the burn scars using false color imagery that can penetrate the smoke and highlight fire damage"}),(0,b.jsx)("li",{children:"To examine if elderly populations were disproportionately affected by comparing data from within each fire's perimeter"})]}),(0,b.jsx)("div",{className:"h-px bg-gray-300 my-10"}),(0,b.jsx)("h3",{children:"Highlights"}),(0,b.jsxs)("ul",{children:[(0,b.jsx)("li",{children:"Geospatial data wrangling using geopandas for vector operations and xarray with rioxarray for raster processing"}),(0,b.jsx)("li",{children:"False-color composite visualization combining SWIR, NIR, and Red bands to reveal burn scars invisible in natural color imagery"}),(0,b.jsx)("li",{children:"Spatial analysis using census tract information and fire perimeters to quantify population impacts"})]}),(0,b.jsx)("div",{className:"h-px bg-gray-300 my-10"}),(0,b.jsx)("h3",{children:"Datasets"}),(0,b.jsxs)("div",{className:"grid md:grid-cols-2 gap-6 mb-8",children:[(0,b.jsxs)("div",{children:[(0,b.jsx)("a",{href:"https://www.atsdr.cdc.gov/place-health/php/eji/eji-data-download.html",target:"_blank",rel:"noopener noreferrer",className:"text-blue-600 hover:underline",children:"CDC/ATSDR Environmental Justice Index (EJI) for California, 2024"}),(0,b.jsx)("p",{className:"text-sm mt-2",children:"A geodatabase created by Centers for Disease Control and Prevention and Agency for Toxic Substances Disease Registry concerning environmental justice at the county level in the United States. A subset of this data concerning counties in California in 2024 was used in this analysis."})]}),(0,b.jsxs)("div",{children:[(0,b.jsx)("a",{href:"https://services.arcgis.com/RmCCgQtiZLDCtblq/arcgis/rest/services/Palisades_and_Eaton_Dissolved_Fire_Perimeters_as_of_20250121/FeatureServer",target:"_blank",rel:"noopener noreferrer",className:"text-blue-600 hover:underline",children:"Palisades and Eaton Dissolved Fire Perimeters as of 2025/01/21"}),(0,b.jsx)("p",{className:"text-sm mt-2",children:"GeoJSON files were downloaded containing the perimeter data for the Palisades and Eaton fires."})]})]}),(0,b.jsxs)("div",{children:[(0,b.jsx)("a",{href:"https://planetarycomputer.microsoft.com/dataset/landsat-c2-l2",target:"_blank",rel:"noopener noreferrer",className:"text-blue-600 hover:underline",children:"Landsat Collection 2 Level-2 Data"}),(0,b.jsx)("p",{className:"text-sm mt-2",children:"Landsat 8-9 data collected by NASA showing surface reflectance and temperature. The data used in this analysis is a NetCDF containing a subset of this data which centers on the area surrounding the two fires."})]}),(0,b.jsx)("div",{className:"h-px bg-gray-300 my-10"}),(0,b.jsx)("h2",{children:"Analysis Setup"}),(0,b.jsx)("h4",{children:"Loading Required Packages"}),(0,b.jsx)(l,{code:r[0],index:0,title:"Load Required Packages",expandedCode:n,copiedIndex:i,onToggle:q,onCopy:p}),(0,b.jsx)("h2",{children:"False Color Image Analysis"}),(0,b.jsx)("p",{children:"False-color composites are widely used to assess wildfire impacts. By combining non-visible spectral bands—such as short-wave infrared (SWIR) and near-infrared (NIR)—these images can penetrate smoke and reveal burn scars that aren't apparent in natural-color imagery."}),(0,b.jsx)("h4",{children:"Reading Landsat Satellite Data"}),(0,b.jsx)("p",{children:"The satellite data, stored in a NetCDF file, is loaded using xarray.open_dataset(). The coordinate reference system (CRS) is then restored with rioxarray."}),(0,b.jsx)(l,{code:r[1],index:1,title:"Read Landsat Satellite Data",expandedCode:n,copiedIndex:i,onToggle:q,onCopy:p}),(0,b.jsx)("h4",{children:"Generating the False Color Composite"}),(0,b.jsx)("p",{children:"This code builds a false-color composite by selecting three spectral bands and assigning them to the RGB channels: SWIR to red, NIR to green, and red (visible light) to blue. This combination makes burned areas appear bright red-orange, while healthy vegetation appears green and urban areas appear gray or tan. Those values are then scaled using robust scaling, which reduces the impact of outliers, and plotted to give the map below."}),(0,b.jsx)(l,{code:r[2],index:2,title:"Generate False Color Composite",expandedCode:n,copiedIndex:i,onToggle:q,onCopy:p}),(0,b.jsx)("div",{className:"relative w-full h-96 mt-4 mb-10",children:(0,b.jsx)(j.default,{src:"/images/false_color.png",alt:"False Color Composite of Los Angeles Fire Region",fill:!0,style:{objectFit:"cover"},className:"rounded-xl shadow-lg",unoptimized:!0})}),(0,b.jsx)("h4",{children:"Loading Fire Perimeter Data"}),(0,b.jsx)("p",{children:"The fire perimeter boundaries are read from GeoJSON files and reprojected to match the Landsat data's CRS."}),(0,b.jsx)(l,{code:r[3],index:3,title:"Load Fire Perimeter Data",expandedCode:n,copiedIndex:i,onToggle:q,onCopy:p}),(0,b.jsx)("h4",{children:"Overlaying Fire Perimeters on False Color Composite"}),(0,b.jsx)("p",{children:"The fire perimeters are overlayed on the false color composite to better show the range of the fire. From this it can be seen that both of the regions have significant scarring, with the color in the Palisades region suggesting more severe burning."}),(0,b.jsx)(l,{code:r[4],index:4,title:"Overlay Fire Perimeters on False Color Composite",expandedCode:n,copiedIndex:i,onToggle:q,onCopy:p}),(0,b.jsx)("div",{className:"relative w-full h-96 mt-4 mb-10",children:(0,b.jsx)(j.default,{src:"/images/false_col_cencus.png",alt:"Wildfire Boundaries on False Color Composite",fill:!0,style:{objectFit:"cover"},className:"rounded-xl shadow-lg",unoptimized:!0})}),(0,b.jsx)("h2",{children:"Age Disparity Analysis"}),(0,b.jsx)("p",{children:"Beyond visualizing damage, it's important to understand the populations affected by the fires. This section examines whether elderly populations, who may experience greater challenges during evacuation and recovery, were disproportionately impacted by either fire."}),(0,b.jsx)("h3",{children:"Loading Environmental Justice Index Data"}),(0,b.jsx)("p",{children:"The CDC's Environmental Justice Index provides census tract–level demographic data, including percentile rankings for the population aged 65 and older. This dataset was read in and reprojected to match the boundaries CRS."}),(0,b.jsx)(l,{code:r[5],index:5,title:"Load Environmental Justice Index Data",expandedCode:n,copiedIndex:i,onToggle:q,onCopy:p}),(0,b.jsx)("h3",{children:"Creating Census Tracts from Data"}),(0,b.jsx)("p",{children:"The census data is then spatially joined with the fire perimeters to identify all census tracts overlapping each burned area. The resulting dataset includes only those intersecting tracts, along with their associated demographic attributes."}),(0,b.jsx)(l,{code:r[6],index:6,title:"Create Census Tracts from Data",expandedCode:n,copiedIndex:i,onToggle:q,onCopy:p}),(0,b.jsx)("h3",{children:"Visualizing Age Demographics by Fire Region"}),(0,b.jsx)("p",{children:"The final visualization displays the census tracts affected by each fire, colored by their EPL_AGE65 percentile value."}),(0,b.jsx)(l,{code:r[7],index:7,title:"Visualize Age Demographics by Fire Region",expandedCode:n,copiedIndex:i,onToggle:q,onCopy:p}),(0,b.jsx)("div",{className:"relative w-full h-96 mt-4 mb-10",children:(0,b.jsx)(j.default,{src:"/images/socioeconomic.png",alt:"Percentile of People over 65 Years Old in Fire Areas",fill:!0,style:{objectFit:"cover"},className:"rounded-xl shadow-lg",unoptimized:!0})}),(0,b.jsx)("h3",{children:"Interpretation"}),(0,b.jsx)("p",{children:"The results reveal a notable demographic disparity between the two fire-affected areas. Census tracts within the Palisades fire perimeter have a higher proportion of residents aged 65 and older than most tracts in California. In contrast, tracts impacted by the Eaton fire show a lower proportion of older adults relative to the state average. Future studies should examine whether this disparity influenced emergency response planning and resource allocation."}),(0,b.jsx)("h3",{children:"References"}),(0,b.jsxs)("p",{className:"text-sm text-gray-600",children:["Centers for Disease Control and Prevention and Agency for Toxic Substances Disease Registry. [2024] Environmental Justice Index. Accessed [12/12/2025].",(0,b.jsx)("a",{href:"https://atsdr.cdc.gov/place-health/php/eji/eji-data-download.html",target:"_blank",rel:"noopener noreferrer",className:"text-blue-600 hover:underline ml-1",children:"https://atsdr.cdc.gov/place-health/php/eji/eji-data-download.html"})]}),(0,b.jsxs)("p",{className:"text-sm text-gray-600 mt-2",children:["Earth Resources Observation and Science (EROS) Center. (2020). Landsat 8-9 Operational Land Imager / Thermal Infrared Sensor Level-2, Collection 2 [dataset]. U.S. Geological Survey.",(0,b.jsx)("a",{href:"https://doi.org/10.5066/P9OGBGM6",target:"_blank",rel:"noopener noreferrer",className:"text-blue-600 hover:underline ml-1",children:"https://doi.org/10.5066/P9OGBGM6"})]}),(0,b.jsxs)("p",{className:"text-sm text-gray-600 mt-2",children:["Palisades and Eaton Dissolved Fire Perimeters as of 2025/01/21. (2025). ArcGIS REST Services Directory.",(0,b.jsx)("a",{href:"https://services.arcgis.com/RmCCgQtiZLDCtblq/arcgis/rest/services/Palisades_and_Eaton_Dissolved_Fire_Perimeters_as_of_20250121/FeatureServer",target:"_blank",rel:"noopener noreferrer",className:"text-blue-600 hover:underline ml-1",children:"https://services.arcgis.com/RmCCgQtiZLDCtblq/arcgis/rest/services/Palisades_and_Eaton_Dissolved_Fire_Perimeters_as_of_20250121/FeatureServer"})]})]})]})})]})}a.s(["default",()=>m])}];

//# sourceMappingURL=app_blog_fires_page_tsx_29e125f1._.js.map