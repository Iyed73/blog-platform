import { ApolloError } from 'apollo-server-express';
import { ERROR_CODES } from './error-cdes';

export class NotFoundGraphQLError extends ApolloError {
  constructor(entity: string, id: number) {
    super(`${entity} with ID ${id} not found`, ERROR_CODES.NOT_FOUND, {entity, id});
    Object.defineProperty(this, 'name', { value: 'NotFoundGraphQLError' });
  }
}


export class ValidationGraphQLError extends ApolloError {
  constructor(message: string, details?: Record<string, any>) {
    super(`Wrong input: ${message}`, ERROR_CODES.BAD_USER_INPUT, details);
    Object.defineProperty(this, 'name', { value: 'ValidationGraphQLError' });
  }
}

