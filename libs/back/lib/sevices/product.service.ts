import pool from "../db";
import type {RequestHandlerOutput} from "@sveltejs/kit";
import type {RequestEvent} from "@sveltejs/kit";
import {CategoryService} from "./category.service";

export class ProductService {
    public static async getAllProducts(): Promise<RequestHandlerOutput<any>> {
        try {
            const result = await pool.query(selectProductsWithCategorySlug);

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

    public static async getProductsByCategory(categorySlug: string): Promise<RequestHandlerOutput<any>> {
        try {
            const result = await pool.query(selectProductsWithCategorySlug + `WHERE c.slug = '${categorySlug}'`);

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

    public static async getProductBySlug(event: RequestEvent): Promise<RequestHandlerOutput<any>> {
        const slug: string = event?.params?.slug;

        if (!slug) {
            return {
                status: 400,
                body: {
                    message: 'Can\'t get product slug'
                }
            }
        }

        const sql: string = selectProductsWithCategorySlug + ` WHERE p.slug = '${slug}'`;

        try {
            const product = (await pool.query(sql))?.rows[0];

            if (!product || !product.id) {
                return {
                    status: 404,
                    body: {
                        message: 'Product not found'
                    }
                }
            }

            return {
                status: 200,
                body: product
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

    public static async createProduct(event: RequestEvent): Promise<RequestHandlerOutput<any>> {
        const product: any = await event.request.json();
        const requiredFields: string[] = ['name', 'slug', 'image'];

        if (!product) {
            return {
                status: 400,
                body: {
                    message: 'Can\'t get product'
                }
            }
        }

        const categorySlug: string = product?.categorySlug;
        delete product.categorySlug;

        const errorFields = requiredFields.filter(key => !product[key]);

        if (errorFields.length) {
            return {
                status: 400,
                body: {
                    message: `${errorFields.join(', ')} is required`
                }
            }
        }

        if (await isSlugExist(product.slug)) {
            return {
                status: 400,
                body: {
                    message: `"${product.slug}" slug is already exist`
                }
            }
        }

        const keys = Object.keys(product);

        const sql = `
            INSERT INTO products(${keys.join(', ')})
            VALUES (${keys.map((_, i) => `$${i + 1}`).join(', ')})
            RETURNING products.id, products.name, products.slug, products.image;
        `;

        try {
            const newProduct = (await pool.query(sql, keys.map(key => product[key])))?.rows[0];

            if (!newProduct) {
                return {
                    status: 500,
                    body: {
                        message: 'can\'t get created product'
                    }
                }
            }

            const result: any = {
                status: 201,
                body: {product: newProduct}
            };

            if (categorySlug) {
                result.body.attachCategory = await attachProductToCategory(newProduct.id, categorySlug);

                if (result.body.attachCategory.status === 201) result.body.product.categorySlug = categorySlug;
            }

            return result;
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

    public static async updateProduct(event: RequestEvent): Promise<RequestHandlerOutput<any>> {
        const slug: string = event?.params?.slug;
        const product: any = await event.request.json();

        if (!slug) {
            return {
                status: 400,
                body: {
                    message: 'Can\'t get product slug'
                }
            }
        }
        if (!product) {
            return {
                status: 400,
                body: {
                    message: 'Can\'t get product'
                }
            }
        }
        if (await isSlugExist(product.slug, await ProductService.getProductIdBySlug(slug))) {
            return {
                status: 400,
                body: {
                    message: `"${product.slug}" slug is already exist`
                }
            }
        }

        const categorySlug: string = product?.categorySlug;
        delete product.categorySlug;

        const keys = Object.keys(product);

        if (!keys.length) {
            if (categorySlug) {
                return attachProductToCategory(await ProductService.getProductIdBySlug(slug), categorySlug);
            }


            return {
                status: 400,
                body: {message: 'Nothing to update'}
            }
        }

        const sql: string = `
            UPDATE products
            SET ${keys.map((key, i) => `${key}=($${i + 1})`).join(', ')}
            WHERE slug = '${slug}'
            RETURNING products.id, products.name, products.slug, products.image
        `;

        try {
            const updatedProduct = (await pool.query(sql, keys.map(key => product[key])))?.rows[0];

            if (!updatedProduct) {
                return {
                    status: 404,
                    body: {
                        message: 'can\'t get product for update'
                    }
                }
            }

            const result: any = {
                status: 200,
                body: {product: updatedProduct}
            };

            if (categorySlug) {
                result.body.attachCategory = await attachProductToCategory(updatedProduct.id, categorySlug);

                if (result.body.attachCategory.status === 201) result.body.product.categorySlug = categorySlug;
            }

            return result;
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

    public static async deleteProduct(event: RequestEvent): Promise<RequestHandlerOutput<any>> {
        const slug: string = event?.params?.slug;

        if (!slug) {
            return {
                status: 400,
                body: {
                    message: 'Can\'t get product slug'
                }
            }
        }

        const sql = `
            DELETE
            FROM products
            WHERE slug = '${slug}'
            RETURNING products.id, products.name, products.slug, products.image
        `;

        try {
            const deletedProduct = (await pool.query(sql))?.rows[0];

            if (!deletedProduct) {
                return {
                    status: 404,
                    body: {
                        message: 'can\'t get product to delete'
                    }
                }
            }

            return {
                status: 200,
                body: deletedProduct
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


    public static async getProductIdBySlug(slug: string): Promise<number> {
        const result = await pool.query(`
            SELECT id
            FROM products
            WHERE slug = '${slug}';
        `);

        return +result?.rows[0]?.id;
    }
}

const selectProductsWithCategorySlug: string = `
    SELECT p.id, p.name, p.slug, p.image, c.slug AS "categorySlug"
    FROM products p
             LEFT JOIN categories_products cp ON p.id = cp.product_id
             LEFT JOIN categories c ON c.id = cp.category_id
`;

const isSlugExist = async (slug: string, productId?: number): Promise<boolean> => {
    return !!(await pool.query(`
        SELECT *
        FROM products
        WHERE slug = '${slug}'
            ${productId ? `AND id != ${productId}` : ''}
        ;
    `))?.rows?.length;
}

const attachProductToCategory = async (productId: number, categorySlug: string): Promise<RequestHandlerOutput<any>> => {
    if (!productId) return {status: 500, body: {message: 'can\'t get productId'}};
    if (!categorySlug) return {status: 500, body: {message: 'can\'t get categorySlug'}};

    await pool.query(`
        DELETE
        FROM categories_products
        WHERE product_id = ${productId};
    `);

    const categoryId = await CategoryService.getCategoryIdBySlug(categorySlug);

    if (!categoryId) {
        return {
            status: 400,
            body: {message: `category "${categorySlug}" not found`}
        };
    }

    try {
        await pool.query(`
            INSERT INTO categories_products(category_id, product_id)
            VALUES (${categoryId}, ${productId});
        `);
        return {
            status: 201,
            body: {categorySlug}
        };
    } catch (err) {
        return {
            status: 500,
            body: {
                message: 'Database error',
                error: err
            }
        };
    }
}
