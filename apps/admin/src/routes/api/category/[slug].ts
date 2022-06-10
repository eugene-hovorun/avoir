import type {RequestEvent, RequestHandlerOutput} from "@sveltejs/kit";
import {CategoryService} from "$lib/back";

/** @type {import('./__types/[slug]').RequestHandler} */
export const get = async (event: RequestEvent): Promise<RequestHandlerOutput<any>> => {
    return await CategoryService.getCategoryBySlug(event);
}

/** @type {import('./__types/[slug]').RequestHandler} */
export const put = async (event: RequestEvent): Promise<RequestHandlerOutput<any>> => {
    return await CategoryService.updateCategory(event);
}

/** @type {import('./__types/[slug]').RequestHandler} */
export const del = async (event: RequestEvent): Promise<RequestHandlerOutput<any>> => {
    return await CategoryService.deleteCategory(event);
}
