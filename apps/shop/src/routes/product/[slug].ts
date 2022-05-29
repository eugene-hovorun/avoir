import type { RequestHandler } from "@sveltejs/kit";
import type { Product } from "$lib/app";

const product: Product = {
  id: 1,
  name: "some product",
  slug: "product_slug",
  image: "",
};

export const get: RequestHandler = async ({ params }) => {
  return {
    body: {
      product: {
        ...product,
        categorySlug: params.slug,
      },
    },
  };
};
