import { v7 as uuidV7 } from 'uuid';
import { IPassword } from '@/domain/user/i-password';
import { Email } from './email';

export class User {
  private constructor(
    readonly id: string,
    readonly email: Email,
    readonly password: IPassword,
  ) {}

  static create(email: Email, password: IPassword): User {
    const id = uuidV7();
    return new User(id, email, password);
  }

  static restore(id: string, email: Email, password: IPassword): User {
    return new User(id, email, password);
  }
}
