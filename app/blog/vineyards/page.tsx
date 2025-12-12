"use client";

import Link from "next/link";
import Image from "next/image"; // ✅ FIXED: Added missing Image import
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

export default function WaterUsePost() {
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
    // 0: Import Packages
    `library(tidyverse)
library(here)
library(janitor)
library(readxl)
library(viridis)
library(car)
library(patchwork)
library(broom)
library(stringr)`,

    // 1: Read in Data
    `# ============================================================================
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
filter(Crop_Type != "Total", Regional_AW_Vol >= 0)`,
    // ✅ FIXED: Removed quotes around Regional_AW_Vol

    // 2: Data Preparation
    `# Select vineyard data
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
head(vineyard_data, 10)`,

    // 3: Regional Summary
    `# Get Summary AW Data For Each Region
regional_summary <- vineyard_data %>%
  group_by(HR) %>%
  summarise(
    n = n(),
    mean_AW = mean(Regional_AW_Vol),
    median_AW = median(Regional_AW_Vol),
    sd_AW = sd(Regional_AW_Vol),
    se_AW = sd_AW / sqrt(n)) %>%
  arrange(mean_AW)

regional_summary`,

    // 4: Box Plot
    `vineyard_data %>%
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
  )`,

    // 5: Gamma Model
    `set.seed(123)

gamma_model <- glm(Regional_AW_Vol ~
                        Regional_ETc_Vol + 
                        Regional_Ep_Vol + 
                        log(Regional_ICA) + 
                        HR, 
                     family = Gamma(link = "log"),
                     data = vineyard_data)

summary(gamma_model)`,

    // 6: Simulation Function
    `# Extract true parameters
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
}`,

    // 7: Run Simulations
    `# Number of simulations
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
coef_matrix <- do.call(rbind, lapply(results, function(x) x$coefs))`,

    // 8: Parameter Summary
    `param_summary <- data.frame(
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

print(param_summary)`,

    // 9: Likelihood Ratio Test
    `model_null <- glm(
  Regional_AW_Vol ~ Regional_ETc_Vol + Regional_Ep_Vol + log(Regional_ICA),
  family = Gamma(link = "log"),
  data = vineyard_data
)

lrt <- anova(model_null, gamma_model, test = "LRT")
print(lrt)

round(lrt$Deviance[2], 2)`,

    // 10: Regional Effects
    `# Extract regional coefficients
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
  select(Region, pct_change, ci_low, ci_high, signif)`,

    // 11: Regional Coefficients Plot
    `ggplot(regional_effects, aes(x = reorder(Region, pct_change), 
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
  )`,

    // 12: Model Diagnostics
    `# Get predictions
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
           label = paste0("R² = ", round(r_squared, 3)),
           hjust = 0, size = 5, fontface = "bold") +
  labs(
    title = "Model Performance: Predicted vs Observed Water Use",
    x = "Observed Applied Water (Acre-Feet, Log Scale)",
    y = "Predicted Applied Water (Acre-Feet, Log Scale)",
    color = "Hydrologic\\nRegion"
  ) +
  theme(legend.position = "right")`,
  ];

  // Regional summary data for table
  const regionalSummaryData = {
    headers: ["Hydrologic Region", "n", "Mean AW", "Median AW", "SD", "SE"],
    rows: [
      ["South Lahontan", 23, "128.78", "39.43", "295.28", "61.57"],
      ["South Coast", 46, "1,287.72", "296.49", "2,120.16", "312.60"],
      ["Sacramento River", 206, "3,631.83", "134.91", "8,249.17", "574.75"],
      ["North Coast", 121, "5,936.57", "443.85", "10,137.34", "921.58"],
      ["Colorado River", 25, "6,748.80", "386.15", "13,446.13", "2,689.23"],
      ["Central Coast", 163, "9,917.94", "1,476.95", "22,978.53", "1,799.82"],
      ["San Francisco Bay", 80, "10,135.80", "138.55", "25,803.39", "2,884.91"],
      [
        "San Joaquin River",
        182,
        "17,764.87",
        "3,262.99",
        "41,878.19",
        "3,104.22",
      ],
      ["Tulare Lake", 166, "38,072.24", "5,663.51", "58,246.36", "4,520.79"],
    ],
  };

  // Gamma model coefficients table
  const gammaCoefData = {
    headers: ["Parameter", "Estimate", "Std. Error", "t value", "Pr(>|t|)"],
    rows: [
      ["(Intercept)", "7.473e-01", "1.753e-02", "42.624", "< 2e-16 ***"],
      ["Regional_ETc_Vol", "9.758e-07", "3.035e-07", "3.215", "0.00135 **"],
      ["Regional_Ep_Vol", "-7.294e-06", "2.672e-06", "-2.730", "0.00645 **"],
      ["log(Regional_ICA)", "1.010e+00", "2.213e-03", "456.617", "< 2e-16 ***"],
      ["HRColorado River", "6.531e-01", "3.313e-02", "19.712", "< 2e-16 ***"],
      ["HRNorth Coast", "-1.257e-02", "1.857e-02", "-0.677", "0.49850"],
      ["HRSacramento River", "2.045e-01", "1.645e-02", "12.432", "< 2e-16 ***"],
      ["HRSan Francisco Bay", "5.207e-02", "2.117e-02", "2.460", "0.01406 *"],
      [
        "HRSan Joaquin River",
        "2.495e-01",
        "1.660e-02",
        "15.029",
        "< 2e-16 ***",
      ],
      ["HRSouth Coast", "3.332e-01", "2.572e-02", "12.956", "< 2e-16 ***"],
      ["HRSouth Lahontan", "5.557e-01", "3.475e-02", "15.993", "< 2e-16 ***"],
      ["HRTulare Lake", "5.399e-01", "1.755e-02", "30.769", "< 2e-16 ***"],
    ],
  };

  // LRT Results Table
  const lrtData = {
    headers: ["Model", "Resid. Df", "Resid. Dev", "Df", "Deviance", "Pr(>Chi)"],
    rows: [
      ["Null (without HR)", "1008", "63.545", "-", "-", "-"],
      ["Full (with HR)", "1000", "23.979", "8", "39.566", "< 2.2e-16 ***"],
    ],
  };

  // Parameter Recovery Table
  const paramRecoveryData = {
    headers: ["Parameter", "True Value", "Recovered", "Difference", "% Error"],
    rows: [
      ["(Intercept)", "7.473e-01", "7.427e-01", "4.60e-03", "0.62"],
      ["Regional_ETc_Vol", "9.758e-07", "8.633e-07", "1.12e-07", "11.52"],
      ["Regional_Ep_Vol", "-7.294e-06", "-8.424e-06", "1.13e-06", "15.49"],
      ["log(Regional_ICA)", "1.010e+00", "1.010e+00", "3.76e-04", "0.04"],
      ["HRColorado River", "6.531e-01", "6.622e-01", "-9.14e-03", "1.40"],
      ["HRNorth Coast", "-1.257e-02", "-5.219e-03", "-7.35e-03", "58.49"],
      ["HRSacramento River", "2.045e-01", "1.988e-01", "5.74e-03", "2.80"],
      ["HRSan Francisco Bay", "5.207e-02", "3.966e-02", "1.24e-02", "23.84"],
      ["HRSan Joaquin River", "2.495e-01", "2.610e-01", "-1.15e-02", "4.62"],
      ["HRSouth Coast", "3.332e-01", "3.452e-01", "-1.20e-02", "3.59"],
      ["HRSouth Lahontan", "5.557e-01", "5.573e-01", "-1.54e-03", "0.28"],
      ["HRTulare Lake", "5.399e-01", "5.557e-01", "-1.58e-02", "2.93"],
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

      {/* Hero Image Background */}
      <div className="relative w-full h-96 md:h-[28rem]">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 via-teal-500 via-cyan-500 via-sky-500 to-blue-600" />
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 flex items-center justify-center px-6">
          <div className="text-white text-center max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
              Regional Water Use Efficiency in California Vineyards
            </h1>
            <p className="text-sm md:text-base mb-2">
              Author: William Mullins ・ Date: December 5, 2025
            </p>
            <a
              href="https://github.com/willrmull/Vineyard_Water_Usage"
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
                Water Resources
              </span>
              <span className="px-3 py-1 bg-cyan-100 text-cyan-700 rounded-full text-sm font-medium">
                Agriculture
              </span>
              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                Statistical Modeling
              </span>
            </div>
            <div className="flex items-center text-gray-600 text-sm border-b border-gray-200 pb-8">
              <span className="flex items-center mr-6">
                <Calendar className="w-4 h-4 mr-2" />
                December 5, 2025
              </span>
              <span className="flex items-center">
                <Tag className="w-4 h-4 mr-2" />R · GLM · Environmental Analysis
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

            <h3 className="text-2xl font-semibold text-gray-800 mt-8 mb-3">
              The California Water Challenge
            </h3>

            <p className="text-lg font-semibold text-teal-700 mb-4">
              Does hydrologic region affect vineyard water use in California,
              after controlling for evapotranspiration, precipitation, and
              irrigated crop area?
            </p>

            <p>
              California&apos;s agriculture is the state&apos;s dominant water
              consumer, accounting for approximately 80% of its developed water
              supply. The efficiency of this water use is paramount for economic
              resilience and environmental stewardship, particularly as climate
              change exacerbates drought frequency and intensifies competition
              for limited resources.
            </p>

            <p>
              Vineyards represent a significant and geographically diverse
              component of the state&apos;s agricultural portfolio, spanning
              disparate climate zones from the cool coastal valleys to the hot
              interior regions. While climatic factors are known drivers of
              water demand, regional differences inherent to California&apos;s
              10 major hydrologic regions include additional variables such as
              such as water management practices, regulatory structures, soil
              characteristics, and crop varieties—may exert an independent and
              measurable influence on observed water use efficiency.
            </p>

            <p>
              The aim of this analysis is to quantify the magnitude and
              direction of the independent effect of hydrologic region on
              vineyard water use efficiency across California.
            </p>

            {/* Two-column layout for intro */}
            <div className="grid md:grid-cols-2 gap-8 my-8">
              <div>
                <h4 className="text-xl font-semibold text-gray-800 mb-3">
                  California Hydrologic Regions
                </h4>
                <p>
                  The state is divided into 10 hydrologic regions, each with
                  distinct climate characteristics that influence agricultural
                  water demand.
                </p>
              </div>
              <div className="flex justify-center">
                <div className="w-full max-w-sm">
                  <div className="relative h-96 w-full">
                    <Image
                      src="/images/HR_ZONES.png"
                      alt="California Hydrologic Regions map"
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-contain rounded"
                      priority
                    />
                  </div>
                </div>
              </div>
            </div>
            <h3 className="text-2xl font-semibold text-gray-800 mt-8 mb-3">
              About the Data
            </h3>

            <p>
              Data was extracted from the California Department of Water
              Resources{" "}
              <strong>Statewide Agricultural Water Use Data (2016-2020)</strong>{" "}
              Excel Application Tool. This dataset provides annual estimates for
              water use variables across 20 crop types and multiple geographic
              scales.
            </p>

            <p>
              <strong>Key variables used in this analysis:</strong>
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-6">
              <li>
                <strong>Regional Applied Water Volume (AW)</strong>: Total
                irrigation water applied to vineyards in acre-feet
              </li>
              <li>
                <strong>Regional Irrigated Crop Area (ICA)</strong>: Total
                vineyard acreage receiving irrigation
              </li>
              <li>
                <strong>Regional Crop Evapotranspiration ({"$ET_c$"})</strong>:
                Total water lost to atmosphere from soil and plants
                (acre-feet)—represents crop water demand
              </li>
              <li>
                <strong>Regional Effective Precipitation ({"$E_p$"})</strong>:
                Rainfall that effectively contributes to crop water needs
                (acre-feet)
              </li>
              <li>
                <strong>Hydrologic Region (HR)</strong>: California&apos;s 10
                major hydrologic regions, defined by watershed boundaries and
                climate characteristics
              </li>
            </ul>

            <p>
              Data availability:{" "}
              <a
                href="https://data.ca.gov/dataset/statewide-agricultural-water-use-data-2016-2020"
                className="text-teal-600 hover:text-teal-800 underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                California DWR Water Use Data
              </a>
              .
            </p>

            <h3 className="text-2xl font-semibold text-gray-800 mt-8 mb-3">
              Directed Acyclic Graph (DAG)
            </h3>

            <p>
              The following DAG illustrates the conceptual model of how the
              variables relate:
            </p>

            <ol className="list-decimal pl-6 space-y-3 mb-6">
              <li>
                <strong>
                  Hydrologic Region (HR) → Climate Driven Variables
                </strong>
                : HR defines the local climate conditions. Different regions
                have different temperatures, humidity, and weather patterns.
                This drives both {"$ET_c$"} (water lost) and {"$E_p$"} (water
                gained naturally).
              </li>
              <li>
                <strong>Climate Driven Variables → Water Use</strong>: After
                accounting for natural water supply ({"$E_p$"}), the deficit
                between demand ({"$ET_c$"}) and supply must be met through
                irrigation.
              </li>
              <li>
                <strong>Vineyard Size (ICA) → Total Volume</strong>: Larger
                vineyards require proportionally more total water (a scaling
                relationship).
              </li>
            </ol>

            <p>
              After controlling for climate and size, regional coefficients
              isolate potential management efficiency differences. The reference
              region (Central Coast) represents the efficiency baseline.
            </p>

            <div className="flex justify-center">
              <div className="my-6 w-full max-w-5xl">
                <div className="relative h-96 w-full">
                  <Image
                    src="/images/D.png"
                    alt="Directed Acyclic Graph (DAG)"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-contain rounded"
                  />
                </div>
              </div>
            </div>

            <h3 className="text-2xl font-semibold text-gray-800 mt-8 mb-3">
              Import Packages
            </h3>

            <p>The analysis requires the following packages:</p>

            <CodeBlock
              code={codeBlocks[0]}
              index={0}
              title="Import Packages"
              expandedCode={expandedCode}
              copiedIndex={copiedIndex}
              onToggle={toggleCode}
              onCopy={copyToClipboard}
            />

            <h3 className="text-2xl font-semibold text-gray-800 mt-8 mb-3">
              Data Processing Pipeline
            </h3>

            <p>
              The data is stored in an Excel application, which means that data
              for each of the variables is stored on its own individual sheets.
              The following code is used to read in data from each of the sheets
              and convert it into a standard data frame.
            </p>

            <CodeBlock
              code={codeBlocks[1]}
              index={1}
              title="Read in Data"
              expandedCode={expandedCode}
              copiedIndex={copiedIndex}
              onToggle={toggleCode}
              onCopy={copyToClipboard}
            />

            <h3 className="text-2xl font-semibold text-gray-800 mt-8 mb-3">
              Data Preparation
            </h3>

            <p>
              Now that the data has been read in, we can select data collected
              from vineyards which applied water to their crops.
            </p>

            <CodeBlock
              code={codeBlocks[2]}
              index={2}
              title="Data Preparation"
              expandedCode={expandedCode}
              copiedIndex={copiedIndex}
              onToggle={toggleCode}
              onCopy={copyToClipboard}
            />

            {/* ================= DATA EXPLORATION ================= */}
            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">
              Data Exploration
            </h2>

            <h3 className="text-2xl font-semibold text-gray-800 mt-8 mb-3">
              Regional Water Use Summary
            </h3>

            <CodeBlock
              code={codeBlocks[3]}
              index={3}
              title="Regional Summary Statistics"
              expandedCode={expandedCode}
              copiedIndex={copiedIndex}
              onToggle={toggleCode}
              onCopy={copyToClipboard}
            />

            <DataTable
              headers={regionalSummaryData.headers}
              rows={regionalSummaryData.rows}
              caption="Applied Water (AW) summary statistics by Hydrologic Region"
            />

            <p>
              <strong>Key observations:</strong>
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-6">
              <li>
                <strong>Large variation between regions</strong>: Mean water use
                ranges from 129 acre-feet (South Lahontan) to 38,072 acre-feet
                (Tulare Lake)—a nearly 300-fold difference
              </li>
              <li>
                <strong>High within-region variability</strong>: Standard
                deviations exceed means in all regions, indicating right-skewed
                distributions
              </li>
              <li>
                <strong>Median {"<"} Mean everywhere</strong>: Consistent with
                right skew caused by a few very large vineyard operations
              </li>
            </ul>

            <h3 className="text-2xl font-semibold text-gray-800 mt-8 mb-3">
              Distribution of Water Use
            </h3>

            <p>
              This log-scale boxplot reveals that while most regions have modest
              median use (100-1,000 acre-feet), there are many high water volume
              outliers in regions like Central Coast, San Joaquin River, and
              Tulare Lake.
            </p>

            <CodeBlock
              code={codeBlocks[4]}
              index={4}
              title="Box Plot Code"
              expandedCode={expandedCode}
              copiedIndex={copiedIndex}
              onToggle={toggleCode}
              onCopy={copyToClipboard}
            />

            <div className="flex justify-center">
              <div className="my-6 w-full max-w-5xl">
                <div className="relative h-96 w-full">
                  <Image
                    src="/images/boxplot_aw.png"
                    alt="Box Plot of Applied Water Volume by Hydrologic Region"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 50vw"
                    className="object-contain rounded"
                  />
                </div>
              </div>
            </div>
            {/* ================= STATISTICAL MODEL ================= */}
            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">
              Statistical Model
            </h2>

            <h3 className="text-2xl font-semibold text-gray-800 mt-8 mb-3">
              Model Specification
            </h3>

            <h4 className="text-xl font-semibold text-gray-800 mt-6 mb-2">
              Why Gamma?
            </h4>

            <p>The Gamma distribution is appropriate here because:</p>
            <ol className="list-decimal pl-6 space-y-2 mb-6">
              <li>
                <strong>Positive support</strong>: Water use cannot be zero or
                negative in irrigated areas
              </li>
              <li>
                <strong>Right-skewed</strong>: The distribution has a long right
                tail (high outliers)
              </li>
              <li>
                <strong>Mean-variance relationship</strong>: Variance increases
                with the mean (heteroscedasticity)
              </li>
            </ol>

            <h4 className="text-xl font-semibold text-gray-800 mt-6 mb-2">
              Model Statistical Notation
            </h4>

            <div className="my-4 overflow-x-auto text-center py-2">
              {
                "$$Y_i \\sim \\text{Gamma}(\\text{shape} = k, \\text{scale} = \\theta_i)$$"
              }
            </div>

            <p>
              <strong>Where:</strong>
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-6">
              <li>
                {"$Y_i$"} = Regional Applied Water Volume for observation{" "}
                {"$i$"}
              </li>
              <li>
                {"$k = 1/\\phi$"} is the shape parameter (constant across
                observations)
              </li>
              <li>{"$\\phi$"} is the dispersion parameter</li>
              <li>
                {"$\\theta_i$"} is the scale parameter (varies by observation)
              </li>
            </ul>

            <p>
              <strong>Gamma Regression Equation:</strong>
            </p>

            <div className="my-4 overflow-x-auto text-center py-2">
              {
                "$$\\log(\\mu) = \\beta_0 + \\beta_1 ET_c + \\beta_2 E_p + \\beta_3 \\log(ICA) + \\beta_4 HR_4 + \\beta_5 HR_5 + \\cdots + \\beta_k HR_k$$"
              }
            </div>

            <p>
              <strong>Coefficient Interpretation:</strong>
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-6">
              <li>
                {"$\\beta_1, \\beta_2$"}: Multiplicative change in water use per
                unit increase in {"$ET_c$"} or {"$E_p$"}
              </li>
              <li>
                {"$\\beta_3$"}: Change in water use per % change in vineyard
                area
              </li>
              <li>
                {"$\\beta_4 - \\beta_{11}$"}: Regional multiplier relative to
                Central Coast (reference region)
              </li>
            </ul>

            <h3 className="text-2xl font-semibold text-gray-800 mt-8 mb-3">
              Model Fitting
            </h3>

            <CodeBlock
              code={codeBlocks[5]}
              index={5}
              title="Gamma Model"
              expandedCode={expandedCode}
              copiedIndex={copiedIndex}
              onToggle={toggleCode}
              onCopy={copyToClipboard}
            />

            <DataTable
              headers={gammaCoefData.headers}
              rows={gammaCoefData.rows}
              caption="Gamma GLM Coefficient Estimates (Dispersion parameter: 0.0234)"
            />

            <p className="text-sm text-gray-600 mt-2">
              Signif. codes: 0 &apos;***&apos; 0.001 &apos;**&apos; 0.01
              &apos;*&apos; 0.05 &apos;.&apos; 0.1 &apos; &apos; 1
            </p>

            {/* ================= MODEL VALIDATION ================= */}
            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">
              Model Validation Through Simulation
            </h2>

            <p>
              To ensure the model is correctly specified and is able to reliably
              estimate parameters, simulations are used. This process involves:
            </p>

            <ol className="list-decimal pl-6 space-y-2 mb-6">
              <li>Using coefficients from the model as the "true" values</li>
              <li>Generating 500 synthetic datasets using those parameters</li>
              <li>Refitting the model for each dataset</li>
              <li>Checking if that model recovers the true parameters</li>
            </ol>

            <h3 className="text-2xl font-semibold text-gray-800 mt-8 mb-3">
              Simulation Procedure
            </h3>

            <CodeBlock
              code={codeBlocks[6]}
              index={6}
              title="Simulation Function"
              expandedCode={expandedCode}
              copiedIndex={copiedIndex}
              onToggle={toggleCode}
              onCopy={copyToClipboard}
            />

            <CodeBlock
              code={codeBlocks[7]}
              index={7}
              title="Run Simulations"
              expandedCode={expandedCode}
              copiedIndex={copiedIndex}
              onToggle={toggleCode}
              onCopy={copyToClipboard}
            />

            <h3 className="text-2xl font-semibold text-gray-800 mt-8 mb-3">
              Simulation Results
            </h3>

            <CodeBlock
              code={codeBlocks[8]}
              index={8}
              title="Parameter Summary"
              expandedCode={expandedCode}
              copiedIndex={copiedIndex}
              onToggle={toggleCode}
              onCopy={copyToClipboard}
            />

            <DataTable
              headers={paramRecoveryData.headers}
              rows={paramRecoveryData.rows}
              caption="Parameter Recovery Summary (Mean absolute % error: 10.47, Max: 58.49)"
            />

            <p>
              <strong>Interpretation</strong>: For all of the parameters the
              model was able to recover the true value of the mean within its
              95% confidence interval. This suggests that the model is
              successfully able to recover the parameter values.
            </p>

            {/* ================= STATISTICAL INFERENCE ================= */}
            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">
              Statistical Inference
            </h2>

            <h3 className="text-2xl font-semibold text-gray-800 mt-8 mb-3">
              Hypothesis Testing
            </h3>

            <h4 className="text-xl font-semibold text-gray-800 mt-6 mb-2">
              Overall Test: Do Regions Differ?
            </h4>

            <p>
              <strong>Null Hypothesis ({"$H_0$"}):</strong>
            </p>
            <div className="my-4 overflow-x-auto text-center py-2">
              {"$$\\beta_4 = \\beta_5 = \\cdots = \\beta_{11} = 0$$"}
            </div>
            <p>
              All HR coefficients are zero, meaning there are NO differences in
              water use between hydrologic regions after controlling for climate
              factors and vineyard size.
            </p>

            <p>
              <strong>Alternative Hypothesis ({"$H_1$"}):</strong>
            </p>
            <div className="my-4 overflow-x-auto text-center py-2">
              {"$$\\text{At least one } \\beta_i \\neq 0$$"}
            </div>
            <p>
              At least one region differs in water use, indicating that regional
              factors beyond climate (e.g., efficiency, technology, regulations)
              affect water use.
            </p>

            <h4 className="text-xl font-semibold text-gray-800 mt-6 mb-2">
              Likelihood Ratio Test
            </h4>

            <p>
              The {"$H_0$"} is tested by comparing the full gamma model (with
              HR) to a reduced gamma model (without HR):
            </p>

            <CodeBlock
              code={codeBlocks[9]}
              index={9}
              title="Likelihood Ratio Test"
              expandedCode={expandedCode}
              copiedIndex={copiedIndex}
              onToggle={toggleCode}
              onCopy={copyToClipboard}
            />

            <DataTable
              headers={lrtData.headers}
              rows={lrtData.rows}
              caption="Analysis of Deviance Table (Likelihood Ratio Test)"
            />

            <p>
              <strong>Results:</strong>
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-6">
              <li>
                <strong>Test Statistic</strong>: {"$\\chi^2$"} = 39.57 (df = 8)
              </li>
              <li>
                <strong>P-value</strong>: {"<"} 2.2e-16
              </li>
              <li>
                <strong>Conclusion</strong>: We{" "}
                <strong>reject the null hypothesis</strong>. There is evidence
                that the hydrologic regions affect the water applied by
                vineyards even after controlling for climate demand,
                precipitation, and vineyard size.
              </li>
            </ul>

            <h3 className="text-2xl font-semibold text-gray-800 mt-8 mb-3">
              Individual Region Comparisons
            </h3>

            <CodeBlock
              code={codeBlocks[10]}
              index={10}
              title="Regional Effects"
              expandedCode={expandedCode}
              copiedIndex={copiedIndex}
              onToggle={toggleCode}
              onCopy={copyToClipboard}
            />

            <h4 className="text-xl font-semibold text-gray-800 mt-6 mb-2">
              Percent Change Calculation
            </h4>

            <div className="my-4 overflow-x-auto text-center py-2">
              {
                "$$\\text{Percent Change} = (\\exp(\\beta_j) - 1) \\times 100\\%$$"
              }
            </div>

            <h3 className="text-2xl font-semibold text-gray-800 mt-8 mb-3">
              Visualizing Regional Coefficients
            </h3>

            <CodeBlock
              code={codeBlocks[11]}
              index={11}
              title="Regional Coefficients Plot"
              expandedCode={expandedCode}
              copiedIndex={copiedIndex}
              onToggle={toggleCode}
              onCopy={copyToClipboard}
            />
            <div className="flex justify-center">
              <div className="my-6 w-full max-w-5xl">
                <div className="relative h-96 w-full">
                  <Image
                    src="/images/refcomp.png"
                    alt="Box Plot of Applied Water Volume by Hydrologic Region"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 50vw"
                    className="object-contain rounded"
                  />
                </div>
              </div>
            </div>

            <p>
              Of the nine regions, only one, the North Coast, did not differ a
              statistically significant amount from the coefficient of the
              Central Coast.
            </p>

            {/* ================= MODEL FIT AND DIAGNOSTICS ================= */}
            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">
              Model Fit and Diagnostics
            </h2>

            <h3 className="text-2xl font-semibold text-gray-800 mt-8 mb-3">
              Predicted vs Observed Values
            </h3>

            <CodeBlock
              code={codeBlocks[12]}
              index={12}
              title="Model Diagnostics"
              expandedCode={expandedCode}
              copiedIndex={copiedIndex}
              onToggle={toggleCode}
              onCopy={copyToClipboard}
            />

            <h4 className="text-xl font-semibold text-gray-800 mt-6 mb-2">
              Model Validation Metric
            </h4>

            <div className="my-4 overflow-x-auto text-center py-2">
              {"$$R^2 = \\text{cor}\\left(y_i, \\hat{y}_i\\right)^2$$"}
            </div>

            <div className="flex justify-center">
              <div className="my-6 w-full max-w-5xl">
                <div className="relative h-96 w-full">
                  <Image
                    src="/images/actualpredicted.png"
                    alt="Box Plot of Applied Water Volume by Hydrologic Region"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 50vw"
                    className="object-contain rounded"
                  />
                </div>
              </div>
            </div>

            <p>
              The model explains <strong>98.6%</strong> of variance in water
              use, indicating excellent fit.
            </p>

            {/* ================= DISCUSSION ================= */}
            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">
              Discussion
            </h2>

            <h3 className="text-2xl font-semibold text-gray-800 mt-8 mb-3">
              Key Findings
            </h3>

            <p>
              This analysis provides evidence that{" "}
              <strong>
                hydrologic regions in California differ substantially in
                vineyard water use efficiency
              </strong>{" "}
              even after accounting for climate-driven water demand, effective
              precipitation, and vineyard size.
            </p>

            <h4 className="text-xl font-semibold text-gray-800 mt-6 mb-2">
              Main Results
            </h4>

            <ol className="list-decimal pl-6 space-y-3 mb-6">
              <li>
                <strong>
                  Regional effects are statistically significant and large
                </strong>
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>
                    LRT test: {"$\\chi^2$"} = 39.6, p {"<"} 0.001
                  </li>
                  <li>
                    Coefficients ranged from -1% to +92% percent different from
                    reference level
                  </li>
                </ul>
              </li>
              <li>
                <strong>
                  Three regions show substantially higher coefficients
                </strong>
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>Colorado River: 92% higher expected water use</li>
                  <li>Tulare Lake: 72% higher expected water use</li>
                  <li>South Lahontan: 74% higher expected water use</li>
                </ul>
              </li>
              <li>
                <strong>Model validation confirms reliability</strong>
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>Simulation showed parameter recovery</li>
                  <li>
                    High {"$R^2$"} (0.986) — the majority of variation can be
                    explained by the model
                  </li>
                </ul>
              </li>
            </ol>

            <h3 className="text-2xl font-semibold text-gray-800 mt-8 mb-3">
              Future Directions
            </h3>

            <p>
              Further investigation should be done into finding what is causing
              the regional variation in water use between the regions. The
              results of this investigation imply that additional variables
              outside of water need are affecting some of these regions.
              Investigations should look into whether this is caused by
              management decisions or by additional environmental factors not
              considered in this study.
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}
