import type {RequestEvent, RequestHandlerOutput} from "@sveltejs/kit";
import {ProductService} from "../../../../../../libs/back";

/** @type {import('./__types/[id]').RequestHandler} */
export const get = async (event: RequestEvent): Promise<RequestHandlerOutput<any>> => {
    return await ProductService.getProductById(event);
}

/** @type {import('./__types/[id]').RequestHandler} */
export const put = async (event: RequestEvent): Promise<RequestHandlerOutput<any>> => {
    return await ProductService.updateProduct(event);
}

/** @type {import('./__types/[id]').RequestHandler} */
export const del = async (event: RequestEvent): Promise<RequestHandlerOutput<any>> => {
    return await ProductService.deleteProduct(event);
}
