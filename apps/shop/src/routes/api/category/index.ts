import type {RequestEvent, RequestHandlerOutput} from "@sveltejs/kit";
import {CategoryService} from "$lib/back";

/** @type {import('./__types/').RequestHandler} */
export const get = async (_: RequestEvent): Promise<RequestHandlerOutput<any>> => {
    return await CategoryService.getAllCategories();
}
