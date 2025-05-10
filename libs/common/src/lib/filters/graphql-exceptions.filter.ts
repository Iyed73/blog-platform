import { ArgumentsHost, BadRequestException, Catch, ExceptionFilter } from '@nestjs/common';
import { NotFoundGraphQLError, ValidationGraphQLError } from '../errors/graphql-errors';
import { ApolloError } from 'apollo-server-express';
import { ERROR_CODES } from '../errors/error-cdes';
import { EntityNotFoundException } from '../exceptions/not-found.exception';

interface BadRequestResponse {
  message?: string | string[];
  error?: string;
}

@Catch()
export class GraphqlExceptionsFilter<T> implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {
    if (exception instanceof EntityNotFoundException) {
      const { entityName, entityId } = exception.metadata;
      return new NotFoundGraphQLError(entityName, Number(entityId));
    }

    if (exception instanceof BadRequestException) {
      const response = exception.getResponse() as BadRequestResponse;
      const raw = response.message;
      let messageText: string;

      if (Array.isArray(raw)) {
        messageText = raw.join(' | ');
      } else if (typeof raw === 'string') {
        messageText = raw;
      } else {
        messageText = response.error ?? 'Bad Request';
      }

      return new ValidationGraphQLError(messageText);
    }

    if (exception instanceof ApolloError) {
      return exception;
    }
    return new ApolloError('Internal server error', ERROR_CODES.INTERNAL_SERVER_ERROR);
  }
}
