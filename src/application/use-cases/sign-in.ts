import { Email } from '@/domain/user/email';
import { ApiError } from '@/common/api-error';
import { SignInDTO } from '@/infrastructure/dtos';
import { StatusCodes } from '@/common/status-code';
import { JWTService } from '@/infrastructure/services/jwt-service';
import { IUsersRepository } from '@/application/repositories/i-users-repository';
import { envs } from '@/infrastructure/configurations/environments';

export type SignInPayload = {
  user: {
    id: string;
    email: string;
  };
};

type Output = {
  token: string;
  user: {
    id: string;
    email: string;
  };
};

export class SignIn {
  constructor(private readonly usersRepository: IUsersRepository) {}

  async execute(input: SignInDTO): Promise<Output> {
    const user = await this.usersRepository.getOfEmail(new Email(input.email));
    if (!user) {
      throw new ApiError('user without permission', StatusCodes.UNAUTHORIZED);
    }
    const isPasswordValid = user.password.validate(input.password);
    if (!isPasswordValid) {
      throw new ApiError('incorrect password', StatusCodes.UNAUTHORIZED);
    }
    const signInPayload: SignInPayload = {
      user: {
        id: user.id,
        email: user.email.value,
      },
    };
    const day = 60 * 60 * 24;
    const token = JWTService.sign(signInPayload, envs.JWT_SECRET_KEY, {
      expiresIn: day,
    });
    return {
      token,
      user: {
        id: user.id,
        email: user.email.value,
      },
    };
  }
}
