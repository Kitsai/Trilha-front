import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'selector',
  theme: {
    extend: {
      boxShadow: {
        "enter": "0px 4px 0px 0px #33333329",
        "footer": "0px -4px 4px 0px #00000029"
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "primary": "rgb(254, 254, 254)",
        "secondary": "rgb(222, 108, 92)",
        "enter": "#0000001A"
        
      },
    },
  },
  plugins: [],
};
export default config;
