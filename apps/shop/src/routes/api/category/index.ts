import type {RequestEvent, RequestHandlerOutput} from "@sveltejs/kit";
import {CategoryService} from "../../../../../../libs/back/lib/sevices/category.service";

/** @type {import('./__types/').RequestHandler} */
export const get = async (_: RequestEvent): Promise<RequestHandlerOutput<any>> => {
    return await CategoryService.getAllCategories();
}

/** @type {import('./__types/').RequestHandler} */
export const post = async (event: RequestEvent): Promise<RequestHandlerOutput<any>> => {
    return await CategoryService.createCategory(event);
}
