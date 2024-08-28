import { User } from '@/domain/user';
import { Email } from '@/domain/user/email';
import { ApiError } from '@/common/api-error';
import { signUpDTO } from '@/infrastructure/dtos';
import { StatusCodes } from '@/common/status-code';
import { PBDKF2Password } from '@/domain/user/pbdkf2-password';
import { IUsersRepository } from '@/application/repositories/i-users-repository';

type Output = {
  user: {
    id: string;
    email: string;
  };
};

export class SignUp {
  constructor(private readonly usersRepository: IUsersRepository) {}

  async execute(input: signUpDTO): Promise<Output> {
    const userAlreadyExists = await this.usersRepository.getOfEmail(
      new Email(input.email),
    );
    if (userAlreadyExists) {
      throw new ApiError('email already in use', StatusCodes.CONFLICT);
    }
    const newUser = User.create(
      new Email(input.email),
      PBDKF2Password.create(input.password),
    );
    const user = await this.usersRepository.save(newUser);
    return {
      user: {
        id: user.id,
        email: user.email.value,
      },
    };
  }
}
