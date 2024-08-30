import { z } from 'zod';

export const SignUpValidation = z.object({
  email: z
    .string({
      invalid_type_error: 'Espera-se uma string',
      required_error: 'email é obrigatório',
    })
    .email('Formato de e-mail incorreto'),
  password: z.string({
    invalid_type_error: 'Espera-se uma string',
    required_error: 'password é obrigatório',
  }),
});
export type signUpDTO = z.infer<typeof SignUpValidation>;

export const SignInValidation = z.object({
  email: z
    .string({
      required_error: 'E-mail é obrigatório',
      invalid_type_error: 'Espera-se uma string',
    })
    .email('E-mail inválido'),
  password: z.string({
    required_error: 'Senha é obrigatória',
    invalid_type_error: 'Espera-se uma string',
  }),
});
export type SignInDTO = z.infer<typeof SignInValidation>;

export const CreateTaskValidation = z.object({
  title: z.string({
    invalid_type_error: 'Espera-se uma string',
    required_error: 'title é obrigatório',
  }),
  description: z.string({
    invalid_type_error: 'Espera-se uma string',
    required_error: 'description é obrigatório',
  }),
});
export type CreateTaskDTO = z.infer<typeof CreateTaskValidation> & {
  userId: string;
};

export const ListTaskValidation = z.object({
  page: z
    .number({ invalid_type_error: 'Espera-se um inteiro' })
    .int('page deve ser inteiro')
    .nonnegative('skip não poder ser negativo'),
  pageSize: z
    .number({ invalid_type_error: 'Espera-se um inteiro' })
    .int('pageZise deve ser inteiro')
    .optional(),
});

export type ListTaskDTO = z.infer<typeof ListTaskValidation> & {
  userId: string;
};

export const GetTaskValidation = z.object({
  id: z
    .string({ required_error: 'id da task é obrigatório' })
    .uuid('UUID inválido'),
});

export type GetTaskDTO = z.infer<typeof GetTaskValidation>;

export const DeleteTaskValidation = z.object({
  id: z
    .string({
      required_error: 'ID do usuário é obrigatório',
      invalid_type_error: 'Espera-se uma string',
    })
    .uuid('UUID com formato inválido'),
});
export type DeleteTaskDTO = z.infer<typeof DeleteTaskValidation>;

export const UpdateTaskValidation = z.object({
  params: z.object({
    id: z.string({ invalid_type_error: 'Espera-se uma string' }).uuid(),
  }),
  body: z.object({
    title: z.string({ invalid_type_error: 'Espera-se uma string' }).optional(),
    description: z
      .string({ invalid_type_error: 'Espera-se uma string' })
      .optional(),
    isCompleted: z
      .boolean({ invalid_type_error: 'Espera-se um boolean' })
      .optional(),
  }),
});

export type UpdateTaskDTO = z.infer<typeof UpdateTaskValidation>;
