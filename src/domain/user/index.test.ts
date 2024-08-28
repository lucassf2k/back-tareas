import { v7 } from 'uuid';
import { User } from '@/domain/user';
import { PBDKF2Password } from '@/domain/user/pbdkf2-password';
import { Email } from '@/domain/user/email';

describe('User', () => {
  test('it should be possible to create a user with id', () => {
    const newUser = User.create(
      new Email('jhondoe@mail.com'),
      PBDKF2Password.create('12345678'),
    );
    const idLength = v7().length;
    expect(newUser.id).toHaveLength(idLength);
    expect(newUser.email.value).toBeTruthy();
    expect(newUser.password.value).toBeTruthy();
  });
});
