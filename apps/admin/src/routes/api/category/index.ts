import type {RequestEvent, RequestHandlerOutput} from "@sveltejs/kit";
import {CategoryService} from "$lib/back";

/** @type {import('./__types/').RequestHandler} */
export const get = async (event: RequestEvent): Promise<RequestHandlerOutput<any>> => {
    const checkSlug: string | null = event.url.searchParams.get('checkSlug');

    if (checkSlug) {
        return await CategoryService.checkSlugAvailability(checkSlug);
    }

    return await CategoryService.getAllCategories();
}

/** @type {import('./__types/').RequestHandler} */
export const post = async (event: RequestEvent): Promise<RequestHandlerOutput<any>> => {
    return await CategoryService.createCategory(event);
}
