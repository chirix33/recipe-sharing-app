import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        transparent: "transparent",
        current: "currentColor",
        white: {
          50: '#fefae0',
          100: '#fff7c2',
          200: '#ffec89',
          300: '#ffd945',
          400: '#fdc412',
          500: '#edaa05',
          600: '#cc8202',
          700: '#a35b05',
          800: '#86480d',
          900: '#723b11',
          950: '#431d05',
        },
        mallard: {
          50: '#f5faeb',
          100: '#e9f3d4',
          200: '#d4e8ae',
          300: '#b6d87e',
          400: '#9ac556',
          500: '#7caa38',
          600: '#5f8729',
          700: '#4a6823',
          800: '#3d5321',
          900: '#283618',
          950: '#1a260d',
        },
      },
    },
  },
  plugins: [],
};

export default config;