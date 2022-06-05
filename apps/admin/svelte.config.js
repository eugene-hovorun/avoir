import adapter from "@sveltejs/adapter-netlify";
import preprocess from "svelte-preprocess";
import path from "path";

const config = {
  preprocess: preprocess({
    postcss: true,
  }),

  kit: {
    adapter: adapter(),
    vite: {
      resolve: {
        alias: {
          $components: path.resolve("./src/components"),
          $store: path.resolve("./src/store/"),
          "$lib/app": path.resolve("../../libs/app"),
          "$lib/back": path.resolve("../../libs/back"),
        },
      },
    },
  },
};

export default config;
