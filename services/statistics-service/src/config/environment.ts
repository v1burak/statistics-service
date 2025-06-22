import 'dotenv/config';

export interface IConfig {
    port: number | string;
    dbUser: string | undefined;
    dbPassword: string | undefined;
    dbHost: string;
    dbPort: number | string;
    dbName: string;
    databaseUrl: string;
    redisHost: string;
    redisPort: number;
    redisPassword: string | undefined;
}

const config: IConfig = {
    port: process.env.PORT || 3001,
    dbUser: process.env.DB_USER,
    dbPassword: process.env.DB_PASSWORD,
    dbHost: process.env.DB_HOST || 'localhost',
    dbPort: Number(process.env.DB_PORT) || 5432,
    dbName: process.env.DB_NAME || 'apidb',
    databaseUrl: process.env.DATABASE_URL || `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST || 'localhost'}:${process.env.DB_PORT || 5432}/${process.env.DB_NAME || 'apidb'}`,
    redisHost: process.env.REDIS_HOST || 'localhost',
    redisPort: Number(process.env.REDIS_PORT || '6379'),
    redisPassword: process.env.REDIS_PASSWORD || undefined,
};

export { config };