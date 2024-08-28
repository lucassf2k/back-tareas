import { Request, Response } from 'express';
import { SignInValidation } from '@/infrastructure/dtos';
import { SignIn } from '@/application/use-cases/sign-in';
import { IController } from '@/infrastructure/express/controllers/i-controller';

export class SignInController implements IController {
  constructor(private readonly signIn: SignIn) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const input = SignInValidation.parse(request.body);
    const output = await this.signIn.execute(input);
    return response.json({ token: output.token, user: output.user });
  }
}
