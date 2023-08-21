module.exports = {
  mode: 'jit',
  purge: {
    enabled: true,
    content: [
      './pages/**/*.{js,ts,jsx,tsx}',
      './src/**/*.{js,ts,jsx,tsx}'
    ]
  },
  darkMode: false,
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      white: '#ffffff',
      primary: {
        1: "#005D81",
        2: "#CF734E",
        3: "#C4D5DD",
        4: "#E7DAB7",
      },
      accent: {
        1: "#272D46",
        2: "#2E6B89",
        3: "#EB9C38",
      },
      alter: {
        2: "#FFD6C6",
      },
      gray: {
        900: "#111827",
        800: "#1F2937",
        700: "#374151",
        500: "#6B7280",
        400: "#9CA3AF",
        300: "#D1D5DB",
        200: "#E5E7EB",
        100: "#F3F4F6",
        50: "#E5E5E5",
      },
      indigo: {
        800: "#3730A3",
        600: "#4F46E5",
        100: "#E0E7FF"
      },
      red: {
        800: "#991B1B",
        100: "#FEE2E2",
      },
      yellow: {
        800: "#92400E",
        100: "#FEF3C7",
      },
      green: {
        800: "#065F46",
        100: "#D1FAE5",
      },
      blue: {
        800: "#005D81",
        100: "#DBEAFE",
      },
      purple: {
        800: "#5B21B6",
        100: "#EDE9FE",
      },
      pink: {
        800: "#9D174D",
        100: "#FCE7F3",
      },
    },
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem'
      }
    },
    fontFamily: {
      'blinker': ['Blinker', 'sans-serif'],
      'inter': ['Inter', 'sans-serif'],
    },
    fontSize: {
      xs: ['12px', '20px'],
      sm: ['14px', '22px'],
      base: ['16px', '26px'],
      lead: ['18px', '28px'],
      lg: ['20px', '30px'],
      xl: ['24px', '34px'],
      "2xl": ['28px', '38px'],
      "3xl": ['40px', '50px'],
      "4xl": ['52px', '62px'],
      "5xl": ['60px', '72px']
    },
    fontWeight: {
      light: 300,
      normal: 400,
      semibold: 500,
      medium: 500,
      bold: 600,
    },
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
    },
    extend: {
      boxShadow: {
        nav: "0px 8px 24px rgba(86, 108, 121, 0.2)",
        navbar: "0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.06)",
        input: "0px 8px 24px rgba(86, 108, 121, 0.2)",
        btn: "0px 1px 2px rgba(0, 0, 0, 0.05)",
        comment: "0px 4px 16px rgba(0, 0, 0, 0.1);",
        box: " 0px 8px 16px rgba(39, 45, 70, 0.2)",
      },
      maxWidth: {
        wrap: "1440px"
      },
      animation: {
        'slide-up': 'slideup 200ms ease-in forwards',
        'box-up': 'boxup 200ms 100ms ease forwards',
      },
      keyframes: {
        slideup: {
          '0%': { transform: 'translateY(15px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
        boxup: {
          '0%': { transform: 'translateY(15px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        }
      },
    },
  },
  variants: {},
  plugins: [
    require('@tailwindcss/forms'),
  ],
};
