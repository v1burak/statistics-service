import 'dotenv/config';

export interface IConfig {
    port: number | string;
    dbUser: string | undefined;
    dbPassword: string | undefined;
    dbHost: string;
    dbPort: number | string;
    dbName: string;
    databaseUrl: string;
}

const config: IConfig = {
    port: process.env.PORT || 3001,
    dbUser: process.env.DB_USER,
    dbPassword: process.env.DB_PASSWORD,
    dbHost: process.env.DB_HOST || 'localhost',
    dbPort: process.env.DB_PORT || 5432,
    dbName: process.env.DB_NAME || 'apidb',
    databaseUrl: process.env.DATABASE_URL || `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
};

export { config };