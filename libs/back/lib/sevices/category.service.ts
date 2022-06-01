import pool from "../db";
import type {RequestHandlerOutput} from "@sveltejs/kit";
import type {RequestEvent} from "@sveltejs/kit";

export class CategoryService {
    public static async getAllCategories(): Promise<RequestHandlerOutput<any>> {
        try {
            const result = await pool.query('SELECT * FROM categories');

            return {
                status: 200,
                body: result.rows
            }
        } catch (err) {
            return {
                status: 500,
                body: {
                    message: 'Database Error',
                    error: err
                }
            }
        }
    }

    public static async getCategoryBySlug(event: RequestEvent): Promise<RequestHandlerOutput<any>> {
        const slug: string = event?.params?.slug;

        if (!slug) {
            return {
                status: 400,
                body: {
                    message: 'Can\'t get category slug'
                }
            }
        }

        const sql: string = `SELECT * FROM categories WHERE slug = '${slug}'`;

        try {
            const category = (await pool.query(sql))?.rows[0];

            if (!category || !category.id) {
                return {
                    status: 404,
                    body: {
                        message: 'Category not found'
                    }
                }
            }

            return {
                status: 200,
                body: category
            }
        } catch (err) {
            return {
                status: 500,
                body: {
                    message: 'Database Error',
                    error: err
                }
            }
        }
    }

    public static async createCategory(event: RequestEvent): Promise<RequestHandlerOutput<any>> {
        const category: any = await event.request.json();
        const requiredFields: string[] = ['name', 'slug', 'image'];

        if (!category) {
            return {
                status: 400,
                body: {
                    message: 'Can\'t get category'
                }
            }
        }

        const errorFields = requiredFields.filter(key => !category[key]);

        if (errorFields.length) {
            return {
                status: 400,
                body: {
                    message: `${errorFields.join(', ')} is required`
                }
            }
        }

        if (await isSlugExist(category.slug)) {
            return {
                status: 400,
                body: {
                    message: `"${category.slug}" slug is already exist`
                }
            }
        }

        const keys = Object.keys(category);

        const sql = `
            INSERT INTO categories(${keys.join(', ')})
            VALUES (${keys.map((_, i) => `$${i + 1}`).join(', ')})
            RETURNING categories.id, categories.name, categories.slug, categories.image;
        `;

        try {
            const newCategory = (await pool.query(sql, keys.map(key => category[key])))?.rows[0];

            if (!newCategory) {
                return {
                    status: 500,
                    body: {
                        message: 'can\'t get created category'
                    }
                }
            }

            return {
                status: 201,
                body: {category: newCategory}
            };
        } catch (err) {
            return {
                status: 500,
                body: {
                    message: 'Database Error',
                    error: err
                }
            }
        }
    }

    public static async updateCategory(event: RequestEvent): Promise<RequestHandlerOutput<any>> {
        const slug: string = event?.params?.slug;
        const category: any = await event.request.json();

        if (!slug) {
            return {
                status: 400,
                body: {
                    message: 'Can\'t get category slug'
                }
            }
        }
        if (!category) {
            return {
                status: 400,
                body: {
                    message: 'Can\'t get category'
                }
            }
        }
        if (await isSlugExist(category.slug, await CategoryService.getCategoryIdBySlug(slug))) {
            return {
                status: 400,
                body: {
                    message: `"${category.slug}" slug is already exist`
                }
            }
        }

        const keys = Object.keys(category);

        if (!keys.length) {
            return {
                status: 400,
                body: {message: 'Nothing to update'}
            }
        }

        const sql: string = `
            UPDATE categories
            SET ${keys.map((key, i) => `${key}=($${i + 1})`).join(', ')}
            WHERE slug = '${slug}'
            RETURNING categories.id, categories.name, categories.slug, categories.image
        `;

        try {
            const updatedCategory = (await pool.query(sql, keys.map(key => category[key])))?.rows[0];

            if (!updatedCategory) {
                return {
                    status: 404,
                    body: {
                        message: 'can\'t get category for update'
                    }
                }
            }

            return  {
                status: 200,
                body: {category: updatedCategory}
            };
        } catch (err) {
            return {
                status: 500,
                body: {
                    message: 'Database Error',
                    error: err
                }
            }
        }
    }

    public static async deleteCategory(event: RequestEvent): Promise<RequestHandlerOutput<any>> {
        const slug: string = event?.params?.slug;

        if (!slug) {
            return {
                status: 400,
                body: {
                    message: 'Can\'t get category slug'
                }
            }
        }

        const sql = `
            DELETE
            FROM categories
            WHERE slug = '${slug}'
            RETURNING categories.id, categories.name, categories.slug, categories.image
        `;

        try {
            const deletedCategory = (await pool.query(sql))?.rows[0];

            if (!deletedCategory) {
                return {
                    status: 404,
                    body: {
                        message: 'can\'t get category to delete'
                    }
                }
            }

            return {
                status: 200,
                body: deletedCategory
            }
        } catch (err) {
            return {
                status: 500,
                body: {
                    message: 'Database Error',
                    error: err
                }
            }
        }
    }


    public static async getCategoryIdBySlug(slug: string): Promise<number> {
        const result = await pool.query(`
            SELECT id FROM categories WHERE slug='${slug}';
        `);

        return +result?.rows[0]?.id;
    }
}

const isSlugExist = async (slug: string, categoryId?: number): Promise<boolean> => {
    return !!(await pool.query(`
        SELECT *
        FROM categories
        WHERE slug = '${slug}'
            ${categoryId ? `AND id != ${categoryId}` : ''}
        ;
    `))?.rows?.length;
}
