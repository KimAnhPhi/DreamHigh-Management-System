/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "primary": "rgb(var(--color-gold-rgb) / <alpha-value>)",
        "primary-hover": "var(--color-primary-hover)",
        "primary-active": "var(--color-primary-active)",
        "midnight": "rgb(var(--color-midnight-rgb) / <alpha-value>)",
        "charcoal": "var(--color-charcoal)",
        "dark-2": "var(--color-dark-2)",
        "bg": "var(--color-bg)",
        "surface": "var(--color-surface)",
        "parchment": "var(--color-surface)", // Alias for backward compatibility
        "ivory": "var(--color-bg)",         // Alias for backward compatibility
        "success": "var(--color-success)",
        "success-bg": "var(--color-success-bg)",
        "warning": "var(--color-warning)",
        "warning-bg": "var(--color-warning-bg)",
        "error": "var(--color-error)",
        "error-bg": "var(--color-error-bg)",
        "info": "var(--color-info)",
        "info-bg": "var(--color-info-bg)",
        "gold": "rgb(var(--color-gold-rgb) / <alpha-value>)",
      },
      fontFamily: {
        "headline": ["var(--font-family-display)", "serif"],
        "body": ["var(--font-family-base)", "sans-serif"],
        "label": ["var(--font-family-base)", "sans-serif"],
        "dashboard-greeting": ["Inter", "var(--font-family-base)", "sans-serif"],
      },
      borderRadius: {
        "sm": "var(--radius-sm)",
        "DEFAULT": "var(--radius-md)",
        "md": "var(--radius-md)",
        "lg": "var(--radius-lg)",
        "xl": "var(--radius-xl)",
        "full": "var(--radius-full)"
      },
      spacing: {
        "1": "var(--space-1)",
        "2": "var(--space-2)",
        "3": "var(--space-3)",
        "4": "var(--space-4)",
        "5": "var(--space-5)",
        "6": "var(--space-6)",
        "8": "var(--space-8)",
        "10": "var(--space-10)",
        "12": "var(--space-12)",
        "16": "var(--space-16)",
      },
      boxShadow: {
        "xs": "var(--shadow-xs)",
        "sm": "var(--shadow-sm)",
        "md": "var(--shadow-md)",
        "lg": "var(--shadow-lg)",
      },
      backgroundImage: {
        "financial-gradient": "var(--color-financial-card)",
      }
    },
  },
  plugins: [],
}
