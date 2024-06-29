import { Module } from '@nestjs/common';
import { DatabaseModule } from './database.module';
import { PrismaService } from '../infrastructure/database/prisma/prisma.service';
import { PrismaPaymentRepository } from '../infrastructure/database/prisma/repository/prisma.payment.respository';
import { CreatePaymentUseCase } from '../application/payment/useCase/CreatePaymentUseCase/CreatePaymentUseCase';
import { CreatePaymentController } from '../application/payment/controller/CreatePaymentController/CreatePaymentController';
import { PrismaAccountRepository } from '../infrastructure/database/prisma/repository/prisma.account.repository';

@Module({
  imports: [DatabaseModule],
  controllers: [CreatePaymentController],
  providers: [
    PrismaService,
    PrismaPaymentRepository,
    PrismaAccountRepository,
    CreatePaymentUseCase,
  ],
  exports: [],
})
export class PaymentModule {}
