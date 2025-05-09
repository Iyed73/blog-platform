import { ArgumentsHost, BadRequestException, Catch, ExceptionFilter, NotFoundException } from '@nestjs/common';
import { NotFoundGraphQLError, ValidationGraphQLError } from '../errors/graphql-errors';
import { ApolloError } from 'apollo-server-express';
import { ERROR_CODES } from '../errors/error-cdes';

@Catch()
export class GraphqlExceptionsFilter<T> implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {
    if (exception instanceof NotFoundException) {
      const { message } = exception;
      const [entity, , , idStr] = message.split(' ');
      const id = parseInt(idStr, 10);
      return new NotFoundGraphQLError(entity, id);
    }

    if (exception instanceof BadRequestException) {
      const response = exception.getResponse();
      const message = typeof response === 'string' ? response : (response as any).message;
      return new ValidationGraphQLError(Array.isArray(message) ? message.join(', ') : message);
    }

    if (exception instanceof ApolloError) {
      return exception;
    }
    return new ApolloError('Internal server error', ERROR_CODES.INTERNAL_SERVER_ERROR);
  }
}
