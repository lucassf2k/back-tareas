import { randomBytes, pbkdf2Sync } from 'node:crypto';
import { IPassword } from '@/domain/user/i-password';

const ITERATIONS = 100;
const KEY_LEN = 64;
const DIGEST = 'sha512';

export class PBDKF2Password implements IPassword {
  readonly algorithm: string = 'PBDKF2';

  private constructor(
    readonly value: string,
    readonly salt: string,
  ) {}

  static create(password: string): IPassword {
    const salt = randomBytes(20).toString('hex');
    const value = PBDKF2Password.encode(password, salt);
    return new PBDKF2Password(value, salt);
  }

  static restore(password: string, salt: string): IPassword {
    return new PBDKF2Password(password, salt);
  }

  private static encode(password: string, salt: string) {
    return pbkdf2Sync(password, salt, ITERATIONS, KEY_LEN, DIGEST).toString(
      'hex',
    );
  }

  validate(password: string): boolean {
    const toValidate = PBDKF2Password.encode(password, this.salt);
    return this.value === toValidate;
  }
}
