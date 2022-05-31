import type {RequestEvent, RequestHandlerOutput} from "@sveltejs/kit";
import {ProductService} from "$lib/back";

/** @type {import('./__types/').RequestHandler} */
export const get = async (_: RequestEvent): Promise<RequestHandlerOutput<any>> => {
    return await ProductService.getAllProducts();
}

/** @type {import('./__types/').RequestHandler} */
export const post = async (event: RequestEvent): Promise<RequestHandlerOutput<any>> => {
    return await ProductService.createProduct(event);
}
