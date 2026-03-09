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
        brand: {
          darkBlue: '#171e5d',
          bluePurple: '#8390fa',
          pink: '#f899b3',
          yellow: '#fac748',
          cream: '#fff6e9',
        },
      },
      fontFamily: {
        heading: ['var(--font-josefin)', 'sans-serif'],
        body: ['var(--font-outfit)', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;
