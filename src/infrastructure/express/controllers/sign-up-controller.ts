import type { Request, Response } from 'express';
import { SignUpValidation } from '@/infrastructure/dtos';
import { SignUp } from '@/application/use-cases/sign-up';
import { IController } from '@/infrastructure/express/controllers/i-controller';

export class SignUpController implements IController {
  constructor(private readonly signUp: SignUp) {}

  async handle(request: Request, response: Response): Promise<Response> {
    console.log(request.body);
    const input = SignUpValidation.parse(request.body);
    const { user } = await this.signUp.execute(input);
    const url = `${request.baseUrl}/user/${user.id}`;
    return response.location(url).json({ id: user.id });
  }
}
