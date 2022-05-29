const { join, resolve } = require("path");

module.exports = {
  content: [join(resolve(), "./src/**/*.{html,js,svelte,ts}")],
  presets: [require("../../tailwind.config.cjs")],
};
