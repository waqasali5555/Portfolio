import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#020A1F",
        ink2: "#061A3A",
        cardx: "rgba(8, 20, 48, 0.82)",
        cyanx: "#22D3EE",
        violetx: "#8B5CF6",
        mintx: "#34D399",
        amberx: "#F59E0B",
        rosex: "#F43F5E",
        textx: "#FFFFFF",
        softx: "#CBD5E1",
        mutedx: "#94A3B8"
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"]
      },
      boxShadow: {
        glow: "0 0 46px rgba(34, 211, 238, 0.24)",
        violet: "0 0 54px rgba(139, 92, 246, 0.26)",
        emerald: "0 0 42px rgba(52, 211, 153, 0.2)"
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" }
        },
        pulseLine: {
          "0%, 100%": { opacity: "0.2", transform: "scaleX(0.75)" },
          "50%": { opacity: "1", transform: "scaleX(1)" }
        },
        auroraShift: {
          "0%, 100%": { transform: "translate3d(-4%, -2%, 0) scale(1)", opacity: "0.72" },
          "50%": { transform: "translate3d(4%, 3%, 0) scale(1.06)", opacity: "0.95" }
        },
        dataFlow: {
          "0%": { transform: "translateX(-120%)", opacity: "0" },
          "14%": { opacity: "1" },
          "86%": { opacity: "1" },
          "100%": { transform: "translateX(120%)", opacity: "0" }
        },
        floatSoft: {
          "0%, 100%": { transform: "translate3d(0, 0, 0)" },
          "50%": { transform: "translate3d(0, -12px, 0)" }
        }
      },
      animation: {
        marquee: "marquee 28s linear infinite",
        pulseLine: "pulseLine 2.6s ease-in-out infinite",
        auroraShift: "auroraShift 18s ease-in-out infinite",
        dataFlow: "dataFlow 4.8s linear infinite",
        floatSoft: "floatSoft 7s ease-in-out infinite"
      }
    }
  },
  plugins: []
};

export default config;
