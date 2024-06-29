import { Account } from '../../../../domain/entities/Account';
import { Account as AccountRaw, Payment as PaymentRaw } from '@prisma/client';
import { PrismaPaymentMapper } from './prisma.payment.mapper';

export class PrismaAccountMapper {
  static toPrisma(account: Account): AccountRaw {
    return {
      id: account.id,
      name: account.name,
      type: account.type,
      balance: account.balance,
      createdAt: account.createdAt,
    };
  }

  static toDomain(
    accountRaw: AccountRaw & { payments: PaymentRaw[] },
  ): Account {
    const account = new Account(
      {
        name: accountRaw.name,
        type: accountRaw.type,
        balance: accountRaw.balance,
        createdAt: accountRaw.createdAt,
      },
      accountRaw.id,
    );

    const payments = accountRaw.payments.map(PrismaPaymentMapper.toDomain);
    account.payments = payments;
    return account;
  }
}
