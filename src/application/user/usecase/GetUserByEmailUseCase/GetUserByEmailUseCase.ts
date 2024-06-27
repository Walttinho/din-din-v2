import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ResponseUserDto } from '../../../../domain/dtos/ResponseUserDto';
import { UserRepository } from '../../../../domain/repositories/user.repository';
import { PrismaUserRepository } from '../../../../infrastructure/database/prisma/repository/prisma.user.repository';

@Injectable()
export class GetUserByEmailUseCase {
  constructor(
    @Inject(PrismaUserRepository) private userRepository: UserRepository,
  ) {}

  async execute(email: string): Promise<ResponseUserDto> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new NotFoundException(`User with email ${email} not found`);
    }

    const responseUserDto = new ResponseUserDto({
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });

    return responseUserDto;
  }
}
