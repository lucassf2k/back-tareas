import type { PrismaClient } from '@prisma/client';
import { User } from '@/domain/user';
import { Email } from '@/domain/user/email';
import { makePassword } from '@/main/factories/password-factory';
import { prismaClient } from '@/infrastructure/repositories/prisma';
import { IUsersRepository } from '@/application/repositories/i-users-repository';

class PrismaUsersRepository implements IUsersRepository {
  constructor(private readonly prismaClient: PrismaClient) {}

  async save(user: User): Promise<User | undefined> {
    const createdUser = await this.prismaClient.user.create({
      data: {
        id: user.id,
        email: user.email.value,
        password: user.password.value,
        passwordAlgorithm: user.password.algorithm,
        passwordSalt: user.password.salt,
      },
    });
    if (!createdUser) return undefined;
    return user;
  }

  async get(id: string): Promise<User | undefined> {
    const user = await this.prismaClient.user.findUnique({ where: { id } });
    if (!user) return undefined;
    return User.restore(
      user.id,
      new Email(user.email),
      makePassword(user.passwordAlgorithm).restore(
        user.password,
        user.passwordSalt,
      ),
    );
  }

  async getOfEmail(email: Email): Promise<User | undefined> {
    const user = await this.prismaClient.user.findUnique({
      where: { email: email.value },
    });
    if (!user) return undefined;
    return User.restore(
      user.id,
      new Email(user.email),
      makePassword(user.passwordAlgorithm).restore(
        user.password,
        user.passwordSalt,
      ),
    );
  }
}

export const prismaUsersRepository = new PrismaUsersRepository(prismaClient);
