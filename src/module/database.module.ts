import { Module } from '@nestjs/common';
import { PrismaService } from '../infrastructure/database/prisma/prisma.service';
import { PrismaUserRepository } from '../infrastructure/database/prisma/repository/prisma.user.repository';
import { AccountModule } from './account.module';


@Module({
  providers: [PrismaService, PrismaUserRepository],
  exports: [PrismaUserRepository],
  imports: [AccountModule],

})
export class DatabaseModule {}
