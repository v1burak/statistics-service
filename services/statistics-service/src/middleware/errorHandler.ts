import { Context, Next } from 'koa';

const errorHandler = async (ctx: Context, next: Next): Promise<void> => {
    try {
        await next();
    } catch (err: any) {
        console.error('Error caught in middleware:', err);

        const statusCode = err.statusCode || err.status || 500;

        ctx.status = statusCode;
        ctx.body = {
            status: statusCode,
            message: err.message || 'An unexpected error occurred.',
        };
    }
};

export default errorHandler; 