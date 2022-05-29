import adapter from "@sveltejs/adapter-netlify";
import preprocess from "svelte-preprocess";
import path from "path";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://github.com/sveltejs/svelte-preprocess
  preprocess: preprocess({
    postcss: true,
  }),

  kit: {
    adapter: adapter(),
    vite: {
      resolve: {
        alias: {
          "$lib/app": path.resolve("../../libs/app"),
          "$lib/api": path.resolve("../../libs/api"),
        },
      },
    },
  },
};

export default config;
