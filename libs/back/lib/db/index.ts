import {Pool} from "pg";
import type {PoolConfig} from "pg";

const config: PoolConfig = {
    connectionString: 'postgres://hyxlpeza:nA7IaX0W_w1qyE-ixD4SPkYkmTsh8cN9@abul.db.elephantsql.com/hyxlpeza',
    ssl: {
        rejectUnauthorized: false
    }
};
const pool: Pool = new Pool(config);

export default pool;
