const { join } = require("path");

module.exports = {
  extends: "../../postcss.config.cjs",
  plugins: {
    tailwindcss: {
      config: join(__dirname, "tailwind.config.cjs"),
    },
  },
};
