import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { isObject, isString } from 'lodash';

@Catch(HttpException)
export class ErrorFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus ? exception.getStatus() : 500;

    let message = exception.message || 'Internal Server Error';

    if (exception instanceof HttpException) {
      const errorResponse = (exception as any).response;

      if (Array.isArray(errorResponse.message)) {
        message = errorResponse.message[0];
      } else if (isObject(errorResponse.message)) {
        message = isString(errorResponse.message.message)
          ? errorResponse.message.message
          : message;
      } else {
        message = errorResponse.message || message;
      }
    }

    response.status(status).json({
      message,
      error: exception.name,
      statusCode: status,
      timestamp: new Date(),
      path: `${request.method} ${request.originalUrl}`,
    });
  }
}
