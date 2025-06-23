import { Context, Next } from "koa";

const validate =
  (
    schema: Record<string, (value: any) => boolean>,
    source: "body" | "query" | "params" = "body"
  ) =>
  (ctx: Context, next: Next): Promise<void> | void => {
    let data;
    if (source === "query") {
      data = ctx.query;
    } else if (source === "params") {
      data = ctx.params;
    } else {
      data = (ctx.request as any)[source];
    }
    const error: string[] = [];

    Object.keys(schema).forEach((key) => {
      if (!schema[key](data[key])) {
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
