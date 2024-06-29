import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { PaymentRepository } from '../../../../domain/repositories/payment.repository';
import { PrismaPaymentRepository } from '../../../../infrastructure/database/prisma/repository/prisma.payment.respository';
import { PrismaAccountRepository } from '../../../../infrastructure/database/prisma/repository/prisma.account.repository';
import { CreatePaymentDto } from '../../../../domain/dtos/CreatePaymentDto';
import { ResponsePaymentDto } from '../../../../domain/dtos/ResponsePaymentDto';
import { Payment } from '../../../../domain/entities/Payment';
import { AccountRepository } from '../../../../domain/repositories/account.repository';

@Injectable()
export class CreatePaymentUseCase {
  constructor(
    @Inject(PrismaPaymentRepository)
    private readonly paymentRepository: PaymentRepository,
    @Inject(PrismaAccountRepository)
    private readonly accountRepository: AccountRepository,
  ) {}

  async execute(paymentDto: CreatePaymentDto): Promise<ResponsePaymentDto> {
    const { accountId, amount, description } = paymentDto;

    // Check if the account exists
    const account = await this.accountRepository.findById(accountId);
    if (!account) {
      throw new BadRequestException('Account not found');
    }

    const payment = new Payment({
      accountId,
      amount,
      description,
      createdAt: new Date(),
    });

    if (account.balance < amount) {
      throw new BadRequestException('Insufficient balance');
    }

    account.balance -= amount;

    await this.accountRepository.update(account);

    const result = await this.paymentRepository.create(payment);

    return new ResponsePaymentDto({
      id: result.id,
      accountId: result.accountId,
      amount: result.amount,
      description: result.description,
      createdAt: result.createdAt,
    });
  }
}
