import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from '../application/auth/service/auth.service';
import { AuthController } from '../application/auth/controller/auth.controller';
import { PrismaAuthRepository } from '../infrastructure/database/prisma/repository/prisma.auth.repository';
import { PrismaService } from '../infrastructure/database/prisma/prisma.service';
import { JwtStrategy } from '../strategies/jwt.strategy';
import { AuthGuard } from '../guards/auth.guard';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '60m' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    PrismaAuthRepository,
    PrismaService,
    JwtStrategy,
    AuthGuard,
  ],
})
export class AuthModule {}
