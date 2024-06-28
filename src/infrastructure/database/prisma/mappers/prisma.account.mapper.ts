import { Account } from '../../../../domain/entities/Account';
import { Account as AccountRaw } from '@prisma/client';

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

  static toDomain(accountRaw: AccountRaw): Account {
    return new Account(
      {
        name: accountRaw.name,
        type: accountRaw.type,
        balance: accountRaw.balance,
        createdAt: accountRaw.createdAt,
      },
      accountRaw.id,
    );
  }
}
