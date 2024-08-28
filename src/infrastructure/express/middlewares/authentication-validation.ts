import { z } from 'zod';

export const AuthorizationValidation = z.string({
  required_error: 'header authorizarion is required',
  invalid_type_error: 'string is expected',
});
