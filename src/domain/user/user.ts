import { v7 as uuidV7 } from 'uuid';
import { IPassword } from '@/domain/user/i-password';

export class User {
  private constructor(
    readonly id: string,
    readonly email: string,
    readonly password: IPassword,
  ) {}

  static create(email: string, password: IPassword): User {
    const id = uuidV7();
    return new User(id, email, password);
  }

  static restore(id: string, email: string, password: IPassword): User {
    return new User(id, email, password);
  }
}
