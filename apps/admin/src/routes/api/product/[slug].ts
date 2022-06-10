import type {RequestEvent, RequestHandlerOutput} from "@sveltejs/kit";
import {ProductService} from "$lib/back";

/** @type {import('./__types/[slug]').RequestHandler} */
export const get = async (event: RequestEvent): Promise<RequestHandlerOutput<any>> => {
    return await ProductService.getProductBySlug(event);
}

/** @type {import('./__types/[slug]').RequestHandler} */
export const put = async (event: RequestEvent): Promise<RequestHandlerOutput<any>> => {
    return await ProductService.updateProduct(event);
}

/** @type {import('./__types/[slug]').RequestHandler} */
export const del = async (event: RequestEvent): Promise<RequestHandlerOutput<any>> => {
    return await ProductService.deleteProduct(event);
}
