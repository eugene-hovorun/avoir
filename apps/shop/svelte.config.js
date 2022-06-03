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
          $store: path.resolve("./src/store/"),
          $components: path.resolve("./src/components/"),
          $types: path.resolve("./src/types/"),
          $utils: path.resolve("./src/utils/"),
          "$lib/app": path.resolve("../../libs/app"),
          "$lib/back": path.resolve("../../libs/back"),
        },
      },
      optimizeDeps: {
        include: ["pg"],
        exclude: ["pg-native"],
      },
    },
  },
};

export default config;
