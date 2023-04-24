// content: ["./src/**/*.{html,js}"],
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./*.html', './src/app/**/*.{html,js,ts}', './src/services/**/*.{js,ts}'],
  theme: {
    screens: {
      xs: '0px',
      sm: '641px',
      md: '1024px',
      lg: '1280px',
      xl: '1920px',
    },
    colors: {
      primary: {
        main: '#0000FF',
        light: '#5E5EFF',
        dark: '#0000B3',
      },
      secondary: {
        main: '#800080',
        light: '#A55CA5 ',
        dark: '#4B0082',
      },
      grey: {
        50: '#F2F2F2',
        100: '#E6E6E6',
        200: '#D6D6D6',
        300: '#C2C2C2',
        400: '#ABABAB',
        500: '#919191',
        600: '#808080',
        700: '#6E6E6E',
        800: '#5E5E5E',
        900: '#4A4A4A',
        A100: '#383838',
        A200: '#262626',
      },
      text: {
        primary: '#262626',
        secondary: '#4A4A4A',
        disabled: '#6E6E6E',
      },
      common: {
        white: '#FFFFFF',
        black: '#000000',
      },
      background: {
        default: '#E5E5E5',
        paper: '#FFFFFF',
      },
    },
    extend: {
      spacing: {
        0: '0',
        1: '4px',
        2: '8px',
        3: '12px',
        4: '14px',
        5: '16px',
        6: '20px',
        7: '24px',
        8: '32px',
        9: '40px',
        10: '48px',
      },
      borderRadius: {
        1: '10px',
      },
      fontFamily: {
        sans: ['Inter'],
      },
      boxShadow: {
        0: `0px 2px 4px rgba(0, 0, 0, 0.14),
        0px 3px 4px rgba(0, 0, 0, 0.12),
        0px 1px 5px rgba(0, 0, 0, 0.2)`,
        1: `0px 6px 10px rgba(0, 0, 0, 0.05),
        0px 1px 18px rgba(0, 0, 0, 0.05),
        0px 3px 5px rgba(0, 0, 0, 0.1)`,
      },
    },
  },
  plugins: [],
};
