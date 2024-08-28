import { Email } from '@/domain/user/email';
import { ApiError } from '@/common/api-error';
import { StatusCodes } from '@/common/status-code';

describe('Email', () => {
  test('should be validate email', () => {
    const emailValid = 'johndoe@mail.com';
    const sut = new Email(emailValid);
    expect(sut.value).toBe(emailValid);
  });

  test('should be invalidate email', () => {
    const emailInvalid = 'johndoemail.com';
    expect(() => new Email(emailInvalid)).toThrow(
      new ApiError('Invalid email', StatusCodes.BAD_REQUEST),
    );
  });

  test('should be accepted any character if it a correctly formatted email', () => {
    const emailValid = 'JOohnDo$@mail.com';
    const sut = new Email(emailValid);
    expect(sut.value).toBe(emailValid);
  });
});
