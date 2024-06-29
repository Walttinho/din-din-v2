import { Account } from '../entities/Account';

export abstract class AccountRepository {
  abstract create(account: Account): Promise<Account>;
  abstract findById(
    id: string,
    startDate?: Date,
    endDate?: Date,
  ): Promise<Account>;
  abstract update(account: Account): Promise<Account>;
}
