import { FieldMiddleware, MiddlewareContext, NextFn } from '@nestjs/graphql';

export const capitalizeMiddleware: FieldMiddleware = async (
  ctx: MiddlewareContext,
  next: NextFn,
) => {
  const value = await next();
  if (typeof value === 'string') {
    return value.charAt(0).toUpperCase() + value.slice(1);
  }
  return value;
};
