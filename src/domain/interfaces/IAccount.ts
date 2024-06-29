import { AccountType } from '@prisma/client';
import { Payment } from '../entities/Payment';

export interface IAccount {
  id?: string;
  name: string;
  type: AccountType;
  balance: number;
  createdAt: Date;
  payments?: Payment[];
}
