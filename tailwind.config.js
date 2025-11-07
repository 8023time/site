const namespace = process.env.CM_NAMESPACE || 'cm';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/App.tsx',
    './src/components/**/*.{js,jsx,ts,tsx}',
    './src/generated/**/*.{js,jsx,ts,tsx}',
    './src/layout/**/*.{js,jsx,ts,tsx}',
    './src/pages/**/*.{js,jsx,ts,tsx}',
    './src/common/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    screens: {
      sm: '640px', // 手机
      md: '768px', // 平板
      lg: '1024px', // 宽屏
      xl: '1280px', // 超宽屏
      '2xl': '1536px', // 特大屏
    },
    extend: {
      colors: {
        // Primary colors
        primary: {
          DEFAULT: `var(--${namespace}-color-primary)`,
          hover: `var(--${namespace}-color-primary-hover)`,
          muted: `var(--${namespace}-color-primary-muted)`,
          deep: `var(--${namespace}-color-primary-deep)`,
          light: `var(--${namespace}-color-primary-light)`,
        },
        // Success colors
        success: {
          DEFAULT: `var(--${namespace}-color-success)`,
          hover: `var(--${namespace}-color-success-hover)`,
          muted: `var(--${namespace}-color-success-muted)`,
          deep: `var(--${namespace}-color-success-deep)`,
          light: `var(--${namespace}-color-success-light)`,
        },
        // Warning colors
        warning: {
          DEFAULT: `var(--${namespace}-color-warning)`,
          hover: `var(--${namespace}-color-warning-hover)`,
          muted: `var(--${namespace}-color-warning-muted)`,
          deep: `var(--${namespace}-color-warning-deep)`,
          light: `var(--${namespace}-color-warning-light)`,
        },
        // Danger colors
        danger: {
          DEFAULT: `var(--${namespace}-color-danger)`,
          hover: `var(--${namespace}-color-danger-hover)`,
          muted: `var(--${namespace}-color-danger-muted)`,
          deep: `var(--${namespace}-color-danger-deep)`,
          light: `var(--${namespace}-color-danger-light)`,
        },
        // Error colors
        error: {
          DEFAULT: `var(--${namespace}-color-error)`,
          hover: `var(--${namespace}-color-error-hover)`,
          muted: `var(--${namespace}-color-error-muted)`,
          deep: `var(--${namespace}-color-error-deep)`,
          light: `var(--${namespace}-color-error-light)`,
        },
        // Info colors
        info: {
          DEFAULT: `var(--${namespace}-color-info)`,
          hover: `var(--${namespace}-color-info-hover)`,
          muted: `var(--${namespace}-color-info-muted)`,
          deep: `var(--${namespace}-color-info-deep)`,
          light: `var(--${namespace}-color-info-light)`,
        },
        // Secondary colors
        secondary: {
          DEFAULT: `var(--${namespace}-color-secondary)`,
          hover: `var(--${namespace}-color-secondary-hover)`,
          muted: `var(--${namespace}-color-secondary-muted)`,
          deep: `var(--${namespace}-color-secondary-deep)`,
          light: `var(--${namespace}-color-secondary-light)`,
        },
        // Background colors
        bg: {
          primary: `var(--${namespace}-bg-primary)`,
          success: `var(--${namespace}-bg-success)`,
          warning: `var(--${namespace}-bg-warning)`,
          danger: `var(--${namespace}-bg-danger)`,
          error: `var(--${namespace}-bg-error)`,
          info: `var(--${namespace}-bg-info)`,
          secondary: `var(--${namespace}-bg-secondary)`,
          neutral: `var(--${namespace}-bg-neutral)`,
          page: `var(--${namespace}-bg-color-page)`,
        },
        // Gray colors
        gray: {
          100: `var(--${namespace}-gray-100)`,
          200: `var(--${namespace}-gray-200)`,
          300: `var(--${namespace}-gray-300)`,
          400: `var(--${namespace}-gray-400)`,
          500: `var(--${namespace}-gray-500)`,
          600: `var(--${namespace}-gray-600)`,
          700: `var(--${namespace}-gray-700)`,
          800: `var(--${namespace}-gray-800)`,
          900: `var(--${namespace}-gray-900)`,
        },
        // Text colors
        text: {
          gray: {
            100: `var(--${namespace}-text-gray-100)`,
            200: `var(--${namespace}-text-gray-200)`,
            300: `var(--${namespace}-text-gray-300)`,
            400: `var(--${namespace}-text-gray-400)`,
            500: `var(--${namespace}-text-gray-500)`,
            600: `var(--${namespace}-text-gray-600)`,
            700: `var(--${namespace}-text-gray-700)`,
            800: `var(--${namespace}-text-gray-800)`,
            900: `var(--${namespace}-text-gray-900)`,
          },
        },
        // Border colors
        border: {
          DEFAULT: `var(--${namespace}-border-color)`,
          dashed: `var(--${namespace}-border-dashed-color)`,
          'root-card': `var(--${namespace}-root-card-border-color)`,
        },
      },
      boxShadow: {
        xs: `var(--${namespace}-box-shadow-xs)`,
        sm: `var(--${namespace}-box-shadow-sm)`,
        md: `var(--${namespace}-box-shadow-md)`,
        lg: `var(--${namespace}-box-shadow-lg)`,
        'root-card': `var(--${namespace}-root-card-box-shadow)`,
      },
    },
  },
  plugins: [],
};
