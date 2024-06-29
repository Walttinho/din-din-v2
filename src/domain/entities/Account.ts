import { Replace } from 'src/utils/replace';
import { IAccount } from '../interfaces/IAccount';
import { randomUUID } from 'crypto';
import { AccountType } from '@prisma/client';
import { Payment } from './Payment';

export class Account {
  private props: IAccount;
  private _id: string;
  payments: Payment[];

  constructor(
    props: Replace<IAccount, { createdAt?: Date; payments?: Payment[] }>,
    id?: string,
  ) {
    this.props = {
      ...props,
      createdAt: props.createdAt || new Date(),
      payments: props.payments || [],
    };
    this._id = id || randomUUID();
  }

  get id() {
    return this._id;
  }

  get name() {
    return this.props.name;
  }

  get type() {
    return this.props.type;
  }

  get balance() {
    return this.props.balance;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  set name(name: string) {
    this.props.name = name;
  }

  set type(type: AccountType) {
    this.props.type = type;
  }

  set balance(balance: number) {
    this.props.balance = balance;
  }
}
