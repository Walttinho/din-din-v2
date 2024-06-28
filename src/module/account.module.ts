import { forwardRef, Module } from '@nestjs/common';
import { DatabaseModule } from './database.module';
import { CreateAccountController } from '../application/account/controller/CreateAccountController/CreateAccountController';
import { GetAccountByIdController } from '../application/account/controller/GetAccountByIdController/GetAccountByIdController';
import { CreateAccountUseCase } from '../application/account/usecase/CreateAccountUseCase/CreateAccountUseCase';
import { GetAccountByIdUseCase } from '../application/account/usecase/GetAccountByIdUseCase/GetAccountByIdUseCase';
import { PrismaAccountRepository } from '../infrastructure/database/prisma/repository/prisma.account.repository';
import { PrismaService } from '../infrastructure/database/prisma/prisma.service';

@Module({
  imports: [forwardRef(() => DatabaseModule)],
  controllers: [CreateAccountController, GetAccountByIdController],
  providers: [
    CreateAccountUseCase,
    GetAccountByIdUseCase,
    PrismaAccountRepository,
    PrismaService,
  ],
  exports: [CreateAccountUseCase, GetAccountByIdUseCase],
})
export class AccountModule {}
