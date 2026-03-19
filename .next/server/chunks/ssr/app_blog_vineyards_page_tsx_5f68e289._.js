module.exports=[37574,a=>{"use strict";var b=a.i(87924),c=a.i(38246),d=a.i(71987),e=a.i(210),f=a.i(41675),g=a.i(33350),h=a.i(5112),i=a.i(5784),j=a.i(67552),k=a.i(72131);let l=({code:a,index:c,title:d,expandedCode:e,copiedIndex:f,onToggle:g,onCopy:h})=>{let k=e[c]??!1;return(0,b.jsxs)("div",{className:"relative mb-6",children:[(0,b.jsxs)("button",{onClick:()=>g(c),className:"w-full flex items-center justify-between bg-gradient-to-r from-teal-700 to-cyan-700 text-white px-4 py-2 rounded-t-lg text-sm font-medium hover:from-teal-600 hover:to-cyan-600 transition-all",children:[(0,b.jsxs)("span",{className:"flex items-center gap-2",children:[k?(0,b.jsx)(j.ChevronUp,{className:"w-4 h-4"}):(0,b.jsx)(i.ChevronDown,{className:"w-4 h-4"}),d||"View Code"]}),(0,b.jsx)("span",{className:"text-xs opacity-75",children:"R"})]}),k&&(0,b.jsxs)("div",{className:"relative",children:[(0,b.jsx)("pre",{className:"bg-gray-900 text-gray-100 p-4 rounded-b-lg overflow-x-auto text-sm border-l-4 border-teal-500",children:(0,b.jsx)("code",{children:a})}),(0,b.jsx)("button",{onClick:()=>h(a,c),className:"absolute top-2 right-2 text-xs bg-gray-700 text-white px-2 py-1 rounded hover:bg-gray-600 transition",children:f===c?"Copied!":"Copy"})]})]})},m=({headers:a,rows:c,caption:d})=>(0,b.jsxs)("div",{className:"overflow-x-auto my-6",children:[(0,b.jsxs)("table",{className:"min-w-full border border-gray-300 rounded-lg overflow-hidden",children:[(0,b.jsx)("thead",{className:"bg-gradient-to-r from-teal-600 to-cyan-600 text-white",children:(0,b.jsx)("tr",{children:a.map((a,c)=>(0,b.jsx)("th",{className:"px-4 py-3 text-left text-sm font-semibold",children:a},c))})}),(0,b.jsx)("tbody",{className:"bg-white divide-y divide-gray-200",children:c.map((a,c)=>(0,b.jsx)("tr",{className:c%2==0?"bg-gray-50":"bg-white",children:a.map((a,c)=>(0,b.jsx)("td",{className:"px-4 py-3 text-sm text-gray-700",children:"number"==typeof a?a.toLocaleString():a},c))},c))})]}),d&&(0,b.jsx)("p",{className:"text-sm text-gray-500 mt-2 text-center italic",children:d})]});function n(){let[a,i]=(0,k.useState)(0),[j,n]=(0,k.useState)(null),[o,p]=(0,k.useState)({}),[q,r]=(0,k.useState)(!1),s=(0,k.useRef)(null);(0,k.useEffect)(()=>{let a=document.createElement("link");a.rel="stylesheet",a.href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css",a.crossOrigin="anonymous",document.head.appendChild(a);let b=document.createElement("script");b.src="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.js",b.crossOrigin="anonymous",b.onload=()=>{let a=document.createElement("script");a.src="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/contrib/auto-render.min.js",a.crossOrigin="anonymous",a.onload=()=>{r(!0)},document.head.appendChild(a)},document.head.appendChild(b)},[]),(0,k.useEffect)(()=>{},[q]),(0,k.useEffect)(()=>{let a=()=>{let a=window.innerHeight,b=document.documentElement.scrollHeight-a;i(Math.min(100,Math.max(0,window.scrollY/b*100)))};return window.addEventListener("scroll",a),a(),()=>window.removeEventListener("scroll",a)},[]);let t=(a,b)=>{navigator.clipboard.writeText(a),n(b),setTimeout(()=>n(null),1500)},u=a=>{p(b=>({...b,[a]:!b[a]}))},v=[`library(tidyverse)
library(here)
library(janitor)
library(readxl)
library(viridis)
library(car)
library(patchwork)
library(broom)
library(stringr)`,`# ============================================================================
# Read in Data 
# ============================================================================

variables <- c("Regional_AW_Vol", "Regional_ICA", "Regional_ETc_Vol", "Regional_Ep_Vol")

original_names <- c(
  "V1" = "Year", "V2" = "RO", "V3" = "HR", "V4" = "PA", "V5" = "DAU-Co", 
  "V6" = "Grain", "V7" = "Rice", "V8" = "Cotton", "V9" = "Sugar Beet", 
  "V10" = "Corn", "V11" = "Dry Beans", "V12" = "Safflower", 
  "V13" = "Other Field", "V14" = "Alfalfa", "V15" = "Pasture",
  "V16" = "Tomato Processing", "V17" = "Tomato Fresh", "V18" = "Cucurbits", 
  "V19" = "Onion & Garlic", "V20" = "Potatoes", "V21" = "Truck Crops", 
  "V22" = "Almonds & Pistachios", "V23" = "Other Deciduous", 
  "V24" = "Citrus & Subtropical", "V25" = "Vineyard", "V26" = "Total"
)

all_tables <- list()
for (parameter in variables) {
  temporary_sheet <- read_excel(here::here("data", "water_use.xlsx"), 
                                sheet = parameter, 
                                skip = 1) 
  
  # Clean Sheet
  temporary_sheet <- temporary_sheet %>% 
    select_if(~!all(is.na(.))) %>% 
    remove_empty(which = "cols")
  
  # Remove column unique to Regional_ICA (Multi-Crop)
  if(parameter == "Regional_ICA") {
    indices_to_remove <- grep("ulti", names(temporary_sheet))
    temporary_sheet <- temporary_sheet[, -indices_to_remove]
  }
  
  # Create index of year columns and space between year columns
  year_index <- grep("Year", names(temporary_sheet))
  intervals <- c(diff(year_index), ncol(temporary_sheet) - year_index[length(year_index)] + 1)
  
  # Initalize list for storing the blocks from each parameter
  blocks <- list()
  
  for (count in seq_along(year_index)) {
    start <- year_index[count]
    end   <- start + intervals[count] - 1

    block <- temporary_sheet[, start:end, drop = FALSE]
    colnames(block) <- paste0("V", seq_len(ncol(block)))
    
    # Only keep rows with four digit number in the year column
    block <- block %>%
      filter(grepl("^\\\\d{4}$", V1))
    
    # Convert all columns to character for safe binding
    block <- block %>%
      mutate(across(everything(), as.character))
    
    blocks[[length(blocks) + 1]] <- block
    blocks[[count]] <- block
  }
  
  df_stacked <- bind_rows(blocks) 
  colnames(df_stacked) <- original_names[colnames(df_stacked)]
  
  pivoted_table <- df_stacked %>%
    pivot_longer(
      cols = !c("Year", "RO", "HR", "PA", "DAU-Co"),
      names_to = "Crop_Type",
      values_to = "Value"
    ) %>%
    mutate(
      Parameter = parameter,
      Value = suppressWarnings(as.numeric(Value))
    )
  
  all_tables[[parameter]] <- pivoted_table
}

combined_long <- bind_rows(all_tables)

# Now pivot wider to get each parameter as a column
final_data <- bind_rows(all_tables) %>%
  pivot_wider(
    names_from = Parameter,
    values_from = Value,
    values_fn = mean
  ) %>% 
filter(Crop_Type != "Total", Regional_AW_Vol >= 0)`,`# Select vineyard data
vineyard_data <- final_data %>%
  filter(Crop_Type == "Vineyard", Regional_AW_Vol > 0, Regional_ICA > 0) %>%
  mutate(
    across(Regional_AW_Vol:Regional_Ep_Vol, ~replace_na(., 0)), # Remove NA Variables
    aw_per_acre = Regional_AW_Vol / Regional_ICA,
    log_aw = log(Regional_AW_Vol)
  )

# Format Hydrologic Region Names
vineyard_data$HR <- gsub("0[0-9]_", "", vineyard_data$HR)
vineyard_data$HR <- gsub("10_", "", vineyard_data$HR)
vineyard_data$HR <- factor(vineyard_data$HR)

# View
head(vineyard_data, 10)`,`# Get Summary AW Data For Each Region
regional_summary <- vineyard_data %>%
  group_by(HR) %>%
  summarise(
    n = n(),
    mean_AW = mean(Regional_AW_Vol),
    median_AW = median(Regional_AW_Vol),
    sd_AW = sd(Regional_AW_Vol),
    se_AW = sd_AW / sqrt(n)) %>%
  arrange(mean_AW)

regional_summary`,`vineyard_data %>%
  ggplot(aes(x = reorder(HR, Regional_AW_Vol, FUN = median),
             y = Regional_AW_Vol)) +
  geom_boxplot(aes(fill = HR), outlier.alpha = 0.3) +
  scale_fill_viridis_d() +
  scale_y_log10(labels = scales::comma) +
  labs(
    x = "Hydrologic Region",
    y = "Applied Water Volume (Acre-Feet, Log Scale)",
    title = "Applied Water Volume Distribution Across California Regions",
    subtitle = "Regions ordered by median water use"
  ) +
  theme(
    axis.text.x = element_text(angle = 45, hjust = 1),
    legend.position = "none",
    plot.title = element_text(hjust = 0.5, face = "bold"),
    plot.subtitle = element_text(hjust = 0.5)
  )`,`set.seed(123)

gamma_model <- glm(Regional_AW_Vol ~
                        Regional_ETc_Vol + 
                        Regional_Ep_Vol + 
                        log(Regional_ICA) + 
                        HR, 
                     family = Gamma(link = "log"),
                     data = vineyard_data)

summary(gamma_model)`,`# Extract true parameters
true_coefs <- coef(gamma_model)
true_dispersion <- summary(gamma_model)$dispersion

# Function to simulate data
simulate_vineyard_data <- function(predictors, betas, dispersion, n_sim = 1) {
  # Design matrix
   X <- model.matrix(~ Regional_ETc_Vol + Regional_Ep_Vol + 
                      log(Regional_ICA) + HR, data = predictors)
   
  #  Linear predictor (log scale)
  eta <- X %*% betas
   
  # Mean (inverse link)
  mean <- exp(eta)
  
  # Gamma shape parameter 
  shape <- 1 / dispersion
  
  # Simulate response
  y_sim <- rgamma(nrow(predictors), shape = shape, scale = mean / shape)
  
  return(y_sim)
}`,`# Number of simulations
n_sims <- 500 
results <- vector("list", n_sims)

# Run simulations
for (i in 1:n_sims) {
  # Simulate new response
  vineyard_sim <- vineyard_data
  vineyard_sim$Regional_AW_Vol <- simulate_vineyard_data(
    vineyard_data, true_coefs, true_dispersion
  )
  
  # Refit model
  model_sim <- glm(
    Regional_AW_Vol ~ Regional_ETc_Vol + Regional_Ep_Vol + 
    log(Regional_ICA) + HR,
    family = Gamma(link = "log"),
    data = vineyard_sim
  )
  
  # Store results
  results[[i]] <- list(
    coefs = coef(model_sim),
    converged = model_sim$converged
  )
}

# Extract coefficient matrix
coef_matrix <- do.call(rbind, lapply(results, function(x) x$coefs))`,`param_summary <- data.frame(
  Parameter = names(true_coefs),
  True_Value = true_coefs,
  Mean_Estimate = colMeans(coef_matrix),
  SD = apply(coef_matrix, 2, sd),
  CI_Lower = apply(coef_matrix, 2, quantile, 0.025),
  CI_Upper = apply(coef_matrix, 2, quantile, 0.975),
  row.names = NULL
)

# Check if 95% CI contains true value
param_summary <- param_summary %>% mutate(Contain_95 = if_else(
  True_Value >= CI_Lower & True_Value <= CI_Upper, "Yes", "No"
  ))

print(param_summary)`,`model_null <- glm(
  Regional_AW_Vol ~ Regional_ETc_Vol + Regional_Ep_Vol + log(Regional_ICA),
  family = Gamma(link = "log"),
  data = vineyard_data
)

lrt <- anova(model_null, gamma_model, test = "LRT")
print(lrt)

round(lrt$Deviance[2], 2)`,`# Extract regional coefficients
regional_effects <- tidy(gamma_model, conf.int = TRUE) %>%
  filter(grepl("^HR", term)) %>%
  mutate(
    Region = gsub("^HR", "", term),
    pct_change = (exp(estimate) - 1) * 100,
    ci_low = (exp(conf.low) - 1) * 100,
    ci_high = (exp(conf.high) - 1) * 100,
    signif = p.value < 0.05
  ) %>%
  arrange(desc(pct_change))

# Add reference region
reference_region <- levels(vineyard_data$HR)[1]
regional_effects <- regional_effects %>%
  add_row(
    Region = reference_region,
    pct_change = 0,
    ci_low = 0,
    ci_high = 0,
    signif = NA,
    .before = 1
  )

# Display table
regional_effects %>%
  select(Region, pct_change, ci_low, ci_high, signif)`,`ggplot(regional_effects, aes(x = reorder(Region, pct_change), 
                            y = pct_change)) +
  geom_col(aes(fill = pct_change), width = 0.7) +
  geom_errorbar(aes(ymin = ci_low, ymax = ci_high), 
                width = 0.2, linewidth = 0.8) +
  geom_hline(yintercept = 0, linetype = "solid", linewidth = 0.5) +
  scale_fill_viridis_c(
    name = "% Difference in\\nExpected Water Use"
  ) +
  coord_flip() +
  labs(
    title = "Regional Water Use Coefficients",
    subtitle = "Percent difference in expected water use compared to Central Coast (reference region)",
    x = "Hydrologic Region",
    y = "% Difference in Expected Water Use\\n(controlling for climate, precipitation, and vineyard size)",
    caption = "Error bars show 95% confidence intervals"
  ) +
  theme(
    plot.title = element_text(hjust = 0.5, face = "bold", size = 14),
    plot.subtitle = element_text(hjust = 0.5, size = 11),
    legend.position = "none"
  )`,`# Get predictions
vineyard_data$predicted <- predict(gamma_model, type = "response")
vineyard_data$residuals <- residuals(gamma_model, type = "pearson")

# Calculate R-squared
r_squared <- cor(vineyard_data$Regional_AW_Vol, vineyard_data$predicted)^2

# Predicted vs actual plot
ggplot(vineyard_data, aes(x = Regional_AW_Vol, y = predicted)) +
  geom_point(aes(color = HR), alpha = 0.5) +
  geom_abline(slope = 1, intercept = 0, 
              color = "black", linetype = "dashed", linewidth = 1) +
  scale_x_log10(labels = scales::comma) +
  scale_y_log10(labels = scales::comma) +
  scale_color_viridis_d() +
  annotate("text", 
           x = min(vineyard_data$Regional_AW_Vol) * 2, 
           y = max(vineyard_data$predicted) * 0.8,
           label = paste0("R\xb2 = ", round(r_squared, 3)),
           hjust = 0, size = 5, fontface = "bold") +
  labs(
    title = "Model Performance: Predicted vs Observed Water Use",
    x = "Observed Applied Water (Acre-Feet, Log Scale)",
    y = "Predicted Applied Water (Acre-Feet, Log Scale)",
    color = "Hydrologic\\nRegion"
  ) +
  theme(legend.position = "right")`];return(0,b.jsxs)("article",{className:"min-h-screen bg-gray-50",children:[(0,b.jsx)("div",{className:"fixed top-0 left-0 w-full h-1 bg-transparent z-50",children:(0,b.jsx)("div",{className:"h-full bg-gradient-to-r from-teal-500 via-cyan-500 to-blue-500 transition-all duration-150",style:{width:`${a}%`}})}),(0,b.jsxs)("div",{className:"relative w-full h-96 md:h-[28rem]",children:[(0,b.jsx)("div",{className:"absolute inset-0 bg-gradient-to-r from-emerald-600 via-teal-500 via-cyan-500 via-sky-500 to-blue-600"}),(0,b.jsx)("div",{className:"absolute inset-0 bg-black/30"}),(0,b.jsx)("div",{className:"absolute inset-0 flex items-center justify-center px-6",children:(0,b.jsxs)("div",{className:"text-white text-center max-w-4xl",children:[(0,b.jsx)("h1",{className:"text-4xl md:text-5xl font-extrabold tracking-tight mb-4",children:"Regional Water Use Efficiency in California Vineyards"}),(0,b.jsx)("p",{className:"text-sm md:text-base mb-2",children:"Author: William Mullins ・ Date: December 5, 2025"}),(0,b.jsxs)("a",{href:"https://github.com/willrmull/Vineyard_Water_Usage",target:"_blank",rel:"noopener noreferrer",className:"inline-flex items-center gap-2 text-white hover:text-gray-300 transition",children:[(0,b.jsx)(h.Github,{className:"w-5 h-5"}),(0,b.jsx)("span",{children:"GitHub"})]})]})})]}),(0,b.jsx)("div",{className:"container mx-auto px-6",children:(0,b.jsxs)("div",{className:"max-w-4xl mx-auto",children:[(0,b.jsxs)(c.default,{href:"/blog",className:"inline-flex items-center text-teal-600 hover:text-teal-800 mt-10 mb-8 transition-colors",children:[(0,b.jsx)(e.ArrowLeft,{className:"w-4 h-4 mr-2"})," Back to Blog"]}),(0,b.jsxs)("header",{className:"mb-12",children:[(0,b.jsxs)("div",{className:"flex gap-2 mb-4 flex-wrap",children:[(0,b.jsx)("span",{className:"px-3 py-1 bg-teal-100 text-teal-700 rounded-full text-sm font-medium",children:"Water Resources"}),(0,b.jsx)("span",{className:"px-3 py-1 bg-cyan-100 text-cyan-700 rounded-full text-sm font-medium",children:"Agriculture"}),(0,b.jsx)("span",{className:"px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium",children:"Statistical Modeling"})]}),(0,b.jsxs)("div",{className:"flex items-center text-gray-600 text-sm border-b border-gray-200 pb-8",children:[(0,b.jsxs)("span",{className:"flex items-center mr-6",children:[(0,b.jsx)(f.Calendar,{className:"w-4 h-4 mr-2"}),"December 5, 2025"]}),(0,b.jsxs)("span",{className:"flex items-center",children:[(0,b.jsx)(g.Tag,{className:"w-4 h-4 mr-2"}),"R · GLM · Environmental Analysis"]})]})]}),(0,b.jsxs)("div",{ref:s,className:"prose prose-lg prose-slate mx-auto text-gray-700",children:[(0,b.jsx)("h2",{className:"text-3xl font-bold text-gray-900 mb-4",children:"Introduction"}),(0,b.jsx)("h3",{className:"text-2xl font-semibold text-gray-800 mt-8 mb-3",children:"The California Water Challenge"}),(0,b.jsx)("p",{className:"text-lg font-semibold text-teal-700 mb-4",children:"Does hydrologic region affect vineyard water use in California, after controlling for evapotranspiration, precipitation, and irrigated crop area?"}),(0,b.jsx)("p",{children:"California's agriculture is the state's dominant water consumer, accounting for approximately 80% of its developed water supply. The efficiency of this water use is paramount for economic resilience and environmental stewardship, particularly as climate change exacerbates drought frequency and intensifies competition for limited resources."}),(0,b.jsx)("p",{children:"Vineyards represent a significant and geographically diverse component of the state's agricultural portfolio, spanning disparate climate zones from the cool coastal valleys to the hot interior regions. While climatic factors are known drivers of water demand, regional differences inherent to California's 10 major hydrologic regions include additional variables such as such as water management practices, regulatory structures, soil characteristics, and crop varieties—may exert an independent and measurable influence on observed water use efficiency."}),(0,b.jsx)("p",{children:"The aim of this analysis is to quantify the magnitude and direction of the independent effect of hydrologic region on vineyard water use efficiency across California."}),(0,b.jsxs)("div",{className:"grid md:grid-cols-2 gap-8 my-8",children:[(0,b.jsxs)("div",{children:[(0,b.jsx)("h4",{className:"text-xl font-semibold text-gray-800 mb-3",children:"California Hydrologic Regions"}),(0,b.jsx)("p",{children:"The state is divided into 10 hydrologic regions, each with distinct climate characteristics that influence agricultural water demand."})]}),(0,b.jsx)("div",{className:"flex justify-center",children:(0,b.jsx)("div",{className:"w-full max-w-sm",children:(0,b.jsx)("div",{className:"relative h-96 w-full",children:(0,b.jsx)(d.default,{src:"/images/HR_ZONES.png",alt:"California Hydrologic Regions map",fill:!0,sizes:"(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",className:"object-contain rounded",priority:!0})})})})]}),(0,b.jsx)("h3",{className:"text-2xl font-semibold text-gray-800 mt-8 mb-3",children:"About the Data"}),(0,b.jsxs)("p",{children:["Data was extracted from the California Department of Water Resources"," ",(0,b.jsx)("strong",{children:"Statewide Agricultural Water Use Data (2016-2020)"})," ","Excel Application Tool. This dataset provides annual estimates for water use variables across 20 crop types and multiple geographic scales."]}),(0,b.jsx)("p",{children:(0,b.jsx)("strong",{children:"Key variables used in this analysis:"})}),(0,b.jsxs)("ul",{className:"list-disc pl-6 space-y-2 mb-6",children:[(0,b.jsxs)("li",{children:[(0,b.jsx)("strong",{children:"Regional Applied Water Volume (AW)"}),": Total irrigation water applied to vineyards in acre-feet"]}),(0,b.jsxs)("li",{children:[(0,b.jsx)("strong",{children:"Regional Irrigated Crop Area (ICA)"}),": Total vineyard acreage receiving irrigation"]}),(0,b.jsxs)("li",{children:[(0,b.jsxs)("strong",{children:["Regional Crop Evapotranspiration (","$ET_c$",")"]}),": Total water lost to atmosphere from soil and plants (acre-feet)—represents crop water demand"]}),(0,b.jsxs)("li",{children:[(0,b.jsxs)("strong",{children:["Regional Effective Precipitation (","$E_p$",")"]}),": Rainfall that effectively contributes to crop water needs (acre-feet)"]}),(0,b.jsxs)("li",{children:[(0,b.jsx)("strong",{children:"Hydrologic Region (HR)"}),": California's 10 major hydrologic regions, defined by watershed boundaries and climate characteristics"]})]}),(0,b.jsxs)("p",{children:["Data availability:"," ",(0,b.jsx)("a",{href:"https://data.ca.gov/dataset/statewide-agricultural-water-use-data-2016-2020",className:"text-teal-600 hover:text-teal-800 underline",target:"_blank",rel:"noopener noreferrer",children:"California DWR Water Use Data"}),"."]}),(0,b.jsx)("h3",{className:"text-2xl font-semibold text-gray-800 mt-8 mb-3",children:"Directed Acyclic Graph (DAG)"}),(0,b.jsx)("p",{children:"The following DAG illustrates the conceptual model of how the variables relate:"}),(0,b.jsxs)("ol",{className:"list-decimal pl-6 space-y-3 mb-6",children:[(0,b.jsxs)("li",{children:[(0,b.jsx)("strong",{children:"Hydrologic Region (HR) → Climate Driven Variables"}),": HR defines the local climate conditions. Different regions have different temperatures, humidity, and weather patterns. This drives both ","$ET_c$"," (water lost) and ","$E_p$"," (water gained naturally)."]}),(0,b.jsxs)("li",{children:[(0,b.jsx)("strong",{children:"Climate Driven Variables → Water Use"}),": After accounting for natural water supply (","$E_p$","), the deficit between demand (","$ET_c$",") and supply must be met through irrigation."]}),(0,b.jsxs)("li",{children:[(0,b.jsx)("strong",{children:"Vineyard Size (ICA) → Total Volume"}),": Larger vineyards require proportionally more total water (a scaling relationship)."]})]}),(0,b.jsx)("p",{children:"After controlling for climate and size, regional coefficients isolate potential management efficiency differences. The reference region (Central Coast) represents the efficiency baseline."}),(0,b.jsx)("div",{className:"flex justify-center",children:(0,b.jsx)("div",{className:"my-6 w-full max-w-5xl",children:(0,b.jsx)("div",{className:"relative h-96 w-full",children:(0,b.jsx)(d.default,{src:"/images/D.png",alt:"Directed Acyclic Graph (DAG)",fill:!0,sizes:"(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",className:"object-contain rounded"})})})}),(0,b.jsx)("h3",{className:"text-2xl font-semibold text-gray-800 mt-8 mb-3",children:"Import Packages"}),(0,b.jsx)("p",{children:"The analysis requires the following packages:"}),(0,b.jsx)(l,{code:v[0],index:0,title:"Import Packages",expandedCode:o,copiedIndex:j,onToggle:u,onCopy:t}),(0,b.jsx)("h3",{className:"text-2xl font-semibold text-gray-800 mt-8 mb-3",children:"Data Processing Pipeline"}),(0,b.jsx)("p",{children:"The data is stored in an Excel application, which means that data for each of the variables is stored on its own individual sheets. The following code is used to read in data from each of the sheets and convert it into a standard data frame."}),(0,b.jsx)(l,{code:v[1],index:1,title:"Read in Data",expandedCode:o,copiedIndex:j,onToggle:u,onCopy:t}),(0,b.jsx)("h3",{className:"text-2xl font-semibold text-gray-800 mt-8 mb-3",children:"Data Preparation"}),(0,b.jsx)("p",{children:"Now that the data has been read in, we can select data collected from vineyards which applied water to their crops."}),(0,b.jsx)(l,{code:v[2],index:2,title:"Data Preparation",expandedCode:o,copiedIndex:j,onToggle:u,onCopy:t}),(0,b.jsx)("h2",{className:"text-3xl font-bold text-gray-900 mt-12 mb-4",children:"Data Exploration"}),(0,b.jsx)("h3",{className:"text-2xl font-semibold text-gray-800 mt-8 mb-3",children:"Regional Water Use Summary"}),(0,b.jsx)(l,{code:v[3],index:3,title:"Regional Summary Statistics",expandedCode:o,copiedIndex:j,onToggle:u,onCopy:t}),(0,b.jsx)(m,{headers:["Hydrologic Region","n","Mean AW","Median AW","SD","SE"],rows:[["South Lahontan",23,"128.78","39.43","295.28","61.57"],["South Coast",46,"1,287.72","296.49","2,120.16","312.60"],["Sacramento River",206,"3,631.83","134.91","8,249.17","574.75"],["North Coast",121,"5,936.57","443.85","10,137.34","921.58"],["Colorado River",25,"6,748.80","386.15","13,446.13","2,689.23"],["Central Coast",163,"9,917.94","1,476.95","22,978.53","1,799.82"],["San Francisco Bay",80,"10,135.80","138.55","25,803.39","2,884.91"],["San Joaquin River",182,"17,764.87","3,262.99","41,878.19","3,104.22"],["Tulare Lake",166,"38,072.24","5,663.51","58,246.36","4,520.79"]],caption:"Applied Water (AW) summary statistics by Hydrologic Region"}),(0,b.jsx)("p",{children:(0,b.jsx)("strong",{children:"Key observations:"})}),(0,b.jsxs)("ul",{className:"list-disc pl-6 space-y-2 mb-6",children:[(0,b.jsxs)("li",{children:[(0,b.jsx)("strong",{children:"Large variation between regions"}),": Mean water use ranges from 129 acre-feet (South Lahontan) to 38,072 acre-feet (Tulare Lake)—a nearly 300-fold difference"]}),(0,b.jsxs)("li",{children:[(0,b.jsx)("strong",{children:"High within-region variability"}),": Standard deviations exceed means in all regions, indicating right-skewed distributions"]}),(0,b.jsxs)("li",{children:[(0,b.jsxs)("strong",{children:["Median ","<"," Mean everywhere"]}),": Consistent with right skew caused by a few very large vineyard operations"]})]}),(0,b.jsx)("h3",{className:"text-2xl font-semibold text-gray-800 mt-8 mb-3",children:"Distribution of Water Use"}),(0,b.jsx)("p",{children:"This log-scale boxplot reveals that while most regions have modest median use (100-1,000 acre-feet), there are many high water volume outliers in regions like Central Coast, San Joaquin River, and Tulare Lake."}),(0,b.jsx)(l,{code:v[4],index:4,title:"Box Plot Code",expandedCode:o,copiedIndex:j,onToggle:u,onCopy:t}),(0,b.jsx)("div",{className:"flex justify-center",children:(0,b.jsx)("div",{className:"my-6 w-full max-w-5xl",children:(0,b.jsx)("div",{className:"relative h-96 w-full",children:(0,b.jsx)(d.default,{src:"/images/boxplot_aw.png",alt:"Box Plot of Applied Water Volume by Hydrologic Region",fill:!0,sizes:"(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 50vw",className:"object-contain rounded",priority:!0})})})}),(0,b.jsx)("h2",{className:"text-3xl font-bold text-gray-900 mt-12 mb-4",children:"Statistical Model"}),(0,b.jsx)("h3",{className:"text-2xl font-semibold text-gray-800 mt-8 mb-3",children:"Model Specification"}),(0,b.jsx)("h4",{className:"text-xl font-semibold text-gray-800 mt-6 mb-2",children:"Why Gamma?"}),(0,b.jsx)("p",{children:"The Gamma distribution is appropriate here because:"}),(0,b.jsxs)("ol",{className:"list-decimal pl-6 space-y-2 mb-6",children:[(0,b.jsxs)("li",{children:[(0,b.jsx)("strong",{children:"Positive support"}),": Water use cannot be zero or negative in irrigated areas"]}),(0,b.jsxs)("li",{children:[(0,b.jsx)("strong",{children:"Right-skewed"}),": The distribution has a long right tail (high outliers)"]}),(0,b.jsxs)("li",{children:[(0,b.jsx)("strong",{children:"Mean-variance relationship"}),": Variance increases with the mean (heteroscedasticity)"]})]}),(0,b.jsx)("h4",{className:"text-xl font-semibold text-gray-800 mt-6 mb-2",children:"Model Statistical Notation"}),(0,b.jsx)("div",{className:"my-4 overflow-x-auto text-center py-2",children:"$$Y_i \\sim \\text{Gamma}(\\text{shape} = k, \\text{scale} = \\theta_i)$$"}),(0,b.jsx)("p",{children:(0,b.jsx)("strong",{children:"Where:"})}),(0,b.jsxs)("ul",{className:"list-disc pl-6 space-y-2 mb-6",children:[(0,b.jsxs)("li",{children:["$Y_i$"," = Regional Applied Water Volume for observation"," ","$i$"]}),(0,b.jsxs)("li",{children:["$k = 1/\\phi$"," is the shape parameter (constant across observations)"]}),(0,b.jsxs)("li",{children:["$\\phi$"," is the dispersion parameter"]}),(0,b.jsxs)("li",{children:["$\\theta_i$"," is the scale parameter (varies by observation)"]})]}),(0,b.jsx)("p",{children:(0,b.jsx)("strong",{children:"Gamma Regression Equation:"})}),(0,b.jsx)("div",{className:"my-4 overflow-x-auto text-center py-2",children:"$$\\log(\\mu) = \\beta_0 + \\beta_1 ET_c + \\beta_2 E_p + \\beta_3 \\log(ICA) + \\beta_4 HR_4 + \\beta_5 HR_5 + \\cdots + \\beta_k HR_k$$"}),(0,b.jsx)("p",{children:(0,b.jsx)("strong",{children:"Coefficient Interpretation:"})}),(0,b.jsxs)("ul",{className:"list-disc pl-6 space-y-2 mb-6",children:[(0,b.jsxs)("li",{children:["$\\beta_1, \\beta_2$",": Multiplicative change in water use per unit increase in ","$ET_c$"," or ","$E_p$"]}),(0,b.jsxs)("li",{children:["$\\beta_3$",": Change in water use per % change in vineyard area"]}),(0,b.jsxs)("li",{children:["$\\beta_4 - \\beta_{11}$",": Regional multiplier relative to Central Coast (reference region)"]})]}),(0,b.jsx)("h3",{className:"text-2xl font-semibold text-gray-800 mt-8 mb-3",children:"Model Fitting"}),(0,b.jsx)(l,{code:v[5],index:5,title:"Gamma Model",expandedCode:o,copiedIndex:j,onToggle:u,onCopy:t}),(0,b.jsx)(m,{headers:["Parameter","Estimate","Std. Error","t value","Pr(>|t|)"],rows:[["(Intercept)","7.473e-01","1.753e-02","42.624","< 2e-16 ***"],["Regional_ETc_Vol","9.758e-07","3.035e-07","3.215","0.00135 **"],["Regional_Ep_Vol","-7.294e-06","2.672e-06","-2.730","0.00645 **"],["log(Regional_ICA)","1.010e+00","2.213e-03","456.617","< 2e-16 ***"],["HRColorado River","6.531e-01","3.313e-02","19.712","< 2e-16 ***"],["HRNorth Coast","-1.257e-02","1.857e-02","-0.677","0.49850"],["HRSacramento River","2.045e-01","1.645e-02","12.432","< 2e-16 ***"],["HRSan Francisco Bay","5.207e-02","2.117e-02","2.460","0.01406 *"],["HRSan Joaquin River","2.495e-01","1.660e-02","15.029","< 2e-16 ***"],["HRSouth Coast","3.332e-01","2.572e-02","12.956","< 2e-16 ***"],["HRSouth Lahontan","5.557e-01","3.475e-02","15.993","< 2e-16 ***"],["HRTulare Lake","5.399e-01","1.755e-02","30.769","< 2e-16 ***"]],caption:"Gamma GLM Coefficient Estimates (Dispersion parameter: 0.0234)"}),(0,b.jsx)("p",{className:"text-sm text-gray-600 mt-2",children:"Signif. codes: 0 '***' 0.001 '**' 0.01 '*' 0.05 '.' 0.1 ' ' 1"}),(0,b.jsx)("h2",{className:"text-3xl font-bold text-gray-900 mt-12 mb-4",children:"Model Validation Through Simulation"}),(0,b.jsx)("p",{children:"To ensure the model is correctly specified and is able to reliably estimate parameters, simulations are used. This process involves:"}),(0,b.jsxs)("ol",{className:"list-decimal pl-6 space-y-2 mb-6",children:[(0,b.jsx)("li",{children:'Using coefficients from the model as the "true" values'}),(0,b.jsx)("li",{children:"Generating 500 synthetic datasets using those parameters"}),(0,b.jsx)("li",{children:"Refitting the model for each dataset"}),(0,b.jsx)("li",{children:"Checking if that model recovers the true parameters"})]}),(0,b.jsx)("h3",{className:"text-2xl font-semibold text-gray-800 mt-8 mb-3",children:"Simulation Procedure"}),(0,b.jsx)(l,{code:v[6],index:6,title:"Simulation Function",expandedCode:o,copiedIndex:j,onToggle:u,onCopy:t}),(0,b.jsx)(l,{code:v[7],index:7,title:"Run Simulations",expandedCode:o,copiedIndex:j,onToggle:u,onCopy:t}),(0,b.jsx)("h3",{className:"text-2xl font-semibold text-gray-800 mt-8 mb-3",children:"Simulation Results"}),(0,b.jsx)(l,{code:v[8],index:8,title:"Parameter Summary",expandedCode:o,copiedIndex:j,onToggle:u,onCopy:t}),(0,b.jsx)(m,{headers:["Parameter","True Value","Recovered","Difference","% Error"],rows:[["(Intercept)","7.473e-01","7.427e-01","4.60e-03","0.62"],["Regional_ETc_Vol","9.758e-07","8.633e-07","1.12e-07","11.52"],["Regional_Ep_Vol","-7.294e-06","-8.424e-06","1.13e-06","15.49"],["log(Regional_ICA)","1.010e+00","1.010e+00","3.76e-04","0.04"],["HRColorado River","6.531e-01","6.622e-01","-9.14e-03","1.40"],["HRNorth Coast","-1.257e-02","-5.219e-03","-7.35e-03","58.49"],["HRSacramento River","2.045e-01","1.988e-01","5.74e-03","2.80"],["HRSan Francisco Bay","5.207e-02","3.966e-02","1.24e-02","23.84"],["HRSan Joaquin River","2.495e-01","2.610e-01","-1.15e-02","4.62"],["HRSouth Coast","3.332e-01","3.452e-01","-1.20e-02","3.59"],["HRSouth Lahontan","5.557e-01","5.573e-01","-1.54e-03","0.28"],["HRTulare Lake","5.399e-01","5.557e-01","-1.58e-02","2.93"]],caption:"Parameter Recovery Summary (Mean absolute % error: 10.47, Max: 58.49)"}),(0,b.jsxs)("p",{children:[(0,b.jsx)("strong",{children:"Interpretation"}),": For all of the parameters the model was able to recover the true value of the mean within its 95% confidence interval. This suggests that the model is successfully able to recover the parameter values."]}),(0,b.jsx)("h2",{className:"text-3xl font-bold text-gray-900 mt-12 mb-4",children:"Statistical Inference"}),(0,b.jsx)("h3",{className:"text-2xl font-semibold text-gray-800 mt-8 mb-3",children:"Hypothesis Testing"}),(0,b.jsx)("h4",{className:"text-xl font-semibold text-gray-800 mt-6 mb-2",children:"Overall Test: Do Regions Differ?"}),(0,b.jsx)("p",{children:(0,b.jsxs)("strong",{children:["Null Hypothesis (","$H_0$","):"]})}),(0,b.jsx)("div",{className:"my-4 overflow-x-auto text-center py-2",children:"$$\\beta_4 = \\beta_5 = \\cdots = \\beta_{11} = 0$$"}),(0,b.jsx)("p",{children:"All HR coefficients are zero, meaning there are NO differences in water use between hydrologic regions after controlling for climate factors and vineyard size."}),(0,b.jsx)("p",{children:(0,b.jsxs)("strong",{children:["Alternative Hypothesis (","$H_1$","):"]})}),(0,b.jsx)("div",{className:"my-4 overflow-x-auto text-center py-2",children:"$$\\text{At least one } \\beta_i \\neq 0$$"}),(0,b.jsx)("p",{children:"At least one region differs in water use, indicating that regional factors beyond climate (e.g., efficiency, technology, regulations) affect water use."}),(0,b.jsx)("h4",{className:"text-xl font-semibold text-gray-800 mt-6 mb-2",children:"Likelihood Ratio Test"}),(0,b.jsxs)("p",{children:["The ","$H_0$"," is tested by comparing the full gamma model (with HR) to a reduced gamma model (without HR):"]}),(0,b.jsx)(l,{code:v[9],index:9,title:"Likelihood Ratio Test",expandedCode:o,copiedIndex:j,onToggle:u,onCopy:t}),(0,b.jsx)(m,{headers:["Model","Resid. Df","Resid. Dev","Df","Deviance","Pr(>Chi)"],rows:[["Null (without HR)","1008","63.545","-","-","-"],["Full (with HR)","1000","23.979","8","39.566","< 2.2e-16 ***"]],caption:"Analysis of Deviance Table (Likelihood Ratio Test)"}),(0,b.jsx)("p",{children:(0,b.jsx)("strong",{children:"Results:"})}),(0,b.jsxs)("ul",{className:"list-disc pl-6 space-y-2 mb-6",children:[(0,b.jsxs)("li",{children:[(0,b.jsx)("strong",{children:"Test Statistic"}),": ","$\\chi^2$"," = 39.57 (df = 8)"]}),(0,b.jsxs)("li",{children:[(0,b.jsx)("strong",{children:"P-value"}),": ","<"," 2.2e-16"]}),(0,b.jsxs)("li",{children:[(0,b.jsx)("strong",{children:"Conclusion"}),": We"," ",(0,b.jsx)("strong",{children:"reject the null hypothesis"}),". There is evidence that the hydrologic regions affect the water applied by vineyards even after controlling for climate demand, precipitation, and vineyard size."]})]}),(0,b.jsx)("h3",{className:"text-2xl font-semibold text-gray-800 mt-8 mb-3",children:"Individual Region Comparisons"}),(0,b.jsx)(l,{code:v[10],index:10,title:"Regional Effects",expandedCode:o,copiedIndex:j,onToggle:u,onCopy:t}),(0,b.jsx)("h4",{className:"text-xl font-semibold text-gray-800 mt-6 mb-2",children:"Percent Change Calculation"}),(0,b.jsx)("div",{className:"my-4 overflow-x-auto text-center py-2",children:"$$\\text{Percent Change} = (\\exp(\\beta_j) - 1) \\times 100\\%$$"}),(0,b.jsx)("h3",{className:"text-2xl font-semibold text-gray-800 mt-8 mb-3",children:"Visualizing Regional Coefficients"}),(0,b.jsx)(l,{code:v[11],index:11,title:"Regional Coefficients Plot",expandedCode:o,copiedIndex:j,onToggle:u,onCopy:t}),(0,b.jsx)("div",{className:"flex justify-center",children:(0,b.jsx)("div",{className:"my-6 w-full max-w-5xl",children:(0,b.jsx)("div",{className:"relative h-96 w-full",children:(0,b.jsx)(d.default,{src:"/images/refcomp.png",alt:"Box Plot of Applied Water Volume by Hydrologic Region",fill:!0,sizes:"(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 50vw",className:"object-contain rounded",priority:!0})})})}),(0,b.jsx)("p",{children:"Of the nine regions, only one, the North Coast, did not differ a statistically significant amount from the coefficient of the Central Coast."}),(0,b.jsx)("h2",{className:"text-3xl font-bold text-gray-900 mt-12 mb-4",children:"Model Fit and Diagnostics"}),(0,b.jsx)("h3",{className:"text-2xl font-semibold text-gray-800 mt-8 mb-3",children:"Predicted vs Observed Values"}),(0,b.jsx)(l,{code:v[12],index:12,title:"Model Diagnostics",expandedCode:o,copiedIndex:j,onToggle:u,onCopy:t}),(0,b.jsx)("h4",{className:"text-xl font-semibold text-gray-800 mt-6 mb-2",children:"Model Validation Metric"}),(0,b.jsx)("div",{className:"my-4 overflow-x-auto text-center py-2",children:"$$R^2 = \\text{cor}\\left(y_i, \\hat{y}_i\\right)^2$$"}),(0,b.jsx)("div",{className:"flex justify-center",children:(0,b.jsx)("div",{className:"my-6 w-full max-w-5xl",children:(0,b.jsx)("div",{className:"relative h-96 w-full",children:(0,b.jsx)(d.default,{src:"/images/actualpredicted.png",alt:"ActualvsPredicted",fill:!0,sizes:"(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 50vw",className:"object-contain rounded",priority:!0})})})}),(0,b.jsxs)("p",{children:["The model explains ",(0,b.jsx)("strong",{children:"98.6%"})," of variance in water use, indicating excellent fit."]}),(0,b.jsx)("h2",{className:"text-3xl font-bold text-gray-900 mt-12 mb-4",children:"Discussion"}),(0,b.jsx)("h3",{className:"text-2xl font-semibold text-gray-800 mt-8 mb-3",children:"Key Findings"}),(0,b.jsxs)("p",{children:["This analysis provides evidence that"," ",(0,b.jsx)("strong",{children:"hydrologic regions in California differ substantially in vineyard water use efficiency"})," ","even after accounting for climate-driven water demand, effective precipitation, and vineyard size."]}),(0,b.jsx)("h4",{className:"text-xl font-semibold text-gray-800 mt-6 mb-2",children:"Main Results"}),(0,b.jsxs)("ol",{className:"list-decimal pl-6 space-y-3 mb-6",children:[(0,b.jsxs)("li",{children:[(0,b.jsx)("strong",{children:"Regional effects are statistically significant and large"}),(0,b.jsxs)("ul",{className:"list-disc pl-6 mt-2 space-y-1",children:[(0,b.jsxs)("li",{children:["LRT test: ","$\\chi^2$"," = 39.6, p ","<"," 0.001"]}),(0,b.jsx)("li",{children:"Coefficients ranged from -1% to +92% percent different from reference level"})]})]}),(0,b.jsxs)("li",{children:[(0,b.jsx)("strong",{children:"Three regions show substantially higher coefficients"}),(0,b.jsxs)("ul",{className:"list-disc pl-6 mt-2 space-y-1",children:[(0,b.jsx)("li",{children:"Colorado River: 92% higher expected water use"}),(0,b.jsx)("li",{children:"Tulare Lake: 72% higher expected water use"}),(0,b.jsx)("li",{children:"South Lahontan: 74% higher expected water use"})]})]}),(0,b.jsxs)("li",{children:[(0,b.jsx)("strong",{children:"Model validation confirms reliability"}),(0,b.jsxs)("ul",{className:"list-disc pl-6 mt-2 space-y-1",children:[(0,b.jsx)("li",{children:"Simulation showed parameter recovery"}),(0,b.jsxs)("li",{children:["High ","$R^2$"," (0.986) — the majority of variation can be explained by the model"]})]})]})]}),(0,b.jsx)("h3",{className:"text-2xl font-semibold text-gray-800 mt-8 mb-3",children:"Future Directions"}),(0,b.jsx)("p",{children:"Further investigation should be done into finding what is causing the regional variation in water use between the regions. The results of this investigation imply that additional variables outside of water need are affecting some of these regions. Investigations should look into whether this is caused by management decisions or by additional environmental factors not considered in this study."})]})]})})]})}a.s(["default",()=>n])}];

//# sourceMappingURL=app_blog_vineyards_page_tsx_5f68e289._.js.map