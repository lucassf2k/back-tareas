import { User } from '@/domain/user';
import { Email } from '@/domain/user/email';

export interface IUsersRepository {
  save(user: User): Promise<User | undefined>;
  get(id: string): Promise<User | undefined>;
  getOfEmail(email: Email): Promise<User | undefined>;
}
