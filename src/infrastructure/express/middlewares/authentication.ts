import type { Request, Response, NextFunction } from 'express';
import { ApiError } from '@/common/api-error';
import { StatusCodes } from '@/common/status-code';
import { JWTService } from '@/infrastructure/services/jwt-service';
import { envs } from '@/infrastructure/configurations/environments';
import { AuthorizationValidation } from '@/infrastructure/express/middlewares/authentication-validation';

type JWTPayload = {
  user: {
    id: string;
    email: string;
  };
  iat: number;
  exp: number;
};

export function authorizationMiddleware(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const { authorization } = request.headers;
  const input = AuthorizationValidation.parse(authorization);
  const [_, token] = input.split(' ');
  const payload = JWTService.verify(token, envs.JWT_SECRET_KEY) as JWTPayload;
  if (!payload.user.id) {
    throw new ApiError('user without permission', StatusCodes.UNAUTHORIZED);
  }
  request.user = payload.user;
  return next();
}
