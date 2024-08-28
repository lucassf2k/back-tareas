import { SignIn } from '@/application/use-cases/sign-in';
import { SignUp } from '@/application/use-cases/sign-up';
import { SignInController } from '@/infrastructure/express/controllers/sign-in-controller';
import { SignUpController } from '@/infrastructure/express/controllers/sign-up-controller';
import { prismaUsersRepository } from '@/infrastructure/repositories/prisma/prisma-users-repository';

export function makeSignInController() {
  const signIn = new SignIn(prismaUsersRepository);
  return new SignInController(signIn);
}

export function makeSignUpController() {
  const signUp = new SignUp(prismaUsersRepository);
  return new SignUpController(signUp);
}
