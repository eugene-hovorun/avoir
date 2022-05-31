import pool from "../db";
import type {RequestHandlerOutput} from "@sveltejs/kit";
import type {RequestEvent} from "@sveltejs/kit";

export class ProductService {
    public static async getAllProducts(): Promise<RequestHandlerOutput<any>> {
        const sql: string = 'SELECT * FROM products';

        try {
            const result = await pool.query(sql);

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

    public static async getProductById(event: RequestEvent): Promise<RequestHandlerOutput<any>> {
        const productId: number = +event?.params?.id;

        if (!productId) {
            return {
                status: 400,
                body: {
                    message: 'Can\'t get product id'
                }
            }
        }

        const sql: string = `SELECT *
                             FROM products
                             WHERE id = ${productId}`;

        try {
            const result = await pool.query(sql);
            const product = result.rows[0];

            if (!product) {
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

        const errorFields = requiredFields.filter(key => !product[key]);

        if (errorFields.length) {
            return {
                status: 400,
                body: {
                    message: `${errorFields.join(', ')} is required`
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

            return {
                status: 201,
                body: newProduct
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

    public static async updateProduct(event: RequestEvent): Promise<RequestHandlerOutput<any>> {
        const productId: number = +event?.params?.id;
        const product: any = await event.request.json();

        if (!productId) {
            return {
                status: 400,
                body: {
                    message: 'Can\'t get product id'
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

        const keys = Object.keys(product);

        const sql: string = `
            UPDATE products
            SET ${keys.map((key, i) => `${key}=($${i + 1})`).join(', ')}
            WHERE id = ${productId}
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

            return {
                status: 200,
                body: updatedProduct
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

    public static async deleteProduct(event: RequestEvent): Promise<RequestHandlerOutput<any>> {
        const productId: number = +event?.params?.id;

        if (!productId) {
            return {
                status: 400,
                body: {
                    message: 'Can\'t get product id'
                }
            }
        }

        const sql = `
            DELETE
            FROM products
            WHERE id = ${productId}
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
}
