import { Account } from '../entities/Account';

export abstract class AccountRepository {
  abstract create(account: Account): Promise<Account>;
  abstract findById(id: string): Promise<Account>;
}
