import { AccountType } from '@prisma/client';

export interface IAccount {
  id?: string;
  name: string;
  type: AccountType;
  balance: number;
  createdAt: Date;
}
