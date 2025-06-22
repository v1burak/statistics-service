import { Pool, QueryResult, QueryResultRow } from 'pg';
import Redis from 'ioredis';
import { config } from '../config/environment';

const pool = new Pool({
    connectionString: config.databaseUrl
});

const redis = new Redis({
    host: config.redisHost,
    port: config.redisPort,
    password: config.redisPassword,
});

export default {
    query: <T extends QueryResultRow>(text: string, params?: any[]): Promise<QueryResult<T>> => pool.query<T>(text, params),
};

export { redis };