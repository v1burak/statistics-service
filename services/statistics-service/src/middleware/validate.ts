import { Context, Next } from 'koa';
import eventSchema from '../validation/eventSchema';

type Schema = typeof eventSchema;

const validate = (schema: Schema) => (ctx: Context, next: Next): Promise<void> | void => {
    const { body } = ctx.request as any;

    const error: string[] = [];

    (Object.keys(schema) as (keyof Schema)[]).forEach((key) => {
        if (!body.hasOwnProperty(key) || !schema[key](body[key])) {
            error.push(`Invalid or missing property: ${key}`);
        }
    });

    if (error.length > 0) {
        ctx.status = 400;
        ctx.body = { error };
        return;
    }

    return next();
};

export default validate;