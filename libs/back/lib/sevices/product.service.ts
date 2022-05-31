import pool from "../db";
import type {RequestHandlerOutput} from "@sveltejs/kit";

export class ProductService {
    public static async getAll(): Promise<RequestHandlerOutput<any>> {
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
}
