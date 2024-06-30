import { Inject, Injectable } from '@nestjs/common';
import { AuthRepository } from '../../../domain/repositories/auth.repository';
import { LoginAuthDto } from '../../../domain/dtos/LoginAuthDto';
import { ResponseAuthDto } from '../../../domain/dtos/ResponseAuthDto';
import { PrismaAuthRepository } from '../../../infrastructure/database/prisma/repository/prisma.auth.repository';

@Injectable()
export class AuthService {
  constructor(
    @Inject(PrismaAuthRepository) private authRepository: AuthRepository,
  ) {}

  async login(loginAuthDto: LoginAuthDto): Promise<ResponseAuthDto> {
    return this.authRepository.login(loginAuthDto.email, loginAuthDto.password);
  }
}
