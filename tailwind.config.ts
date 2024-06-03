import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: '10px',
      screens: {
          sm: "100%",
          md: "100%",
          lg: "1000px",
          xl: "1000px"
      }
    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      fontFamily: {
        inter: ['var(--font-inter)'],
        sans: ['var(--font-open-sans)'],
      },
      fontSize: {
        h1: '28px',
        h2: '26px', 
        h3: '23px',
        h4: '20px',
        h5: '18px',
        p: '16px', 
      },
      colors:{
        primary: {  
            500: '#ea580c',
        }
      }
    }, 
  },
  plugins: [],
};
export default config;
