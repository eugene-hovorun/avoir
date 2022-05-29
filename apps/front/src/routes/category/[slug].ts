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
      products: Array(Math.round(Math.random() * 20))
        .fill(product)
        .map((product: Product, id) => ({
          ...product,
          id,
          name: `${product.name} for ${params.slug}`,
          categorySlug: params.slug,
        })),
    },
  };
};
