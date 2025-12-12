"use client";
import { useEffect } from "react";

interface MathRendererProps {
  children: React.ReactNode;
}

const MathRenderer = ({ children }: MathRendererProps) => {
  useEffect(() => {
    const loadKaTeX = async () => {
      try {
        // Load KaTeX CSS
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href =
          "https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css";
        link.integrity =
          "sha384-n8MVd4RsNIU0tAv4ct0nTaAbDJwPJzDEaqSD1odI+WdtXRGWt2kTvGFasHpSy3SV";
        link.crossOrigin = "anonymous";
        document.head.appendChild(link);

        // Load KaTeX and auto-render with dynamic imports
        await Promise.all([
          import("katex"),
          import("katex/dist/contrib/auto-render"),
        ]);

        // Render math after components are mounted
        setTimeout(() => {
          if (window.renderMathInElement) {
            window.renderMathInElement(document.body, {
              delimiters: [
                { left: "$$", right: "$$", display: true },
                { left: "$", right: "$", display: false },
              ],
              throwOnError: false,
            });
          }
        }, 100);
      } catch (error) {
        console.error("Failed to load KaTeX:", error);
      }
    };

    loadKaTeX();
  }, []);

  return <>{children}</>;
};

export default MathRenderer;
