import { PBDKF2Password } from '@/domain/user/pbdkf2-password';

export function makePassword(algorithm: string) {
  if (algorithm === 'PBDKF2') return PBDKF2Password;
  throw new Error('algorithm used in the password is not implemented');
}
