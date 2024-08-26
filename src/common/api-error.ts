import { StatusCodes } from '@/common/status-code';

export class ApiError extends Error {
  readonly code: StatusCodes;

  constructor(message: string, statusCode: StatusCodes) {
    super();
    this.message = message;
    this.code = statusCode;
  }
}
