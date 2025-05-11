import { GraphQLError } from 'graphql';
import { ERROR_CODES } from './error-codes';

export class NotFoundGraphQLError extends GraphQLError {
  constructor(entity: string, id: number) {
    super(
      `${entity} with ID ${id} not found`,
      {
        extensions: {
          code:    ERROR_CODES.NOT_FOUND,
        },
      }
    );
    Object.defineProperty(this, 'name', { value: 'NotFoundGraphQLError' });
  }
}


export class ValidationGraphQLError extends GraphQLError   {
  constructor(message: string, details?: Record<string, any>) {
    super(
      `Wrong input: ${message}`,
      {
        extensions: {
          code:    ERROR_CODES.BAD_USER_INPUT,
          ...details && { details },
        },
      }
    );
    Object.defineProperty(this, 'name', { value: 'ValidationGraphQLError' });
  }
}

