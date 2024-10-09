import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        primary: {
          100: '#d8dcf1',
          200: '#b6c0e0',
          300: '#98a3c9',
          400: '#7a87b3',
          500: '#5e6d9e',
          600: '#475f7b',
          700: '#2f4554',
          800: '#23303b',
          900: '#2e3347',
          950: '#272b3d',
        },
      },
    },
  },
  plugins: [],
};
export default config;
