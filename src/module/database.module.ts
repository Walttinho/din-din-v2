import { Module } from '@nestjs/common';
import { PrismaService } from '../infrastructure/database/prisma/prisma.service';
import { PrismaUserRepository } from '../infrastructure/database/prisma/repository/prisma.user.repository';

@Module({
  providers: [PrismaService, PrismaUserRepository],
  exports: [PrismaUserRepository],
})
export class DatabaseModule {}
