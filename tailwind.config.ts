import defaultTheme from "tailwindcss/defaultTheme"
import { type Config } from "tailwindcss"

export default {
  darkMode: ["class"],
  content: ["./app/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        display: ["Plus Jakarta Sans", ...defaultTheme.fontFamily.sans],
        sans: ["Inter Variable", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          50: "#F4F7FE",
          100: "#E9EFFD",
          200: "#D3DFFC",
          300: "#BDD0FA",
          400: "#A7C0F9",
          500: "#91B1F7",
          600: "#7BA1F6",
          700: "#6592F4",
          800: "#4F82F3",
          900: "#3973F1",
          950: "#2363F0",
          DEFAULT: "#3973F1",
          foreground: "#ffffff",
        },
        secondary: {
          50: "#FDF4FF",
          100: "#FAE8FF",
          200: "#F5D0FE",
          300: "#F0ABFC",
          400: "#E879F9",
          500: "#D946EF",
          600: "#C026D3",
          700: "#A21CAF",
          800: "#86198F",
          900: "#701A75",
          DEFAULT: "#D946EF",
          foreground: "#ffffff",
        },
        accent: {
          50: "#ECFDF5",
          100: "#D1FAE5",
          200: "#A7F3D0",
          300: "#6EE7B7",
          400: "#34D399",
          500: "#10B981",
          600: "#059669",
          700: "#047857",
          800: "#065F46",
          900: "#064E3B",
          DEFAULT: "#10B981",
          foreground: "#ffffff",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      backgroundImage: {
        "gradient-primary":
          "linear-gradient(135deg, #3973F1 0%, #2363F0 50%, #1E4FBE 100%)",
        "gradient-bitcoin":
          "linear-gradient(135deg, #F7931A 0%, #FF9B05 50%, #FFB627 100%)",
        "gradient-card":
          "linear-gradient(135deg, rgba(57, 115, 241, 0.1) 0%, rgba(35, 99, 240, 0.1) 50%, rgba(30, 79, 190, 0.1) 100%)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        "glow-primary": "0 0 20px rgba(57, 115, 241, 0.5)",
        "glow-secondary": "0 0 20px rgba(217, 70, 239, 0.5)",
        "glow-accent": "0 0 20px rgba(16, 185, 129, 0.5)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config
