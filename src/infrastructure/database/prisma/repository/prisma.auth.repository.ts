import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ResponseAuthDto } from '../../../../domain/dtos/ResponseAuthDto';
import { PrismaService } from '../prisma.service';
import { AuthRepository } from 'src/domain/repositories/auth.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class PrismaAuthRepository extends AuthRepository {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {
    super();
  }

  async login(email: string, pass: string): Promise<ResponseAuthDto> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });
    const { password, ...userWithoutPassword } = user;

    if (!user || !(await bcrypt.compare(pass, password))) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const payload = { sub: user.id, email: user.email };
    const token = this.jwtService.sign(payload);

    return {
      user: userWithoutPassword,
      token,
    };
  }
}
