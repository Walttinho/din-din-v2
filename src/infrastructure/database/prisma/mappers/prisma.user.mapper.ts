import { User } from '../../../../domain/entities/User';
import { User as UserRaw } from '@prisma/client';

export class PrismaUserMapper {
  static toPrisma(user: User): UserRaw {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
      createdAt: user.createdAt,
      updatedAt: new Date(),
    };
  }

  static toDomain(userRaw: UserRaw): User {
    return new User(
      {
        name: userRaw.name,
        email: userRaw.email,
        password: userRaw.password,
        createdAt: userRaw.createdAt,
        updatedAt: userRaw.updatedAt,
      },
      userRaw.id,
    );
  }
}
