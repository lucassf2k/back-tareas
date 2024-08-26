import { ApiError } from '@/common/api-error';
import { StatusCodes } from '@/common/status-code';

export class Email {
  readonly value: string;

  constructor(email: string) {
    if (!email.match(/^(.+)@(.+)$/)) {
      throw new ApiError('Invalid email', StatusCodes.BAD_REQUEST);
    }
    this.value = email;
  }
}
