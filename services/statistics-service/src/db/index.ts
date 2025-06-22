import { Pool, QueryResult, QueryResultRow } from 'pg';
import Redis from 'ioredis';

const pool = new Pool({
    connectionString: `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
});

const redis = new Redis({
    host: process.env.REDIS_HOST || 'localhost',
    port: parseInt(process.env.REDIS_PORT || '6379', 10),
    password: process.env.REDIS_PASSWORD || undefined,
});

export default {
    query: <T extends QueryResultRow>(text: string, params?: any[]): Promise<QueryResult<T>> => pool.query<T>(text, params),
};

export { redis };