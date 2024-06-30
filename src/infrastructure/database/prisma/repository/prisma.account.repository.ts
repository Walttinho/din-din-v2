import { Injectable } from '@nestjs/common';
import { AccountRepository } from '../../../../domain/repositories/account.repository';
import { PrismaService } from '../prisma.service';
import { Account } from '../../../../domain/entities/Account';
import { PrismaAccountMapper } from '../mappers/prisma.account.mapper';
import { PrismaPaymentMapper } from '../mappers/prisma.payment.mapper';

@Injectable()
export class PrismaAccountRepository extends AccountRepository {
  constructor(private prisma: PrismaService) {
    super();
  }

  async create(account: Account): Promise<any> {
    const accountRaw = PrismaAccountMapper.toPrisma(account);
    const result = await this.prisma.account.create({
      data: accountRaw,
    });

    return result;
  }

  // prisma.account.repository.ts

  async findById(id: string, startDate: Date, endDate: Date): Promise<Account> {
    const accountRaw = await this.prisma.account.findUnique({
      where: { id },
      include: {
        payments: {
          where: {
            createdAt: {
              gte: startDate,
              lte: endDate,
            },
          },
        },
      },
    });

    if (!accountRaw) return null; // Early return if accountRaw is null

    // Ensure payments is an array, even if it's empty
    const payments = accountRaw.payments
      ? accountRaw.payments.map(PrismaPaymentMapper.toDomain)
      : [];
    const account = PrismaAccountMapper.toDomain(accountRaw);
    account.payments = payments;
    return account;
  }

  async update(account: Account): Promise<Account> {
    const accountRaw = PrismaAccountMapper.toPrisma(account);
    await this.prisma.account.update({
      where: { id: accountRaw.id },
      data: accountRaw,
    });
    return;
  }
}
