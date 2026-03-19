module.exports=[46795,a=>{"use strict";var b=a.i(87924),c=a.i(38246),d=a.i(71987),e=a.i(210),f=a.i(41675),g=a.i(33350),h=a.i(5112),i=a.i(5784),j=a.i(70106);let k=(0,j.default)("chevron-right",[["path",{d:"m9 18 6-6-6-6",key:"mthhwq"}]]),l=(0,j.default)("x",[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]]),m=(0,j.default)("menu",[["path",{d:"M4 5h16",key:"1tepv9"}],["path",{d:"M4 12h16",key:"1lakjw"}],["path",{d:"M4 19h16",key:"1djgab"}]]);var n=a.i(72131);function o(){let[a,j]=(0,n.useState)(0),[o,p]=(0,n.useState)(!1),[q,r]=(0,n.useState)(!1),[s,t]=(0,n.useState)(null);(0,n.useEffect)(()=>{let a=()=>{let a=window.innerHeight,b=document.documentElement.scrollHeight-a;j(Math.min(100,Math.max(0,window.scrollY/b*100)))};return window.addEventListener("scroll",a),a(),()=>window.removeEventListener("scroll",a)},[]);let u=[{id:"graphic-form",title:"Graphic Form",content:"I wanted the infographic to be interpretable at a glance — something a viewer could absorb without needing a legend tutorial. To accomplish this, I leaned on familiar visual metaphors. The first panel uses a choropleth map of Kansas counties, a form most people intuitively understand as representing geographic variation. The second panel takes the shape of a thermometer paired with a humidity gauge, connecting the data directly to the physical phenomenon it represents. These skeuomorphic touches make the data feel grounded and tangible rather than abstract."},{id:"text",title:"Text",content:"I used text sparingly within the graphic panels themselves. Overloading a visualization with labels and annotations can create clutter that competes with the data for a viewer's attention. Instead, I reserved detailed explanation for the surrounding narrative — letting the figures speak visually and the text provide context where needed. Titles were kept bold and concise to establish a clear entry point for each section."},{id:"themes",title:"Themes & General Design",content:"The visual theme blends minimalist and skeuomorphic design principles. On the minimalist side, I used bold, geometric typefaces outside of the figures and maintained generous whitespace to let each element breathe. On the skeuomorphic side, I incorporated natural textures, subtle drop shadows, and real-world object references (like the thermometer) to give the infographic a tactile quality. This combination aimed to feel polished and professional without feeling sterile."},{id:"colors",title:"Colors",content:"The color palette draws from the Kansas landscape itself — warm earth tones (tans, creams, and burnt siennas) form the background, while a deep red (#7a1800) anchors the heat-related data. A muted sage green (#6b7f6a) provides contrast for secondary elements."},{id:"typography",title:"Typography",content:"I selected typefaces that balance readability with visual character. Headers use a bold, geometric sans-serif that commands attention and establishes hierarchy. Body text within the figures is kept clean and legible at smaller sizes."},{id:"context",title:"Contextualizing the Data",content:"Raw indemnity numbers are hard to interpret without context. To address this, I grounded the data in two ways: geographically, by overlaying the total losses onto a recognizable county map so viewers can connect the data to real places; and causally, by highlighting the actual causes of loss."}],v=`# ============================================================================
# Kansas Extreme Heat & Crop Loss — Data & Visualization Code
# Author: Will Mulligan
# Data Sources: USDA RMA Cause of Loss (2015–2025),
#               US Census TIGER/Line Shapefiles
# Note: Individual plot outputs were composed into the final infographic
#       layout in Affinity Designer.
# ============================================================================

# ~~ Load libraries ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
library(tidyverse)   # core data wrangling & visualization
library(janitor)     # clean column names
library(here)        # project-relative file paths
library(lubridate)   # date handling
library(readtext)    # reading text files
library(archive)     # archive extraction
library(readr)       # fast delimited file reading
library(sf)          # simple features for spatial data
library(tigris)      # US Census shapefiles
library(showtext)    # custom Google Fonts in plots

# ============================================================================
# 1. DATA INGESTION — USDA RMA Cause of Loss
# ============================================================================

col_names <- c(
  "Commodity_Year_Identifier",
  "State_Code",
  "State_Abbreviation",
  "County_Code",
  "County_Name",
  "Commodity_Code",
  "Commodity_Name",
  "Insurance_Plan_Code",
  "Insurance_Plan_Name_Abbreviation",
  "Coverage_Category",
  "Stage_Code",
  "Cause_of_Loss_Code",
  "Cause_of_Loss_Description",
  "Month_of_Loss",
  "Month_of_Loss_Name",
  "Year_of_Loss",
  "Policies_Earning_Premium",
  "Policies_Indemnified",
  "Net_Planted_Quantity",
  "Net_Endorsed_Acres",
  "Liability",
  "Total_Premium",
  "Producer_Paid_Premium",
  "Subsidy",
  "State_Private_Subsidy",
  "Additional_Subsidy",
  "EFA_Premium_Discount",
  "Net_Determined_Quantity",
  "Indemnity_Amount",
  "Loss_Ratio"
)

col_types <- cols(
  .default                        = col_character(),
  Commodity_Year_Identifier       = col_integer(),
  State_Code                      = col_character(),
  County_Code                     = col_character(),
  Commodity_Code                  = col_character(),
  Insurance_Plan_Code             = col_character(),
  Cause_of_Loss_Code              = col_character(),
  Month_of_Loss                   = col_integer(),
  Year_of_Loss                    = col_integer(),
  Policies_Earning_Premium        = col_integer(),
  Policies_Indemnified            = col_integer(),
  Net_Planted_Quantity            = col_double(),
  Net_Endorsed_Acres              = col_double(),
  Liability                       = col_double(),
  Total_Premium                   = col_double(),
  Producer_Paid_Premium           = col_double(),
  Subsidy                         = col_double(),
  State_Private_Subsidy           = col_double(),
  Additional_Subsidy              = col_double(),
  EFA_Premium_Discount            = col_double(),
  Net_Determined_Quantity         = col_double(),
  Indemnity_Amount                = col_double(),
  Loss_Ratio                      = col_double()
)

year_range <- seq(from = 2015, to = 2025, by = 1)
data <- data.frame()

for (year in year_range) {
  link <- paste0(
    "https://pubfs-rma.fpac.usda.gov/pub/Web_Data_Files/",
    "Summary_of_Business/cause_of_loss/colsom_", year, ".zip"
  )

  temp <- tempfile(fileext = ".zip")
  download.file(link, temp, mode = "wb")
  unzip(temp, exdir = tempdir())

  txt_file <- file.path(tempdir(), paste0("colsom_", year, ".txt"))
  data_temp <- read_delim(
    txt_file,
    delim          = "|",
    col_names      = col_names,
    col_types      = col_types,
    show_col_types = FALSE
  )

  data <- bind_rows(data, data_temp)
}

# ============================================================================
# 2. DATA CLEANING
# ============================================================================

data_clean <- data %>%
  mutate(
    state_name = case_when(
      State_Abbreviation %in% state.abb ~
        state.name[match(State_Abbreviation, state.abb)],
      TRUE ~ State_Abbreviation
    )
  ) %>%
  clean_names() %>%
  filter(commodity_year_identifier >= 2020)

# ============================================================================
# 3. VISUALIZATION ONE — Kansas County Choropleth Map
# ============================================================================

county_totals <- data_clean %>%
  filter(state_name == "Kansas") %>%
  group_by(county_code) %>%
  summarise(
    indemnity = sum(indemnity_amount, na.rm = TRUE),
    .groups = "drop"
  )

ks_counties <- counties(state = "KS", cb = TRUE, year = 2024) %>%
  st_transform(crs = 4326) %>%
  left_join(county_totals, by = c("COUNTYFP" = "county_code"))

map <- ggplot(ks_counties) +
  geom_sf(
    aes(fill = indemnity),
    color    = "#0d0d1a",
    linewidth = 0.3
  ) +
  scale_fill_viridis_c(
    option = "magma",
    trans  = "log10",
    name   = "Total Indemnity"
  ) +
  labs(title = "Kansas County Drought & Heat Crop Losses") +
  theme(
    axis.text        = element_blank(),
    axis.ticks       = element_blank(),
    panel.grid       = element_blank(),
    panel.background = element_rect(fill = "transparent", colour = NA),
    plot.background  = element_rect(fill = "transparent", colour = NA)
  )

map

# ============================================================================
# 4. VISUALIZATION TWO — Loss Breakdown by Cause
# ============================================================================

percent_by_cause <- data_clean %>%
  filter(state_name == "Kansas") %>%
  group_by(cause_of_loss_description) %>%
  summarize(
    total_loss = sum(indemnity_amount),
    .groups = "drop"
  ) %>%
  mutate(percent_by_cause = (total_loss / sum(total_loss)) * 100) %>%
  arrange(desc(percent_by_cause)) %>%
  select(cause_of_loss_description, total_loss, percent_by_cause)

percent_by_heat <- percent_by_cause %>%
  filter(cause_of_loss_description %in% perils_of_interest) %>%
  summarize(
    total_percent = sum(percent_by_cause),
    other         = 100 - total_percent
  )

# ============================================================================
# 5. VISUALIZATION THREE — Most Impacted Crops
# ============================================================================

most_impacted <- data_clean %>%
  filter(
    state_name == "Kansas",
    cause_of_loss_description %in% perils_of_interest
  ) %>%
  group_by(commodity_name) %>%
  summarize(loss = sum(indemnity_amount)) %>%
  arrange(desc(loss))

ggplot(most_impacted, aes(x = reorder(commodity_name, loss), y = loss)) +
  geom_col() +
  scale_colour_gradient(
    low  = "#E8A838",
    high = "#1a0a00"
  ) +
  scale_y_reverse()`;return(0,b.jsxs)("article",{className:"min-h-screen bg-gray-50 py-20",children:[(0,b.jsx)("div",{className:"fixed top-0 left-0 w-full h-1 bg-transparent z-50",children:(0,b.jsx)("div",{className:"h-full bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 transition-all duration-150",style:{width:`${a}%`}})}),(0,b.jsxs)("div",{className:"relative w-full h-96 md:h-[28rem]",children:[(0,b.jsx)("div",{className:"absolute inset-0 bg-gradient-to-r from-amber-600 via-orange-500 via-red-500 to-rose-600"}),(0,b.jsx)("div",{className:"absolute inset-0 bg-black/30"}),(0,b.jsx)("div",{className:"absolute inset-0 flex items-center justify-center px-6",children:(0,b.jsxs)("div",{className:"text-white text-center max-w-7xl",children:[(0,b.jsxs)("h1",{className:"text-4xl md:text-5xl font-extrabold tracking-tight mb-4",children:[(0,b.jsx)("p",{children:"Crop Indemnity in Kansas"}),(0,b.jsx)("p",{children:"Between 2020 and 2025"})]}),(0,b.jsx)("p",{className:"text-sm md:text-base mb-2",children:"Author: William Mullins ・ Date: March 12, 2026"})]})})]}),(0,b.jsx)("div",{className:"container mx-auto px-6",children:(0,b.jsxs)("div",{className:"max-w-7xl mx-auto",children:[(0,b.jsxs)("div",{className:"flex items-center justify-between mt-10 mb-8",children:[(0,b.jsxs)(c.default,{href:"/blog",className:"inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors",children:[(0,b.jsx)(e.ArrowLeft,{className:"w-4 h-4 mr-2"})," Back to Blog"]}),(0,b.jsxs)("a",{href:"https://github.com/willrmull/eds240-infographic.git",target:"_blank",rel:"noopener noreferrer",className:"inline-flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm font-medium",children:[(0,b.jsx)(h.Github,{className:"w-4 h-4"}),"View on GitHub"]})]}),(0,b.jsxs)("header",{className:"mb-12",children:[(0,b.jsxs)("div",{className:"flex gap-2 mb-4",children:[(0,b.jsx)("span",{className:"px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-medium",children:"Infographic"}),(0,b.jsx)("span",{className:"px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium",children:"Agriculture"})]}),(0,b.jsxs)("div",{className:"flex items-center text-gray-600 text-sm border-b border-gray-200 pb-8",children:[(0,b.jsxs)("span",{className:"flex items-center mr-6",children:[(0,b.jsx)(f.Calendar,{className:"w-4 h-4 mr-2"}),"March 12, 2026"]}),(0,b.jsxs)("span",{className:"flex items-center",children:[(0,b.jsx)(g.Tag,{className:"w-4 h-4 mr-2"}),"Data Visualization · Infographic"]})]})]}),(0,b.jsx)("div",{className:"h-px bg-gray-300 my-10"}),(0,b.jsxs)("section",{className:"mb-12",children:[(0,b.jsx)("h2",{className:"text-3xl font-bold text-gray-900 mb-6",children:"Introduction"}),(0,b.jsxs)("div",{className:"prose prose-lg max-w-none text-gray-700",children:[(0,b.jsx)("p",{className:"mb-4",children:"Over the past few years, Kansas has endured extreme heatwaves, particularly in 2022 and 2023, yet their impact has gone largely unreported. As a former resident who lived through these events, the silence feels strange. Kansas may not carry the fiscal or demographic weight of other states, but that hardly explains how historic heatwaves passed by without notice."}),(0,b.jsx)("p",{children:"To investigate, I drew on crop insurance data from the USDA Risk Management Agency's Cause of Loss database (2020–2025), which records the cause of each insured crop loss, the affected crop, and the indemnity paid to the farmer. I supplemented this with temperature data from NOAA and geographic boundary files from the U.S. Census Bureau's TIGER/Line shapefiles. Together, these sources allowed me to map, measure, and contextualize the damage."})]})]}),(0,b.jsx)("div",{className:"h-px bg-gray-300 my-10"}),(0,b.jsxs)("div",{className:"grid grid-cols-1 lg:grid-cols-2 gap-8",children:[(0,b.jsxs)("div",{className:"p-4",children:[(0,b.jsx)("h3",{className:"text-2xl font-bold text-gray-900 mb-4",children:"About"}),(0,b.jsx)("p",{className:"text-lg text-gray-700"})]}),(0,b.jsx)("div",{className:"p-4",children:(0,b.jsx)("div",{className:"lg:sticky lg:top-24 lg:h-[calc(100vh-6rem)] flex items-start",children:(0,b.jsx)(d.default,{src:"/images/Infographic.svg",alt:"Eaton and Palisades Fires Infographic",width:2481,height:3508,style:{width:"100%",height:"auto"},className:"rounded-xl shadow-lg max-h-[calc(100vh-8rem)] object-contain",unoptimized:!0})})})]}),(0,b.jsx)("div",{className:"h-px bg-gray-300 my-10"}),(0,b.jsxs)("section",{className:"mb-16",children:[(0,b.jsxs)("div",{className:"flex items-center justify-between mb-6",children:[(0,b.jsx)("h2",{className:"text-3xl font-bold text-gray-900",children:"Designing the Infographic: Approach and Decisions"}),(0,b.jsx)("button",{onClick:()=>r(!q),className:"lg:hidden p-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition-colors","aria-label":"Toggle design sections",children:q?(0,b.jsx)(l,{className:"w-5 h-5"}):(0,b.jsx)(m,{className:"w-5 h-5"})})]}),(0,b.jsxs)("div",{className:"flex flex-col lg:flex-row gap-8",children:[(0,b.jsx)("nav",{className:`lg:w-64 shrink-0 ${q?"block":"hidden lg:block"}`,children:(0,b.jsx)("div",{className:"lg:sticky lg:top-24",children:(0,b.jsx)("ul",{className:"space-y-1",children:u.map(a=>(0,b.jsxs)("li",{children:[(0,b.jsx)("button",{onClick:()=>{t(s===a.id?null:a.id),r(!1)},className:`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-all ${s===a.id?"bg-orange-100 text-orange-800 border-l-4 border-orange-500":"text-gray-600 hover:bg-gray-100 hover:text-gray-900"}`,children:(0,b.jsxs)("span",{className:"flex items-center justify-between",children:[a.title,(0,b.jsx)(k,{className:`w-4 h-4 transition-transform ${s===a.id?"rotate-90":""}`})]})}),s===a.id&&(0,b.jsx)("div",{className:"lg:hidden px-4 py-3 text-gray-700 text-sm leading-relaxed bg-gray-50 rounded-b-lg mt-1",children:a.content})]},a.id))})})}),(0,b.jsx)("div",{className:"hidden lg:block flex-1 min-h-[300px]",children:s?(0,b.jsxs)("div",{className:"bg-white rounded-xl border border-gray-200 p-8 shadow-sm",children:[(0,b.jsx)("h3",{className:"text-xl font-semibold text-gray-900 mb-4",children:u.find(a=>a.id===s)?.title}),(0,b.jsx)("p",{className:"text-gray-700 leading-relaxed text-base",children:u.find(a=>a.id===s)?.content})]}):(0,b.jsx)("div",{className:"bg-gray-100 rounded-xl border border-dashed border-gray-300 p-8 flex items-center justify-center min-h-[300px]",children:(0,b.jsx)("p",{className:"text-gray-400 text-sm",children:"Select a section from the sidebar to read more."})})})]})]}),(0,b.jsx)("div",{className:"h-px bg-gray-300 my-10"}),(0,b.jsxs)("section",{className:"mb-16",children:[(0,b.jsxs)("button",{onClick:()=>p(!o),className:"flex items-center gap-3 w-full text-left group",children:[(0,b.jsx)("span",{className:`flex items-center justify-center w-8 h-8 rounded-lg transition-colors ${o?"bg-orange-100 text-orange-700":"bg-gray-200 text-gray-500 group-hover:bg-gray-300"}`,children:(0,b.jsx)(i.ChevronDown,{className:`w-4 h-4 transition-transform ${o?"rotate-180":""}`})}),(0,b.jsx)("h2",{className:"text-2xl font-bold text-gray-900",children:"Full Code"}),(0,b.jsx)("span",{className:"text-sm text-gray-400 ml-2",children:o?"Click to collapse":"Expand to view full infographic code"})]}),o&&(0,b.jsxs)("div",{className:"mt-6 rounded-xl overflow-hidden border border-gray-200 shadow-sm",children:[(0,b.jsxs)("div",{className:"bg-gray-900 text-gray-300 px-6 py-3 text-xs font-mono flex items-center justify-between",children:[(0,b.jsx)("span",{children:"R"}),(0,b.jsx)("button",{onClick:()=>{navigator.clipboard.writeText(v)},className:"text-gray-500 hover:text-white transition-colors text-xs",children:"Copy"})]}),(0,b.jsx)("pre",{className:"bg-gray-950 text-gray-300 p-6 overflow-x-auto text-sm leading-relaxed max-h-[600px] overflow-y-auto",children:(0,b.jsx)("code",{children:v})})]})]})]})})]})}a.s(["default",()=>o],46795)}];

//# sourceMappingURL=app_blog_Infographic_page_tsx_2e49b775._.js.map