const tailwindColors = require("tailwindcss/colors");

const colors = {
  brand: "#7341fb",
  white: "#ffffff",
  transparent: "rgba(0,0,0,0)",
  primary: {
    50: "#e3d9fe",
    100: "#c7b3fd",
    200: "#9d7afc",
    300: "#8154fb",
    400: "#7341fb",
    500: "#7341fb",
    600: "#683be2",
    700: "#5c34c9",
    800: "#452797",
    900: "#2e1a64",
  },
  dark: {
    50: "#f5f7fc",
    100: "#e4e8ef",
    200: "#c9d2de",
    300: "#afbbce",
    400: "#94a4be",
    500: "#798dad",
    600: "#5f779c",
    700: "#435470",
    800: "#303b4e",
    900: "#181e27",
  },
  success: {
    50: "#ddf9f0",
    100: "#bcf3e0",
    200: "#9aecd1",
    300: "#78e6c2",
    400: "#67e0b2",
    500: "#64daa3",
    600: "#24c38e",
    700: "#1a8b65",
    800: "#115d44",
    900: "#093c2b",
  },
  attention: tailwindColors.yellow,
  warning: tailwindColors.red,
  gray: tailwindColors.gray,
  orange: tailwindColors.orange,
  green: tailwindColors.green,
  blue: tailwindColors.blue,
  purple: tailwindColors.purple,
  pink: tailwindColors.pink,
};

module.exports = {
  content: [],
  plugins: [],
  theme: {
    colors,
    screens: {
      sm: "600px",
      md: "960px",
      lg: "1264px",
      xl: "1904px",
    },
    extend: {
      backgroundImage: {
        gradient: "linear-gradient(123deg, #7341fb 6.87%, #5d04d2 90.53%)",
        "gradient-dark":
          "linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), linear-gradient(123deg, #7341fb 6.87%, #5d04d2 90.53%)",
      },
      letterSpacing: {
        tight: "-.0125rem",
      },
      spacing: {
        7.5: "1.875rem",
        "3px": "3px",
        "14px": "14px",
      },
    },
  },
  safelist: [
    { pattern: /^w-.*/ },
    { pattern: /^h-.*/ },
    { pattern: /^text-.*/ },
    { pattern: /^bg-.*/ },
  ],
};
