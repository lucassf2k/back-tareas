import { PBDKF2Password } from '@/domain/user/pbdkf2-password';

describe('IPassword instances', () => {
  test('should be returned true when passwords had the same value and salt', () => {
    const password = 'sadadfa1a22351adada84158$@#';
    const pbkdf2Password = PBDKF2Password.create(password);
    const sut = pbkdf2Password.validate(password);
    expect(sut).toBeTruthy();
  });

  test('it should be possible to restore the object password with the password and salt', () => {
    const pbdkf2Passowrd = PBDKF2Password.create('1231asdade2 2@dada0');
    const restoredPassoword = PBDKF2Password.restore(
      pbdkf2Passowrd.value,
      pbdkf2Passowrd.salt,
    );
    const sut = restoredPassoword.validate('1231asdade2 2@dada0');
    expect(sut).toBeTruthy();
  });
});
