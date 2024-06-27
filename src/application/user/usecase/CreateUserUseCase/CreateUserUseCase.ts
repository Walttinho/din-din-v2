import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { User } from '../../../../domain/entities/User';
import { UserRepository } from '../../../../domain/repositories/user.repository';
import { PrismaUserRepository } from '../../../../infrastructure/database/prisma/repository/prisma.user.repository';
import { CreateUserDto } from '../../../../domain/dtos/CreateUserDto';
import { hash } from 'bcrypt';
import { ResponseUserDto } from '../../../../domain/dtos/ResponseUserDto';

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject(PrismaUserRepository) private userRepository: UserRepository,
  ) {}

  async execute(dto: CreateUserDto): Promise<ResponseUserDto> {
    const user = new User({
      name: dto.name,
      email: dto.email,
      password: await hash(dto.password, 10),
    });

    const userAlreadyExist = await this.userRepository.findByEmail(dto.email);

    if (userAlreadyExist) {
      throw new ConflictException('email already in use');
    }

    await this.userRepository.create(user);

    const responseUserDto = new ResponseUserDto({
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.createdAt,
    });

    return responseUserDto;
  }
}
