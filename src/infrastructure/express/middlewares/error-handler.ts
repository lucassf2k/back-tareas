import { ZodError } from 'zod';
import { JsonWebTokenError } from 'jsonwebtoken';
import type { Request, Response, NextFunction } from 'express';
import { ApiError } from '@/common/api-error';
import { StatusCodes } from '@/common/status-code';
import { Logger } from '@/infrastructure/configurations/logger';

export function errorHandler(
  error: Error,
  request: Request,
  response: Response,
  next?: NextFunction,
) {
  if (error instanceof ApiError) {
    Logger.error(`Code: ${error.code}: ${error}`);
    return response.status(error.code).json({ error: error.message });
  }
  if (error instanceof ZodError) {
    const errors = error.errors.map((err) => err.message);
    Logger.info(`Validation: ${error}`);
    return response
      .status(StatusCodes.BAD_REQUEST)
      .json({ validationErrors: errors });
  }
  if (error instanceof JsonWebTokenError) {
    Logger.error(`${StatusCodes.UNAUTHORIZED}: ${error}`);
    return response
      .status(StatusCodes.UNAUTHORIZED)
      .json({ error: error.message });
  }
  Logger.fatal(`${StatusCodes.INTERNAL_SERVER_ERROR}: ${error}`);
  return response
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .end('Internal server error');
}
